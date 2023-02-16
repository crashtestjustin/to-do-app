import { createDiv } from "./Domfunctionality.js";

export function createHeader() {
  const header = createDiv("header");

  const headerTitle = document.createElement("h1");
  headerTitle.textContent = "TO DO APP";

  header.appendChild(headerTitle);

  return header;
}
