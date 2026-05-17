/** The kind of bitwise operation */
export type BitwiseOperator = "ADD" | "AND" | "OR" | "XOR" | "NOT";

// TODO: Add Left-Shift and Right-Shift operations

/**
 * Utility function to get the symbolic representation of a {@link BitwiseOperator}.
 * @param operator The {@link BitwiseOperator} in question
 * @returns A string symbolic representation of the {@link BitwiseOperator}
 */
export function bitwiseOperatorSymbol(operator: BitwiseOperator): string {
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
 * Performs a bitwise operation on the given operands.
 * @param operand1 The first operand
 * @param operator The {@link BitwiseOperator} to use to perform the bitwise operation
 * @param operand2 The second operand
 * @returns The result of the bitwise operation performed on the given operands
 */
export function performBitwiseOperation(operand1: number, operator: BitwiseOperator, operand2: number = 0): number {
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
