import React, { useContext } from "react";
import { ScrollView, StyleSheet } from "react-native";
import DayComponent from "./DayComponent";
import { AppContext } from "../Context/Context";
import { dayNames } from "../Types/Types";

export default function CalendarScrollViewComponent() {
  const { currentMonth, currentDay } = useContext(AppContext);

  return (
    <ScrollView
      horizontal={true}
      style={styles.scrollView}
      showsHorizontalScrollIndicator={false}
    >
      {currentMonth &&
        [...Array(currentMonth.totalDays)].map((_, index) => {
          // Calculate the day number
          const dayNumber = index + 1;

          return (
            <DayComponent
              key={index} // Ensure unique keys for each DayComponent
              highlighted={currentDay && currentDay.day === dayNumber}
              day={{
                day: dayNumber,
                dayOfTheWeek: dayNames.FRIDAY,
                id: dayNumber + ":" + currentMonth.name,
                tasks: [],
              }}
            />
          );
        })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    maxHeight: 60, // Adjust the max height as needed
    minHeight: 60,
    marginTop: 10,
    marginLeft: 10,
    marginBottom: 20,
  },
});
