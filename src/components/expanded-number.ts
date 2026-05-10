// Library
import { LitElement, html, css } from "lit";
import { customElement, property } from "lit/decorators.js";
import { map } from "lit/directives/map.js";

// Type Definitions
import type { BitCell } from "./bit-cell";

@customElement("expanded-number")
export class ExpandedNumber extends LitElement {

    @property({ type: Number, reflect: true })
    value = 0;

    @property({ type: Number, reflect: true })
    base = 2;

    @property({ type: Number, reflect: true })
    length = 8;

    static styles = css /* css */ `
        span {
            font-family: var(--font-family-bits);
        }
        
        .font-large {
            font-size: 2rem;
            font-weight: bold;
        }

        .grayed-out {
            opacity: 0.25;
        }
    `;

    updateValue() {
        const bitCells = this.renderRoot.querySelectorAll<BitCell>("bit-cell");
        let sum = 0;
        bitCells.forEach((cell, cellIdx) => {
            sum += cell.value * (this.base ** (bitCells.length - cellIdx - 1));
        });
        this.value = sum;
    }

    render() {
        const parts = this.value.toString(this.base).padStart(this.length, '0').split('').map(digit => parseInt(digit, this.base));

        return html /* html */ `
            <display-flex flex-direction="row" gap="1.5rem">
                <display-flex flex-direction="row" align-items="center" gap="1rem">
                ${map(parts, (part, idx) => html /* html */ `
                    <display-flex flex-direction="column" align-items="center" gap="1rem" @click=${this.updateValue}>
                        <bit-cell value="${part}" base="${this.base}" interactive></bit-cell>
                        <span class=${part === 0 ? "grayed-out" : ""}>${this.base}<sup>${parts.length - idx - 1}</sup></span>
                        <span class=${part === 0 ? "grayed-out" : ""}>${this.base ** (parts.length - idx - 1)}</span>
                    </display-flex>
                `)}
                </display-flex>
                <span class="font-large grayed-out">=</span>
                <span class="font-large">${this.value.toString().padStart(Math.log10(this.base ** (this.length - 1)) + 1, '0')}</span>
            </display-flex>
        `;
    }
}
