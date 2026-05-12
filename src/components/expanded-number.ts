// Library
import { LitElement, html, css } from "lit";
import { customElement, property, queryAll } from "lit/decorators.js";
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

    constructor() {
        super();
        this.addEventListener("value-changed", this.updateValue);
    }

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

    @queryAll("bit-cell")
    private bitCells!: NodeListOf<BitCell>;

    updateValue = () => {
        let sum = 0;
        this.bitCells.forEach((cell, cellIdx) => {
            sum += cell.value * (this.base ** (this.bitCells.length - cellIdx - 1));
        });
        this.value = sum;
    }

    render() {
        const parts = this.value.toString(this.base).padStart(this.length, '0').split('').map(digit => parseInt(digit, this.base));

        return html /* html */ `
            <div class="flex flex-row" style="gap: 1.5rem;">
                <div class="flex flex-row" style="gap: 1rem;">
                ${map(parts, (part, idx) => html /* html */ `
                    <div class="flex flex-column" style="gap: 1rem;">
                        <bit-cell value="${part}" base="${this.base}" interactive></bit-cell>
                        <span class=${part === 0 ? "grayed-out" : ""}>${this.base}<sup>${parts.length - idx - 1}</sup></span>
                        <span class=${part === 0 ? "grayed-out" : ""}>${this.base !== 2 ? `${part}×` : ""}${this.base ** (parts.length - idx - 1)}</span>
                    </div>
                `)}
                </div>
                <span class="font-large grayed-out">=</span>
                <span class="font-large">${this.value.toString().padStart(Math.log10(this.base ** (this.length - 1)) + 1, '0')}</span>
            </div>
        `;
    }
}
