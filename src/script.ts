// Components
import "./components/bit-cell.ts";
import "./components/expanded-number.ts";
import "./components/svg-switch.ts";
import "./components/number-counter.ts";

// Modules
import "./modules/sidebar.ts"
import "./modules/intersection-observer.ts"

// Theme
import "./modules/theme.ts";

// Type Definitions
import type { BitCell } from "./components/bit-cell.ts";
import type { ExpandedNumber } from "./components/expanded-number.ts";

/** The collection of bit cells that are part of a sync group, allowing them to flip together when one is clicked. */
const syncBits = document.querySelectorAll<BitCell>("section.showcase bit-cell[data-sync-group], section.showcase svg-switch[data-sync-group]");

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

/** The collection of expanded numbers that are part of a sync group, allowing them to update together when one is changed. */
const syncNumbers = document.querySelectorAll<ExpandedNumber>("section.showcase expanded-number[data-sync-group]");

// Add value-changed event listeners to each sync number to update all numbers in the same sync group when one is changed.
syncNumbers.forEach(number => number?.addEventListener("value-changed", () => {
    const targetSyncGroup = number.getAttribute("data-sync-group");
    if (!targetSyncGroup) return;
    syncNumbers.forEach(n => {
        if (n.getAttribute("data-sync-group") === targetSyncGroup) {
            n.value = number.value;
        }
    });
}));
