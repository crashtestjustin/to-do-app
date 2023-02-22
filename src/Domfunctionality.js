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

//removing custom folders
function removeFolder(e) {
  const parent = e.target.closest(".to-do-buttons");
  const folder = document.querySelector(".custom-div");
  parent.removeChild(folder);
}

//setting up to-do elements for page
let item = 0;
export function createToDo(e) {
  console.log(e);
  const section = createDiv("to-do-item");
  section.dataset.item = item;
  item++;

  const expandIcon = createButton("expand-icon", "▶️");
  expandIcon.addEventListener("click", (e) => {
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

  section.appendChild(expandIcon);
  section.appendChild(toDoTitle);
  section.appendChild(uiDueDate);
  section.appendChild(checkbox);
  section.appendChild(deleteButton);

  return section;
}

//setting up details section of to do
let deets = 0;
export function toDetails(e) {
  const sectionwrap = createDiv("description-wrapper");

  const section = createDiv("to-do-details");
  section.dataset.item = deets;
  deets++;

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

  sectionwrap.appendChild(section);

  return sectionwrap;
}

//appending constructed to-do UI item
export function appendToDo(e) {
  const section = document.querySelector(".to-do-list");
  const todoInput = document.querySelectorAll(".todo-input");
  const toDoWarning = document.querySelector(".to-do-warning");
  const newToDo = createToDo(e);
  const newDetails = toDetails(e);
  section.appendChild(newToDo);
  section.appendChild(newDetails);

  return section;
}

//removing to do item
export function removeToDo(e) {
  const toDoList = document.querySelector(".to-do-list");
  const removeItem = e.target.closest(".to-do-item");
  toDoList.removeChild(removeItem);
  reIndexToDos();
}

//reindexing the data attribute of the to dos upon deletion
function reIndexToDos() {
  const toDos = document.querySelectorAll(".to-do-item");
  item = 0;
  toDos.forEach((toDo) => {
    toDo.dataset.item = item;
    item = item += 1;
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

function expandSection(e) {
  var details = document.querySelectorAll(".description-wrapper");
  for (var i = 0; i < details.length; i++) {
    details[i].classList.toggle("collapsed-desc");
  }
}
