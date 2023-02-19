import { toDo } from "./createtodo.js";

export function createDiv(divClass) {
  const div = document.createElement("div");
  div.classList = divClass;

  return div;
}

export function createFolder(e) {
  const folderName = document.querySelector("#name-input");
  const warning = document.querySelector(".warning");
  if (folderName.value.length < 1) {
    warning.classList = "warning display-warning";
    return;
  } else {
    const newFolder = createButton("new-folder sub-cat", folderName.value);
    const removeCustom = createButton("remove", "x");
    const customDiv = document.createElement("div");
    customDiv.classList = "custom-div";

    removeCustom.addEventListener("click", (e) => {
      removeFolder(e);
    });

    customDiv.appendChild(newFolder);
    customDiv.appendChild(removeCustom);
    const selector = document.querySelector(".to-do-buttons");
    selector.appendChild(customDiv);
    closeModal(e);
    warning.classList = "warning";
    folderName.value = "";
    return newFolder;
  }
}

function removeFolder(e) {
  const parent = e.target.closest(".to-do-buttons");
  const folder = document.querySelector(".custom-div");
  parent.removeChild(folder);
}

export function createButton(className, textContent, btnId) {
  const button = document.createElement("button");
  button.classList = className;
  button.id = "undefined" ? (button.id = "") : (button.id = btnId);
  button.textContent = textContent;

  return button;
}

export function createCheckbox() {
  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";

  return checkbox;
}
//to do elemnts
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
//removing to do item
function removeToDo(e) {
  console.log("test");
  const toDoList = document.querySelector(".to-do-list");
  const removeItem = e.target.closest(".to-do-item");
  toDoList.removeChild(removeItem);
  reIndexToDos();
}
//reindexing the data attribute of the to dos
function reIndexToDos() {
  const toDos = document.querySelectorAll(".to-do-item");
  item = 0;
  toDos.forEach((toDo) => {
    toDo.dataset.item = item;
    item = item += 1;
  });
}
//appending final to Do
export function appendToDo() {
  const section = document.querySelector(".to-do-list");
  const newToDo = createToDo();
  section.appendChild(newToDo);

  return section;
}

export function submitFolderModal(e) {
  createFolder(e);
  // closeModal(e);
}
//modal functions
export function displayModal(e) {
  var modalSelected;
  if ((e.target.className = "nav-modify")) {
    modalSelected = document.querySelector(".new-folder-modal");
  }
  {
    // modalSelected = document.querySelector(".to-do-modal");
  }
  modalSelected.classList.remove("hidden-modal");
  const overlay = document
    .querySelector(".modal-bg")
    .classList.remove("hidden-modal");

  return modalSelected;
}

export function closeModal(e) {
  const modalSelected = e.target.closest(".modal");
  modalSelected.classList.add("hidden-modal");

  const overlay = document
    .querySelector(".modal-bg")
    .classList.add("hidden-modal");

  return modalSelected;
}