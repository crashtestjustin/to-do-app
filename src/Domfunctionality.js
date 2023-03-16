import {
  toDoObjects,
  reformatDate,
  removeCustomFolderLink,
} from "./createtodo";
import {
  createMultiSelect,
  removeMultiselectOption,
  updateOptionList,
  descriptionOptions,
  updateDescriptionMulti,
} from "./multiselect";
import { checkPastDue } from "./datecompare";
import {
  saveFolderToLocalStorage,
  theFolderList,
  saveToLocalStorage,
  removeLocalStorageKey,
} from "./localstorage";
import removeIcon from "./error.png";

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
  const existingFolders = document.querySelectorAll(".custom-div");
  const folderName = document.querySelector("#name-input");
  const warning = document.querySelector(".warning");
  if (folderName.value.length < 1) {
    warning.classList = "warning display-warning";
    folderName.classList = "folder-name-input input-error";
    return;
  } else {
    const newFolder = createButton(
      "new-folder sub-cat",
      folderName.value.toUpperCase()
    );
    const customDiv = document.createElement("div");
    customDiv.classList = "custom-div";
    if (existingFolders.length >= 1) {
      const lastItem = existingFolders[existingFolders.length - 1];
      customDiv.dataset.index = parseInt(lastItem.dataset.index) + 1;
    } else {
      customDiv.dataset.index = folderIndex;
    }
    const removeCustom = createButton("remove", "x");
    folderIndex++;

    removeCustom.addEventListener("click", (e) => {
      removeFolder(e);
    });

    theFolderList.push(folderName.value.toUpperCase());
    const folderSave = JSON.stringify(theFolderList);
    saveFolderToLocalStorage(folderSave);

    customDiv.appendChild(newFolder);
    customDiv.appendChild(removeCustom);
    const selector = document.querySelector(".to-do-buttons");
    selector.appendChild(customDiv);
    updateOptionList(folderName.value.toUpperCase());
    updateDescriptionMulti();
    closeModal(e);
    warning.classList = "warning";
    folderName.value = "";
    folderName.classList = "folder-name-input";
    return newFolder;
  }
}

//removing custom folders
export function removeFolder(e) {
  const customFolderDiv = e.target.closest(".custom-div");
  const removeButtons = document.querySelectorAll(".custom-div");
  let i = customFolderDiv.dataset.index;
  removeButtons.forEach((button) => {
    const xNum = button.getAttribute("data-index");
    if (xNum === i) {
      const buttonText = button.querySelector(".new-folder");
      removeCustomFolderLink(buttonText.textContent);
      button.remove();
      theFolderList.splice(i, 1);
      if (theFolderList.length === 0) {
        removeLocalStorageKey("FOLDERS");
      } else {
        const folderSave = JSON.stringify(theFolderList);
        saveFolderToLocalStorage(folderSave);
      }
    }
  });
  reindexCustomFolders();
  removeMultiselectOption(i);
  updateDescriptionMulti();
}

