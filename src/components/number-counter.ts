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

    increment = () => this.value += 1;

    decrement = () => this.value -= 1;

    static styles = [
        flex,
        css /* css */ `
        .counter-container {
            display: grid;
            place-items: center;
            margin-block: 2rem;
            font-family: var(--font-family-code);
        }
    `];

    render() {
        return html /* html */ `
            <div class="counter-container">
                <div class="flex flex-column">
                    <expanded-number .value=${this.value} .base=${this.base} length="0" show-breakdown noninteractive></expanded-number>
                    <div class="flex flex-row" style="gap: 0.5rem;">
                        <button @click=${this.increment}> +1</button>
                        <button @click=${this.decrement}> -1</button>
                    </div>
                </div>
            </div>
        `;
    }

}
