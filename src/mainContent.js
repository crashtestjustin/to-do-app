import { createDiv } from "./Domfunctionality.js";
import { createButton } from "./Domfunctionality.js";
import { closeModal } from "./Domfunctionality.js";
import { displayToDoModal } from "./Domfunctionality.js";
import { submitToDoModal } from "./Domfunctionality.js";
import { toDo } from "./createtodo.js";
import { createMultiSelect, updateOptionList } from "./multiselect.js";

export function createMain() {
  const main = createDiv("main-content");

  const toDoList = document.createElement("div");
  toDoList.classList = "to-do-list";

  const addToDoBtn = addBtn();

  main.appendChild(toDoList);
  main.appendChild(addToDoBtn);

  return main;
}

function addBtn() {
  const addToDoBtn = createButton("add-to-do-btn", "+");
  addToDoBtn.addEventListener("click", (e) => {
    displayToDoModal();
  });

  return addToDoBtn;
}

//creates inputs for new toDo
export function toDoForm() {
  const formParent = createDiv("new-todo-modal modal hidden-modal");

  const closeFormModal = createButton("close-modal", "X");
  closeFormModal.addEventListener("click", (e) => {
    closeModal(e);
    toDoName.value = "";
    dueDate.value = "";
    desc.value = "";
  });

  const warning = document.createElement("div");
  warning.classList = "to-do-warning";

  const nameDiv = createDiv("name-div");

  const toDoLabel = document.createElement("label");
  toDoLabel.htmlFor = "todo-name-input";
  toDoLabel.textContent = "To Do Name:";

  const toDoName = document.createElement("input");
  toDoName.type = "text";
  toDoName.id = "todo-name-input";
  toDoName.classList = "todo-input";

  const dateDiv = createDiv("date-div");

  const dateLabel = document.createElement("label");
  dateLabel.htmlFor = "due-date-input";
  dateLabel.textContent = "Due Date:";

  const dueDate = document.createElement("input");
  dueDate.type = "date";
  dueDate.id = "due-date-input";
  dueDate.classList = "todo-input";

  const timeDiv = createDiv("time-div");

  const timeLabel = document.createElement("label");
  timeLabel.htmlFor = "due-time-input";
  timeLabel.textContent = "Time:";

  const dueTime = document.createElement("input");
  dueTime.type = "time";
  dueTime.id = "due-time-input";
  dueTime.classList = "todo-input";

  const descDiv = createDiv("description");

  const descLabel = document.createElement("label");
  descLabel.htmlFor = "desc-input";
  descLabel.textContent = "Description:";

  const desc = document.createElement("textarea");
  desc.id = "desc-input";
  desc.classList = "todo-input";

  const folderDiv = createDiv("folder-div");

  const folderLabel = document.createElement("label");
  folderLabel.htmlFor = "folder-select";
  folderLabel.textContent = "Folders:";

  const folderSelect = createMultiSelect(updateOptionList());
  folderSelect.id = "folder-select";
  folderSelect.placeholder = "Folders";

  const formSubmit = createButton("new-submit-button", "SUBMIT");
  formSubmit.type = "submit";
  formSubmit.addEventListener("click", (e) => {
    const selections = document.querySelectorAll(
      "#folder-select option:checked"
    );
    const values = Array.from(selections).map(({ value }) => value);
    const toDoOne = toDo(
      toDoName.value,
      dueDate.value,
      dueTime.value,
      desc.value,
      values
    );
    submitToDoModal(toDoOne);
    closeModal(e);
    toDoName.value = "";
    dueDate.value = "";
    dueTime.value = "";
    desc.value = "";
    clearMultiSelect();
  });

  formParent.appendChild(closeFormModal);
  formParent.appendChild(warning);
  nameDiv.appendChild(toDoLabel);
  nameDiv.appendChild(toDoName);
  formParent.appendChild(nameDiv);
  dateDiv.appendChild(dateLabel);
  dateDiv.appendChild(dueDate);
  formParent.appendChild(dateDiv);
  timeDiv.appendChild(timeLabel);
  timeDiv.appendChild(dueTime);
  formParent.appendChild(timeDiv);
  descDiv.appendChild(descLabel);
  descDiv.appendChild(desc);
  formParent.appendChild(descDiv);
  folderDiv.appendChild(folderLabel);
  folderDiv.appendChild(folderSelect);
  formParent.appendChild(folderDiv);
  formParent.appendChild(formSubmit);

  return formParent;
}

function clearMultiSelect() {
  const folderSelect = document.querySelector("#folder-select");
  const opts = folderSelect.querySelectorAll("option");
  opts.forEach((opt) => {
    opt.selected = false;
  });
}
