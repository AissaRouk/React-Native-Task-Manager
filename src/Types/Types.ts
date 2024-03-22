export interface Task {
  id: string;
  name: string;
  hourOfStarting: Date;
  hourOfEnding: Date;
  content: string;
}

export interface Day {
  id: string;
  dayOfTheWeek: "Mon" | "Tue" | "Wed" | "Thu" | "Fri" | "Sat" | "Sun";
  day: number;
  tasks: Task[] | [];
}

export interface Month {
  id: string;
  name: string; // Name of the month (e.g., "January", "February", etc.)
  year: number; // Year of the month
  days: Day[]; // Array of Day objects representing the days in the month
}
