//generate folder views when clicking on the folder buttons
import {
  isDueNextWeekCheck,
  isDueThisWeekCheck,
  isDueTodayCheck,
} from "./datecompare";
import { createDiv } from "./Domfunctionality";

function FolderViewContent(e) {
  const selectedButton = e.target.closest("button");
  const allToDoItems = document.querySelector(".to-do-list");
  const toDoLists = document.querySelector(".all-to-dos");
  const activeToDos = document.querySelectorAll(".to-do-item");
  const descriptionWrappers = document.querySelectorAll(".description-wrapper");
  const descriptions = document.querySelectorAll(".to-do-details");

  //NEED TO ADD FILTERS FOR DATE-BASED FILTERING
  if (selectedButton.textContent === "TODAY") {
    const existingfilter = document.querySelector(".filtered-div");
    const date = document.querySelectorAll("#description-date");
    const time = document.querySelectorAll("#description-time");
    if (existingfilter) {
      reorderAndReappend();
      toDoLists.removeChild(existingfilter);
    }

    const filteredDiv = createDiv(`filtered-div`);
    for (let i = 0; i < date.length; i++) {
      var dateString;
      if (time[i].value === "") {
        dateString = `${date[i].value.toString()} 00:00`;
      } else {
        dateString = `${date[i].value.toString()} ${time[i].value.toString()}`;
      }
      const isDueToday = isDueTodayCheck(dateString);
      if (isDueToday) {
        filteredDiv.appendChild(activeToDos[i]);
        filteredDiv.appendChild(descriptionWrappers[i]);
      }
      allToDoItems.style.maxHeight = "0";
      allToDoItems.style.visibility = "hidden";
    }
    setSelectedStyle(selectedButton);
    return filteredDiv;
  }

  if (selectedButton.textContent === "THIS WEEK") {
    const existingfilter = document.querySelector(".filtered-div");
    const date = document.querySelectorAll("#description-date");
    const time = document.querySelectorAll("#description-time");
    if (existingfilter) {
      reorderAndReappend();
      toDoLists.removeChild(existingfilter);
    }

    const filteredDiv = createDiv(`filtered-div`);
    for (let i = 0; i < date.length; i++) {
      var dateString;
      if (time[i].value === "") {
        dateString = `${date[i].value.toString()} 00:00`;
      } else {
        dateString = `${date[i].value.toString()} ${time[i].value.toString()}`;
      }
      const isDueThisWeek = isDueThisWeekCheck(dateString);
      if (isDueThisWeek) {
        filteredDiv.appendChild(activeToDos[i]);
        filteredDiv.appendChild(descriptionWrappers[i]);
      }
      allToDoItems.style.maxHeight = "0";
      allToDoItems.style.visibility = "hidden";
    }
    setSelectedStyle(selectedButton);
    return filteredDiv;
  }

  if (selectedButton.textContent === "NEXT WEEK") {
    const existingfilter = document.querySelector(".filtered-div");
    const date = document.querySelectorAll("#description-date");
    const time = document.querySelectorAll("#description-time");
    if (existingfilter) {
      reorderAndReappend();
      toDoLists.removeChild(existingfilter);
    }

    const filteredDiv = createDiv(`filtered-div`);
    for (let i = 0; i < date.length; i++) {
      var dateString;
      if (time[i].value === "") {
        dateString = `${date[i].value.toString()} 00:00`;
      } else {
        dateString = `${date[i].value.toString()} ${time[i].value.toString()}`;
      }
      const isDueNextWeek = isDueNextWeekCheck(dateString);
      if (isDueNextWeek) {
        filteredDiv.appendChild(activeToDos[i]);
        filteredDiv.appendChild(descriptionWrappers[i]);
      }
      allToDoItems.style.maxHeight = "0";
      allToDoItems.style.visibility = "hidden";
    }
    setSelectedStyle(selectedButton);
    return filteredDiv;
  }

  //NEED TO ORDER BY DATE THEN BY DATA ITEM WHEN CREATING THE NEW FILTERED DIV
  if (selectedButton.classList.contains("new-folder")) {
    const existingfilter = document.querySelector(".filtered-div");
    if (existingfilter) {
      reorderAndReappend();
      toDoLists.removeChild(existingfilter);
    }

    const filteredDiv = createDiv(`filtered-div`);
    for (let i = 0; i < descriptions.length; i++) {
      const multi = descriptions[i].querySelector("select");
      const options = multi.querySelectorAll("option");

      for (let j = 0; j < options.length; j++) {
        if (
          options[j].selected &&
          options[j].textContent === selectedButton.textContent
        ) {
          filteredDiv.appendChild(activeToDos[i]);
          filteredDiv.appendChild(descriptionWrappers[i]);
        }
      }
      allToDoItems.style.maxHeight = "0";
      allToDoItems.style.visibility = "hidden";
    }
    setSelectedStyle(selectedButton);
    return filteredDiv;
  }

  if (selectedButton.classList.contains("all-items")) {
    reorderAndReappend();

    allToDoItems.style.removeProperty("max-height");
    allToDoItems.style.removeProperty("visibility");

    removeFilter();
    setSelectedStyle(selectedButton);
    return allToDoItems;
  }
}

function reorderAndReappend() {
  const activeToDos = document.querySelectorAll(".to-do-item");
  const allToDoItems = document.querySelector(".to-do-list");
  const descriptionWrappers = document.querySelectorAll(".description-wrapper");
  const allItems = [];
  for (let a = 0; a < activeToDos.length; a++) {
    allItems.push({
      todo: activeToDos[a],
      descrption: descriptionWrappers[a],
      order: parseInt(activeToDos[a].getAttribute("data-item")),
    });
  }

  allItems.sort((a, b) => a.order - b.order);

  allItems.forEach((item) => {
    allToDoItems.appendChild(item.todo);
    allToDoItems.appendChild(item.descrption);
  });
}

function removeFilter() {
  const toDoLists = document.querySelector(".all-to-dos");
  const removefilter = document.querySelector(".filtered-div");
  if (removefilter) {
    toDoLists.removeChild(removefilter);
  } else {
    return;
  }
}

function setSelectedStyle(selectedButton) {
  const allNavButtons = document.querySelectorAll(".navigation button");
  allNavButtons.forEach((navButton) => {
    if (navButton !== selectedButton) {
      if (
        navButton.classList.contains("timer-div") ||
        navButton.classList.contains("start-pomodoro") ||
        navButton.classList.contains("end-pomodoro")
      ) {
        return;
      } else {
        navButton.style.backgroundColor = "var(--secondary-bg-color)";
        navButton.style.boxShadow = "none";
      }
    } else {
      selectedButton.style.backgroundColor = "var(--selected-folder-color)";
      selectedButton.style.boxShadow =
        "rgba(0, 0, 0, 0.06) 0px 2px 4px 0px inset";
    }
  });
}

export function renderFolderView(e) {
  const toDoLists = document.querySelector(".all-to-dos");
  const selectedButton = e.target;
  if (
    (selectedButton.textContent === "FOLDERS" &&
      selectedButton.classList.contains("main-cat")) ||
    selectedButton.textContent === "x" ||
    selectedButton.classList.contains("pomodoro")
  ) {
    return;
  } else {
    toDoLists.insertBefore(FolderViewContent(e), toDoLists.firstChild);
  }
}
