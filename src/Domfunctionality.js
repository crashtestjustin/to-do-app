import { toDo } from "./createtodo.js";

export function createDiv(divClass) {
  const div = document.createElement("div");
  div.classList = divClass;

  return div;
}

export function createFolder() {
  const newFolder = createButton("new-folder sub-cat", "TEST NEW");
  const selector = document.querySelector(".to-do-buttons");
  selector.appendChild(newFolder);

  return newFolder;
}

export function createButton(className, textContent, btnId) {
  const button = document.createElement("button");
  button.classList = className;
  button.id = btnId;
  button.textContent = textContent;

  return button;
}

export function createCheckbox() {
  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";

  return checkbox;
}

let item = 0;
export function createToDo() {
  const section = createDiv("to-do-item");
  section.dataset.item = item;
  item++;

  const toDoTitle = createDiv("");
  toDoTitle.textContent = "TEST";

  const dueDate = createDiv("");
  dueDate.textContent = "DUE DATE TEST";

  const checkbox = createCheckbox();

  const deleteButton = createButton("delete", "🗑️");
  deleteButton.addEventListener("click", (e) => {
    removeToDo(e);
  });

  section.appendChild(toDoTitle);
  section.appendChild(dueDate);
  section.appendChild(checkbox);
  section.appendChild(deleteButton);

  return section;
}

function removeToDo(e) {
  console.log("test");
  const toDoList = document.querySelector(".to-do-list");
  const removeItem = e.target.closest(".to-do-item");
  toDoList.removeChild(removeItem);
  reIndexToDos();
}

function reIndexToDos() {
  const toDos = document.querySelectorAll(".to-do-item");
  item = 0;
  toDos.forEach((toDo) => {
    toDo.dataset.item = item;
    item = item += 1;
  });
}

export function appendToDo() {
  const section = document.querySelector(".to-do-list");
  const newToDo = createToDo();
  section.appendChild(newToDo);

  return section;
}
