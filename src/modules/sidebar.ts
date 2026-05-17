// Library 
import { outline, type OutlineEntry } from "./outline";

const sidebar = document.querySelector("#sidebar nav") as HTMLElement;

function createOutlineList(entries: OutlineEntry[]) {
    const list = document.createElement("ul");

    const padLength = entries.length.toString(2).length; // Calculate the number of bits needed to represent the number of entries, for padding the binary index
    for (let i = 0; i < entries.length; i++) {
        const listItem = createOutlineListItem(i, entries[i], padLength);
        list.appendChild(listItem);
    }

    return list;
}

function createOutlineListItem(index: number, entry: OutlineEntry, padLength: number = 4): HTMLLIElement {
    const listItem = document.createElement("li");
    listItem.setAttribute("data-level", entry.level.toString());

    const link = document.createElement("a");
    link.href = `#${entry.id}`;
    link.textContent = entry.title || entry.id || "Untitled Section";

    const span = document.createElement("span");
    span.textContent = entry.level === 2
        ? index.toString(2).padStart(padLength, "0") + "::"
        : "\\\\ "
    span.classList.add("color-subdued");
    link.prepend(span);

    listItem.appendChild(link);

    if (entry.children.length > 0) {
        const childList = createOutlineList(entry.children);
        listItem.appendChild(childList);
    }

    return listItem;
}

sidebar.replaceChildren(createOutlineList(outline.entries));
