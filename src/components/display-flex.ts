// Library
import { LitElement, html, css } from "lit";
import { customElement, property } from "lit/decorators.js";

@customElement("display-flex")
export class DisplayFlex extends LitElement {

    @property({ type: String, attribute: "flex-direction", reflect: true })
    direction: "row" | "column" | "row-reverse" | "column-reverse" = "row";

    @property({ type: String, attribute: "justify-contents", reflect: true })
    justify: "flex-start" | "flex-end" | "center" | "space-between" | "space-around" | "space-evenly" = "center";

    @property({ type: String, attribute: "align-items", reflect: true })
    align: "flex-start" | "flex-end" | "center" | "stretch" | "baseline" = "center";

    @property({ type: String, reflect: true })
    gap = "0.5em";

    updated(changedProperties: Map<string, any>) {
        if (changedProperties.has("direction")) {
            this.style.flexDirection = this.direction;
        }
        if (changedProperties.has("justify")) {
            this.style.justifyContent = this.justify;
        }
        if (changedProperties.has("align")) {
            this.style.alignItems = this.align;
        }
        if (changedProperties.has("gap")) {
            this.style.gap = this.gap;
        }
    }

    static styles = css /* css */ `
        :host {
            display: flex;
        }
    `;

    render() {
        return html /* html */ `
           <slot></slot>
        `;
    };
}
