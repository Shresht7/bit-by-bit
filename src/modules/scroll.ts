document.querySelectorAll("section.topic h2, section.topic h3").forEach((heading) => {
    const nearestSection = heading.closest("section.topic");
    if (nearestSection) {
        const sectionId = nearestSection.getAttribute("id");
        if (sectionId) {
            heading.addEventListener("click", () => {
                const offset = heading.tagName === "H2" ? 0 : 60; // Adjust offset based on heading level
                const yPos = nearestSection.getBoundingClientRect().top + window.scrollY - offset; // Adjust for any fixed header
                window.scrollTo({ top: yPos, behavior: "smooth" })
            });
        }
    }
});
