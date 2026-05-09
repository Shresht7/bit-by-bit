// Library
import { LitElement, html, css } from "lit";
import { customElement, property } from "lit/decorators.js";

@customElement("bit-cell")
export class BitCell extends LitElement {
    @property({ type: Number, reflect: true }) value = 0;

    static styles = css /* css */ `
       .bit {
            padding: 0.25em 0.5em;
            font-family: var(--font-family-bits);
            font-size: 1.25rem;
            font-weight: bold;
            color: var(--color-text);
            background-color: var(--color-background);
            border: 2px solid var(--color-text);
            border-radius: 0.25em;            
        }
    `;

    render() {
        return html /* html */ `
        <span class="bit">${this.value}</span>
        `;
    };
}
