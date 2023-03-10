//local storage functionality
export function saveFolderToLocalStorage(folderName) {
  localStorage.setItem(folderName, folderName);
}

export function removeCustomFolderFromLocalStorage(key) {
  localStorage.removeItem(key);
}
