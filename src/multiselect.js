export function createMultiSelect() {
  const multiSelect = document.createElement("select");
  multiSelect.multiple = true;

  return multiSelect;
}

var options = [];
export function updateOptionList(labelValue) {
  if (labelValue === undefined) {
    return options;
  } else {
    options.push(labelValue);
    updateMultiSelect(options);
    console.log(options);
    return options;
  }
}

function updateMultiSelect(multiOptions) {
  const select = document.querySelector("#folder-select");
  select.innerHTML = "";
  for (let i = 0; i < multiOptions.length; i++) {
    const option = document.createElement("option");
    option.value = multiOptions[i];
    option.textContent = multiOptions[i];
    select.appendChild(option);
  }
}

export function removeMultiselectOption(arrayIndex) {
  options.splice(arrayIndex, 1);
  console.log(options);
  updateMultiSelect(options);
}
