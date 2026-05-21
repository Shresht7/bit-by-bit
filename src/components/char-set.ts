// Library
import { LitElement, html, css } from "lit";
import { customElement, property } from "lit/decorators.js";
import { binary, decimal, hexadecimal, octal, base, type CHARSET, base32, base64 } from "../library/charset";
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
            case "base32":
                return base32;
            case "base64":
                return base64;
        }
    }

    determineBase() {
        return base(this.name);
    }

    static styles = css /* css */ `
        :host {
            display: flex;
            flex-direction: row;
            justify-content: flex-start;
            align-items: center;
            flex-wrap: wrap;
            gap: 0.5rem;
            font-family: var(--font-family-code);
        }

        .symbols {
            padding: 0.25em 0.5em;
            font-family: var(--font-family-code);
            font-size: 0.875rem;
            font-weight: bold;
            color: var(--color-text);
            background-color: var(--color-background);
            border: 2px solid var(--color-text);
            border-radius: 4px;
            user-select: none;
        }
    `;

    render() {
        return html /* html */`
            ${map(this.getCharsetSymbols(), symbol => html /* html */`
                <span class="symbols">${symbol}</span>
            `)}
        `;
    }
}
