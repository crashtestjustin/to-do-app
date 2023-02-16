import { createDiv } from "./header.js";

export function createMain() {
  const main = createDiv("main-content");

  const toDoList = document.createElement("div");
  toDoList.textContent = "test";

  main.appendChild(toDoList);

  return main;
}
