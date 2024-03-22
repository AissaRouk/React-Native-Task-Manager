import {
  blackColor,
  greyColor,
  orangeColor,
  whiteColor,
} from "../Utils/styles";
import { View, Text, StyleSheet } from "react-native";
import { Day } from "../Types/Types";

export default function DayComponent({
  day,
  highlighted,
}: {
  day: Day;
  highlighted?: boolean;
}) {
  return (
    <View
      style={[
        styles.container,
        { backgroundColor: highlighted ? orangeColor : greyColor },
      ]}
    >
      <Text
        style={[
          styles.dayText,
          { color: highlighted ? whiteColor : blackColor },
        ]}
      >
        {day.day}
      </Text>
      <Text
        style={[
          styles.dayOfWeekText,
          { color: highlighted ? whiteColor : blackColor },
        ]}
      >
        {day.dayOfTheWeek}
      </Text>
    </View>
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
