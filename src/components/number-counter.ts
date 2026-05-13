// Library
import { html, css, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";
import { flex } from "../styles/lit.styles";

@customElement("number-counter")
export class NumberCounter extends LitElement {

    @property({ type: Number, reflect: true })
    value = 0;

    @property({ type: Number, reflect: true })
    base = 2;

    increment() {
        if (this.value === Number.MAX_SAFE_INTEGER) return;
        this.value += 1;
    }

    decrement() {
        if (this.value === 0) return;
        this.value -= 1;
    }

    static styles = [
        flex,
        css /* css */ `
        .counter-container {
            display: grid;
            place-items: center;
            margin-block: 2rem;
            font-family: var(--font-family-code);
        }

        button {
            width: 100%;
            padding: 0.25rem 0.5rem;
            font-family: var(--font-family-code);
            border-radius: 2px;
            border: 1px solid var(--color-background);
            cursor: pointer;

            &:hover {
                background-color: color-mix(in srgb, var(--color-background) 50%, var(--color-text) 50%);
                outline: 1px solid var(--color-text);
                outline-offset: 2px;
            }
        }
    `];

    render() {
        return html /* html */ `
            <div class="counter-container">
                <div class="flex flex-row" style="gap: 3rem;">
                    <expanded-number .value=${this.value} .base=${this.base} length="0" show-breakdown noninteractive></expanded-number>
                    <div class="flex flex-column" style="gap: 0.5rem;">
                        <button @click=${this.increment} ?disabled=${this.value === Number.MAX_SAFE_INTEGER}>
                            Count Up
                        </button>
                        <button @click=${this.decrement} ?disabled=${this.value === 0}>
                            Count Down
                        </button>
                    </div>
                </div>
            </div>
        `;
    }

}
