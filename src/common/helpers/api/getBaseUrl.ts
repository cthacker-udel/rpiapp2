/**
 * @file Fetches the base url from the configuration. Example: 'https://google.com' from 'https://google.com/search/random'.
 */

import type { BaseUrlConfiguration } from "../../../@types/api/BaseUrlConfiguration";

/**
 * Fetches and constructs the base url from the given environment.
 * @param configuration - The configuration of the `getBaseUrl` invocation.
 * @returns - The baseUrl, dependent on server-side or client-side calling this function.
 * @example Without configuration
 * ```ts
 * // in api code
 * const baseUrl = getBaseUrl();
 * // next implementation
 * ```
 * @example Using server side configuration
 * ```ts
 * // in server-side code
 * const baseUrl = getBaseUrl({ serverSide: true });
 * // acquired server side url
 * ```
 */
export const getBaseUrl = (configuration: BaseUrlConfiguration): string => {
    const currentNodeEnvironment = import.meta.env?.MODE;

    const isProduction = currentNodeEnvironment === "production";

    if (configuration?.serverSide) {
        const url: string = isProduction
            ? ((import.meta.env.PRODUCTION_API_URL as string) ?? "")
            : ((import.meta.env.DEV_API_URL as string) ?? "");
        return url ?? "";
    }

    let url = configuration?.internalApiUrl;

    url =
        isProduction && url === undefined
            ? (import.meta.env.VITE_PUBLIC_PRODUCTION_API_URL as string)
            : (url ?? (import.meta.env.VITE_PUBLIC_DEV_API_URL as string));

    return `${url}/api/`;
};
