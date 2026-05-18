// Library
import { html, css, CSSResult } from "lit";
import { customElement, property } from "lit/decorators.js";
import { map } from "lit/directives/map.js";

// Components
import { BitArray } from "./bit-array";

@customElement("expanded-number")
export class ExpandedNumber extends BitArray {

    @property({ type: Boolean, attribute: 'show-breakdown', reflect: true })
    showBreakdown = false;

    @property({ type: Boolean, attribute: 'hide-value', reflect: true })
    hideValue = false;

    @property({ type: Boolean, attribute: 'show-significant-bits', reflect: true })
    showSignificantBits = false;

    @property({ type: Boolean, attribute: 'show-bit-width', reflect: true })
    showBitWidth = false;

    static styles: CSSResult[] = [...super.styles, css /* css */ `
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

        .bit-width {
            width: 100%;
            font-family: var(--font-family-code);
            font-size: 1.25rem;
            text-align: center;
            position: relative;
            background-color: var(--color-background);
            z-index: 1;

            &::before, &::after {
                content: "";
                position: absolute;
                top: 50%;
                transform: translateY(-50%);
                width: 40%;
                height: 2px;
                background-color: var(--color-subdued);
                z-index: -1;
            }

            &::before {
                left: 0;
            }

            &::after {
                right: 0;
            }
        }
    `];


    render() {
        const parts = this.value.toString(this.base).padStart(this.length, '0').split('').map(digit => parseInt(digit, this.base));

        return html /* html */ `
            <div class="flex flex-row" style="gap: 1.5rem;" @bit-update=${this.updateValue}>
                <div class="flex flex-column">
                    ${this.renderBitWidth()}
                    <div class="flex flex-row">
                        ${map(parts, (part, idx) => html /* html */ `
                            <div class="flex flex-column">
                                <bit-cell .value=${part} .base=${this.base} ?interactive=${!this.noninteractive}></bit-cell>
                                ${this.renderBreakdown(part, idx, parts.length)}
                            </div>
                        `)}
                    </div>
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
            ${this.renderSignificantBits(idx, length)}
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

    renderBitWidth() {
        if (!this.showBitWidth) return null;

        const bitWidth = this.value.toString(2).length

        return html /* html */ `
            <div class="bit-width">${bitWidth}-bit</div>
        `;
    }

    renderSignificantBits(idx: number, length: number) {
        if (!this.showSignificantBits) return null;
        const isMostSignificantBit = idx === 0;
        const isLeastSignificantBit = idx === length - 1;
        if (isMostSignificantBit) {
            return html /* html */ `<span>[MSB]</span>`;
        } else if (isLeastSignificantBit) {
            return html /* html */ `<span>[LSB]</span>`;
        } else {
            return html /* html */ `<span>&nbsp;</span>`;
        }
    }
}
