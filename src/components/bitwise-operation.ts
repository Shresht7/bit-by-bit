// Library
import { LitElement, html, css } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { bitwiseOperatorSymbol, performBitwiseOperation, type BitwiseOperator } from "../library/bitwise-operations";

// Styles
import { flex } from "../styles/lit.styles";

// Type Definitions
import type { ValueChangedEvent } from "./bit-array";

/**
 * A component that performs a specified bitwise operation on two operands and displays the result.
 * The operands and result are displayed as both binary (using {@link BitArray bit arrays}) and decimal values.
 * The component supports the following bitwise operations: AND, OR, XOR, NOT, and ADD.
 */
@customElement("bitwise-operation")
export class BitwiseOperation extends LitElement {

    /** The first operand for the bitwise operation. */
    @property({ type: Number, reflect: true })
    operand1: number = 0;

    /** The second operand for the bitwise operation. */
    @property({ type: Number, reflect: true })
    operand2: number = 0;

    /** The result of the bitwise operation. */
    @state()
    result: number = 0;

    /** The bitwise operator to apply. */
    @property({ type: String, reflect: true })
    operator: BitwiseOperator = "ADD";

    /** The length of the bit arrays. If not specified, it defaults to the minimum length required to represent the operands in binary. */
    @property({ type: Number, reflect: true })
    length: number = -1;

    /** Determines the length of the bit arrays based on the operands if not explicitly specified. */
    determineLength() {
        if (this.length < 0) {
            const maxOperand = Math.max(this.operand1, this.operand2);
            this.length = Math.ceil(Math.log2(maxOperand + 1));
        }
    }

    /** Lifecycle method called when the component is added to the DOM. Determines the length of the bit arrays and performs the initial operation. */
    connectedCallback(): void {
        super.connectedCallback();
        this.determineLength();
        this.performOperation();
    }

    /** Updates the operand values based on a {@link ValueChangedEvent} and recalculates the result. */
    updateValues(e: ValueChangedEvent) {
        const target = e.target as HTMLElement;
        if (target.classList.contains("operand1")) {
            this.operand1 = e.detail.value;
        } else if (target.classList.contains("operand2")) {
            this.operand2 = e.detail.value;
        }
    }

    /** Performs the bitwise operation based on the current operands and operator. */
    performOperation(e?: ValueChangedEvent) {
        if (e) { this.updateValues(e); }
        this.result = performBitwiseOperation(this.operand1, this.operator, this.operand2);
    }

    /** Styles for the component */
    static styles = [flex, css /* css */`
        .grid {
            display: grid;
            grid-template-columns: max-content max-content max-content;
            grid-template-rows: 1fr 1fr auto 1fr;
            place-items: center end;
            gap: 1rem 2rem;
            font-family: var(--font-family-code);
        }    

        .operand1 {
            grid-column: 2;
            grid-row: 1;
        }

        .value1 {
            grid-column: 3;
            grid-row: 1;
        }

        .operand2 {
            grid-column: 2;
            grid-row: 2;
        }

        .value2 {
            grid-column: 3;
            grid-row: 2;
        }

        .operator {
            grid-column: 1;
            grid-row: 2;
            font-weight: bold;
            font-size: 1.25rem;
        }

        .separator {
            width: 100%;
            grid-column: 1 / -1;
            grid-row: 3;
            border-bottom: 1px solid var(--color-subdued);
        }

        .result {
            grid-column: 2;
            grid-row: 4;
        }

        .valueRes {
            grid-column: 3;
            grid-row: 4;
        }
    `];

    /** Renders the component's template, displaying the operands and result of the bitwise operation. */
    render() {
        return html /* html */`
            <div class="grid" @value-changed=${this.performOperation}>
                <bit-array class="operand1" .value=${this.operand1} .length=${this.length}></bit-array>
                <div class="value1">${this.operand1}</div>
                <bit-array class="operand2" .value=${this.operand2} .length=${this.length}></bit-array>
                <div class="value2">${this.operand2}</div>
                <div class="operator">${bitwiseOperatorSymbol(this.operator)}</div>
                <div class="separator"></div>
                <bit-array class="result" .value=${this.result} noninteractive></bit-array>
                <div class="valueRes">${this.result}</div>
            </div>
        `;
    }
}
