var toDoList = [];

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

function pushToDoList(title, dueDate, dueTime, description, folders) {
  toDoList.push({ title, dueDate, dueTime, description, folders });
  console.log(toDoList);
}

export const toDoObjects = toDoList;
