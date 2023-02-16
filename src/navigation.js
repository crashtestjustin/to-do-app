import { createDiv } from "./header.js";

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

  const allToDos = createButton("all-to-dos main-cat", "ALL TO DO'S");
  section.appendChild(allToDos);

  const today = createButton("all-to-dos sub-cat", "TODAY");
  section.appendChild(today);

  const thisWeek = createButton("this-week sub-cat", "THIS WEEK");
  section.appendChild(thisWeek);

  const nextWeek = createButton("next-week sub-cat", "NEXT WEEK");
  section.appendChild(nextWeek);

  const folders = createButton("folders main-cat", "FOLDERS");
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
  section.appendChild(addFolder);

  //add event listener and functionality to add folders to the nav bar

  return section;
}

function createButton(className, textContent) {
  const button = document.createElement("button");
  button.classList = className;
  button.textContent = textContent;

  return button;
}
