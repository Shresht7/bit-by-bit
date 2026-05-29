// Library
import { svg } from "lit";
import { customElement } from "lit/decorators.js";
import { LogicGate } from "./logic-gate";

@customElement("not-gate")
export class NotGate extends LogicGate {

    performLogic(): number {
        return this.inputs.reduce((acc, curr) => acc & curr, 1) ^ 1;
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
