export const toDo = (title, dueDate, description) => {
  return {
    title: title,
    dueDate: dueDate,
    // dueTime: dueTime,
    description: description,
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
