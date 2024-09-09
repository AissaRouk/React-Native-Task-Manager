import {Task} from '../Types/Types';
import getMonthName from './getMonthName';

type MyTypes = 'Task' | 'Month' | 'Day' | 'Notification'; // Define a union type for allowed types

export default function getIdForType(
  type: MyTypes,
  date: Date,
  taskName?: string,
): string {
  console.log(
    'getIdForType -> date provided: ' +
      date +
      ' type of the date: ' +
      typeof date,
  );

  var newDate: Date;

  if (date == undefined)
    throw new Error('getIdForType -> The date passed is undefined');
  else if (typeof date == 'string') {
    newDate = new Date(date);
  } else if (date instanceof Object) {
    newDate = date;
  } else {
    throw new Error('getIdForType -> The date passed is not a Date object');
  }

  switch (type) {
    case 'Task':
      // Return ID based on task date time (hours, minutes, seconds)
      return `${newDate.getHours()}:${newDate.getMinutes()}:${newDate.getSeconds()}:${taskName}`;
    case 'Month':
      return `${getMonthName(date)}:${newDate.getFullYear()}`;
    case 'Day':
      // Return ID based on day and month (1-based indexing for month)
      return `${newDate.getDate()}:${newDate.getMonth() + 1}`;
    case 'Notification':
      return `${taskName}:${newDate.getTime()}`;
    default:
      // Throw an error indicating an unsupported type
      throw new Error('Unsupported type provided to getIdForType function');
  }
}
