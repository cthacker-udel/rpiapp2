/**
 * @file Tests if the provided parsed https response contains an ApiResponse.
 */

import type { ApiResponse } from "../../../@types/api/ApiResponse";
import { isApiError } from "./isApiError";

/**
 * Tests if the response equals undefined. Secondly, tests if the response is an ApiError using `isApiError`.
 * @param entity - The entity to test if the response contains an api error.
 * @returns - Whether the ApiError is in the response.
 * @example
 * ```ts
 * // implementation
 * const response = await fetch(...);
 * const _isApiErrorInResponse = isApiErrorInResponse(response);
 * // do something
 * ```
 */
export const isApiErrorInResponse = (entity: unknown): boolean => {
    const convertedEntity = entity as ApiResponse<unknown>;

    return (
        convertedEntity.error !== undefined && isApiError(convertedEntity.error)
    );
};
