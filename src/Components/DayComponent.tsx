import {
  blackColor,
  greyColor,
  orangeColor,
  whiteColor,
} from "../Utils/styles";
import { Text, StyleSheet, TouchableOpacity } from "react-native";
import { Day } from "../Types/Types";

export default function DayComponent({
  day,
  highlighted,
  setCurrentDay,
}: {
  day: Day;
  highlighted?: boolean;
  setCurrentDay: (day: Day) => void;
}) {
  return (
    <TouchableOpacity
      style={[
        styles.container,
        {
          backgroundColor: highlighted ? orangeColor : blackColor,
        },
      ]}
      onPress={() => setCurrentDay(day)}
    >
      <Text style={[styles.dayText, { color: whiteColor }]}>{day.day}</Text>
      <Text style={[styles.dayOfWeekText, { color: whiteColor }]}>
        {day.dayOfTheWeek}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    // Replace with your desired color or use dynamic styling
    borderRadius: 10,
    padding: 10,
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 8,
    minWidth: 55,
  },
  dayText: {
    fontSize: 18,
    fontWeight: "800",
  },
  dayOfWeekText: {
    fontSize: 15,
    fontWeight: "500",
  },
});
