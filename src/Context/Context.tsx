import React, { createContext, useEffect, useState } from "react";
import { Day, Month } from "../Types/Types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { format, getDaysInMonth } from "date-fns";

export interface AppContextType {
  months: Month[];
  setMonths: (months: Month[]) => void;
  currentDay: Day | undefined;
  currentMonth: Month | undefined;
  setCurrentDay: (day: Day) => void;
}

export const AppContext = createContext<AppContextType>({
  months: [],
  setMonths: () => {},
  currentDay: undefined,
  currentMonth: undefined,
  setCurrentDay: () => {},
});

export default function ContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [months, setMonths] = useState<Month[]>([]);
  const [currentMonth, setCurrentMonth] = useState<Month>();
  const [currentDay, setCurrentDay] = useState<Day>();

  // UseEffects
  useEffect(() => {
    getMonths();
    getCurrentMonth();
    getCurrentDay();
  }, []);

  // useEffect(() => {
  //   console.log("changed: " + JSON.stringify(currentDay));
  // }, [currentDay]);

  //months functions
  const getMonths = async () => {
    if (!months || months.length === 0) {
      const JSONResponse: string | null = await AsyncStorage.getItem("months");
      if (JSONResponse) {
        const response: Month[] = JSON.parse(JSONResponse);
        console.log("Month fetched: " + JSONResponse);
        setMonths(response);
      }
    }
  };

  const getCurrentMonth = () => {
    const currentDate = new Date();
    const currentMonthName = format(currentDate, "MMMM");
    const currentYear = format(currentDate, "yyyy");

    // Check if the months array is empty or the current month is not in the array
    if (!months || !months.some((month) => month.name === currentMonthName)) {
      setCurrentMonth({
        name: currentMonthName,
        year: parseInt(currentYear),
        id: currentMonthName + ":" + currentYear,
        days: [],
        totalDays: getDaysInMonth(currentDate),
      });
    }
  };

  const hasTasks = (currentMonthName: string) => {
    return false;
  };
  //   if (!months || months?.length == 0) return false;
  //   else if(months.some((month: Month)=>(month.name == currentMonthName)&& month.))
  //   {

  //   }

  // };

  //days functions
  const getCurrentDay = () => {
    const currentDate = new Date();
    if (
      currentMonth &&
      currentMonth?.days.length > 0 &&
      currentMonth?.days.some((day) => day.day == currentDate.getDate())
    ) {
      const index = currentMonth.days.findIndex(
        (day) => day.day == currentDate.getDate()
      );
      if (index == -1) {
        console.error("Context -> error in getCurrentDay()");
        return;
      }
      setCurrentDay(currentMonth.days[index]);
    }
    setCurrentDay({
      day: currentDate.getDate(),
      id: currentDate.getDate() + ":" + currentDate.getDay(),
      tasks: [],
    });
  };

  //task functions
  const addTask = () => {};

  const contextValue: AppContextType = {
    months,
    setMonths,
    currentDay,
    currentMonth,
    setCurrentDay,
  };

  return (
    <AppContext.Provider value={contextValue}>
      {/* Example of wrapping text in a <Text> component */}
      {children}
    </AppContext.Provider>
  );
}
