// Library
import { svg } from "lit";
import { customElement } from "lit/decorators.js";
import { LogicGate } from "./logic-gate";

@customElement("nand-gate")
export class NandGate extends LogicGate {

    performLogic() {
        return this.inputs.reduce((acc, curr) => acc & curr, 1) ^ 1;
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
