import {Task} from '../Types/Types';
import getMonthName from './getMonthName';

type MyTypes = 'Task' | 'Month' | 'Day' | 'Notification'; // Define a union type for allowed types

export default function getIdForType(
  type: MyTypes,
  date: Date,
  taskName?: string,
): string {
  if (date == undefined)
    throw new Error('getIdForType -> The date passed is undefined');
  else if (!(date instanceof Date)) {
    console.log(
      'getIdForType -> the date provided is NOT an instanceof Date : ' +
        typeof date,
    );
  }

  switch (type) {
    case 'Task':
      // Return ID based on task date time (hours, minutes, seconds)
      return `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}:${taskName}`;
    case 'Month':
      console.log('getIdForType.Month -> date: ' + JSON.stringify(date)) +
        'fullYear: ' +
        date.getFullYear();
      return `${getMonthName(date)}:${date.getFullYear()}`;
    case 'Day':
      // Return ID based on day and month (1-based indexing for month)
      return `${date.getDate()}:${date.getMonth() + 1}`;
    case 'Notification':
      return `${taskName}:${date.getTime()}`;
    default:
      // Throw an error indicating an unsupported type
      throw new Error('Unsupported type provided to getIdForType function');
  }
}
