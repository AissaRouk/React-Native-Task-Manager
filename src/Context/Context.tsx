import React, {createContext, useEffect, useState} from 'react';
import {Day, Month, Task, monthNamesEnum} from '../Types/Types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {format, getDaysInMonth} from 'date-fns';
import getDayOfWeek from '../Utils/getDayOfWeek';
import PushNotification from 'react-native-push-notification';
import getMonthName from '../Utils/getMonthName';
import {Dropdown} from 'react-native-element-dropdown';

export interface AppContextType {
  months: Month[];
  setMonths: (months: Month[]) => void;
  currentDay: Day | undefined;
  currentMonth: Month | undefined;
  setCurrentDay: (day: Day) => void;
  /**
   * function that adds a task
   */
  addTask: (taskName: string, taskContent: string, date: Date) => void;
}

export const AppContext = createContext<AppContextType>({
  months: [],
  setMonths: () => {},
  currentDay: undefined,
  currentMonth: undefined,
  setCurrentDay: () => {},
  /**Function that adds a task*/
  addTask: () => {},
});

export default function ContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const monthNameAsyncStorage: string = 'months';
  const [months, setMonths] = useState<Month[]>([]);
  const [currentMonth, setCurrentMonth] = useState<Month>();
  const [currentDay, setCurrentDay] = useState<Day>();
  const currentDate = new Date();

  const deleteMonths = async () => {
    await AsyncStorage.removeItem(monthNameAsyncStorage).then(response =>
      console.log('deleted: ' + JSON.stringify(response)),
    );
  };

  //initialize the months
  useEffect(() => {
    //obtener el months guardado
    initializeMonths();
  }, []);

  useEffect(() => {
    console.log(
      'useEffect.months -> entering with value of months ' +
        JSON.stringify(months) +
        ' ',
    );
    initializeCurrentMonth();
  }, [months]);

  useEffect(() => {
    console.log(
      'useEffect.currentMonth -> entering with value of currentMonth ' +
        JSON.stringify(currentMonth) +
        ' ',
    );
    initializeCurrentDay();
  }, [currentMonth]);

  useEffect(() => {
    console.log(
      'useEffect.currentDay -> entering with value of currentDay ' +
        JSON.stringify(currentDay),
    );
  }, [currentDay]);

  /**
   * function that gets the months from the AsyncStorage
   */
  const initializeMonths = async () => {
    await AsyncStorage.getItem(monthNameAsyncStorage).then(response => {
      if (response) {
        setMonths(JSON.parse(response));
        console.log(
          'initializeMonths -> response: ' + JSON.stringify(response, null, 1),
        );
      }
      return;
    });
  };

  /**
   * Function that gets the current month from "months" according to the current date,
   * if this months doesn't exist in the months var it creates a new one
   */
  const initializeCurrentMonth = async () => {
    const currentMonthName: monthNamesEnum = getMonthName(currentDate);
    const currentYear = format(currentDate, 'yyyy');

    //fetch the current month from months
    const foundCurrentMonth = months.find(
      month => month.name === currentMonthName,
    );
    console.log(
      'initializeCurrentMonth -> foundCurrentMonth: ' +
        JSON.stringify(foundCurrentMonth, null, 1),
    );
    //if current month is not in months, create an empty one
    if (!foundCurrentMonth) {
      const newCurrentMonth: Month = {
        name: currentMonthName,
        year: parseInt(currentYear),
        id: `${currentMonthName}:${currentYear}`,
        days: [],
        totalDays: getDaysInMonth(currentDate),
      };
      setCurrentMonth(newCurrentMonth);
    }
    // if there's save it
    else setCurrentMonth(foundCurrentMonth);
  };

  /**
   * function that gets the current day according to the date from currentMonth
   * if currentMonth doesn't contain it, create a new one
   */
  const initializeCurrentDay = () => {
    //check if there's the current day in currentMonth.days
    const foundCurrentDay = currentMonth?.days.find(
      day => day.day === currentDate.getDate(),
    );
    console.log(
      'initializecurrentDay -> foundCurrentDay: ' +
        JSON.stringify(foundCurrentDay, null, 1),
    );
    //if not create a new currentDay
    if (!foundCurrentDay && currentMonth) {
      const newCurrentDay: Day = {
        day: currentDate.getDate(),
        id: `${currentDate.getDate()}:${currentDate.getMonth() + 1}`,
        tasks: [],
        dayOfTheWeek: getDayOfWeek(
          currentMonth.year,
          currentMonth.name,
          currentDate.getDate(),
        ),
      };

      setCurrentDay(newCurrentDay);
    }
    // if there's, save it
    else {
      setCurrentDay(foundCurrentDay);
    }
  };

  /**
   * Function that fethces the month of the current year
   */
  const getMonth = (name: monthNamesEnum, monthIndex: number) => {
    const monthDate = new Date(currentDate.getFullYear(), monthIndex);
    var targetMonth: Month | undefined = months.find(m => {
      m.name === name;
    });
    if (targetMonth) {
      setCurrentMonth(targetMonth);
      return;
    }
    targetMonth = {
      id: name + ':' + currentDate.getFullYear(),
      name: name,
      year: currentDate.getFullYear(),
      days: [],
      totalDays: getDaysInMonth(monthDate),
    };
    setCurrentMonth(targetMonth);
  };

  /**
   * function that adds a task of a specific date in the months date
   * @param {string} taskName "the task name"
   * @param {string} taskContent the task content
   * @param {Date} date the date of the task
   */
  const addTask = (taskName: string, taskContent: string, date: Date) => {
    //checking if params are correct
    if (!taskName || !taskContent || !date) {
      console.error('Context.addTask: taskName or taskContent are undefined');
      return;
    }

    //creating new task
    const newTask: Task = {
      name: taskName,
      content: taskContent,
      id: date.getHours() + ':' + date.getSeconds(),
      date: date,
    };

    //checking if the month of the tasks' date exists in "months"
    var targetMonth = months.find(
      month => month.id === getMonthName(date) + ':' + date.getFullYear(),
    );

    //if it doesn't exist, create one in "months"
    if (!targetMonth) {
      //creating the newDay
      const newDay: Day = {
        id: `${date.getDate()}:${date.getMonth() + 1}`,
        dayOfTheWeek: getDayOfWeek(
          date.getFullYear(),
          getMonthName(date),
          date.getDate(),
        ),
        day: date.getDate(),
        tasks: [newTask],
      };

      //creating the new non-existing month
      targetMonth = {
        id: getMonthName(date) + ':' + date.getFullYear(),
        name: getMonthName(date),
        year: date.getFullYear(),
        days: [newDay],
        totalDays: getDaysInMonth(date),
      };
      if (currentMonth?.id == targetMonth.id) setCurrentMonth(targetMonth);
      const newMonths: Month[] = [...months, targetMonth];
      setMonths(newMonths);
    } else {
      // find the day corresponding to the specified date
      var targetDay = targetMonth?.days.find(day => day.day === date.getDate());

      // if the day does not exist, create it
      if (!targetDay) {
        //creating new day
        const newDay: Day = {
          day: date.getDate(),
          id: `${date.getDate()}:${date.getMonth() + 1}`,
          tasks: [newTask],
          dayOfTheWeek: getDayOfWeek(
            targetMonth.year,
            targetMonth.name,
            date.getDate(),
          ),
        };
        //saving it in the targetMonth
        targetMonth.days = [...targetMonth.days, newDay];
        // modifying it in the months
        const modifiedMonths = months.map(month =>
          month.id === targetMonth?.id ? targetMonth : month,
        );
        // saving the months
        setMonths(modifiedMonths);
      } else {
        const newDay: Day = {
          day: targetDay.day,
          id: targetDay.id,
          tasks: targetDay?.tasks ? [...targetDay.tasks, newTask] : [newTask],
          dayOfTheWeek: targetDay.dayOfTheWeek,
        };
        targetMonth.days = [...targetMonth.days, newDay];
        const modifiedMonths = months.map(month =>
          month.id === targetMonth?.id ? targetMonth : month,
        );
        setMonths(modifiedMonths);
      }
    }
    saveMonths();

    PushNotification.localNotificationSchedule({
      message: 'You have ' + taskName + ' now',
      title: "Task '" + taskName + "'",
      channelId: 'notification',
      date: date,
    });
  };

  const saveMonths = async () => {
    console.log(
      'saveMonths -> saving this state of months: ' + JSON.stringify(months),
    );
    await AsyncStorage.setItem(
      monthNameAsyncStorage,
      JSON.stringify(months, null, 1),
    )
      .then(response =>
        console.log('saveMonths ->months saved: ' + JSON.stringify(response)),
      )
      .catch(err => console.log('saveMonths -> ' + JSON.stringify(err)));
  };

  const contextValue: AppContextType = {
    months,
    setMonths,
    currentDay,
    currentMonth,
    setCurrentDay,
    addTask,
  };

  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  );
}
