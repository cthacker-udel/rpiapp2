/**
 * @file Represents the `ClientSideApi`, which houses the logic for calling the built-in NextJS api, or a separate API.
 */

/* eslint-disable sonarjs/no-implicit-dependencies -- disabled */
/* eslint-disable sonarjs/cyclomatic-complexity -- disabled for complexity, not an issue having high complexity for the general API framework. */
/* eslint-disable lodash-f/prefer-lodash-method -- no `replace` `includes` functions in radashi */
/* eslint-disable @typescript-eslint/no-extraneous-class -- disabled */

import { isNullish } from "radashi";
import { toast } from "react-toastify";

import type { BaseUrlConfiguration } from "../../@types/api/BaseUrlConfiguration";
import type { QueryStringParameter } from "../../@types/api/QueryStringParameter";
import { corsHeaders } from "../constants/api/corsHeaders";
import { Regex } from "../constants/Regex";
import { getApiErrorFromResponse } from "../helpers/api/getApiErrorFromResponse";
import { getBaseUrl } from "../helpers/api/getBaseUrl";
import { isApiErrorInResponse } from "../helpers/api/isApiErrorInResponse";
import { stringifyJson } from "../helpers/api/stringifyJson";
import { stringifyQueryParameters } from "../helpers/api/stringifyQueryParameters";

/**
 * The datatype that's passed in requests that contain a request body.
 */
type ClientSideBodyType = number | string | undefined;

/**
 * Header for file in form data.
 */
const FILE_HEADER = "content-disposition";

/**
 * The include argument when we want to download the file (or mark it as an attachment).
 */
const FILE_HEADER_INCLUDE = "attachment";

/**
 * Configuration for client-side fetch calls.
 */
type ClientSideApiConfig = {
    /**
     * The configuration to pass into `getBaseUrl`.
     */
    baseUrlConfiguration?: BaseUrlConfiguration;

    /**
     * Whether form data is being POST/PUT/PATCH/DELETE.
     */
    formDataSent?: boolean;

    /**
     * Custom headers to add to the request.
     */
    headers?: HeadersInit;

    /**
     * Whether to expect a redirect (301/302, etc) in the response.
     */
    isRedirect?: boolean;
};

/**
 * All client-side requests go through this interface, which interacts with the serverless api under the `pages` directory.
 */
export class ClientSideApi {
    /**
     * The base url of this class, used to construct the endpoints efficiently.
     */
    public static readonly BASE_URL: string | undefined = getBaseUrl(undefined);

    /**
     * Generates the base url for either a consumer-supplied configuration or lack of configuration.
     * @param configuration - The client-side configuration either consumer-supplied or undefined.
     * @returns The found base url.
     * @example
     * - Using without configuration
     * ```ts
     * const url = ClientSideApi.getClientSideBaseUrl();
     * ```
     * - Using with configuration
     * ```ts
     * const url = ClientSideApi.getClientSideBaseUrl({ internalApiUrl: window.location.hostname });
     * ```
     */
    public static getClientSideBaseUrl(
        configuration?: ClientSideApiConfig,
    ): string {
        if (!isNullish(configuration?.baseUrlConfiguration)) {
            return getBaseUrl(configuration.baseUrlConfiguration);
        }

        return this.BASE_URL ?? getBaseUrl(undefined);
    }

    /**
     * Sends a delete request to the serverless api located under the `pages` directory.
     * @template ResponseType - The response the client is receiving.
     * @template BodyType - The body the user is sending in the request.
     * @param endpoint - The endpoint the user is calling.
     * @param body - The body of the request.
     * @param queryParameters - The query parameters appended to the end of the url.
     * @param config - The configuration of the DELETE request.
     * @returns The response from the server.
     * @example With using `endpoint`
     * ```ts
     * type MockResponse = { success: boolean };
     * const url = "users/update";
     * const deleteResponse = await ClientSideApi.delete<ApiResponse<MockResponse>>(url); // sends request to `${this.BASE_URL}${endpoint}`
     * // ... do something with deleteResponse
     * ```
     * @example With using `endpoint` and `body`
     * ```ts
     * type MockBodyType = { name: string };
     * const url = "users/update";
     * const body = { name: "RandomJoe" };
     * const deleteResponse = await ClientSideApi.delete<ApiResponse<boolean>, MockBodyType>(url, body);
     * // ... do something with deleteResponse
     * ```
     * @example With using `endpoint` and `body` and `queryParameters`
     * ```ts
     * type MockBodyType = { name: string };
     * const url = "users/update";
     * const body = { name: "RandomJoe" };
     * const queryParams = { isAdmin: true };
     * const deleteResponse = await ClientSideApi.delete<ApiResponse<boolean>, MockBodyType>(url, body, queryParams); // sends request to `${this.BASE_URL}${endpoint}?isAdmin=true`
     * // ... do something with deleteResponse
     * ```
     */
    public static async delete<
        ResponseType = unknown,
        BodyType = FormData | { [key: string]: ClientSideBodyType },
    >(
        endpoint: string,
        body?: BodyType,
        queryParameters?: {
            [key: string]: QueryStringParameter;
        },
        config?: ClientSideApiConfig,
    ): Promise<ResponseType> {
        const formDataSent = config?.formDataSent ?? false;
        const queryString = stringifyQueryParameters(queryParameters);

        const url = `${this.getClientSideBaseUrl(config)}${endpoint}${queryString}`;
        const formattedUrl = url.replace(Regex.TRAILING_SLASH, "");
        const requestBody = formDataSent
            ? (body as FormData)
            : stringifyJson(body);

        const headers: RequestInit = {
            body: requestBody,
            credentials: "include",
            headers: config?.headers ?? {},
            method: "DELETE",
            mode: "cors",
        };

        const deleteRequestResult = await fetch(formattedUrl, headers);

        if (
            config !== undefined &&
            (config.isRedirect ?? deleteRequestResult.status === 307)
        ) {
            return {} as ResponseType;
        }

        const isFile =
            deleteRequestResult.headers
                .get(FILE_HEADER)
                ?.includes(FILE_HEADER_INCLUDE) ?? false;

        const parsedDeleteRequest: Blob | ResponseType = isFile
            ? ((await deleteRequestResult.blob()) as ResponseType)
            : ((await deleteRequestResult.json()) as ResponseType);

        if (!isFile && isApiErrorInResponse(parsedDeleteRequest)) {
            const error = getApiErrorFromResponse(parsedDeleteRequest);
            toast.error(error.message);
        }

        return parsedDeleteRequest;
    }

