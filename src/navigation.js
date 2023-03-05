import { createDiv } from "./Domfunctionality.js";
import { createButton } from "./Domfunctionality.js";
import { submitFolderModal } from "./Domfunctionality.js";
import { closeModal } from "./Domfunctionality.js";
import { displayModal } from "./Domfunctionality.js";
import { renderFolderView } from "./folderviews.js";

export function createNav() {
  const nav = createDiv("navigation");

  const toDoBtns = toDoButtons();
  nav.appendChild(toDoBtns);

  const pomodoro = pomodoroTimerBtn();
  nav.appendChild(pomodoro);

  const addFolder = modifyNavBar();
  nav.appendChild(addFolder);

  return nav;
}

function toDoButtons() {
  const section = document.createElement("div");
  section.classList = "to-do-buttons";
  section.addEventListener("click", (e) => {
    renderFolderView(e);
  });

  const allToDos = createButton("all-items main-cat", "ALL TO DO'S");

  const today = createButton("today sub-cat", "TODAY");

  const thisWeek = createButton("this-week sub-cat", "THIS WEEK");

  const nextWeek = createButton("next-week sub-cat", "NEXT WEEK");

  const folders = createButton("folders main-cat", "FOLDERS");

  section.appendChild(allToDos);
  section.appendChild(today);
  section.appendChild(thisWeek);
  section.appendChild(nextWeek);
  section.appendChild(folders);
  return section;
}

function pomodoroTimerBtn() {
  const section = createDiv("pomodoro");

  const btn = createButton("pomodoro-btn", "POMODORO TIMER");
  section.appendChild(btn);

  return section;
}

function modifyNavBar() {
  const section = createDiv("nav-modify");
  const addFolder = createButton("add-folder", "ADD FOLDER");

  addFolder.addEventListener("click", (e) => {
    displayModal(e);
  });

  section.appendChild(addFolder);
  return section;
}

export function folderForm() {
  const formParent = createDiv("new-folder-modal modal hidden-modal");

  const closeFormModal = createButton("close-modal", "X");
  closeFormModal.addEventListener("click", (e) => {
    closeModal(e);
    folderName.value = "";
    folderName.classList = "folder-name-input";
    warning.classList = "warning";
  });

  const folderLabel = document.createElement("label");
  folderLabel.htmlFor = "name-input";
  folderLabel.textContent = "Provide a name for the new folder:";

  const warning = document.createElement("div");
  warning.classList = "warning";

  const folderName = document.createElement("input");
  folderName.type = "text";
  folderName.id = "name-input";
  folderName.classList = "folder-name-input";

  const folderSubmit = createButton("new-folder-button", "SUBMIT");
  folderSubmit.type = "submit";
  folderSubmit.addEventListener("click", (e) => {
    submitFolderModal(e);
  });

  formParent.appendChild(closeFormModal);
  formParent.appendChild(folderLabel);
  formParent.appendChild(warning);
  formParent.appendChild(folderName);
  formParent.appendChild(folderSubmit);
  return formParent;
}
