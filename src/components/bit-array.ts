// Library
import { LitElement, html } from "lit";
import { customElement, property, queryAll } from "lit/decorators.js";
import { map } from "lit/directives/map.js";

// Styles
import { flex } from "../styles/lit.styles";

// Type Definitions
import type { CSSResult } from "lit";
import type { BitCell } from "./bit-cell";


@customElement("bit-array")
export class BitArray extends LitElement {

    @property({ type: Number, reflect: true })
    value = 0;

    @property({ type: Number, reflect: true })
    base = 2;

    @property({ type: Number, reflect: true })
    length = Math.log10(this.value + 1) / Math.log10(this.base);

    @property({ type: Boolean, reflect: true })
    noninteractive = false;

    @queryAll("bit-cell")
    private bitCells!: NodeListOf<BitCell>;

    updateValue = () => {
        if (this.noninteractive) return;
        let sum = 0;
        this.bitCells.forEach((bitCell, index) => {
            sum += bitCell.value * Math.pow(this.base, this.length - index - 1);
        });
        this.value = sum;
        this.dispatchEvent(new ValueChangedEvent(this.value));
    }

    static styles: CSSResult[] = [flex];

    render() {
        const parts = this.value.toString(this.base).padStart(this.length, '0').split('').map(digit => parseInt(digit, this.base));
        return html /* html */ `
            <div class="flex flex-row" style="gap: 1rem;" @bit-update=${this.updateValue}>
                ${map(parts, part => html /* html */ `
                    <bit-cell
                        .value=${part}
                        .base=${this.base}
                        ?interactive=${!this.noninteractive}
                    ></bit-cell>
                `)}
             </div>
         `;
    }
}

export class ValueChangedEvent extends CustomEvent<{ value: number }> {
    static readonly type = "value-changed";

    constructor(value: number) {
        super(ValueChangedEvent.type, {
            detail: { value },
            bubbles: true,
            composed: true,
        });
    }

    static isValueChangedEvent(event: Event): event is ValueChangedEvent {
        return event.type === ValueChangedEvent.type;
    }
}
