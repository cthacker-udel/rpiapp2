/* eslint-disable no-bitwise -- disabled */

/**
 * Takes in 2 strings, the source and the key, and xors the source by the key
 *
 * @param text - The source text, the text that will be xor'd
 * @param key - The key to xor the source text by
 * @returns The xor'd text
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
