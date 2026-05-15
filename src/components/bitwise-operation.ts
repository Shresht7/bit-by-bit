// Library
import { LitElement, html, css } from "lit";
import { customElement, property, state } from "lit/decorators.js";

// Styles
import { flex } from "../styles/lit.styles";
import type { ValueChangedEvent } from "./bit-array";

export type BitwiseOperator = "ADD" | "AND" | "OR" | "XOR" | "NOT";

@customElement("bitwise-operation")
export class BitwiseOperation extends LitElement {
    @property({ type: Number, reflect: true })
    operand1: number = 0;

    @property({ type: Number, reflect: true })
    operand2: number = 0;

    @state()
    result: number = 0;

    @property({ type: String, reflect: true })
    operator: BitwiseOperator = "ADD";

    @property({ type: Number, reflect: true })
    length: number = -1;

    determineLength() {
        if (this.length < 0) {
            const maxOperand = Math.max(this.operand1, this.operand2);
            this.length = Math.ceil(Math.log2(maxOperand + 1));
        }
    }

    connectedCallback(): void {
        super.connectedCallback();
        this.determineLength();
        this.performOperation();
    }


    updateValues(e: ValueChangedEvent) {
        const target = e.target as HTMLElement;
        if (target.classList.contains("operand1")) {
            this.operand1 = e.detail.value;
        } else if (target.classList.contains("operand2")) {
            this.operand2 = e.detail.value;
        }
    }

    performOperation(e?: ValueChangedEvent) {
        if (e) {
            this.updateValues(e);
        }
        switch (this.operator) {
            case "ADD":
                this.result = this.operand1 + this.operand2;
                break;
            case "AND":
                this.result = this.operand1 & this.operand2;
                break;
            case "OR":
                this.result = this.operand1 | this.operand2;
                break;
            case "XOR":
                this.result = this.operand1 ^ this.operand2;
                break;
            case "NOT":
                this.result = ~this.operand1;
                break;
            // TODO: Handle Shift Operations (Left Shift and Right Shift)
            default:
                this.result = 0;
        }
    }

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

    render() {
        return html /* html */`
            <div class="grid" @value-changed=${this.performOperation}>
                <bit-array class="operand1" .value=${this.operand1} .length=${this.length}></bit-array>
                <div class="value1">${this.operand1}</div>
                <bit-array class="operand2" .value=${this.operand2} .length=${this.length}></bit-array>
                <div class="value2">${this.operand2}</div>
                <div class="operator">${this.renderOperator()}</div>
                <div class="separator"></div>
                <bit-array class="result" .value=${this.result} noninteractive></bit-array>
                <div class="valueRes">${this.result}</div>
            </div>
        `;
    }

    renderOperator() {
        switch (this.operator) {
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

}
