import {format} from 'date-fns';
import {monthNamesEnum} from '../Types/Types';

export default function getMonthName(date: Date): monthNamesEnum {
  return format(date, 'MMMM') as unknown as monthNamesEnum;
}
