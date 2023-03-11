import { toDoObjects } from "./createtodo";

//creates the initial miltiSelect object
export function createMultiSelect() {
  const multiSelect = document.createElement("select");
  multiSelect.multiple = true;

  return multiSelect;
}

//array holding multiselect options
export var options = [];

//updates the option list on the toDo modal by calling the below function
export function updateOptionList(labelValue) {
  if (labelValue === undefined) {
    return options;
  } else {
    options.push(labelValue);
    updateMultiSelect(options);
    return options;
  }
}

//updates all multiSelect fields across modal and toDo descriptions when new folders are added and removed
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

//removes option from multiselect array and updates the options acress all multiselect inputs by passing the latest array
// to the update functions above
export function removeMultiselectOption(arrayIndex) {
  options.splice(arrayIndex, 1);
  updateMultiSelect(options);
}

//exported constant that is used to obtain the otions array for functions in the other modules
export const descriptionOptions = options;

//selects the correct options in each description multiselect
//maintains previously selected multiselect options when new folders are added and removed
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
