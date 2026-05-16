// Library
import { LitElement, html, css } from "lit";
import { customElement, property, state } from "lit/decorators.js";

// Styles
import { flex } from "../styles/lit.styles";
import type { NumberInputEvent } from "./number-input";

export type BitwiseShiftOperator = "LEFT" | "RIGHT";

@customElement("bitwise-shift")
export class BitwiseShift extends LitElement {
    @property({ type: String, reflect: true })
    operator: BitwiseShiftOperator = "LEFT";

    @property({ type: Number, reflect: true })
    operand: number = 0;

    @property({ type: Number, reflect: true })
    shift: number = 0;

    @state()
    result: number = 0;

    connectedCallback(): void {
        super.connectedCallback();
        this.performOperation();
    }

    updateValue() {
        this.operand = Math.floor(this.operand);
        this.performOperation();
    }

    updateShift(e: NumberInputEvent) {
        this.shift = Math.max(0, Math.floor(e.detail.value));
        this.performOperation();
    }

    performOperation() {
        this.result = this.operand << this.shift;
    }

    static styles = [flex, css /* css */`
        .grid {
            display: grid;
            grid-template-columns: repeat(4, auto);
            grid-template-rows: repeat(4, auto);
            gap: 1.5rem;
            place-items: center;
            font-family: var(--font-family-code);
        }

        .operand {
            grid-column: 2 / 3;
            grid-row: 1 / 2;
        }

        .operand-value {
            grid-column: 1 / 2;
            grid-row: 1 / 2;
        }

        .operator {
            font-weight: bold;
            font-size: 1.5rem;
            grid-column: 3 / 4;
            grid-row: 1 / 2;
        }

        .shift {
            grid-column: 4 / 5;
            grid-row: 1 / 2;
            font-weight: bold;
            font-size: 1.25rem;
        }

        .separator {
            width: 100%;
            grid-column: 1 / -1;
            grid-row: 2 / 3;
            border-bottom: 1px solid var(--color-subdued);
        }

        .result-value {
            grid-column: 1 / 2;
            grid-row: 3 / 4;
        }

        .result {
            grid-column: 2 / 3;
            grid-row: 3 / 4;
        }

        .operand, .result {
            place-self: end;
        }
    `];

    render() {
        return html /* html */`
            <div class="grid">
                <div class="operand-value">${this.operand}</div>
                <bit-array class="operand" .value=${this.operand} @value-changed=${this.updateValue}></bit-array>
                <div class="operator">${this.renderOperator()}</div>
                <number-input class="shift" .value=${this.shift} @change=${this.updateShift}></number-input>
                <div class="separator"></div>
                <div class="result-value">${this.result}</div>
                <bit-array class="result" .value=${this.result} noninteractive></bit-array>
            </div>
        `;
    }

    renderOperator() {
        return this.operator === "LEFT"
            ? html /* html */`<div class="operator">&lt;&lt;</div>`
            : html /* html */`<div class="operator">&gt;&gt;</div>`;
    }
}
