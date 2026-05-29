// Library
import { LitElement, html, css, svg } from "lit";
import { customElement, property, queryAll, state } from "lit/decorators.js";
import type { BitCell, BitUpdateEvent } from "../bit-cell";

@customElement("and-gate")
export class AndGate extends LitElement {

    @property({ type: Array, reflect: true })
    inputs: number[] = [0, 0];

    @state()
    output: number = 0;

    update(changedProperties: Map<string, any>) {
        super.update(changedProperties);
        if (changedProperties.has("inputs")) {
            this.performLogic();
        }
    }

    performLogic() {
        this.output = this.inputs.reduce((acc, curr) => acc & curr, 1);
    }

    @queryAll("bit-cell")
    inputCells!: NodeListOf<BitCell>;

    handleBitUpdate(event: BitUpdateEvent) {
        const target = event.target as BitCell;
        const index = Array.from(this.inputCells).indexOf(target);
        if (index === -1) return;
        this.inputs[index] = target.value;
        this.performLogic();
    }

    static styles = css /* css */`
        :host {
            height: 100%;
            display: grid;
            grid-template-columns: auto auto auto;
            grid-template-rows: auto auto;
            place-content: center;
        }

        .and-gate {
            display: flex;
            flex-direction: row;
            align-items: center;
        }

        .inputs {
            height: 20ch; /* TODO: Do something better than hardcoding this */
            display: flex;
            flex-direction: column;
            justify-content: space-around;
            align-items: center;
            gap: 0.5rem;
        }

        .wire {
            width: 5ch;
            height: 2px;
            background-color: black;
        }

        .symbol {
            width: 20ch;
            height: 20ch;
        }
    `;

    render() {
        return html /* html */`
            <div class="and-gate">
                <div class="inputs" @bit-update=${this.handleBitUpdate}>
                    <bit-cell .value=${this.inputs[0]} interactive></bit-cell>
                    <bit-cell .value=${this.inputs[1]} interactive></bit-cell>
                </div>
                <div class="inputs">
                    <div class="wire"></div>
                    <div class="wire"></div>
                </div>

                <div class="symbol">
                    <svg-andgate></svg-andgate>
                </div>

                <div class="output">
                    <div class="wire"></div>
                </div>

                <div class="output">
                    <bit-cell .value=${this.output} readonly></bit-cell>
                </div>
            </div>
        `;
    }
}

@customElement("svg-andgate")
export class AndGateSVG extends LitElement {

    @property({ type: Number })
    width: number = 64;

    @property({ type: Number })
    height: number = 64;

    @property({ type: Number })
    outlineWidth: number = 2;

    get center() {
        return { x: this.width / 2, y: this.height / 2 };
    }

    get viewBox() {
        const outlineHalfWidth = this.outlineWidth / 2;
        const x1 = -outlineHalfWidth;
        const y1 = -outlineHalfWidth;
        const x2 = this.width + outlineHalfWidth;
        const y2 = this.height + outlineHalfWidth;
        return `${x1} ${y1} ${x2 - x1} ${y2 - y1}`;
    }

    get outlinePath() {
        const padding = this.height / 8;
        const curve = this.width * 5 / 8;
        const midHeight = this.height / 2;

        return [
            `M 0,${padding}`, // Move down to the top-left corner, accounting for padding
            `L ${curve},${padding}`, // Line to the start of the curve on the top edge
            `C ${curve},${padding} ${this.width},${padding} ${this.width},${midHeight}`, // Curve to the middle of the right edge
            `C ${this.width},${this.height - padding} ${curve},${this.height - padding} ${curve},${this.height - padding}`, // Curve to the start of the curve on the bottom edge
            `L 0,${this.height - padding}`, // Line to the bottom-left corner, accounting for padding
            `L 0,${padding}`, // Line back to the top-left corner, closing the path
            `Z` // Close the path. Not really necessary since we already returned to the starting point but might as well be explicit about it
        ].join(" ");
    }

    render() {
        return svg /* svg */`
        <svg width="100%" height="100%" viewBox="${this.viewBox}" xmlns="http://www.w3.org/2000/svg" fill="none" version="1.1">

            <style>
                .outline {
                    stroke: black;
                    stroke-width: ${this.outlineWidth};
                    fill: none;
                }
            
                .label {
                    text-anchor: middle;
                    alignment-baseline: middle;
                    font-family: var(--font-family-code, monospace);
                    font-size: 16px;
                    fill: black;
                }
            </style>
            
            <path class="outline" d=${this.outlinePath} />
            <text class="label" x="${this.center.x - 2}" y="${this.center.y + 1}">AND</text>

        </svg>
        `;
    }
}