    /**
     * Sends a get request to the serverless api to then send the request to the server.
     * @template ResponseType - The response the client is receiving.
     * @param endpoint - The endpoint the user is calling.
     * @param queryParameters - The query parameters appended to the end of the url.
     * @param config - The configuration of the GET request.
     * @returns A promise of the return type specified in the call.
     * @example With using `endpoint`
     * ```ts
     * type MockResponse = { success: boolean };
     * const url = "users/update";
     * const getResponse = await ClientSideApi.get<ApiResponse<MockResponse>>(url); // sends request to `${this.BASE_URL}${endpoint}`
     * // ... do something with getResponse
     * ```
     * @example With using `endpoint` and `queryParameters`
     * ```ts
     * const url = "users/update";
     * const queryParams = { isAdmin: true };
     * const getResponse = await ClientSideApi.get<ApiResponse<boolean>>(url, queryParams); // sends request to `${this.BASE_URL}${endpoint}?isAdmin=true`
     * // ... do something with getResponse
     * ```
     */
    public static async get<ResponseType = unknown>(
        endpoint: string,
        queryParameters?: {
            [key: string]: QueryStringParameter;
        },
        config?: ClientSideApiConfig,
    ): Promise<ResponseType> {
        const queryString = stringifyQueryParameters(queryParameters);

        const url = `${this.getClientSideBaseUrl(config)}${endpoint}${queryString}`;
        const formattedUrl = url.replace(Regex.TRAILING_SLASH, "");

        const getRequestResult = await fetch(formattedUrl, {
            // TODO: (put back in when working with actual api) credentials: "include",
            headers: config?.headers ?? { ...corsHeaders },
            method: "GET",
            mode: "cors",
        });

        if (
            config !== undefined &&
            (config.isRedirect ?? getRequestResult.status === 307)
        ) {
            return {} as ResponseType;
        }

        const isFile =
            getRequestResult.headers
                .get(FILE_HEADER)
                ?.includes(FILE_HEADER_INCLUDE) ?? false;

        const parsedResult: ResponseType = isFile
            ? ((await getRequestResult.blob()) as ResponseType)
            : ((await getRequestResult.json()) as ResponseType);

        if (!isFile && isApiErrorInResponse(parsedResult)) {
            const error = getApiErrorFromResponse(parsedResult);
            toast.error(error.message);
        }

        return parsedResult;
    }