//setting up to-do elements for page
let item = 0;
export function createToDo(e) {
  const exisitngToDos = document.querySelectorAll(".to-do-item");
  const section = createDiv("to-do-item");
  if (exisitngToDos.length >= 1) {
    const lastItem = exisitngToDos[exisitngToDos.length - 1];
    section.dataset.item = parseInt(lastItem.dataset.item) + 1;
  } else {
    section.dataset.item = item;
  }
  section.style.borderBottomLeftRadius = "var(--standard-border-radius)";
  section.style.borderBottomRightRadius = "var(--standard-border-radius)";
  item++;

  section.addEventListener("click", (e) => {
    expandSection(e);
  });

  const expandIcon = createDiv("expand-icon-main");
  expandIcon.textContent = "+";
  expandIcon.dataset.item = section.dataset.item;

  const toDoTitle = createDiv("");
  toDoTitle.textContent = e.title;

  const uiDueDate = createDiv("");
  uiDueDate.classList = "due-date-display";
  if (e.dueDate === "") {
    uiDueDate.textContent = "";
  } else {
    const formattedDate = reformatDate(e.dueDate);
    uiDueDate.textContent = formattedDate.toUpperCase();
  }

  const checkbox = createCheckbox();
  checkbox.addEventListener("click", (e) => {
    markComplete(e);
  });
  const deleteButton = new Image();
  deleteButton.src = removeIcon;
  deleteButton.classList = "delete";
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

//setting up expanding details section of to do
let deets = 0;
export function toDetails(e) {
  const existingDescriptions = document.querySelectorAll(
    ".description-wrapper"
  );
  const sectionWrap = createDiv("description-wrapper collapsed-desc");
  if (existingDescriptions.length >= 1) {
    const lastItem = existingDescriptions[existingDescriptions.length - 1];
    sectionWrap.dataset.item = parseInt(lastItem.dataset.item) + 1;
  } else {
    sectionWrap.dataset.item = deets;
  }
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
  folders.disabled = true;
  folders.id = "current-folders";
  folders.classList = "description-multi";
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
  checkForToDos();
  checkPastDue();

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
  toDoObjects.splice(i, 1);
  if (toDoObjects.length === 0) {
    removeLocalStorageKey("TODOS");
  } else {
    const updatedToDoList = JSON.stringify(toDoObjects);
    saveToLocalStorage(updatedToDoList);
  }
  reIndexToDos();
  checkForToDos();
}

//reindexing the data attribute of the to dos and description wrappers upon deletion
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
export function expandSection(e) {
  const toDoItem = e.target.closest(".to-do-item");
  const collapseDesc = document.querySelectorAll(".description-wrapper");
  let i = toDoItem.dataset.item;
  const expandIcons = document.querySelectorAll(".expand-icon-main");

  // this code required sections to be expanded and minimized manually per section

  for (let d = 0; d < collapseDesc.length; d++) {
    if (collapseDesc[d].dataset.item === i) {
      collapseDesc[d].style.maxHeight =
        collapseDesc[d].style.maxHeight === "0px"
          ? `${content.scrollHeight}px`
          : "0";
    }
    if (collapseDesc[d].style.maxHeight === "0px") {
      toDoItem.style.borderBottomLeftRadius = "var(--standard-border-radius)";
      toDoItem.style.borderBottomRightRadius = "var(--standard-border-radius)";
      expandIcons[d].textContent = "+";
    } else {
      toDoItem.style.removeProperty("border-bottom-left-radius");
      toDoItem.style.removeProperty("border-bottom-right-radius");
      expandIcons[d].textContent = "-";
    }
  }
  checkForExpanded();
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
export function toggleEditing(e) {
  const selectedDesc = e.target.closest(".description-wrapper");
  const childInputs = selectedDesc.querySelectorAll("input");
  const dBox = selectedDesc.querySelectorAll("textarea");
  const toDoItem = document.querySelectorAll(".to-do-item");
  const date = selectedDesc.querySelector("input[type='date']");
  const multiSelect = selectedDesc.querySelector("select");
  if (e.target.textContent === "EDIT") {
    multiSelect.disabled = false;
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
        if (date.value === "") {
          dueDateDisplay.textContent = "";
        } else {
          const reformattedDate = reformatDate(date.value);
          dueDateDisplay.textContent = reformattedDate;
        }
      }
    });

    childInputs.forEach((input) => {
      input.disabled = true;
    });
    dBox.forEach((box) => {
      box.disabled = true;
    });
    const multiOptions = multiSelect.querySelectorAll("option");
    toDoObjects[i].folders = [];
    for (let j = 0; j < multiOptions.length; j++) {
      if (multiOptions[j].selected) {
        toDoObjects[i].folders.push(multiOptions[j].value);
      }
    }
    //save to locat storage
    const updatedToDoList = JSON.stringify(toDoObjects);
    saveToLocalStorage(updatedToDoList);
    multiSelect.disabled = true;
    e.target.textContent = "EDIT";
    checkPastDue();
  }
}

//marking the to do as completed
export function markComplete(e) {
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
      element.style.removeProperty("text-decoration");
    });
  }
}

//check for toDos tp enable expand button visibility
export function checkForToDos() {
  const expandButton = document.querySelector(".expand-all");
  const toDoItems = document.querySelector(".to-do-item");
  if (toDoItems) {
    expandButton.style.visibility = "visible";
  } else {
    expandButton.style.visibility = "hidden";
  }
}

//expand descriptions toggle
export function expandAll() {
  const expandButton = document.querySelector(".expand-all");
  const collapseDesc = document.querySelectorAll(".description-wrapper");
  const expandIcons = document.querySelectorAll(".expand-icon-main");
  const toDoItem = document.querySelectorAll(".to-do-item");
  if (expandButton.textContent === "Expand All") {
    for (let i = 0; i < collapseDesc.length; i++) {
      collapseDesc[i].style.maxHeight = `${content.scrollHeight}px`;
      toDoItem[i].style.removeProperty("border-bottom-left-radius");
      toDoItem[i].style.removeProperty("border-bottom-right-radius");
      for (let j = 0; j < expandIcons.length; j++) {
        expandIcons[j].textContent = "-";
      }
    }
    expandButton.textContent = "Collapse All";
  } else {
    for (let i = 0; i < collapseDesc.length; i++) {
      collapseDesc[i].style.maxHeight = "0";
      toDoItem[i].style.borderBottomLeftRadius =
        "var(--standard-border-radius)";
      toDoItem[i].style.borderBottomRightRadius =
        "var(--standard-border-radius)";
      for (let j = 0; j < expandIcons.length; j++) {
        expandIcons[j].textContent = "+";
      }
    }
    expandButton.textContent = "Expand All";
  }
}

function checkForExpanded() {
  const toDoDescriptions = document.querySelectorAll(".description-wrapper");
  const expandAllBtn = document.querySelector(".expand-all");
  let passTestArray = [];

  for (let i = 0; i < toDoDescriptions.length; i++) {
    if (toDoDescriptions[i].style.maxHeight !== "0px") {
      passTestArray.push("expanded");
    } else {
      passTestArray.push("collapsed");
    }
  }
  if (!passTestArray.includes("collapsed")) {
    expandAllBtn.textContent = "Collapse All";
  } else {
    expandAllBtn.textContent = "Expand All";
  }
}
