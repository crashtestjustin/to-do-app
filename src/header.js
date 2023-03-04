import { createDiv, expandAll } from "./Domfunctionality.js";

export function createHeader() {
  const header = createDiv("header");

  const headerTitle = document.createElement("h1");
  headerTitle.textContent = "TO DO APP";

  const expandAllButton = document.createElement("button");
  expandAllButton.classList = "expand-all";
  expandAllButton.textContent = "Expand All";
  expandAllButton.addEventListener("click", (e) => {
    expandAll();
  });

  header.appendChild(headerTitle);
  header.appendChild(expandAllButton);

  return header;
}
