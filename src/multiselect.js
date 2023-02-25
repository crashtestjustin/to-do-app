export function createMultiSelect() {
  var options = updateOptionList();

  const multiSelect = document.createElement("select");
  multiSelect.multiple = true;

  for (i = 0; i < options.length; i++) {
    var option = document.createElement("option");
    option.value = options[i].value;
    option.text = options[i].label;
    multiSelect.appendChild(option);
  }

  return multiSelect;
}

var options = [];
export function updateOptionList(labelValue, valueValue) {
  if (labelValue === undefined || valueValue === undefined) {
    return options;
  } else {
    options.push({ label: labelValue, value: valueValue });
    console.log(options);
    return options;
  }
}

export function removeMultiselectOption(arrayIndex) {
  options.splice(arrayIndex, 1);
  console.log(options);
}
