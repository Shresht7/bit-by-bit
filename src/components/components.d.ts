import type { BitCell } from "./bit-cell";
import type { ExpandedNumber } from "./expanded-number";

declare global {
    interface HTMLElementTagNameMap {
        "bit-cell": BitCell;
        "expanded-number": ExpandedNumber;
    }
}
