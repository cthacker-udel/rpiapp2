/**
 * @file Attempts to access the `.error` field of the response, **if** the response is an ApiResponse.
 */

import type { ApiError } from "../../../@types/api/ApiError";
import type { ApiResponse } from "../../../@types/api/ApiResponse";

/**
 * First tests if the response is an ApiResponse. Secondly tests if the response contains an ApiError.
 * @param entity - The entity to test if the response contains an api error.
 * @returns - The acquired ApiError from the response.
 * @example
 * ```ts
 * // previous implementation
 * const response = await fetch(...);
 * const getApiErrorFromResponse = getApiErrorFromResponse(response);
 * // next implementation
 * ```
 */
export const getApiErrorFromResponse = (entity: unknown): ApiError => {
    const convertedEntity = entity as ApiResponse<unknown>;

    return convertedEntity.error as unknown as ApiError;
};
