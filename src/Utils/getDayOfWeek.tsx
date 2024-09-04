import {Month, dayNames, monthNamesEnum} from '../Types/Types';

// Function to get the day of the week for a given date
export default function getDayOfWeek(
  year: number,
  monthIndex: number,
  day: number,
) {
  // Create a new Date object with the given year, month, and day
  const date = new Date(year, monthIndex, day);

  // Get the day of the week (0 for Sunday, 1 for Monday, ..., 6 for Saturday)
  const dayOfWeek: number = date.getDay();

  // Map the day of the week to the corresponding day name
  switch (dayOfWeek) {
    case 0:
      return dayNames.SUNDAY;
    case 1:
      return dayNames.MONDAY;
    case 2:
      return dayNames.TUESDAY;
    case 3:
      return dayNames.WEDNESDAY;
    case 4:
      return dayNames.THURSDAY;
    case 5:
      return dayNames.FRIDAY;
    case 6:
      return dayNames.SATURDAY;
  }
}
