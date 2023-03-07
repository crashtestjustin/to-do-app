//generate folder views when clicking on the folder buttons

import { createDiv } from "./Domfunctionality";

function FolderViewContent(e) {
  const selectedButton = e.target.closest("button");
  const allToDoItems = document.querySelector(".to-do-list");
  const toDoLists = document.querySelector(".all-to-dos");
  const activeToDos = document.querySelectorAll(".to-do-item");
  const descriptionWrappers = document.querySelectorAll(".description-wrapper");
  const descriptions = document.querySelectorAll(".to-do-details");

  //NEED TO ADD FILTERS FOR DATE-BASED FILTERING

  if (selectedButton.textContent === "FOLDERS") {
    //NEED TO FIX ERROR HERE
    console.log("do nothing");
    return;
  }
  if (selectedButton.classList.contains("new-folder")) {
    const existingfilter = document.querySelector(".filtered-div");
    if (existingfilter) {
      reorderAndReappend();
      toDoLists.removeChild(existingfilter);
    }

    const filteredDiv = createDiv(`filtered-div`);
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
        }
      }
      allToDoItems.style.maxHeight = "0";
      allToDoItems.style.visibility = "hidden";
    }

    return filteredDiv;
  }
  //NEED TO FIGURE OUT HOW TO REORDER BY DATA-ITEM
  if (selectedButton.classList.contains("all-items")) {
    reorderAndReappend();

    allToDoItems.style.removeProperty("max-height");
    allToDoItems.style.removeProperty("visibility");

    removeFilter();

    return allToDoItems;
  }

  console.log(selectedButton.textContent);
}

function reorderAndReappend() {
  const activeToDos = document.querySelectorAll(".to-do-item");
  const allToDoItems = document.querySelector(".to-do-list");
  const descriptionWrappers = document.querySelectorAll(".description-wrapper");
  const allItems = [];
  for (let a = 0; a < activeToDos.length; a++) {
    allItems.push({
      todo: activeToDos[a],
      descrption: descriptionWrappers[a],
      order: parseInt(activeToDos[a].getAttribute("data-item")),
    });
  }

  allItems.sort((a, b) => a.order - b.order);

  allItems.forEach((item) => {
    allToDoItems.appendChild(item.todo);
    allToDoItems.appendChild(item.descrption);
  });
}

function removeFilter() {
  const toDoLists = document.querySelector(".all-to-dos");
  const removefilter = document.querySelector(".filtered-div");
  if (removefilter) {
    toDoLists.removeChild(removefilter);
  } else {
    return;
  }
}

export function renderFolderView(e) {
  const toDoLists = document.querySelector(".all-to-dos");
  toDoLists.insertBefore(FolderViewContent(e), toDoLists.firstChild);
}
