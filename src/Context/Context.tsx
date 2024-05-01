import React, { createContext, useEffect, useState } from "react";
import { Day, Month, Task, monthNamesEnum } from "../Types/Types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { format, getDaysInMonth } from "date-fns";
import getDayOfWeek from "../Utils/getDayOfWeek";

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
  const monthNameAsyncStorage: string = "months";
  const [months, setMonths] = useState<Month[]>([]);
  const [currentMonth, setCurrentMonth] = useState<Month>();
  const [currentDay, setCurrentDay] = useState<Day>();
  const [flag, setFlag] = useState<boolean>();

  const deleteMonths = async () => {
    await AsyncStorage.removeItem(monthNameAsyncStorage).then((response) =>
      console.log("deleted: " + JSON.stringify(response))
    );
  };

  //initialize the months
  useEffect(() => {
    //obtener el months guardado
    initializeMonths();
  }, []);

  //every time the months is updated
  useEffect(() => {
    console.log(
      "useEffect.months -> : " +
        JSON.stringify(months, null, 1) +
        "flag: " +
        flag
    );
    //if the update flag is true, update the currentMonth
    if (flag) {
      console.log("useEffect.months -> : entered");
      initializeCurrentMonth();
      console.log("");
    } else if (flag === false) {
      saveMonths();
    }
  }, [months, flag]);

  //every time the currentMonth is updated
  useEffect(() => {
    console.log(
      "UseEffect.currentMonth -> " + JSON.stringify(currentMonth, null, 1)
    );
    //if the flag is true update the currentDay
    if (currentMonth && flag) {
      console.log("UseEffect.currentMonth -> " + "entered");
      initializeCurrentDay();
      setFlag(false);
    }
  }, [currentMonth]);

  useEffect(() => {
    console.log(
      "useEffect.currentMonth.days -> " + JSON.stringify(currentMonth, null, 1)
    );
    if (currentMonth?.days && currentMonth?.days.length > 0 && !flag) {
      console.log("useEffect.currentMonth.days -> entered");
      updateMonths();
    }
  }, [currentMonth?.days]);

  //every time the currentDay.task is updated, update the currentMonth, because that means that we a new task
  useEffect(() => {
    console.log("useEffect.currentDay.task: " + flag);
    if (!flag && currentDay?.tasks && currentDay?.tasks?.length > 0) {
      updateCurrentMonth();
      console.log("updating");
    }
  }, [currentDay?.tasks]);

  //every time the day is changed
  useEffect(() => {
    //if flag is false
    if (currentDay && !flag) {
      console.log(
        "useEffect.currentDay.day -> updating currentday: " +
          JSON.stringify(currentDay, null, 1)
      );
      //get the tasks
      getCurrentDay();
    }
  }, [currentDay?.day]);

  const initializeMonths = async () => {
    console.log("InitializeMonths -> entered");
    await AsyncStorage.getItem(monthNameAsyncStorage).then((response) => {
      if (response) {
        setMonths(JSON.parse(response));
        console.log(
          "initializeMonths -> response: " + JSON.stringify(response, null, 1)
        );
      }
      setFlag(true);
      return;
    });
  };

  const initializeCurrentMonth = async () => {
    const currentDate = new Date();
    const currentMonthName: monthNamesEnum = format(
      currentDate,
      "MMMM"
    ) as unknown as monthNamesEnum;
    const currentYear = format(currentDate, "yyyy");
    const foundCurrentMonth = months.find(
      (month) => month.name === currentMonthName
    );
    console.log(
      "initializeCurrentMonth -> foundCurrentMonth: " +
        JSON.stringify(foundCurrentMonth, null, 1)
    );
    //if not, create an empty one
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

  const initializeCurrentDay = () => {
    const currentDate = new Date();
    //check if there's the current day in currentMonth.days
    const foundCurrentDay = currentMonth?.days.find(
      (day) => day.day === currentDate.getDate()
    );
    console.log(
      "initializecurrentDay -> foundCurrentDay: " +
        JSON.stringify(foundCurrentDay, null, 1)
    );
    //if not create the current day
    if (!foundCurrentDay && currentMonth) {
      const newCurrentDay: Day = {
        day: currentDate.getDate(),
        id: `${currentDate.getDate()}:${currentDate.getMonth() + 1}`,
        tasks: [],
        dayOfTheWeek: getDayOfWeek(
          currentMonth.year,
          currentMonth.name,
          currentDate.getDate()
        ),
      };

      setCurrentDay(newCurrentDay);
    }
    // if there's, save it
    else {
      setCurrentDay(foundCurrentDay);
    }
    setFlag(false);
  };

  /**
   * Function that gets the tasks of the currentDay, this function is called when the day is changed by the user, and it fetches the tasks of that day
   */
  const getCurrentDay = () => {
    if (!currentDay) {
      console.error("getCurrentDay -> currentDay is empty");
      return;
    } else if (currentDay.tasks && currentDay.tasks.length > 0) {
      return;
    }
    const foundCurrentDay = currentMonth?.days.find(
      (day) => day.id == currentDay.id
    );
    if (foundCurrentDay) {
      setCurrentDay(foundCurrentDay);
      console.log("Date: " + JSON.stringify(foundCurrentDay.tasks));
    }
  };

  const addTask = (taskName: string, taskContent: string, date: Date) => {
    //checking if params are correct
    if (!taskName || !taskContent || !date) {
      console.error("Context.addTask: taskName or taskContent are undefined");
      return;
    }

    // find the day corresponding to the specified date
    var targetDay = currentMonth?.days.find(
      (day) => day.day === date.getDate()
    );

    // if the day does not exist, create it
    if (!targetDay && currentMonth) {
      const newDay: Day = {
        day: date.getDate(),
        id: `${date.getDate()}:${date.getMonth() + 1}`,
        tasks: [],
        dayOfTheWeek: getDayOfWeek(
          currentMonth.year,
          currentMonth.name,
          date.getDate()
        ),
      };
      setCurrentDay(newDay);
      targetDay = newDay;
    }

    //creating new task
    const newTask: Task = {
      name: taskName,
      content: taskContent,
      id: date.getHours() + ":" + date.getSeconds(),
      date: date,
    };

    //adding task to the currentDay
    const updatedDay: Day = {
      ...targetDay,
      tasks: [...(targetDay?.tasks || []), newTask],
    };
    setCurrentDay(updatedDay);
    console.log(
      "addTask.currentDay updated: " + JSON.stringify(updatedDay, null, 1)
    );
  };

  const updateCurrentMonth = () => {
    // checking currentMonth
    if (!currentMonth || !currentDay) {
      console.error("Context.addTask: currentMonth is undefined");
      return;
    } else if (
      currentMonth.days.find((day) => day.day == currentDay.day)?.tasks ===
      currentDay.tasks
    )
      return;

    //if the current day already exists in currentMonth
    if (currentMonth.days.some((day) => day.id == currentDay.id)) {
      console.log(
        "updateCurrentMonth -> found currentDay in currentMonth " +
          JSON.stringify(currentMonth)
      );

      //update it in the days array
      const updatedDays: Day[] = currentMonth.days.map((day) =>
        day.id == currentDay.id ? currentDay : day
      );
      console.log(
        "updateCurrentMonth -> updatedDays array: " +
          JSON.stringify(updatedDays, null, 1)
      );
      //create the updated currentMonth
      const updatedCurrentMonth: Month = { ...currentMonth, days: updatedDays };
      setCurrentMonth(updatedCurrentMonth);
      console.log(
        "currentMonth updated: " + JSON.stringify(updatedCurrentMonth, null, 1)
      );
    }
    // if not
    else {
      //add directly the currentDay
      const updatedDays: Day[] = [...currentMonth.days, currentDay];
      const updatedCurrentMonth: Month = { ...currentMonth, days: updatedDays };
      setCurrentMonth(updatedCurrentMonth);
      console.log(
        "currentMonth updated: " + JSON.stringify(updatedCurrentMonth, null, 1)
      );
    }
  };

  const updateMonths = () => {
    if (!currentMonth) {
      console.error("Context.updateMonths: currentMonth is undefined");
      return;
    } else if (months.includes(currentMonth)) return;
    if (months.some((month) => month.id === currentMonth.id)) {
      //update it in the months array
      const updatedMonths: Month[] = months.map((month) =>
        month.id == currentMonth.id ? currentMonth : month
      );
      setMonths(updatedMonths);
      console.log("months updated: " + JSON.stringify(updatedMonths, null, 1));
    } //add directly the currentDay
    else {
      const updatedMonths: Month[] = [...months, currentMonth];
      setMonths(updatedMonths);
      console.log("months updated: " + JSON.stringify(updatedMonths, null, 1));
    }
  };

  const saveMonths = async () => {
    console.log(
      "saveMonths -> saving this state of months: " + JSON.stringify(months)
    );
    await AsyncStorage.setItem(
      monthNameAsyncStorage,
      JSON.stringify(months, null, 1)
    )
      .then((response) =>
        console.log("saveMonths ->months saved: " + JSON.stringify(response))
      )
      .catch((err) => console.log("saveMonths -> " + JSON.stringify(err)));
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
