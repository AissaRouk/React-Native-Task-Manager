import getMonthName from './getMonthName';

type MyTypes = 'Task' | 'Month' | 'Day'; // Define a union type for allowed types

export default function getIdForType(type: MyTypes, date: Date): string {
  switch (type) {
    case 'Task':
      // Return ID based on task date time (hours, minutes, seconds)
      return `${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`;
    case 'Month':
      return `${date.toLocaleDateString('en-US', {
        month: 'long',
      })}:${date.getFullYear()}`;
    case 'Day':
      // Return ID based on day and month (1-based indexing for month)
      return `${date.getDate()}:${date.getMonth() + 1}`;
    default:
      // Throw an error indicating an unsupported type
      throw new Error('Unsupported type provided to getIdForType function');
  }
}
