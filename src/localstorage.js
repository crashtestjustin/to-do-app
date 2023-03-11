import { createButton, removeFolder } from "./Domfunctionality";
import { updateOptionList, updateDescriptionMulti } from "./multiselect";

//local storage functionality
export function saveFolderToLocalStorage(folderName) {
  localStorage.setItem("FOLDERS", folderName);
  //   localStorage.setItem(folderName), folderName);
}

export function removeCustomFolderFromLocalStorage(key) {
  localStorage.removeItem(key);
}

function saveToLocalStorage() {
  //saving to do and descriptions to local storage
}

function removeFromLocalStorage() {
  //removing to do and descriptions to local storage
}

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
  const folderName = folder;
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
