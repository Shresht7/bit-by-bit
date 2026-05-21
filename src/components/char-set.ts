// Library
import { LitElement, html, css } from "lit";
import { customElement, property } from "lit/decorators.js";
import { binary, decimal, hexadecimal, octal, base, type CHARSET } from "../library/charset";
import { map } from "lit/directives/map.js";

@customElement("char-set")
export class CharSet extends LitElement {

    @property({ type: String, reflect: true })
    name: CHARSET = "binary";

    getCharsetSymbols(): Set<number | string> {
        switch (this.name) {
            case "binary":
                return binary;
            case "decimal":
                return decimal;
            case "octal":
                return octal;
            case "hexadecimal":
                return hexadecimal;
        }
    }

    determineBase() {
        return base(this.name);
    }

    static styles = css /* css */ `
        :host {
            display: inline-flex;
            gap: 1rem;
            font-family: var(--font-family-code);
        }

        .symbols {
            padding: 0.25em 0.5em;
            font-family: var(--font-family-code);
            font-size: 1.25rem;
            font-weight: bold;
            color: var(--color-text);
            background-color: var(--color-background);
            border: 2px solid var(--color-text);
            border-radius: 4px;
            user-select: none;
        }
    `;

    render() {
        console.log(this.getCharsetSymbols())
        return html /* html */`
            ${map(this.getCharsetSymbols(), symbol => html /* html */`
                <span class="symbols">${symbol}</span>
            `)}
        `;
    }
}
