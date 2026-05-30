// Library
import { LitElement, html, css } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { performBooleanOperation, type BooleanOperator } from "../library/booleans";

@customElement("truth-table")
export class TruthTable extends LitElement {

    @property({ type: Array })
    inputs: number[][] = [[0, 0], [0, 1], [1, 0], [1, 1]];

    @property({ type: String })
    for: BooleanOperator = "AND";

    @state()
    private outputData: number[] = [];

    connectedCallback(): void {
        super.connectedCallback();
        if (this.for === "NOT") {
            this.inputs = [[0], [1]];
        }
    }

    update(changedProperties: Map<string, any>) {
        super.update(changedProperties);
        if (changedProperties.has("inputs") || changedProperties.has("for")) {
            this.generateTableData();
        }
    }

    private generateTableData() {
        this.outputData = this.inputs.map(input => {
            const [operand1, operand2] = input;
            return performBooleanOperation(operand1, this.for, operand2);
        })
    }

    static styles = css /* css */`
    table {
        width: 100%;
        border-collapse: collapse;
        font-family: var(--font-family-code);
        background-color: color-mix(in srgb, var(--color-text) 4%, var(--color-background));

        th,
        td {
            padding: 0.75rem 1rem;
            text-align: center;
            border: 1px solid color-mix(in srgb, var(--color-text) 15%, transparent);
        }

        th {
            font-weight: bold;
            background-color: color-mix(in srgb, var(--color-text) 8%, var(--color-background));
        }
    }
    `;

    render() {
        return html /* html */`
            <table class="truth-table">

                <thead>
                    <tr>
                        <th>A</th>
                        ${this.for !== "NOT" ? html /* html */`<th>B</th>` : null}
                        <th>${this.renderOutputHeader()}</th>
                    </tr>
                </thead>

                <tbody>
                    ${this.inputs.map((input, rowIndex) => html /* html */`
                        <tr>
                            ${input.map(value => html /* html */`<td>${value}</td>`)}
                            <td>${this.outputData[rowIndex]}</td>
                        </tr>
                    `)}
                </tbody>

            </table>
        `;
    }

    renderOutputHeader(): string {
        if (this.for === "NOT") {
            return `NOT A`;
        }
        return `A ${this.for} B`;
    }
}
