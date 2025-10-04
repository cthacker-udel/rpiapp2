/**
 * @file Helper function for parsing stringified argument using JSON.parse.
 */

/**
 * Parses the passed content using `JSON.parse` into type `ParseType` if successful, undefined otherwise.
 * @param anything - Anything you want to parse using `JSON.parse`.
 * @returns The parsed payload as type `ParseType` if the payload parsing threw no errors.
 * @example
 * ```ts
 * type ObjectType = {
 *      label1: string;
 * };
 *
 * const anObject = "{ 'label1': 'Joe' }";
 * const parsedObject = parseJson<ObjectType>(anObject);
 *
 * console.log(parsedObject.label1); // outputs 'Joe'
 * ```
 */
export const parseJson = <ParseType = unknown>(
    anything: null | string,
): ParseType | undefined => {
    try {
        if (anything === null) {
            return undefined;
        }

        const parsed = JSON.parse(anything) as ParseType;
        return parsed;
    } catch {
        return undefined;
    }
};
