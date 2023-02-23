import { toDo } from "./createtodo";

export function createDiv(divClass) {
  const div = document.createElement("div");
  div.classList = divClass;

  return div;
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

//custom folder creation
let folderIndex = 0;
export function createFolder(e) {
  const folderName = document.querySelector("#name-input");
  const warning = document.querySelector(".warning");
  if (folderName.value.length < 1) {
    warning.classList = "warning display-warning";
    return;
  } else {
    const newFolder = createButton(
      "new-folder sub-cat",
      folderName.value.toUpperCase()
    );
    const customDiv = document.createElement("div");
    customDiv.classList = "custom-div";
    customDiv.dataset.index = folderIndex;
    const removeCustom = createButton("remove", "x");
    folderIndex++;

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

//removing custom folders
function removeFolder(e) {
  const customFolderDiv = e.target.closest(".custom-div");
  const removeButtons = document.querySelectorAll(".custom-div");
  let i = customFolderDiv.dataset.index;
  removeButtons.forEach((button) => {
    const xNum = button.getAttribute("data-index");
    if (xNum === i) {
      button.remove();
    }
  });
  reindexCustomFolders();
}

//setting up to-do elements for page
let item = 0;
export function createToDo(e) {
  console.log(e);
  const section = createDiv("to-do-item");
  section.dataset.item = item;
  item++;

  section.addEventListener("click", (e) => {
    expandSection(e);
  });

  const toDoTitle = createDiv("");
  toDoTitle.textContent = e.title.toUpperCase();

  const uiDueDate = createDiv("");
  uiDueDate.textContent = e.dueDate.toUpperCase();

  const checkbox = createCheckbox();

  const deleteButton = createButton("delete", "🗑️");
  deleteButton.addEventListener("click", (e) => {
    removeToDo(e);
  });

  section.appendChild(toDoTitle);
  section.appendChild(uiDueDate);
  section.appendChild(checkbox);
  section.appendChild(deleteButton);

  return section;
}

//setting up details section of to do
let deets = 0;
export function toDetails(e) {
  const sectionWrap = createDiv("description-wrapper collapsed-desc");
  sectionWrap.dataset.item = deets;
  sectionWrap.style.maxHeight = "0";
  deets++;

  const section = createDiv("to-do-details");

  const expDueDate = createDiv("");
  expDueDate.textContent = e.dueDate;
  section.appendChild(expDueDate);

  const timeDue = createDiv("");
  timeDue.textContent = e.dueTime;
  section.appendChild(timeDue);

  const editBtn = createButton("edit-button", "EDIT");
  section.appendChild(editBtn);

  const wrapper = createDiv("text-area-wrapper");
  section.appendChild(wrapper);

  const descBox = document.createElement("textarea");
  descBox.textContent = e.description;
  descBox.placeholder = "description...";
  wrapper.appendChild(descBox);

  sectionWrap.appendChild(section);

  return sectionWrap;
}

//appending constructed to-do UI item
export function appendToDo(e) {
  const section = document.querySelector(".to-do-list");
  const newToDo = createToDo(e);
  const newDetails = toDetails(e);
  section.appendChild(newToDo);
  section.appendChild(newDetails);

  return section;
}

//removing to do item
export function removeToDo(e) {
  const toDoItem = e.target.closest(".to-do-item");
  const removeDescription = document.querySelectorAll(".description-wrapper");
  let i = toDoItem.dataset.item;
  removeDescription.forEach((description) => {
    const descNum = description.getAttribute("data-item");
    if (descNum === i) {
      console.log(descNum);
      description.remove();
    }
  });
  toDoItem.remove();
  e.stopPropagation();
  reIndexToDos();
}

//reindexing the data attribute of the to dos upon deletion
function reIndexToDos() {
  const toDos = document.querySelectorAll(".to-do-item");
  const dWrapper = document.querySelectorAll(".description-wrapper");
  item = 0;
  deets = 0;
  toDos.forEach((toDo) => {
    toDo.dataset.item = item;
    item = item += 1;
  });
  dWrapper.forEach((wrapper) => {
    wrapper.dataset.item = deets;
    deets = deets += 1;
  });
}

function reindexCustomFolders() {
  const customFolder = document.querySelectorAll(".custom-div");
  folderIndex = 0;
  customFolder.forEach((folder) => {
    folder.dataset.index = folderIndex;
    folderIndex = folderIndex += 1;
  });
}

//submitting modals
export function submitFolderModal(e) {
  createFolder(e);
}

export function submitToDoModal(e) {
  appendToDo(e);
}

//modal functions
export function displayModal() {
  const modalSelected = document.querySelector(".new-folder-modal");
  modalSelected.classList.remove("hidden-modal");
  const overlay = document
    .querySelector(".modal-bg")
    .classList.remove("hidden-modal");

  return modalSelected;
}

export function displayToDoModal() {
  const modalSelected = document.querySelector(".new-todo-modal");
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

//expand to do sections
function expandSection(e) {
  const toDoItem = e.target.closest(".to-do-item");
  const collapseDesc = document.querySelectorAll(".description-wrapper");
  let i = toDoItem.dataset.item;

  // this code required sections to be expanded and minimized manually

  collapseDesc.forEach((desc) => {
    const dNum = desc.getAttribute("data-item");
    if (dNum === i) {
      desc.style.maxHeight =
        desc.style.maxHeight === "0px" ? `${content.scrollHeight}px` : "0";
    }
  });

  //below code makes other sections collapse when another section is expanded

  // collapseDesc.forEach((desc) => {
  //   const dNum = desc.getAttribute("data-item");
  //   if (dNum === i) {
  //     desc.style.maxHeight =
  //       desc.style.maxHeight === "0px" ? `${desc.scrollHeight}px` : "0";
  //   } else {
  //     desc.style.maxHeight = "0";
  //   }
  // });
}
