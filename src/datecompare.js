//using date-fns tools to compare date ranges for filters and styling
import {
  add,
  isThisWeek,
  isToday,
  startOfWeek,
  isAfter,
  isBefore,
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
