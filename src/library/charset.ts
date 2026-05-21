/** All supported character sets. */
export type CHARSET = "binary" | "decimal" | "octal" | "hexadecimal" | "base32" | "base64";

/** The set of characters used in the binary number system. */
export const binary = new Set([0, 1]);

/** The set of characters used in the decimal number system. */
export const decimal = new Set([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);

/** The set of characters used in the octal number system. */
export const octal = new Set([0, 1, 2, 3, 4, 5, 6, 7]);

/** The set of characters used in the hexadecimal number system. */
export const hexadecimal = new Set([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, "A", "B", "C", "D", "E", "F"]);

/** The set of characters used in the base32 number system. */
export const base32 = new Set([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V"]);

/** The set of characters used in the base64 number system. */
export const base64 = new Set([
    0, 1, 2, 3, 4, 5, 6, 7, 8, 9,
    "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z",
    "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z",
    "+", "/"
]);

/** @returns The base corresponding to the given {@link CHARSET character set}. */
export function base(charset: CHARSET): number {
    switch (charset) {
        case "binary":
            return 2;
        case "decimal":
            return 10;
        case "octal":
            return 8;
        case "hexadecimal":
            return 16;
        case "base32":
            return 32;
        case "base64":
            return 64;
        default:
            throw new Error(`Unsupported character set: ${charset}`);
    }
}
