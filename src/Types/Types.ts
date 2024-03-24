export interface Task {
  id: string;
  name: string;
  hourOfStarting: Date;
  hourOfEnding: Date;
  content: string;
}

export interface Day {
  id: string;
  dayOfTheWeek: dayNames;
  day: number;
  tasks: Task[] | [];
}

export interface Month {
  id: string;
  name: monthNamesEnum | string; // Name of the month (e.g., "January", "February", etc.)
  year: number; // Year of the month
  days: Day[]; // Array of Day objects representing the days in the month
  totalDays: number;
}

export enum dayNames {
  MONDAY = "Mon",
  TUESDAY = "Tue",
  WEDNESDAY = "Wed",
  THURSDAY = "Thu",
  FRIDAY = "Fri",
  SATURDAY = "Sat",
  SUNDAY = "Sun",
}

export enum monthNamesEnum {
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
}
