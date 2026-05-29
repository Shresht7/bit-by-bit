// Library
import { LitElement, html, css, svg } from "lit";
import { customElement, property, queryAll, state } from "lit/decorators.js";
import type { BitCell, BitUpdateEvent } from "../bit-cell";

@customElement("nand-gate")
export class NandGate extends LitElement {

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
        this.output = this.inputs.reduce((acc, curr) => acc & curr, 1) ^ 1;
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

        .nand-gate {
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
            <div class="nand-gate">
                <div class="inputs" @bit-update=${this.handleBitUpdate}>
                    <bit-cell .value=${this.inputs[0]} interactive></bit-cell>
                    <bit-cell .value=${this.inputs[1]} interactive></bit-cell>
                </div>
                <div class="inputs">
                    <div class="wire"></div>
                    <div class="wire"></div>
                </div>

                <div class="symbol">
                    ${this.renderSvg()}
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

    renderSvg() {
        return svg /* svg */`
            <svg width="100%" height="100%" viewBox="0 0 66 66" xmlns="http://www.w3.org/2000/svg">

                <style>
                    .outline {
                        fill: none;
                        stroke: black;
                        stroke-width: 2px;
                    }
                
                    .label {
                        font-family: var(--font-family-code, monospace);
                        font-size: 16px;
                        fill: black;
                        text-anchor: middle;
                        dominant-baseline: middle;
                    }
                </style>
                
                <defs>
                    <mask id="nand-hole-punch">
                        <rect width="64" height="64" fill="white" />
                        <circle cx="59" cy="32" r="5" fill="black" />
                    </mask>
                </defs>
                
                <path class="outline" d="M0,8 L32,8 C44,8, 55,16, 55,32 C55,48, 44,56, 32,56 L0,56 Z" mask="url(#nand-hole-punch)" />
                
                <circle class="outline" cx="59" cy="32" r="5" />
                
                <text class="label" x="25" y="33">NAND</text>
            </svg>
        `;
    }
}
