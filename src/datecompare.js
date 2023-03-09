//using date-fns tools to compare date ranges for filters and styling and hecking for overdue items
import {
  add,
  isThisWeek,
  isToday,
  startOfWeek,
  isAfter,
  isSameWeek,
} from "date-fns";

export function isDueTodayCheck(dateString) {
  const currentDateTrue = isToday(new Date(dateString));

  return currentDateTrue;
}

export function isDueThisWeekCheck(dateString) {
  const currentDateTrue = isThisWeek(new Date(dateString));

  return currentDateTrue;
}

export function isDueNextWeekCheck(dateString) {
  const thisWeekStart = startOfWeek(new Date());
  const nextWeekStart = add(new Date(thisWeekStart), { days: 7 });
  if (isSameWeek(new Date(dateString), new Date(nextWeekStart))) {
    return true;
  } else {
    return false;
  }
}

export function checkPastDue() {
  const currentDate = new Date();
  const date = document.querySelectorAll("#description-date");
  const time = document.querySelectorAll("#description-time");
  const toDoItem = document.querySelectorAll(".to-do-item");
  for (let i = 0; i < date.length; i++) {
    var dateString;
    if (time[i].value === "") {
      dateString = `${date[i].value.toString()} 00:00`;
    } else {
      dateString = `${date[i].value.toString()} ${time[i].value.toString()}`;
    }
    if (isAfter(new Date(currentDate), new Date(dateString))) {
      toDoItem[i].classList.add("overdue-to-do");
    } else {
      toDoItem[i].classList.remove("overdue-to-do");
    }
  }
}
