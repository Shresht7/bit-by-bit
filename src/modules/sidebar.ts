const sidebar = document.querySelector("#sidebar nav ul") as HTMLUListElement;

document.querySelectorAll("section.topic").forEach((section, idx) => {
    const sectionId = section.getAttribute("id");
    const sectionTitle = section.querySelector("h2")?.textContent || "Untitled Section";
    if (sectionId) {
        const listItem = document.createElement("li");

        const link = document.createElement("a");
        link.href = `#${sectionId}`;
        const sectionNumber = (idx + 1).toString(2).padStart(3, "0");
        link.textContent = `${sectionNumber}. ${sectionTitle}`;

        listItem.appendChild(link);
        sidebar.appendChild(listItem);
    }
});
