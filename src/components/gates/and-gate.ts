// Library
import { svg } from "lit";
import { customElement } from "lit/decorators.js";
import { LogicGate } from "./logic-gate";

@customElement("and-gate")
export class AndGate extends LogicGate {

    performLogic(): number {
        return this.inputA && this.inputB;
    }

    renderSvg() {
        return svg /* svg */`
            <svg width="100%" height="100%" viewBox="-1 -1 66 66" xmlns="http://www.w3.org/2000/svg" fill="none" version="1.1">

                <style>
                    .outline {
                        stroke: black;
                        stroke-width: 2; /* Path and viewbox calculations account for the stroke-width to be 2px  */
                        fill: none;
                        stroke-linejoin: round;
                    }
                
                    .label {
                        text-anchor: middle;
                        alignment-baseline: middle;
                        font-family: var(--font-family-code, monospace);
                        font-size: 16px;
                        fill: black;
                    }
                </style>
                
                <path
                    class="outline"
                    d=" M 00,08
                        L 40,08
                        C 40,08 64,08 64,32
                        C 64,56 40,56 40,56
                        L 00,56
                        L 00,08 
                        Z
                    "
                />
                
                <text class="label" x="30" y="32">AND</text>
                
            </svg>
        `;
    }
}
