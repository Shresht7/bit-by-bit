// Library
import { LitElement, html, css } from "lit";
import { customElement, property, queryAll } from "lit/decorators.js";
import { map } from "lit/directives/map.js";

// Styles
import { flex } from "../styles/lit.styles";

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

    @property({ type: Boolean, attribute: 'show-breakdown', reflect: true })
    showBreakdown = false;

    @property({ type: Boolean, attribute: 'hide-value', reflect: true })
    hideValue = false;

    @property({ type: Boolean, reflect: true })
    noninteractive = false;

    constructor() {
        super();
        this.addEventListener("value-changed", this.updateValue);
    }

    static styles = [flex, css /* css */ `
        span {
            font-family: var(--font-family-code);
        }
        
        .font-large {
            font-size: 2rem;
            font-weight: bold;
        }

        .grayed-out {
            opacity: 0.25;
        }
    `];

    @queryAll("bit-cell")
    private bitCells!: NodeListOf<BitCell>;

    updateValue = () => {
        if (this.noninteractive) return;
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
                        <bit-cell value="${part}" base="${this.base}" ?interactive=${!this.noninteractive}></bit-cell>
                        ${this.renderBreakdown(part, idx, parts.length)}
                    </div>
                `)}
                </div>
                ${this.renderValue()}
            </div>
        `;
    }

    renderBreakdown(part: number, idx: number, length: number) {
        if (!this.showBreakdown) return null;
        return html /* html */ `
            <span class=${part === 0 ? "grayed-out" : ""}>${this.base}<sup>${length - idx - 1}</sup></span>
            <span class=${part === 0 ? "grayed-out" : ""}>${this.base !== 2 ? `${part}×` : ""}${this.base ** (length - idx - 1)}</span>            
        `;
    }

    renderValue() {
        if (this.hideValue) return null;
        const digitCount = Math.log10(this.base ** (this.length - 1)) + 1;
        const value = this.value.toString().padStart(digitCount, '0');
        return html /* html */ `
            <span class="font-large grayed-out">=</span>
            <span class="font-large">${value}</span>
        `;
    }
}
