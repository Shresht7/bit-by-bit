// Library
import { svg } from "lit";
import { customElement } from "lit/decorators.js";
import { LogicGate } from "./logic-gate";

@customElement("or-gate")
export class OrGate extends LogicGate {

    performLogic(): number {
        return this.inputs.reduce((acc, curr) => acc | curr, 0);
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
                    alignment-baseline: middle;
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
