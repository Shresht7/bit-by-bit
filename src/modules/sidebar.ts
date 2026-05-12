const sidebar = document.querySelector("#sidebar nav ul") as HTMLUListElement;

document.querySelectorAll("section.topic").forEach((section, idx) => {
    const sectionId = section.getAttribute("id");
    const sectionTitle = section.querySelector("h2")?.textContent || "Untitled Section";
    if (sectionId) {
        const listItem = document.createElement("li");

        const link = document.createElement("a");
        link.href = `#${sectionId}`;

        const span = document.createElement("span");
        span.textContent = (idx + 1).toString(2).padStart(3, "0") + "::";
        span.classList.add("color-subdued");
        link.appendChild(span);
        const title = document.createTextNode(sectionTitle);
        link.appendChild(title);

        listItem.appendChild(link);
        sidebar.appendChild(listItem);
    }

    // Add click listener to the entire section to navigate to it when clicked
    section.addEventListener("click", () => {
        window.location.replace(`#${sectionId}`);
    });
});
