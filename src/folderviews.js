//generate folder views when clicking on the folder buttons

import { createDiv } from "./Domfunctionality";

function FolderViewContent(e) {
  const selectedButton = e.target.closest("button");
  const toDoLists = document.querySelector(".all-to-dos");
  const allToDoItems = document.querySelector(".to-do-list");
  const activeToDos = document.querySelectorAll(".to-do-item");
  const descriptionWrappers = document.querySelectorAll(".description-wrapper");
  const descriptions = document.querySelectorAll(".to-do-details");

  if (selectedButton.textContent === "FOLDERS") {
    console.log("do nothing");
    return;
  }
  if (selectedButton.classList.contains("new-folder")) {
    const filteredDiv = createDiv("filtered-div");
    for (let i = 0; i < descriptions.length; i++) {
      const multi = descriptions[i].querySelector("select");
      const options = multi.querySelectorAll("option");

      for (let j = 0; j < options.length; j++) {
        if (
          options[j].selected &&
          options[j].textContent === selectedButton.textContent
        ) {
          filteredDiv.appendChild(activeToDos[i]);
          filteredDiv.appendChild(descriptionWrappers[i]);
          allToDoItems.style.maxHeight = "0";
          allToDoItems.style.visibility = "hidden";
        }
      }
    }
    return filteredDiv;
  }
  if (selectedButton.classList.contains("all-items")) {
    for (let a = 0; a < activeToDos.length; a++) {
      allToDoItems.appendChild(activeToDos[a]);
      allToDoItems.appendChild(descriptionWrappers[a]);
    }
    const removefilter = document.querySelector(".filtered-div");
    toDoLists.removeChild(removefilter);
    allToDoItems.style.removeProperty("max-height");
    allToDoItems.style.removeProperty("visibility");
    return allToDoItems;
  }

  console.log(selectedButton.textContent);
}

export function renderFolderView(e) {
  const toDoLists = document.querySelector(".all-to-dos");
  toDoLists.insertBefore(FolderViewContent(e), toDoLists.firstChild);
}
