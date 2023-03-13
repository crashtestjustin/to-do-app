import {
  createButton,
  removeFolder,
  createDiv,
  createCheckbox,
  checkForToDos,
  expandSection,
  markComplete,
  removeToDo,
  toggleEditing,
} from "./Domfunctionality";
import {
  updateOptionList,
  updateDescriptionMulti,
  createMultiSelect,
} from "./multiselect";
import { toDoObjects } from "./createtodo";
import { reformatDate } from "./createtodo";
import { descriptionOptions } from "./multiselect";
import { checkPastDue } from "./datecompare";

//remove item from local storage
export function removeLocalStorageKey(key) {
  localStorage.removeItem(key);
}

//local storage functionality for fodlers
export function saveFolderToLocalStorage(folderName) {
  localStorage.setItem("FOLDERS", folderName);
}

//local storage setting for toDo objects
export function saveToLocalStorage(toDoObject) {
  localStorage.setItem("TODOS", toDoObject);
}

//creating folders on page load

var folderList = [];
export const theFolderList = folderList;

export function loadFolderOnPageLoad() {
  const parsedFolderList = JSON.parse(localStorage.getItem("FOLDERS"));
  if (parsedFolderList !== null) {
    theFolderList.length = 0;
    for (let i = 0; i < parsedFolderList.length; i++) {
      theFolderList.push(parsedFolderList[i]);
      createFolder(parsedFolderList[i]);
    }
  }
}

//create folders on page load

let folderIndex = 0;
function createFolder(folder) {
  const newFolder = createButton("new-folder sub-cat", folder);
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
  updateOptionList(folder);
  updateDescriptionMulti();
}

//create toDos on page load

export function loadToDosOnPageLoad() {
  const parsedToDoList = JSON.parse(localStorage.getItem("TODOS"));
  if (parsedToDoList !== null) {
    toDoObjects.length = 0;
    for (let i = 0; i < parsedToDoList.length; i++) {
      toDoObjects.push(parsedToDoList[i]);
      //   createToDo(parsedToDoList[i]);
      //   toDetails(parsedToDoList[i]);
      appendToDo(parsedToDoList[i]);
    }
  }
}

function appendToDo(e) {
  const section = document.querySelector(".to-do-list");
  const newToDo = createToDo(e);
  const newDetails = toDetails(e);
  section.appendChild(newToDo);
  section.appendChild(newDetails);
  checkForToDos();
  checkPastDue();

  return section;
}

let item = 0;
function createToDo(toDoObject) {
  const section = createDiv("to-do-item");
  section.dataset.item = item;
  section.style.borderBottomLeftRadius = "var(--standard-border-radius)";
  section.style.borderBottomRightRadius = "var(--standard-border-radius)";
  item++;

  section.addEventListener("click", (e) => {
    expandSection(e);
  });

  const expandIcon = createDiv("expand-icon-main");
  expandIcon.textContent = "+";

  const toDoTitle = createDiv("");
  toDoTitle.textContent = toDoObject.title;

  const uiDueDate = createDiv("");
  uiDueDate.classList = "due-date-display";
  if (toDoObject.dueDate === "") {
    uiDueDate.textContent = "";
  } else {
    const formattedDate = reformatDate(toDoObject.dueDate);
    uiDueDate.textContent = formattedDate;
  }

  const checkbox = createCheckbox();
  checkbox.addEventListener("click", (e) => {
    markComplete(e);
  });

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

//details section load

let deets = 0;
export function toDetails(toDoObject) {
  const sectionWrap = createDiv("description-wrapper collapsed-desc");
  sectionWrap.dataset.item = deets;
  sectionWrap.style.maxHeight = "0";
  deets++;

  const section = createDiv("to-do-details");

  const expDueDate = document.createElement("input");
  expDueDate.type = "date";
  expDueDate.id = "description-date";
  expDueDate.value = toDoObject.dueDate;
  expDueDate.disabled = true;
  section.appendChild(expDueDate);

  const timeDue = document.createElement("input");
  timeDue.type = "time";
  timeDue.id = "description-time";
  timeDue.value = toDoObject.dueTime;
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
  descBox.textContent = toDoObject.description;
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
    toDoObject.folders.forEach((selectedFolder) => {
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
