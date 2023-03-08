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

//exporting the toDoList string to use in multiselect functions for toDo descriptions
export const toDoObjects = toDoList;

//reformatting default date format into mm/dd/yyyy string
export function reformatDate(inputDate) {
  const inputDateStr = inputDate;
  const expectedFormat = "yyyy-MM-dd";
  const outputFormat = "MM/dd/yyyy";

  const parsedDate = parse(inputDateStr, expectedFormat, new Date());
  const outputDateStr = format(parsedDate, outputFormat);
  return outputDateStr;
}

// export function createFullDate(inputDate) {
//   const inputDateStr = inputDate;
//   const expectedFormat = "yyyy-MM-dd HH:mm";
//   const outputFormat = "MM/dd/yyyy HH:mm:ss";

//   const parsedDate = parse(inputDateStr, expectedFormat, new Date());
//   const fullDate = format(parsedDate, outputFormat);
//   return fullDate;
// }