    /**
     * Sends a post request to the serverless api to then send the request to the server.
     * @template ResponseType - The response the client is receiving.
     * @template BodyType - The body the user is sending in the request.
     * @param endpoint - The endpoint the user is calling.
     * @param body - The body of the request required (expected) in post requests.
     * @param queryParameters - The query parameters which the user wants to append onto the url.
     * @param config - The configuration for the POST request.
     * @returns The response from the server.
     * @example With using `endpoint`
     * ```ts
     * type MockResponse = { success: boolean };
     * const url = "users/update";
     * const postResponse = await ClientSideApi.post<ApiResponse<MockResponse>>(url); // sends request to `${this.BASE_URL}${endpoint}`
     * // ... do something with postResponse
     * ```
     * @example With using `endpoint` and `body`
     * ```ts
     * type MockBodyType = { name: string };
     * const url = "users/update";
     * const body = { name: "RandomJoe" };
     * const postResponse = await ClientSideApi.post<ApiResponse<boolean>, MockBodyType>(url, body);
     * // ... do something with postResponse
     * ```
     * @example With using `endpoint` and `body` and `queryParameters`
     * ```ts
     * type MockBodyType = { name: string };
     * const url = "users/update";
     * const body = { name: "RandomJoe" };
     * const queryParams = { isAdmin: true };
     * const postResponse = await ClientSideApi.post<ApiResponse<boolean>, MockBodyType>(url, body, queryParams); // sends request to `${this.BASE_URL}${endpoint}?isAdmin=true`
     * // ... do something with postResponse
     * ```
     */
    public static async post<
        ResponseType = unknown,
        BodyType = FormData | { [key: string]: number | string | undefined },
    >(
        endpoint: string,
        body?: BodyType,
        queryParameters?: {
            [key: string]: boolean | number | string | undefined;
        },
        config?: ClientSideApiConfig,
    ): Promise<ResponseType> {
        const formDataSent = config?.formDataSent ?? false;
        const queryString = stringifyQueryParameters(queryParameters);

        const url = `${this.getClientSideBaseUrl(config)}${endpoint}${queryString}`;
        const formattedUrl = url.replace(Regex.TRAILING_SLASH, "");

        const postRequestResult = await fetch(formattedUrl, {
            body: formDataSent ? (body as FormData) : stringifyJson(body),
            credentials: "include",
            headers: config?.headers ?? {},
            method: "POST",
            mode: "cors",
        });

        const redirectConsumer =
            config !== undefined &&
            (config.isRedirect ?? postRequestResult.status === 307);

        if (redirectConsumer) {
            return {} as ResponseType;
        }

        const isFile =
            postRequestResult.headers
                .get(FILE_HEADER)
                ?.includes(FILE_HEADER_INCLUDE) ?? false;

        const parsedPostRequest: Blob | ResponseType = isFile
            ? ((await postRequestResult.blob()) as ResponseType)
            : ((await postRequestResult.json()) as ResponseType);

        const displayError = !isFile && isApiErrorInResponse(parsedPostRequest);

        if (displayError) {
            const error = getApiErrorFromResponse(parsedPostRequest);
            toast.error(error.message);
        }

        return parsedPostRequest;
    }

    /**
     * Sends a put request to the serverless api located under the `pages` directory.
     * @template ResponseType - The response the client is receiving.
     * @template BodyType - The body the user is sending in the request.
     * @param endpoint - The endpoint the user is calling.
     * @param body - The body of the request required with put requests.
     * @param queryParameters - The query parameters appended to the end of the url.
     * @param config - The configuration of the POST request.
     * @returns The response from the server.
     * @example With using `endpoint`
     * ```ts
     * type MockResponse = { success: boolean };
     * const url = "users/update";
     * const putResponse = await ClientSideApi.put<ApiResponse<MockResponse>>(url); // sends request to `${this.BASE_URL}${endpoint}`
     * // ... do something with putResponse
     * ```
     * @example With using `endpoint` and `body`
     * ```ts
     * type MockBodyType = { name: string };
     * const url = "users/update";
     * const body = { name: "RandomJoe" };
     * const putResponse = await ClientSideApi.put<ApiResponse<boolean>, MockBodyType>(url, body);
     * // ... do something with putResponse
     * ```
     * @example With using `endpoint` and `body` and `queryParameters`
     * ```ts
     * type MockBodyType = { name: string };
     * const url = "users/update";
     * const body = { name: "RandomJoe" };
     * const queryParams = { isAdmin: true };
     * const putResponse = await ClientSideApi.put<ApiResponse<boolean>, MockBodyType>(url, body, queryParams); // sends request to `${this.BASE_URL}${endpoint}?isAdmin=true`
     * // ... do something with putResponse
     * ```
     */
    public static async put<
        ResponseType = unknown,
        BodyType = FormData | { [key: string]: number | string | undefined },
    >(
        endpoint: string,
        body?: BodyType,
        queryParameters?: {
            [key: string]: boolean | number | string | undefined;
        },
        config?: ClientSideApiConfig,
    ): Promise<ResponseType> {
        const formDataSent = config?.formDataSent ?? false;
        const queryString = stringifyQueryParameters(queryParameters);

        const url = `${this.getClientSideBaseUrl(config)}${endpoint}${queryString}`;
        const formattedUrl = url.replace(Regex.TRAILING_SLASH, "");

        const putRequestResult = await fetch(formattedUrl, {
            body: formDataSent ? (body as FormData) : stringifyJson(body),
            credentials: "include",
            headers: config?.headers ?? {},
            method: "PUT",
            mode: "cors",
        });

        if (
            config !== undefined &&
            (config.isRedirect ?? putRequestResult.status === 307)
        ) {
            return {} as ResponseType;
        }

        const isFile =
            putRequestResult.headers
                .get(FILE_HEADER)
                ?.includes(FILE_HEADER_INCLUDE) ?? false;

        const parsedPutRequest: Blob | ResponseType = isFile
            ? ((await putRequestResult.blob()) as ResponseType)
            : ((await putRequestResult.json()) as ResponseType);

        if (!isFile && isApiErrorInResponse(parsedPutRequest)) {
            const error = getApiErrorFromResponse(parsedPutRequest);
            toast.error(error.message);
        }

        return parsedPutRequest;
    }
}
