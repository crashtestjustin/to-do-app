import { toDoObjects } from "./createtodo";

export function createMultiSelect() {
  const multiSelect = document.createElement("select");
  multiSelect.multiple = true;

  return multiSelect;
}

export var options = [];
export function updateOptionList(labelValue) {
  if (labelValue === undefined) {
    return options;
  } else {
    options.push(labelValue);
    updateMultiSelect(options);
    return options;
  }
}

function updateMultiSelect(multiOptions) {
  const select = document.querySelectorAll("#folder-select");
  const descFolders = document.querySelectorAll("#current-folders");
  select.forEach((item) => {
    item.innerHTML = "";
    for (let i = 0; i < multiOptions.length; i++) {
      const option = document.createElement("option");
      option.value = multiOptions[i];
      option.textContent = multiOptions[i];
      item.appendChild(option);
    }
  });
  descFolders.forEach((folderOption) => {
    folderOption.innerHTML = "";
    for (let i = 0; i < multiOptions.length; i++) {
      const option = document.createElement("option");
      option.value = multiOptions[i];
      option.textContent = multiOptions[i];
      folderOption.appendChild(option);
    }
  });
}

export function removeMultiselectOption(arrayIndex) {
  options.splice(arrayIndex, 1);
  updateMultiSelect(options);
}

export const descriptionOptions = options;

export function updateDescriptionMulti() {
  const descMuiltiSelect = document.querySelectorAll("#current-folders");
  for (let i = 0; i < descMuiltiSelect.length; i++) {
    const multiOptions = descMuiltiSelect[i].querySelectorAll("option");
    multiOptions.forEach((item) => {
      if (toDoObjects[i].folders.includes(item.value)) {
        item.selected = true;
      }
    });
  }
}
