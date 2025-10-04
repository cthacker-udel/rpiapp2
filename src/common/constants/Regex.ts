/**
 * @file The regex (Regular expression) constants used throughout the codebase. The `/u` flag stands for *unicode*, which means that the matching examines the raw unicode values. The `/g` flag means that the match does not stop at the first match, if a given string has matches. The `/m` flag means to apply the match to the start and end of the string.
 */

/* eslint-disable sonarjs/regex-complexity -- disabled */
/* eslint-disable sort-keys -- disabled, for some reason having an issue */
/* eslint-disable max-len -- disabled */

export const Regex = {
    CONTAINS_DIGIT: /\d+/u,
    CONTAINS_LOWERCASE: /[a-z]+/u,
    CONTAINS_SYMBOL: /[\W_]+/u,
    CONTAINS_UPPERCASE: /[A-Z]+/u,
    EMAIL: /^[\w.!#$%&'*+/=?^`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/u,
    HSL: /hsl\((?<hue>\d+), (?<saturation>\d+)%, (?<luminosity>\d+)%\)/u,
    NO_DIGITS_SYMBOLS_SPACES: /^\w+(?:-+\w*)?$/u,
    NO_SPACES: /\s+/u,
    NO_SYMBOLS: /^\w+$/mu,
    NOT_VALID_NAME: /[^a-zA-Z-' ]/u,
    TRAILING_SLASH: /\/$/mu,
    TRANSFORM_VALUE: /-?\d{1,3}, -?\d{1,3}/gu,
    VALID_FULL_NAME: /^[a-zA-Z'",]+ [a-zA-Z'",]+$/mu,
    VALID_PHONE:
        /\(?(?<areaCode>\d{3})\)?(?<punctuationBeforeArea>[ .-]?)(?<last3>\d{3})\k<punctuationBeforeArea>(?<last4>\d{4})|^(?<startingPlusOrZeros>\+|00)[1-9][0-9 \-().]{7,32}$/u,
};
