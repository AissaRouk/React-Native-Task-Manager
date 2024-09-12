import React, {createContext, useEffect, useState} from 'react';
import {Day, Month, Task, monthNamesEnum} from '../Types/Types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {format, getDaysInMonth} from 'date-fns';
import getDayOfWeek from '../Utils/getDayOfWeek';
import PushNotification from 'react-native-push-notification';
import getMonthName from '../Utils/getMonthName';
import getMonthIndex from '../Utils/getMonthIndex';
import getIdForType from '../Utils/getIdForType';
import {ChannelId} from '../../App';

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
  /***
   * Function that deletes a specific Task
   */
  deleteTask: (task: Task) => void;
  /***
   * Function that deletes a specific Task
   */
  editTask: (task: Task) => void;
  /**
   * Function that returns the
   * @param name
   * @param monthIndex
   * @returns
   */
  getMonth: (name: monthNamesEnum, monthIndex: number) => void;
}

export const AppContext = createContext<AppContextType>({
  months: [],
  setMonths: () => {},
  currentDay: undefined,
  currentMonth: undefined,
  setCurrentDay: () => {},
  /**Function that adds a task*/
  addTask: () => {},
  /***
   * Function that deletes a specific Task
   */
  deleteTask: () => {},
  getMonth: () => {},
  editTask: () => {},
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
  /**
   * State to save the flag that triggers the saving of the months in AsyncStrg
   */
  const [saveMonthsFlag, setSaveMonthsFlag] = useState<boolean>(false);
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
    // deleteMonths();
  }, []);

  useEffect(() => {
    console.log(
      'useEffect.months -> entering with value of months ' +
        JSON.stringify(months) +
        ' ',
    );
    if (saveMonthsFlag) {
      saveMonths();
      setSaveMonthsFlag(false);
    }

    initializeCurrentMonth();
  }, [months, saveMonthsFlag]);

  useEffect(() => {
    console.log(
      'useEffect.currentMonth -> entering with value of currentMonth ' +
        JSON.stringify(currentMonth) +
        ' ',
    );
    initializeCurrentDay();
  }, [currentMonth, currentMonth?.days]);

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
        id: getIdForType('Month', currentDate),
        days: [],
        totalDays: getDaysInMonth(currentDate),
      };
      setCurrentMonth(newCurrentMonth);
    }
    // if there's save it
    else {
      setCurrentMonth(foundCurrentMonth);
    }
  };

  /**
   * function that gets the current day according to the date from currentMonth
   * if currentMonth doesn't contain it, create a new one
   * this function also gets the first day of the currentMonth if it is not the actual current month of the currentDate,
   * because when the user changes the month it gets its first day
   */
  const initializeCurrentDay = () => {
    var foundCurrentDay: Day | undefined;
    //get the monthId to see if we want to initialize the actual current month according to our date or we want to fetch another month, this is done to know wether to return the actual day of the month or the first one
    var check = currentMonth?.name == getMonthName(currentDate);

    if (check)
      //check if there's the current day in currentMonth.days
      foundCurrentDay = currentMonth?.days.find(
        day => day.day === currentDate.getDate(),
      );
    else foundCurrentDay = currentMonth?.days.find(day => day.day === 1);
    console.log(
      'initializecurrentDay -> foundCurrentDay: ' +
        JSON.stringify(foundCurrentDay, null, 1),
    );
    //if not create a new currentDay
    if (!foundCurrentDay && currentMonth) {
      const newCurrentDay: Day = {
        day: check ? currentDate.getDate() : 1,
        id: `${check ? currentDate.getDate() : 1}:${
          check ? currentDate.getDate() : getMonthIndex(currentMonth) + 1
        }`,
        tasks: [],
        dayOfTheWeek: getDayOfWeek(
          currentMonth.year,
          getMonthIndex(currentMonth),
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
      id: getIdForType('Month', currentDate),
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
    if (!taskName || !date) {
      console.error('Context.addTask: taskName or taskContent are undefined');
      return;
    }

    //creating new task
    const newTask: Task = {
      name: taskName,
      content: taskContent,
      id: getIdForType('Task', date, taskName),
      date: date,
    };

    //checking if the month of the tasks' date exists in "months"
    var targetMonth = months.find(
      month => month.id === getIdForType('Month', date),
    );

    //if it doesn't exist, create one in "months"
    if (targetMonth == undefined) {
      //creating the newDay
      const newDay: Day = {
        id: getIdForType('Day', date),
        dayOfTheWeek: getDayOfWeek(
          date.getFullYear(),
          date.getMonth(),
          date.getDate(),
        ),
        day: date.getDate(),
        tasks: [newTask],
      };

      //creating the new non-existing month
      targetMonth = {
        id: getIdForType('Month', date),
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
      console.log('addTask -> targetDay: ' + JSON.stringify(targetDay));

      // if the day does not exist, create it
      if (!targetDay) {
        //creating new day
        const newDay: Day = {
          day: date.getDate(),
          id: getIdForType('Day', date),
          tasks: [newTask],
          dayOfTheWeek: getDayOfWeek(
            targetMonth.year,
            date.getMonth(),
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
      }
      //if the day exists add the task to it
      else {
        const newDay: Day = {
          day: targetDay.day,
          id: targetDay.id,
          tasks: targetDay?.tasks ? [...targetDay.tasks, newTask] : [newTask],
          dayOfTheWeek: targetDay.dayOfTheWeek,
        };
        //replacing the day with the newDay
        targetMonth.days = targetMonth.days.map(day =>
          day.id === newDay.id ? newDay : day,
        );
        const modifiedMonths = months.map(month =>
          month.id === targetMonth?.id ? targetMonth : month,
        );
        setMonths(modifiedMonths);
      }
    }

    //trigger the saveMonths in the useEffect to save the new state of months
    setSaveMonthsFlag(true);

    console.log(
      'adding notification for task: -> ' +
        taskName +
        ' -> on Date: ' +
        date.getHours() +
        ':' +
        date.getMinutes(),
    );
    PushNotification.localNotification({
      message: 'You have ' + taskName + ' now',
      title: "Task '" + taskName + "'",
      channelId: ChannelId,
      id: getIdForType('Notification', date, taskName),
    });
  };

  /***
   * Function that deletes a specific Task
   */
  const deleteTask = (task: Task) => {
    if (!task) throw console.error('Context.deleteTask -> task is undefined');

    //creating variables
    var targetTask: Task | undefined,
      targetDay: Day | undefined,
      targetMonth: Month | undefined;

    //comprobating that it is a date

    //get the id for the month
    var id: string = getIdForType('Month', task.date);

    //searching for the Task's month
    targetMonth = months.find(month => month.id === id);

    //if targetMonth != undefined
    if (targetMonth) {
      //get the id for the day
      id = getIdForType('Day', task.date);

      //find the targetDay
      targetDay = targetMonth.days.find(day => day.id === id);

      //if it exists
      if (targetDay) {
        //get id for task
        id = getIdForType('Task', task.date, task.name);

        //search for the task
        targetTask = targetDay.tasks?.find(task => task.id === id);

        //if it exists
        if (targetTask) {
          //
          //the indexes are fetched before the modifications so they can be found, because once after modifiactions they won't be found
          //
          //search for it's index to be deleted easily
          const taskIndex = targetDay.tasks?.indexOf(task);

          //search the day in the targetMonth
          const dayIndex = targetMonth.days.indexOf(targetDay);

          //targetMonth index
          const monthIndex = months.indexOf(targetMonth);

          //if found
          if (taskIndex != undefined && taskIndex >= 0) {
            //delete Task from targetDay
            targetDay.tasks?.splice(taskIndex, 1);

            //checking if there are some tasks in that day, because it might be that the deleted task was the only one that existed
            if (targetDay.tasks && targetDay.tasks?.length > 0) {
              //update the day from the targetMonth
              targetMonth.days[dayIndex].tasks = targetDay.tasks;
            }
            //if there are no tasks, delete the day from the targetMonth
            else targetMonth.days.splice(dayIndex, 1);

            var updatedMonths: Month[];

            //check if the targetMonth is empty after deletion
            if (targetMonth.days.length <= 0) {
              updatedMonths = months;
              updatedMonths.splice(monthIndex, 1);
            }

            //if not, update the targetMonth value in months
            else {
              updatedMonths = months;
              updatedMonths[monthIndex] = targetMonth;
            }

            //delete the scheduled notification
            PushNotification.cancelLocalNotification(
              getIdForType('Notification', task.date, task.name),
            );
            //activate the flag so it can update the value of months
            setSaveMonthsFlag(true);
            setMonths(updatedMonths);
            return;
          }
        }
      }
    }
    console.error('Context.js - deleteTask -> Error in deleteTask ');
  };

  /**
   *
   */
  const editTask = (task: Task) => {
    if (!task) throw console.error('Context.deleteTask -> task is undefined');

    //creating variables
    var targetTask: Task | undefined,
      targetDay: Day | undefined,
      targetMonth: Month | undefined;

    //comprobating that it is a date

    //get the id for the month
    var id: string = getIdForType('Month', task.date);

    //searching for the Task's month
    targetMonth = months.find(month => month.id === id);
    console.log(
      'editTask -> targetMonth found: ' + JSON.stringify(targetMonth),
    );

    //if targetMonth != undefined
    if (targetMonth) {
      //get the id for the day
      id = getIdForType('Day', task.date);

      //find the targetDay
      targetDay = targetMonth.days.find(day => day.id === id);
      console.log('editTask -> targetDAy found: ' + JSON.stringify(targetDay));
      //if it exists
      if (targetDay) {
        //get id for task
        id = getIdForType('Task', task.date, task.name);

        //search for the task
        targetTask = targetDay.tasks?.find(task => task.id === id);
        console.log('editTask -> task found: ' + JSON.stringify(task));

        //if it exists
        if (targetTask && task != targetTask) {
          //
          //the indexes are fetched before the modifications so they can be found, because once after modifiactions they won't be found
          //
          //search for it's index to be edited easily
          const taskIndex = targetDay.tasks?.indexOf(targetTask);

          //search the day in the targetMonth
          const dayIndex = targetMonth.days.indexOf(targetDay);

          //targetMonth index
          const monthIndex = months.indexOf(targetMonth);

          console.log(
            'editTask ->  monthIndex:' +
              monthIndex +
              'dayIndex:' +
              dayIndex +
              'taskIndex: ' +
              taskIndex,
          );

          //if found
          if (taskIndex != undefined && taskIndex >= 0) {
            console.log('editTask -> entered on the if ');

            //delete Task from targetDay
            targetDay.tasks![taskIndex] = task;

            //update the day from the targetMonth
            targetMonth.days[dayIndex].tasks = targetDay.tasks;

            //create the new Months
            var updatedMonths: Month[];

            //update the new Months
            updatedMonths = months;
            updatedMonths[monthIndex] = targetMonth;

            //activate the flag so it can update the value of months
            setSaveMonthsFlag(true);
            setMonths(updatedMonths);
            return;
          }
        }
      }
    }
    console.error('Context.js - editTask -> Error in editTask ');
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
    deleteTask,
    editTask,
    getMonth,
  };

  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  );
}
