// Library
import { LitElement, html, css } from "lit";
import { customElement, property, state } from "lit/decorators.js";

// Styles
import { flex } from "../styles/lit.styles";

// Events
import type { ValueChangedEvent } from "./bit-array";

@customElement("bitwise-not")
export class BitwiseNot extends LitElement {
    @property({ type: Number, reflect: true })
    operand: number = 0;

    @property({ type: Number, reflect: true })
    length: number = -1;

    @state()
    result: string = "";

    connectedCallback(): void {
        super.connectedCallback();
        this.determineLength();
        this.performOperation();
    }

    determineLength() {
        if (this.length < 0) {
            this.length = this.operand.toString(2).length;
        }
    }

    updateValue(e: ValueChangedEvent) {
        this.operand = Math.floor(e.detail.value);
        this.determineLength();
        this.performOperation();
    }

    performOperation() {
        const bitArray = this.operand.toString(2).padStart(this.length, "0").split('');
        this.result = bitArray.map(bit => bit === '0' ? '1' : '0').join('');
    }

    static styles = [flex, css /* css */`
        .operator {
            font-family: var(--font-family-code);
            font-weight: bold;
            font-size: 1.25rem;
        }

        .separator {
            height: 1px;
            width: 100%;
            background-color: var(--color-subdued);
            margin: 0.5rem 0;
        }    
    `];

    render() {
        return html /* html */`
            <div class="operation flex flex-column">
                <div class="flex flex-row">
                    <div class="operator">~</div>
                    <bit-array class="operand" .value=${this.operand} .length=${this.length} @value-changed=${this.updateValue}></bit-array>
                </div>
                <div class="separator"></div>
                <div class="flex flex-row">
                    <div class="operator">=</div>
                    <bit-array class="result" .value=${this.result} .length=${this.length} noninteractive></bit-array>
                </div>
            </div>
        `;
    }
}
