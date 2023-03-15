import { format, parse } from "date-fns";
import { saveToLocalStorage } from "./localstorage";

var toDoList = [];
//exporting the toDoList string to use in multiselect functions for toDo descriptions and saving
//to local storage
export const toDoObjects = toDoList;

//creating main object
export const toDo = (title, dueDate, dueTime, description, folders) => {
  pushToDoList(title, dueDate, dueTime, description, folders);
  return {
    title: title,
    dueDate: dueDate,
    dueTime: dueTime,
    description: description,
    folders: folders,
    complete: false,
  };
};

//adding object to array
function pushToDoList(title, dueDate, dueTime, description, folders) {
  toDoList.push({ title, dueDate, dueTime, description, folders });
}

//remove folder from to do objects
export function removeCustomFolderLink(folderName) {
  console.log(toDoObjects);
  toDoObjects.forEach((object) => {
    for (let i = 0; i < object.folders.length; i++) {
      if (object.folders[i] === folderName) {
        object.folders.splice(i, 1);
      }
    }
  });
  const updatedToDoList = JSON.stringify(toDoObjects);
  saveToLocalStorage(updatedToDoList);
}

//reformatting default date format into mm/dd/yyyy string
export function reformatDate(inputDate) {
  const inputDateStr = inputDate;
  const expectedFormat = "yyyy-MM-dd";
  const outputFormat = "MM/dd/yyyy";

  const parsedDate = parse(inputDateStr, expectedFormat, new Date());
  const outputDateStr = format(parsedDate, outputFormat);
  return outputDateStr;
}
