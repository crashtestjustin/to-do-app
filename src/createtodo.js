export const toDo = (title, dueDate, dueTime, description) => {
  return {
    title: title,
    dueDate: dueDate,
    dueTime: dueTime,
    description: description,
  };
};

//add in date/time functionality
//default complete = false
