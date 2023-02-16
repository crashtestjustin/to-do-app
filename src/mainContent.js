import { createDiv } from "./Domfunctionality.js";
import { createButton } from "./Domfunctionality.js";
import { createToDo } from "./Domfunctionality.js";
import { appendToDo } from "./Domfunctionality.js";

export function createMain() {
  const main = createDiv("main-content");

  const toDoList = document.createElement("div");
  toDoList.classList = "to-do-list";
  toDoList.appendChild(createToDo());

  const addToDoBtn = addBtn();

  main.appendChild(toDoList);
  main.appendChild(addToDoBtn);

  return main;
}

function addBtn() {
  const addToDoBtn = createButton("add-to-do-btn", "+");

  addToDoBtn.addEventListener("click", (e) => {
    appendToDo();
  });

  return addToDoBtn;
}
