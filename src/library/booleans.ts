export type BooleanOperator = "AND" | "OR" | "XOR" | "NOT";

export function performBooleanOperation(operand1: number, operator: BooleanOperator, operand2: number = 0): number {
    switch (operator) {
        case "AND":
            return operand1 & operand2;
        case "OR":
            return operand1 | operand2;
        case "XOR":
            return operand1 ^ operand2;
        case "NOT":
            return ~operand1 & 1; // Ensure result is either 0 or 1
        default:
            return 0;
    }
}
