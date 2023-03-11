import { createButton, removeFolder } from "./Domfunctionality";
import { updateOptionList, updateDescriptionMulti } from "./multiselect";

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
  const stringFolderList = localStorage.key("FOLDERS");
  const parsedFolderList = JSON.parse(localStorage.getItem(stringFolderList));
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
  //   const folderName = folder;
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
  return newFolder;
}

//create toDos on page load
