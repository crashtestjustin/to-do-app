export const toDo = (title, dueDate, dueTime, description) => {
  return {
    title: title,
    dueDate: dueDate,
    dueTime: dueTime,
    description: description,
    complete: false,
  };
};

//add in date/time functionality
