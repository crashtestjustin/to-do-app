//generate folder views when clicking on the folder buttons

import { createDiv } from "./Domfunctionality";

function FolderViewContent(e) {
  const selectedButton = e.target.closest("button");
  const section = createDiv(selectedButton.textContent);

  //instead of text content I need to loop through all todo items and todo wrappers and show/hide
  //based on the multi-select items selected in the description (or do I look at the object array???)
  //don't forget to apply this upon folder multiselect updates as well
  section.textContent = `${selectedButton.textContent} button selected`;

  return section;
}

export function renderFolderView(e) {
  const toDoSection = document.querySelector(".to-do-list");
  //probably don't need to clear the page if I am modifying the visibility of items above
  toDoSection.textContent = "";

  toDoSection.appendChild(FolderViewContent(e));
}
