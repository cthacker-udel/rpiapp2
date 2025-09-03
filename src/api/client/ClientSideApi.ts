/* eslint-disable @typescript-eslint/no-extraneous-class -- disabled */

import type { NextFetchRequestConfig } from "@/@types/api/fetch";
import { corsHeaders } from "@/common/constants/api/corsHeaders";
import { getBaseUrl } from "@/common/helpers/api/getBaseUrl";

/** Header for if a file is being passed in form data */
const FILE_HEADER = "content-disposition";

/** The include argument when we want to download the file (or mark it as an attachment) */
const FILE_HEADER_INCLUDE = "attachment";

/**
 * The type definition of the value in the query parameter payload
 */
type QueryParameterValue = number | string | boolean | undefined;

type BodyType = number | string | undefined;

/**
 * Configuration for client-side fetch calls
 */
type ClientSideApiConfig = {
    /**
     * Whether form data is being POST/PUT/PATCH/DELETE
     */
    formDataSent?: boolean;

    /**
     * Custom headers to add to the request
     */
    headers?: HeadersInit;

    /**
     * Whether to expect a redirect (301/302, etc) in the response
     */
    isRedirect?: boolean;

    /**
     * The nextJS pre-provided configuration
     */
    nextConfig?: NextFetchRequestConfig & {
        /**
         * Whether to auto revalidate (refetch) the call
         */
        autoRevalidate?: boolean;

        /**
         * Whether to revalidate on success (non 400+ response)
         */
        revalidateOnSuccess?: boolean;
    };
};

/**
 * All client-side requests go through this interface, which interacts with the serverless api under the `pages` directory
 */
export class ClientSideApi {
    /**
     * The base url of this class, used to construct the endpoints efficiently
     */
    public static readonly BASE_URL: string | undefined = getBaseUrl();

    /**
     * Sends a get request to the serverless api to then send the request to the server
     *
     * @typeParam T - The type of response the user is receiving
     * @param endpoint - The endpoint the user is calling
     * @param queryParameters - The query parameters that will be appended to the end of the url
     * @returns A promise of the return type specified in the call
     */
    public static async get<T = unknown>(
        endpoint: string,
        queryParameters?: {
            [key: string]: QueryParameterValue;
        },
        config?: ClientSideApiConfig,
    ): Promise<T> {
        const queryString = queryParameters
            ? `?${Object.entries(queryParameters)
                  .map((eachEntry) => `${eachEntry[0]}=${eachEntry[1]}`)
                  .join("&")}`
            : "";

        const getRequestResult = await fetch(
            `${this.BASE_URL}${endpoint}${queryString}`,
            {
                credentials: "include",
                headers: config?.headers ?? { ...corsHeaders },
                method: "GET",
                mode: "cors",
                next: { ...config?.nextConfig },
            },
        );

        if (
            config !== undefined &&
            (config.isRedirect ?? getRequestResult.status === 307)
        ) {
            return {} as T;
        }

        const isFile =
            getRequestResult.headers
                .get(FILE_HEADER)
                ?.includes(FILE_HEADER_INCLUDE) ?? false;

        const parsedResult = isFile
            ? await getRequestResult.blob()
            : await getRequestResult.json();

        return parsedResult as T;
    }

    /**
     * Sends a post request to the serverless api to then send the request to the server
     *
     * @typeParam T - The type of response the client receives
     * @typeParam K - The type of body the client is sending the user
     * @param endpoint - The endpoint the user is calling
     * @param body - The body of the request, which is required (expected) in post requests
     * @param queryParameters - The query parameters which the user wants to append onto the url
     * @returns The response from the server
     */
    public static async post<
        T = unknown,
        K = { [key: string]: BodyType } | FormData,
    >(
        endpoint: string,
        body?: K,
        queryParameters?: {
            [key: string]: QueryParameterValue;
        },
        config?: ClientSideApiConfig,
    ): Promise<T> {
        const formDataSent = config?.formDataSent ?? false;
        const queryString = queryParameters
            ? `?${Object.entries(queryParameters)
                  .map((eachEntry) => `${eachEntry[0]}=${eachEntry[1]}`)
                  .join("&")}`
            : "";

        const postRequestResult = await fetch(
            `${this.BASE_URL}${endpoint}${queryString}`,
            {
                body: formDataSent
                    ? (body as FormData)
                    : JSON.stringify(body ?? {}),
                credentials: "include",
                headers: config?.headers ?? {},
                method: "POST",
                mode: "cors",
                next: { ...config?.nextConfig },
            },
        );

        if (
            config !== undefined &&
            (config.isRedirect ?? postRequestResult.status === 307)
        ) {
            return {} as T;
        }

        const isFile =
            postRequestResult.headers
                .get(FILE_HEADER)
                ?.includes(FILE_HEADER_INCLUDE) ?? false;

        const parsedPostRequest = isFile
            ? await postRequestResult.blob()
            : await postRequestResult.json();

        return parsedPostRequest as T;
    }

