// Library
import { LitElement, html, css, type TemplateResult } from "lit";
import { property, queryAll } from "lit/decorators.js";

import type { BitCell, BitUpdateEvent } from "../bit-cell";

export abstract class LogicGate extends LitElement {

    @property({ type: Number, reflect: true })
    inputA = 0;

    @property({ type: Number, reflect: true })
    inputB = -1;

    get output(): number {
        return this.performLogic();
    }

    protected abstract performLogic(): number;

    @queryAll("bit-cell")
    inputCells!: NodeListOf<BitCell>;

    handleBitUpdate(event: BitUpdateEvent) {
        const target = event.target as BitCell;
        if (target === this.inputCells[0]) {
            this.inputA = target.value;
        } else if (target === this.inputCells[1]) {
            this.inputB = target.value;
        }
        this.requestUpdate();
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
                    <bit-cell .value=${this.inputA} interactive></bit-cell>
                    ${this.inputB >= 0 ? html`<bit-cell .value=${this.inputB} interactive></bit-cell>` : ""}
                </div>
                
                <div class="inputs">
                    <div class="wire"></div>
                    ${this.inputB >= 0 ? html`<div class="wire"></div>` : ""}
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

    protected abstract renderSvg(): TemplateResult;

}
