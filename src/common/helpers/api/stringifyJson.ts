/**
 * @file Helper function for stringifying JSON data.
 */

/**
 * Stringifies the passed content using `JSON.stringify` into type `string` if successful, empty string otherwise.
 * @param anything - Anything you want to stringify using `JSON.stringify`.
 * @returns The stringified payload as type `string` if the payload stringification threw no errors. If thrown errors exist then function returns "\{\}".
 * @example
 * ```ts
 * const data = { name: "Gabagool" };
 * const stringifiedData = stringifyJson(data);
 * console.log(stringifiedData); // outputs '{"name": "Gabagool"}'
 * ```
 */
export const stringifyJson = (anything: unknown): string => {
    try {
        if (anything === null) {
            return "Passed stringifyJson `null`";
        }

        const stringified = JSON.stringify(anything);
        return stringified;
    } catch {
        return "{}";
    }
};
