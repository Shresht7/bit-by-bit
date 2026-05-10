// Library
import { html } from "lit";
import { customElement } from "lit/decorators.js";
import { BitCell } from "./bit-cell";

@customElement("svg-switch")
export class SvgSwitch extends BitCell {

    render() {
        const rotation = this.value === 1 ? "rotate(0deg)" : "rotate(-45deg)";
        return html /* html */ `
            <svg viewBox="0 0 100 100" width="100" height="100" @click=${this.flip}>
                <style>
                    .line2 {
                        transform: ${rotation};
                        transform-origin: 20px 50px;
                        transition: transform 0.2s ease-out;
                    }
                </style>
                <line class="line1" x1="0" y1="50" x2="20" y2="50" stroke="var(--color-text)" stroke-width="4" />
                <circle cx="20" cy="50" r="4" fill="var(--color-text)" />
                <line class="line2" x1="20" y1="50" x2="80" y2="50" stroke="var(--color-text)" stroke-width="4" />
                <circle cx="80" cy="50" r="4" fill="var(--color-text)" />
                <line class="line3" x1="80" y1="50" x2="100" y2="50" stroke="var(--color-text)" stroke-width="4" />
            </svg>
        `;
    }
}
