import { createDiv } from "./Domfunctionality.js";
import { createButton } from "./Domfunctionality.js";
import { submitFolderModal } from "./Domfunctionality.js";
import { closeModal } from "./Domfunctionality.js";
import { displayModal } from "./Domfunctionality.js";
import { renderFolderView } from "./folderviews.js";
import { expandPomodoroTimer, interpretTimerClick } from "./pomodorotimer.js";

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

  const pomodoroDiv = createDiv("pomodoro-div");
  section.appendChild(pomodoroDiv);

  const expandArrow = createDiv("expand-arrow");
  expandArrow.textContent = ">";
  pomodoroDiv.appendChild(expandArrow);
  expandArrow.addEventListener("click", (e) => {
    expandPomodoroTimer(e);
  });

  const btn = createButton("pomodoro-btn", "POMODORO TIMER");
  pomodoroDiv.appendChild(btn);

  btn.addEventListener("click", (e) => {
    expandPomodoroTimer(e);
  });

  const timerDiv = createDiv("timer-div");
  timerDiv.style.maxHeight = "0";
  section.appendChild(timerDiv);

  const timerText = createDiv("pomodoro-timer");
  timerText.textContent = "00:25:00";
  const startBtn = createButton("start-pomodoro pomodoro-run-btn", "START");
  startBtn.addEventListener("click", (e) => {
    interpretTimerClick(e);
  });
  const endBtn = createButton("end-pomodoro pomodoro-run-btn", "END");
  endBtn.addEventListener("click", (e) => {
    interpretTimerClick(e);
  });

  timerDiv.appendChild(timerText);
  timerDiv.appendChild(startBtn);
  timerDiv.appendChild(endBtn);

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

// export function buttonHover() {
//   console.log("test");

//   const navButtons = document.querySelectorAll(".navigation button");
//   navButtons.forEach((button) => {
//     button.addEventListener("mouseover", (e) => {
//       if (button.classList.contains("folders")) {
//         button.style.backgroundColor = "var(--secondary-bg-color)";
//       } else {
//         button.style.backgroundColor = "var(--selected-folder-color)";
//       }
//     });
//   });
// }
