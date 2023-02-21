import { createDiv } from "./Domfunctionality.js";
import { createButton } from "./Domfunctionality.js";
import { closeModal } from "./Domfunctionality.js";
import { displayToDoModal } from "./Domfunctionality.js";
import { submitToDoModal } from "./Domfunctionality.js";
import { toDo } from "./createtodo.js";

export function createMain() {
  const main = createDiv("main-content");

  const toDoList = document.createElement("div");
  toDoList.classList = "to-do-list";

  const addToDoBtn = addBtn();

  main.appendChild(toDoList);
  main.appendChild(addToDoBtn);

  return main;
}

function addBtn() {
  const addToDoBtn = createButton("add-to-do-btn", "+");

  addToDoBtn.addEventListener("click", (e) => {
    displayToDoModal();
  });

  return addToDoBtn;
}

//creates inputs for new toDo
export function toDoForm() {
  const formParent = createDiv("new-todo-modal modal hidden-modal");

  const closeFormModal = createButton("close-modal", "X");
  closeFormModal.addEventListener("click", (e) => {
    closeModal(e);
  });

  const warning = document.createElement("div");
  warning.classList = "warning";

  const nameDiv = createDiv("name-div");

  const toDoLabel = document.createElement("label");
  toDoLabel.htmlFor = "todo-name-input";
  toDoLabel.textContent = "To Do Name:";

  const toDoName = document.createElement("input");
  toDoName.type = "text";
  toDoName.id = "todo-name-input";

  const dateDiv = createDiv("date-div");

  const dateLabel = document.createElement("label");
  dateLabel.htmlFor = "due-date-label";
  dateLabel.textContent = "Due Date:";

  const dueDate = document.createElement("input");
  dueDate.type = "text";
  dueDate.id = "due-date-input";

  const descDiv = createDiv("description");

  const descLabel = document.createElement("label");
  descLabel.htmlFor = "desc-input";
  descLabel.textContent = "Description:";

  const desc = document.createElement("input");
  desc.type = "text";
  desc.id = "desc-input";

  const formSubmit = createButton("new-submit-button", "SUBMIT");
  formSubmit.type = "submit";
  formSubmit.addEventListener("click", (e) => {
    const toDoName = document.querySelector("#todo-name-input");
    const toDueDate = document.querySelector("#due-date-input");
    const toDescription = document.querySelector("#desc-input");
    const toDoOne = toDo(toDoName.value, toDueDate.value, toDescription.value);
    submitToDoModal(toDoOne);
    closeModal(e);
  });

  formParent.appendChild(closeFormModal);
  formParent.appendChild(warning);
  nameDiv.appendChild(toDoLabel);
  nameDiv.appendChild(toDoName);
  formParent.appendChild(nameDiv);
  dateDiv.appendChild(dateLabel);
  dateDiv.appendChild(dueDate);
  formParent.appendChild(dateDiv);
  descDiv.appendChild(descLabel);
  descDiv.appendChild(desc);
  formParent.appendChild(descDiv);
  formParent.appendChild(formSubmit);

  return formParent;
}
