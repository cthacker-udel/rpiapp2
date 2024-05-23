/* eslint-disable no-bitwise -- disabled */
/**
 *
 * @param text
 * @param key
 * @returns
 */
export const xorString = (text: string, key: string): string => {
    let result = "";

    for (let index = 0; index < text.length; index += 1) {
        result += String.fromCodePoint(
            (text.codePointAt(index) ?? 0) ^
                (key.codePointAt(index % key.length) ?? 0),
        );
    }
    return result;
};
