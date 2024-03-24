import React, { useContext, useState } from "react";
import { StyleSheet, Text, View, ScrollView, SafeAreaView } from "react-native";
import { useFonts } from "expo-font";
import days from "./src/Data/mockupData";
import DayComponent from "./src/Components/DayComponent";
import { Day } from "./src/Types/Types"; // Assuming Task is defined in this file
import TasksViewComponent from "./src/Components/TasksViewComponent";
import ContextProvider, { AppContext } from "./src/Context/Context";
import HeaderComponent from "./src/Components/HeaderComponent";
import CalendarScrollViewComponent from "./src/Components/CalendarScrollView";

export default function App() {
  const [currentDay, setCurrentDay] = useState<Day>(days[0]);
  const [fontsLoaded] = useFonts({
    "Gilroy-Black": require("./assets/Fonts/Gilroy-Black.ttf"),
    "Gilroy-Regular": require("./assets/Fonts/Gilroy-Regular.ttf"),
    "Gilroy-Medium": require("./assets/Fonts/Gilroy-Medium.ttf"),
    "Gilroy-SemiBold": require("./assets/Fonts/Gilroy-SemiBold.ttf"),
  });

  if (!fontsLoaded) {
    // Handle font loading state
    return null;
  }

  return (
    <ContextProvider>
      <SafeAreaView style={styles.container}>
        {/* Header */}
        <HeaderComponent />
        {/* Tasks */}
        <CalendarScrollViewComponent />
        {/* Tasks View */}
        <TasksViewComponent currentDay={currentDay} />
      </SafeAreaView>
    </ContextProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },
});
