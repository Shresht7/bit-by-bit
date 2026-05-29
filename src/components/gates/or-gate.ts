// Library
import { LitElement, html, css, svg } from "lit";
import { customElement, property, queryAll, state } from "lit/decorators.js";

import type { BitCell } from "../bit-cell";

@customElement("or-gate")
export class OrGate extends LitElement {
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
        this.output = this.inputs.reduce((acc, curr) => acc | curr, 0);
    }

    @queryAll("bit-cell")
    inputCells!: NodeListOf<BitCell>;

    handleBitUpdate(event: CustomEvent) {
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

        .or-gate {
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
        <div class="or-gate">
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
        <svg width="100%" height="100%" viewBox="-1 -1 66 66" xmlns="http://www.w3.org/2000/svg">

            <style>
                .outline {
                    fill: none;
                    stroke: black;
                    stroke-width: 2;
                }
            
                .label {
                    font-family: var(--font-family-code, monospace);
                    font-size: 16px;
                    fill: black;
                    text-anchor: middle;
                    dominant-baseline: middle;
                }
            </style>
            
            <path class="outline" d="
                M 0,8
                C 0,8, 8,8, 16,8
                C19.664,8, 32.828,7.593, 43,12
                C55.037,17.215,64,27.664,64,32
                C64,36.094,54.301,46.932,43,52
                C32.217,56.835,19.906,56,16,56
                C8,56,0,56,0,56
                C0,56,15,48,15,32
                C15,16,0,8,0,8" />
            
            <text class="label" x="32" y="32">OR</text>
        </svg>
        `;
    }
}
