import {Month} from '../Types/Types';

export default function getMonthIndex(month: Month): number {
  // Assuming month.name is a valid month name string
  const monthNumber = new Date(month.year, month.name).getMonth();
  if (monthNumber === -1) {
    throw new Error('Invalid month name in Month object');
  }
  return monthNumber;
}
