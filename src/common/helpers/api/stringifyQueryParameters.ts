/**
 * @file Stringifies the passed in query parameters. Helps format the object into proper query parameters for propagation to the server call.
 */

import { isNullish, select } from "radashi";
import type { QueryStringParameter } from "../../../@types/api/QueryStringParameter";

type QueryParametersType = undefined | { [key: string]: QueryStringParameter };

/**
 * Generates the query parameters string.
 * @param queryParameters - The query parameters to process, combination of pairs of `key=value` joined by `&` symbols.
 * @returns The stringified query parameters.
 * @example
 * ```ts
 * const queryParameters = {
 *  page: "page1",
 *  isRedirect: true,
 * };
 *
 * const stringifiedParameters = stringifyQueryParameters(queryParameters);
 * console.log(stringifiedParameters); // logs `?page="page1"&isRedirect=true`
 * ```
 */
export const stringifyQueryParameters = (
    queryParameters: QueryParametersType,
): string => {
    if (isNullish(queryParameters)) {
        return "";
    }

    return `?${select(
        Object.entries(queryParameters),
        (eachEntry) => `${eachEntry[0]}=${eachEntry[1]}`,
        (eachEntry) => eachEntry[1] !== undefined,
    ).join("&")}`;
};
