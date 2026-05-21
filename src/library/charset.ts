/** The set of characters used in the binary number system. */
export const binary = new Set([0, 1]);

/** The set of characters used in the decimal number system. */
export const decimal = new Set([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);

/** The set of characters used in the octal number system. */
export const octal = new Set([0, 1, 2, 3, 4, 5, 6, 7]);

/** The set of characters used in the hexadecimal number system. */
export const hexadecimal = new Set([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, "A", "B", "C", "D", "E", "F"]);

export type CHARSET = "binary" | "decimal" | "octal" | "hexadecimal";

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
    }
}
