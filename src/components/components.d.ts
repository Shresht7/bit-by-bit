import type { DisplayFlex } from "./display-flex";
import type { BitCell } from "./bit-cell";
import type { ExpandedNumber } from "./expanded-number";

declare global {
    interface HTMLElementTagNameMap {
        "display-flex": DisplayFlex;
        "bit-cell": BitCell;
        "expanded-number": ExpandedNumber;
    }
}
