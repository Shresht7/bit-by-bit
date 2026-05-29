import { LitElement, html, css } from "lit";
import { property, queryAll } from "lit/decorators.js";

import type { BitCell, BitUpdateEvent } from "../bit-cell";

export abstract class LogicGate extends LitElement {

    @property({ type: Array, reflect: true })
    inputs: number[] = [];

    get output(): number {
        return this.performLogic();
    }

    protected abstract performLogic(): number;

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
            place-content: center;
        }

        .gate {
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
            <div class="gate">
                
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

    protected abstract renderSvg(): string;

}
