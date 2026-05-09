// Library
import { LitElement, html, css } from "lit";
import { customElement, property } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";

@customElement("bit-cell")
export class BitCell extends LitElement {

    /** The value of the bit, either 0 or 1. */
    @property({ type: Number, reflect: true })
    value = 0;

    /** Whether the bit cell is interactive and can be flipped. */
    @property({ type: Boolean, reflect: true })
    interactive = false;

    /** Flips the value of the bit between 0 and 1. */
    flip() {
        if (this.interactive) {
            this.value = this.value === 0 ? 1 : 0;
        }
    }

    /** Styles for the bit cell. */
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
        
        .interactive {
            cursor: pointer;
        }
    `;

    /** Renders the bit cell with its value. */
    render() {
        const classes = {
            bit: true,
            interactive: this.interactive,
        };

        return html /* html */ `
        <span
            class="${classMap(classes)}"
            data-value="${this.value}"
            @click=${this.flip}
        >
            ${this.value}
        </span>
        `;
    };
}
