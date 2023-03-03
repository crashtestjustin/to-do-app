import { format, parse } from "date-fns";

var toDoList = [];

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

//reformatting default date format into mm/dd/yyyy string
export function reformatDate(inputDate) {
  const inputDateStr = inputDate;
  const expectedFormat = "yyyy-MM-dd";
  const outputFormat = "MM/dd/yyyy";

  const parsedDate = parse(inputDateStr, expectedFormat, new Date());
  const outputDateStr = format(parsedDate, outputFormat);
  return outputDateStr;
}

//exporting the toDoList string to use in multiselect functions for toDo descriptions
export const toDoObjects = toDoList;
