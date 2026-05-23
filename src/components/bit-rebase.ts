// Library
import { html, css, type PropertyValues } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { map } from "lit/directives/map.js";

import { BitArray } from "./bit-array";

@customElement("bit-rebase")
export class BitRebase extends BitArray {

    /** The base to rebase the binary value into (e.g., 8 for octal, 16 for hexadecimal). */
    @property({ type: Number, reflect: true })
    rebase = 8;

    /** The chunk size is determined by the rebase value (e.g., 3 for octal, 4 for hexadecimal) to group bits accordingly. */
    @state()
    chunk = 3;

    /** Determines the chunk size based on the rebase value.
     * For example, if rebase is 8, chunk size will be 3 (since 2^3 = 8).
     * If rebase is 16, chunk size will be 4 (since 2^4 = 16).*/
    determineChunkSize() {
        let size = 1;
        while (Math.pow(2, size) < this.rebase) {
            size += 1;
        }
        this.chunk = size;
    }

    /** Ensures that length is always a multiple of chunk size for proper padding */
    ensureLengthPadding() {
        if (this.length % this.chunk !== 0) {
            this.length += this.chunk - (this.length % this.chunk);
        }
    }

    updated(changedProperties: PropertyValues) {
        super.updated(changedProperties);

        // If the base or value changes, we need to recalculate the length and chunk size
        if (changedProperties.has("base") || changedProperties.has("value")) {
            this.length = Math.ceil(Math.log(this.value + 1) / Math.log(this.base));
            this.determineChunkSize();
        }
        if (changedProperties.has("length") || changedProperties.has("chunk")) {
            this.ensureLengthPadding();
        }
    }

    static styles = [...super.styles, css /* css */ `
        .separator {
            width: 100%;
            height: 1px;
            background-color: var(--separator-color, #ccc);
        }

        .font-large {
            font-size: 2rem;
            font-weight: bold;
        }

        .grayed-out {
            opacity: 0.25;
        }

        .value {
            font-family: var(--font-family-code);
            font-size: 2rem;
            font-weight: bold;
        }

        [data-base]::before {
            font-family: var(--font-family-code);
            margin-right: 0.1rem;
            font-size: 0.8rem;
            color: var(--color-subdued);
        }

        [data-base="2"]::before {
            content: "0b";
        }

        [data-base="8"]::before {
            content: "0o";
        }

        [data-base="16"]::before {
            content: "0x";
        }
    `];

    render() {
        const parts = this.value.toString(this.base).padStart(this.length, '0').split('').map(digit => parseInt(digit, this.base));

        let chunkedParts = [];
        for (let i = parts.length; i >= 0; i -= this.chunk) {
            chunkedParts.push(parts.slice(i - this.chunk, i));
        }
        chunkedParts = chunkedParts.reverse().filter(chunk => chunk.length > 0);

        const rebasedValue = this.value.toString(this.rebase).toUpperCase();

        return html /* html */ `
            <div class="flex flex-row" style="gap: 1.5rem;">
                <div class="flex flex-row" style="gap: 3rem;">
                    ${map(chunkedParts, chunk => this.renderChunk(chunk))}
                </div>
                <div class="font-large grayed-out">=</div>
                <div class="value" data-base=${this.rebase}>${rebasedValue}</div>
                <div class="font-large grayed-out">=</div>
                <div class="value">${this.value}</div>
            </div>
        `;
    }

    /** Renders a chunk of bits along with its decimal and rebased values. */
    renderChunk(chunk: number[]) {

        // Determine the value of this chunk of bits in the given base and in the decimal system
        const val = parseInt(chunk.join(''), 2).toString(this.rebase).toUpperCase();
        const dec = parseInt(chunk.join(''), 2).toString(10);

        return html /* html */ `
            <div class="flex flex-column">

                <div class="flex flex-row">
                    ${map(chunk, part => html /* html */ `
                        <bit-cell
                            .value=${part}
                            ?interactive=${!this.noninteractive}
                        ></bit-cell>   
                    `)}
                </div>
    
                <div class="separator"></div>
    
                <div class="value">${dec}</div>
    
                <div class="flex flex-row">
                    <bit-cell
                    .value=${val}
                    .base=${this.rebase}
                    ?interactive=${!this.noninteractive}
                    ></bit-cell>
                </div>
    
            </div>
        `;
    }
}
