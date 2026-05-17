/** The kind of bitwise operation */
export type BitwiseOperator = "AND" | "OR" | "XOR" | "NOT";

/** The kind of binary operation */
export type BinaryOperator = "ADD" | BitwiseOperator;

// TODO: Add Left-Shift and Right-Shift operations

/**
 * Utility function to get the symbolic representation of a {@link BinaryOperator}.
 * @param operator The {@link BinaryOperator} in question
 * @returns A string symbolic representation of the {@link BinaryOperator}
 */
export function operatorSymbol(operator: BinaryOperator): string {
    switch (operator) {
        case "ADD":
            return "+";
        case "AND":
            return "&";
        case "OR":
            return "|";
        case "XOR":
            return "^";
        case "NOT":
            return "~";
        default:
            return "";
    }
}

/**
 * Performs a binary operation on the given operands.
 * @param operand1 The first operand
 * @param operator The {@link BinaryOperator} to use to perform the binary operation
 * @param operand2 The second operand
 * @returns The result of the binary operation performed on the given operands
 */
export function performBinaryOperation(operand1: number, operator: BinaryOperator, operand2: number = 0): number {
    switch (operator) {
        case "ADD":
            return operand1 + operand2;
        case "AND":
            return operand1 & operand2;
        case "OR":
            return operand1 | operand2;
        case "XOR":
            return operand1 ^ operand2;
        case "NOT":
            return ~operand1;
        default:
            return 0;
    }
}
