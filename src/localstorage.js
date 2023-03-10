//local storage functionality
export function saveFolderToLocalStorage(folderName) {
  localStorage.setItem(folderName, folderName);
}

export function removeCustomFolderFromLocalStorage(key) {
  localStorage.removeItem(key);
}

//need to load folder local storage on page load

function saveToLocalStorage() {
  //saving to do and descriptions to local storage
}

function removeFromLocalStorage() {
  //removing to do and descriptions to local storage
}

//need to load to dos and descriptions on page load
