import React from "react";
import { StyleSheet, SafeAreaView, StatusBar } from "react-native";
import { useFonts } from "expo-font";
import TasksViewComponent from "./src/Components/TasksViewComponent";
import ContextProvider from "./src/Context/Context";
import HeaderComponent from "./src/Components/HeaderComponent";
import CalendarScrollViewComponent from "./src/Components/CalendarScrollView";

export default function App() {
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
        <TasksViewComponent />
      </SafeAreaView>
    </ContextProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    marginTop: StatusBar.currentHeight,
  },
});
