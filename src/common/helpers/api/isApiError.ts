/**
 * @file Tests if the supplied value is an instance of `ApiError`, returns a boolean designating that membership.
 */

import { isEmpty } from "radashi";
import type { ApiError } from "../../../@types/api/ApiError";

/**
 * Determines if the entity passed in is an ApiError.
 * @param entity - The entity to determine similarity to ApiError.
 * @returns Is `entity` an ApiError.
 * @example
 * ```ts
 * try {
 *  // implementation
 * } catch (error: unknown) {
 *  const isErrorApiError = isApiError(error);
 *  if (isErrorApiError) {
 *      // do something
 *  }
 *  // other implementation
 * }
 * ```
 */
export const isApiError = (entity: unknown): boolean => {
    try {
        const convertedEntity = entity as ApiError;

        const errorValid =
            convertedEntity?.error !== undefined &&
            !isEmpty(convertedEntity.error);
        const messageValid =
            convertedEntity?.message !== undefined &&
            !isEmpty(convertedEntity.message);
        const statusCodeValid =
            convertedEntity?.statusCode !== undefined &&
            convertedEntity.statusCode !== 0;

        return errorValid && messageValid && statusCodeValid;
    } catch {
        return false;
    }
};
