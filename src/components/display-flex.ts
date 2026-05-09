// Library
import { LitElement, html, css } from "lit";
import { customElement, property } from "lit/decorators.js";

@customElement("display-flex")
export class DisplayFlex extends LitElement {

    @property({ type: String, attribute: "flex-direction", reflect: true })
    flexDirection: "row" | "column" | "row-reverse" | "column-reverse" = "row";

    @property({ type: String, attribute: "justify-contents", reflect: true })
    justifyContents: "flex-start" | "flex-end" | "center" | "space-between" | "space-around" | "space-evenly" = "center";

    @property({ type: String, attribute: "align-items", reflect: true })
    alignItems: "flex-start" | "flex-end" | "center" | "stretch" | "baseline" = "center";

    @property({ type: String, reflect: true })
    gap = "0.5em";

    updated(changedProperties: Map<string, any>) {
        if (changedProperties.has("flexDirection")) {
            this.style.flexDirection = this.flexDirection;
        }
        if (changedProperties.has("justifyContents")) {
            this.style.justifyContent = this.justifyContents;
        }
        if (changedProperties.has("alignItems")) {
            this.style.alignItems = this.alignItems;
        }
        if (changedProperties.has("gap")) {
            this.style.gap = this.gap;
        }
    }

    static styles = css /* css */ `
        :host {
            display: flex;
            flex-direction: var(--flex-direction, row);
            justify-content: var(--justify-contents, center);
            align-items: var(--align-items, center)
            gap: var(--gap, 0.5em);
        }
    `;

    render() {
        return html /* html */ `
           <slot></slot>
        `;
    };
}
