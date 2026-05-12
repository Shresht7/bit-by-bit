/** The list of topic sections on the page */
const sections = Array.from(document.querySelectorAll<HTMLElement>("section.topic"));

/**
 * Sets the "active" class on the navigation link corresponding to the given section `id`, and removes it from all other links.
 * @param activeId The `id` of the section to set as `"active"`
 */
function setActiveLink(activeId: string) {
    document.querySelectorAll<HTMLAnchorElement>("nav a[href]").forEach(link => {
        link.classList.toggle("active", link.getAttribute("href")?.endsWith(activeId) ?? false);
    });
}

/**
 * Gets the height offset from the top of the document accounting for the header, 
 * @param extraPadding Extra padding to apply to the height offset
 * @returns The height offset from the top of the document accounting for the header
 */
function getHeaderHeight(extraPadding: number = 8) {
    return (document.querySelector("header")?.offsetHeight ?? 0) + extraPadding;
}

/** 
 * Picks the section nearest to the top of the viewport and sets the corresponding nav link as active.
 * If two sections are equally near, the one that is currently on screen is preferred over the one that is off screen.
 */
function pickNearsetSection() {
    if (sections.length === 0) return; // No sections to observe, so do nothing.



    // Calculate the vertical position to compare against the sections,
    // which is the height of the header from the top of the viewport + some extra breathing room (8px padding)
    const top = getHeaderHeight();

    /** The section nearest to the top of the viewport, along with its distance from the top of the viewport. */
    let nearestSection: { element: HTMLElement; distance: number; isOnScreen: boolean; } | null = null;

    // Iterate through each section to find the one nearest to the top of the viewport.
    for (const section of sections) {
        if (!section.id) continue; // Skip sections without an id, since we won't be able to link to them in the nav anyway.

        const rect = section.getBoundingClientRect();

        /** Whether the section is currently on screen at all (i.e. any part of it is within the viewport) */
        const isOnScreen = rect.bottom > top && rect.top < window.innerHeight;

        // Calculate the distance from the top of the viewport to the section
        const distance = Math.abs(rect.top - top);

        // Update the nearestSection if this section is closer to the top of the viewport than the current nearestSection,
        // or if it's equally close but is currently on screen while the current nearestSection is not.
        if (!nearestSection || distance < nearestSection.distance || (distance === nearestSection.distance && isOnScreen && !nearestSection.isOnScreen)) {
            nearestSection = { element: section, distance, isOnScreen: isOnScreen };
        }
    }

    // If we found a nearest section, set the corresponding nav link as active.
    if (nearestSection) {
        setActiveLink(nearestSection.element.id);
    }
}

// Create an IntersectionObserver to call pickNearestSection whenever the visibility of the sections changes,
// using a range of thresholds to ensure we catch when sections become partially visible.
const observer = new IntersectionObserver(() => pickNearsetSection(), {
    threshold: [0, 0.1, 0.25, 0.5, 0.75, 1],
    rootMargin: `-${getHeaderHeight()}px 0px 0px 0px` // Account for the header height so that sections are considered "visible" when they are just below the header.
});
sections.forEach(section => observer.observe(section));

// Also call pickNearestSection on page load to set the initial active nav link.
pickNearsetSection();
