// Components
import "./components/display-flex.ts";
import "./components/bit-cell.ts";
import "./components/expanded-number.ts";

// Type Definitions
import type { BitCell } from "./components/bit-cell.ts";

/** The collection of bit cells that are part of a sync group, allowing them to flip together when one is clicked. */
const syncBits = document.querySelectorAll<BitCell>("section.showcase bit-cell[data-sync-group]");

// Add click event listeners to each sync bit to flip all bits in the same sync group when one is clicked.
syncBits.forEach(bit => bit?.addEventListener("click", () => {
    const targetSyncGroup = bit.getAttribute("data-sync-group");
    if (!targetSyncGroup) return;
    syncBits.forEach(b => {
        if (b.getAttribute("data-sync-group") === targetSyncGroup) {
            b.value = b.value === 0 ? 1 : 0;
        }
    });
}));
