// Library
import { LitElement, html, css } from "lit";
import { customElement, property } from "lit/decorators.js";
import { map } from "lit/directives/map.js";

import { binary, decimal, hexadecimal, octal, base, base32, base64, type CHARSET, } from "../library/charset";

@customElement("char-set")
export class CharSet extends LitElement {

    /** The name of the character set to display (e.g., "binary", "decimal", "octal", "hexadecimal", "base32", "base64"). */
    @property({ type: String, reflect: true })
    name: CHARSET = "binary";

    /** Retrieves the set of symbols corresponding to the specified character set name. */
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

    /** @returns the base's numeric value corresponding to the character set */
    determineBase(): number {
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
