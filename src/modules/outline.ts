/** Represents an entry in the document outline */
export type OutlineEntry = {
    id: string;
    title?: string;
    children: OutlineEntry[];
    level: number;
}

/**
 * Represents the document outline, which is a hierarchical representation of the sections in the document
 * based on their heading levels (h1, h2, etc.). The outline is built from the sections in the document
 * and can be used to generate a table of contents or for other navigation purposes.
 */
export class Outline {

    /** The top-level entries in the outline. Other entries are nested within these. */
    private _entries: OutlineEntry[] = [];

    constructor(sections: NodeListOf<HTMLElement>) {
        this.build(sections);
    }

    /** Builds the outline from the given sections in the document. */
    build(sections: NodeListOf<HTMLElement>) {
        /** A stack to keep track of the current hierarchy of sections as we build the outline. */
        const stack: OutlineEntry[] = [];

        // Iterate through each section in the document to build the outline.
        for (const section of sections) {
            const id = section.id;
            if (!id) continue; // Skip sections without an id, since we won't be able to link to them in the nav anyway.

            const heading = section.querySelector("h1, h2, h3, h4, h5, h6");
            const title = heading?.textContent || "Untitled Section";

            const level = parseInt(heading?.tagName.substring(1) || "1"); // Get the number from the tag name (e.g. "h2" -> 2)

            const entry: OutlineEntry = { id, title, children: [], level };

            // Pop entries from the stack until we find one that is a parent of the current entry
            while (stack.length > 0 && stack[stack.length - 1].level >= level) {
                stack.pop();
            }

            if (stack.length === 0) {
                // If the stack is empty, this is a top-level entry
                this._entries.push(entry);
            } else {
                // Otherwise, this is a child of the entry at the top of the stack
                stack[stack.length - 1].children.push(entry);
            }

            // Push the current entry onto the stack
            stack.push(entry);
        }
    }

    get entries(): OutlineEntry[] {
        return this._entries;
    }

    // Allow iterating directly over the Outline to get its entries
    [Symbol.iterator]() {
        return this._entries[Symbol.iterator]();
    }

    get root(): OutlineEntry {
        return {
            id: document.body.getAttribute("id") ?? "root",
            title: document.title,
            children: this._entries,
            level: 0
        };
    }
}

export const outline = new Outline(document.querySelectorAll("section[id].topic"));
