// Library
import { LitElement, html, css } from "lit";
import { customElement, property } from "lit/decorators.js";

@customElement("number-input")
export class NumberInput extends LitElement {

    @property({ type: Number, reflect: true })
    value: number = 0;

    @property({ type: Number, reflect: true })
    min: number = 0;

    @property({ type: Number, reflect: true })
    max: number = 10;

    handleChange(e: Event) {
        const target = e.target as HTMLInputElement;
        const value = Number(target.value);
        if (isNaN(value)) { return }
        this.value = clamp(this.min, value, this.max);
        this.dispatchEvent(new NumberInputEvent(this.value));
    }

    handleWheel(e: WheelEvent) {
        e.preventDefault();
        const delta = -1 * Math.sign(e.deltaY);
        this.value = clamp(this.min, this.value + delta, this.max);
        this.dispatchEvent(new NumberInputEvent(this.value));
    }

    static styles = css /* css */`
        input {
            background-color: var(--color-background);
            border: 1px solid var(--color-subdued);
            border-radius: 2px;
            padding-block: 0.25rem;
            padding-inline: 0.5rem 0.25rem;
            font-size: 1.5rem;
            font-family: var(--font-family-code);
            color: var(--color-text);
        }
    `;

    render() {
        const width = Math.max(this.min.toString().length, this.max.toString().length, 1) + 1;
        return html /* html */`
            <input
                type="number"
                .value=${this.value}
                .min=${this.min}
                .max=${this.max}
                style="width: ${width}ch;"
                @input=${this.handleChange}
                @change=${this.handleChange}
                @mousewheel=${this.handleWheel}
            />
        `;
    }
}

export class NumberInputEvent extends CustomEvent<{ value: number }> {
    static type = "change";

    constructor(value: number) {
        super(NumberInputEvent.type, { detail: { value }, bubbles: true, composed: true });
    }
}

function clamp(min: number, value: number, max: number): number {
    return Math.min(Math.max(value, min), max);
}
