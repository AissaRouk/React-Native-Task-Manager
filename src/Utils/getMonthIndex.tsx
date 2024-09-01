import {Month, monthNamesEnum} from '../Types/Types';

export default function getMonthIndex(month: Month): number {
  // Get the name of the month from the Month object
  const monthName: monthNamesEnum = month.name;

  // console.log(
  //   'getMonthIndex -> month.name: ' + typeof monthNamesEnum[monthName],
  // );

  // console.log('getMonthIndex -> return: ' + monthNamesEnum[monthName]);
  return Number(monthNamesEnum[monthName]);
}
