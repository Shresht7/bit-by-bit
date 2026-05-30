// Components
import "./components/bit-cell.ts";
import "./components/bit-array.ts";
import "./components/expanded-number.ts";
import "./components/svg-switch.ts";
import "./components/number-counter.ts";
import "./components/binary-operation.ts";
import "./components/bitwise-not.ts";
import "./components/bitwise-shift.ts";
import "./components/number-input.ts";
import "./components/bit-rebase.ts";
import "./components/char-set.ts";
import "./components/gates/index.ts";

// Modules
import "./modules/scroll.ts"
import "./modules/sidebar.ts"
import "./modules/intersection-observer.ts"

// Events
import { ValueChangedEvent } from "./components/bit-array.ts";

// Theme
import "./modules/theme.ts";

// Type Definitions
import type { BitCell } from "./components/bit-cell.ts";
import type { ExpandedNumber } from "./components/expanded-number.ts";

/** The collection of bit cells that are part of a sync group, allowing them to sync together when one is clicked. */
const syncBits = document.querySelectorAll<BitCell>("section.showcase bit-cell[data-sync-group], section.showcase svg-switch[data-sync-group]");

function toggleBitValue(value: number) {
    return value === 0 ? 1 : 0;
}

// Add click event listeners to each sync bit to update all bits in the same sync group when one is clicked.
syncBits.forEach(bit => bit?.addEventListener("click", () => {
    const targetSyncGroup = bit.getAttribute("data-sync-group");
    if (!targetSyncGroup) return;
    const sourceValue = bit.hasAttribute("data-sync-invert")
        ? toggleBitValue(bit.value)
        : bit.value;

    syncBits.forEach(b => {
        if (b.getAttribute("data-sync-group") === targetSyncGroup) {
            b.value = b.hasAttribute("data-sync-invert")
                ? toggleBitValue(sourceValue)
                : sourceValue;
        }
    });
}));

/** The collection of expanded numbers that are part of a sync group, allowing them to update together when one is changed. */
const syncNumbers = document.querySelectorAll<ExpandedNumber>("section.showcase expanded-number[data-sync-group]");

// Add value-changed event listeners to each sync number to update all numbers in the same sync group when one is changed.
syncNumbers.forEach(number => number?.addEventListener(ValueChangedEvent.type, () => {
    const targetSyncGroup = number.getAttribute("data-sync-group");
    if (!targetSyncGroup) return;
    syncNumbers.forEach(n => {
        if (n.getAttribute("data-sync-group") === targetSyncGroup) {
            n.value = number.value;
        }
    });
}));
