/**
 * @file Represents a common data standard for processing errors from the API calls.
 */

/**
 * Represents an error thrown in the server, and propagated in the response.
 */
export type ApiError = {
    /**
     * The error associated with the error response.
     */
    error: string;

    /**
     * The message associated with the error response.
     */
    message: string;

    /**
     * The name associated with the error.
     */
    name?: string;

    /**
     * The status code of the response.
     */
    statusCode: number;
};
