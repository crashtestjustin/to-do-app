export const toDo = (title, dueDate, dueTime, description, folders) => {
  return {
    title: title,
    dueDate: dueDate,
    dueTime: dueTime,
    description: description,
    folders: folders,
    complete: false,
  };
};

//add in date/time functionality

//add to list
// function pushToDo(newToDo) {
//   let toDoList = [];
//   toDoList.push(newToDo);

//   return toDoList;
// }
