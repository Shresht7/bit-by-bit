// Library
import { svg } from "lit";
import { customElement } from "lit/decorators.js";
import { LogicGate } from "./logic-gate";

@customElement("xor-gate")
export class XorGate extends LogicGate {

    performLogic(): number {
        return this.inputA ^ this.inputB;
    }

    renderSvg() {
        return svg /* svg */`
        <svg width="100%" height="100%" viewBox="-1 -1 66 66" xmlns="http://www.w3.org/2000/svg">

            <style>
                .outline {
                    fill: none;
                    stroke: black;
                    stroke-width: 2;
                    stroke-linejoin: round;
                }
            
                .label {
                    font-family: var(--font-family-code, monospace);
                    font-size: 12px;
                    fill: black;
                    text-anchor: middle;
                    alignment-baseline: middle;
                }
            </style>
            
            <path class="outline" d="M2,10 C2,10, 12,17, 12,32 C12,47, 2,54, 1,55" />
            <path class="outline" d="M4,8 C4,8,8,8,16,8 C19.664,8,32.828,7.593,43,12 C55.037,17.215,64,27.664,64,32 C64,36.094,54.301,46.932,43,52 C32.217,56.835,19.906,56,16,56 C8,56,4,56,4,56 C4,56,15,48,15,32 C15,16,4,8,4,8 Z" />
            <text class="label" x="36" y="33">XOR</text>
        </svg>
        `;
    }
}
