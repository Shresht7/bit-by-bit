// Library
import { LitElement, html, css, svg } from "lit";
import { customElement, property, query, state } from "lit/decorators.js";

import type { BitCell } from "../bit-cell";

@customElement("not-gate")
export class NotGate extends LitElement {

    @property({ type: Number, reflect: true })
    input: number = 0;

    @state()
    output: number = 0;

    updated(changedProperties: Map<string, any>) {
        super.updated(changedProperties);
        if (changedProperties.has("input")) {
            this.performLogic();
        }
    }

    performLogic() {
        this.output = this.input ? 0 : 1;
    }

    @query("bit-cell")
    inputCell!: BitCell;

    handleBitUpdate(event: CustomEvent) {
        const target = event.target as BitCell;
        if (target !== this.inputCell) return;
        this.input = target.value;
        this.performLogic();
    }

    static styles = css /* css */`
        :host {
            height: 100%;
            display: grid;
            place-content: center;
        }

        .not-gate {
            display: flex;
            flex-direction: row;
            align-items: center;
        }

        .wire {
            display: block;
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
            <div class="not-gate">
                <bit-cell .value=${this.input} interactive @bit-update=${this.handleBitUpdate}></bit-cell>
                <div class="wire"></div>
                <div class="symbol">
                    ${this.renderSvg()}
                </div>
                <div class="wire"></div>
                <bit-cell .value=${this.output} readonly></bit-cell>
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
            
            <defs>
                <mask id="not-hole-punch">
                    <rect width="64" height="64" fill="white" />
                    <circle cx="59" cy="32" r="5" fill="black" />
                </mask>
            </defs>
            
            <path class="outline" d="M0,8 L59,32 L0,56 Z" mask="url(#not-hole-punch)" />
            
            <circle class="outline" cx="59" cy="32" r="5" />
            
            <text class="label" x="21" y="33">NOT</text>
        </svg>
        `;
    }

}
