import { createButton, removeFolder } from "./Domfunctionality";
import { updateOptionList, updateDescriptionMulti } from "./multiselect";

//local storage functionality
export function saveFolderToLocalStorage(folderName) {
  localStorage.setItem(folderName, folderName);
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

//need to load folder local storage on page load

export function loadFolderOnPageLoad() {
  for (let i = 0; i < localStorage.length; i++) {
    const folderKey = localStorage.key(i);
    console.log(localStorage.getItem(folderKey));
    createFolder(localStorage.getItem(folderKey));
    // if ()
    // createFolder();
  }
}

//need to load to dos and descriptions on page load

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
