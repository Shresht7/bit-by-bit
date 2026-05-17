// Library
import { LitElement, html, css } from "lit";
import { customElement, property, state } from "lit/decorators.js";

// Styles
import { flex } from "../styles/lit.styles";

// Events
import type { BitArray, ValueChangedEvent } from "./bit-array";

/**
 * Showcases the bitwise NOT operation.
 * The operand is displayed as a {@link BitArray bit array}, and the result is calculated and displayed as the bitwise NOT of the operand.
 * The length of the bit array can be specified, or it will default to the minimum length required to represent the operand in binary.
 */
@customElement("bitwise-not")
export class BitwiseNot extends LitElement {

    /** The number to perform the bitwise NOT operation on. */
    @property({ type: Number, reflect: true })
    operand: number = 0;

    /** The length of the bit array. If not specified, it defaults to the minimum length required to represent the operand in binary. */
    @property({ type: Number, reflect: true })
    length: number = -1;

    /** The result of the bitwise NOT operation, represented as a binary string. */
    @state()
    result: string = "";

    /** Lifecycle method called when the component is added to the DOM. Determines the length of the bit array and performs the initial operation. */
    connectedCallback(): void {
        super.connectedCallback();
        this.determineLength();
        this.performOperation();
    }

    /** Determines the length of the bit array based on the operand if not explicitly specified. */
    determineLength() {
        if (this.length < 0) {
            this.length = this.operand.toString(2).length;
        }
    }

    /** Updates the operand value based on a {@link ValueChangedEvent} and recalculates the result. */
    updateValue(e: ValueChangedEvent) {
        this.operand = Math.floor(e.detail.value);
        this.determineLength();
        this.performOperation();
    }

    /** Performs the bitwise NOT operation and updates the result. */
    performOperation() {
        const bitArray = this.operand.toString(2).padStart(this.length, "0").split('');
        this.result = bitArray.map(bit => bit === '0' ? '1' : '0').join('');
    }

    // TODO: Extract common styles out into a shared file

    /** Styles for the component */
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

        .value {
            font-family: var(--font-family-code);
            font-size: 0.875rem;
        }
    `];

    // TODO: Think about how to align the components to minimize layoutshifts as the values change. Would ideally like most interactable parts to remain stationary while the bit-arrays grow to the left.

    /** Renders the component's template, displaying the operand and result of the bitwise NOT operation. */
    render() {
        return html /* html */`
            <div class="flex flex-column">
                
                <div class="flex flex-row">
                    <div class="operator">~</div>
                    <bit-array class="operand" .value=${this.operand} .length=${this.length} @value-changed=${this.updateValue}></bit-array>
                    <div class="value">${this.operand}</div>
                </div>
                
                <div class="separator"></div>
                
                <div class="flex flex-row">
                    <div class="operator">=</div>
                    <bit-array class="result" .value=${this.result} .length=${this.length} noninteractive></bit-array>
                    <div class="value">${parseInt(this.result, 2)}</div>
                </div>
            
            </div>
        `;
    }
}
