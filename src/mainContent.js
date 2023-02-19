import { createDiv } from "./Domfunctionality.js";
import { createButton } from "./Domfunctionality.js";
import { createToDo } from "./Domfunctionality.js";
import { appendToDo } from "./Domfunctionality.js";
import { closeModal } from "./Domfunctionality.js";
import { displayToDoModal } from "./Domfunctionality.js";

export function createMain() {
  const main = createDiv("main-content");

  const toDoList = document.createElement("div");
  toDoList.classList = "to-do-list";
  toDoList.appendChild(createToDo());

  const addToDoBtn = addBtn();

  main.appendChild(toDoList);
  main.appendChild(addToDoBtn);

  return main;
}

function addBtn() {
  const addToDoBtn = createButton("add-to-do-btn", "+");

  addToDoBtn.addEventListener("click", (e) => {
    displayToDoModal();
    // appendToDo();
  });

  return addToDoBtn;
}

export function toDoForm() {
  const formParent = createDiv("new-todo-modal modal");

  const closeFormModal = createButton("close-modal", "X");
  closeFormModal.addEventListener("click", (e) => {
    closeModal(e);
  });

  const warning = document.createElement("div");
  warning.classList = "warning";

  const toDoLabel = document.createElement("label");
  toDoLabel.htmlFor = "name-input";
  toDoLabel.textContent = "To Do Name:";

  const toDoName = document.createElement("input");
  toDoName.type = "text";
  toDoName.id = "name-input";

  const folderSubmit = createButton("new-folder-button", "SUBMIT");
  folderSubmit.type = "submit";
  folderSubmit.addEventListener("click", (e) => {
    submitFolderModal(e);
  });

  formParent.appendChild(closeFormModal);
  formParent.appendChild(warning);
  formParent.appendChild(toDoLabel);
  formParent.appendChild(toDoName);
  formParent.appendChild(folderSubmit);

  return formParent;
}
