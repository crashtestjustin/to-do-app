import {
  createMultiSelect,
  removeMultiselectOption,
  updateOptionList,
  descriptionOptions,
} from "./multiselect";

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
    updateOptionList(folderName.value.toUpperCase());
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
  removeMultiselectOption(i);
}

//setting up to-do elements for page
let item = 0;
export function createToDo(e) {
  const section = createDiv("to-do-item");
  section.dataset.item = item;
  section.style.borderBottomLeftRadius = "var(--standard-border-radius)";
  section.style.borderBottomRightRadius = "var(--standard-border-radius)";
  item++;

  section.addEventListener("click", (e) => {
    expandSection(e);
  });

  const toDoTitle = createDiv("");
  toDoTitle.textContent = e.title.toUpperCase();

  const uiDueDate = createDiv("");
  uiDueDate.classList = "due-date-display";
  uiDueDate.textContent = e.dueDate.toUpperCase();

  const checkbox = createCheckbox();
  checkbox.addEventListener("click", (e) => {
    markComplete(e);
  });

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

//setting up expanding details section of to do
let deets = 0;
export function toDetails(e) {
  const sectionWrap = createDiv("description-wrapper collapsed-desc");
  sectionWrap.dataset.item = deets;
  sectionWrap.style.maxHeight = "0";
  deets++;

  const section = createDiv("to-do-details");

  const expDueDate = document.createElement("input");
  expDueDate.type = "date";
  expDueDate.id = "description-date";
  expDueDate.value = e.dueDate;
  expDueDate.disabled = true;
  section.appendChild(expDueDate);

  const timeDue = document.createElement("input");
  timeDue.type = "time";
  timeDue.id = "description-time";
  timeDue.value = e.dueTime;
  timeDue.disabled = true;
  section.appendChild(timeDue);

  const editBtn = createButton("edit-button", "EDIT");
  section.appendChild(editBtn);
  editBtn.addEventListener("click", (e) => {
    toggleEditing(e);
  });

  const wrapper = createDiv("text-area-wrapper");
  section.appendChild(wrapper);

  const descBox = document.createElement("textarea");
  descBox.textContent = e.description;
  descBox.id = "description-description";
  descBox.placeholder = "description...";
  descBox.disabled = true;
  wrapper.appendChild(descBox);

  const folders = createMultiSelect();
  folders.id = "current-folders";
  descriptionOptions.forEach((option) => {
    const optionEl = document.createElement("option");
    optionEl.value = option;
    optionEl.textContent = option;
    optionEl.classList = "d-folder-option";
    e.folders.forEach((selectedFolder) => {
      if (selectedFolder === option) {
        optionEl.selected = true;
      }
    });
    folders.appendChild(optionEl);
  });

  section.appendChild(folders);

  sectionWrap.appendChild(section);

  return sectionWrap;
}

//appending constructed to-do UI item from above
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

//reindexing the data attr of custom folders upon removal of a custom folder
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

//display new folder modal
export function displayModal() {
  const modalSelected = document.querySelector(".new-folder-modal");
  modalSelected.classList.remove("hidden-modal");
  const overlay = document
    .querySelector(".modal-bg")
    .classList.remove("hidden-modal");

  return modalSelected;
}

//display to do modal
export function displayToDoModal() {
  const modalSelected = document.querySelector(".new-todo-modal");
  modalSelected.classList.remove("hidden-modal");
  const overlay = document
    .querySelector(".modal-bg")
    .classList.remove("hidden-modal");

  return modalSelected;
}

//closing a modal
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
    if (desc.style.maxHeight === "0px") {
      toDoItem.style.borderBottomLeftRadius = "var(--standard-border-radius)";
      toDoItem.style.borderBottomRightRadius = "var(--standard-border-radius)";
    } else {
      toDoItem.style.removeProperty("border-bottom-left-radius");
      toDoItem.style.removeProperty("border-bottom-right-radius");
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

//enabling and saving the edits to a to Do
function toggleEditing(e) {
  const selectedDesc = e.target.closest(".description-wrapper");
  const childInputs = selectedDesc.querySelectorAll("input");
  const dBox = selectedDesc.querySelectorAll("textarea");
  const toDoItem = document.querySelectorAll(".to-do-item");
  const date = selectedDesc.querySelector("input[type='date']");
  if (e.target.textContent === "EDIT") {
    childInputs.forEach((input) => {
      input.disabled = false;
    });
    dBox.forEach((box) => {
      box.disabled = false;
    });
    e.target.textContent = "SAVE";
  } else {
    let i = selectedDesc.dataset.item;
    toDoItem.forEach((item) => {
      if (i === item.dataset.item) {
        const dueDateDisplay = item.querySelector(".due-date-display");
        dueDateDisplay.textContent = date.value;
      }
    });

    childInputs.forEach((input) => {
      input.disabled = true;
    });
    dBox.forEach((box) => {
      box.disabled = true;
    });
    e.target.textContent = "EDIT";
  }
}

//marking the to do as completed
function markComplete(e) {
  const selectCheckBox = e.target;
  const toDoItem = e.target.closest(".to-do-item");
  const toDoNameAndDate = toDoItem.querySelectorAll("div");
  e.stopPropagation();
  if (selectCheckBox.checked === true) {
    toDoNameAndDate.forEach((element) => {
      element.style.textDecoration = "line-through";
    });
  } else {
    toDoNameAndDate.forEach((element) => {
      // element.style.textDecoration = "none";
      element.style.removeProperty("text-decoration");
    });
  }
}