    /**
     * Sends a delete request to the serverless api located under the `pages` directory
     *
     * @typeParam T - The type of response the client is receiving
     * @typeParam K - The type of body the client is sending the server
     * @param endpoint - The endpoint the user is calling
     * @param body - The body of the request
     * @param queryParameters - The query parameters that are appended to the end of the url
     * @returns The response from the server
     */
    public static async delete<
        T = unknown,
        K = { [key: string]: number | string | undefined } | FormData,
    >(
        endpoint: string,
        body?: K,
        queryParameters?: {
            [key: string]: number | string | boolean | undefined;
        },
        config?: ClientSideApiConfig,
    ): Promise<T> {
        const formDataSent = config?.formDataSent ?? false;
        const queryString = queryParameters
            ? `?${Object.entries(queryParameters)
                  .map((eachEntry) => `${eachEntry[0]}=${eachEntry[1]}`)
                  .join("&")}`
            : "";
        const deleteRequestResult = await fetch(
            `${this.BASE_URL}${endpoint}${queryString}`,
            {
                body: formDataSent
                    ? (body as FormData)
                    : JSON.stringify(body ?? {}),
                credentials: "include",
                headers: config?.headers ?? {},
                method: "DELETE",
                mode: "cors",
                next: { ...config?.nextConfig },
            },
        );

        if (
            config !== undefined &&
            (config.isRedirect ?? deleteRequestResult.status === 307)
        ) {
            return {} as T;
        }

        const isFile =
            deleteRequestResult.headers
                .get(FILE_HEADER)
                ?.includes(FILE_HEADER_INCLUDE) ?? false;

        const parsedDeleteRequest = isFile
            ? await deleteRequestResult.blob()
            : await deleteRequestResult.json();

        return parsedDeleteRequest as T;
    }

    /**
     * Sends a put request to the serverless api located under the `pages` directory
     *
     * @typeParam T - The type of response the client is receiving
     * @typeParam K - The type of body the user is sending in the request
     * @param endpoint - The endpoint the user is calling
     * @param body - The body of the request, which is required with put requests
     * @param queryParameters - The query parameters which are appended to the end of the url
     * @returns The response from the server
     */
    public static async put<
        T = unknown,
        K = { [key: string]: number | string | undefined } | FormData,
    >(
        endpoint: string,
        body?: K,
        queryParameters?: {
            [key: string]: number | string | boolean | undefined;
        },
        config?: ClientSideApiConfig,
    ): Promise<T> {
        const formDataSent = config?.formDataSent ?? false;
        const queryString = queryParameters
            ? `?${Object.entries(queryParameters)
                  .map((eachEntry) => `${eachEntry[0]}=${eachEntry[1]}`)
                  .join("&")}`
            : "";
        const putRequestResult = await fetch(
            `${this.BASE_URL}${endpoint}${queryString}`,
            {
                body: formDataSent
                    ? (body as FormData)
                    : JSON.stringify(body ?? {}),
                credentials: "include",
                headers: config?.headers ?? {},
                method: "PUT",
                mode: "cors",
                next: { ...config?.nextConfig },
            },
        );

        if (
            config !== undefined &&
            (config.isRedirect ?? putRequestResult.status === 307)
        ) {
            return {} as T;
        }

        const isFile =
            putRequestResult.headers
                .get(FILE_HEADER)
                ?.includes(FILE_HEADER_INCLUDE) ?? false;

        const parsedPutRequest = isFile
            ? await putRequestResult.blob()
            : await putRequestResult.json();

        return parsedPutRequest as T;
    }
}
