import React from "react";
import { StyleSheet, Text, View, ScrollView, SafeAreaView } from "react-native";
import { useFonts } from "expo-font";
import days from "./src/Data/mockupData";
import DayComponent from "./src/Components/DayComponent";
import { Day } from "./src/Types/Types";
import Icon from "react-native-vector-icons/Ionicons";

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
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>My Tasks</Text>
        <View style={styles.headerIcons}>
          <Icon name="search" size={25} style={styles.icon} />
          <Icon name="notifications" size={25} style={styles.icon} />
        </View>
      </View>
      {/* Tasks */}
      <ScrollView
        horizontal={true}
        style={styles.scrollView}
        showsHorizontalScrollIndicator={false}
      >
        {days.map((item: Day) => (
          <DayComponent
            key={item.id}
            day={item}
            highlighted={item.id === "2"}
          />
        ))}
      </ScrollView>
      <View
        style={{
          flex: 1,
          backgroundColor: "white",
          marginTop: 20,
          paddingTop: 20,
          paddingLeft: 20,
          paddingHorizontal: 10,
          borderTopRightRadius: 30,
          borderTopLeftRadius: 30,
        }}
      >
        <Text style={{ fontFamily: "Gilroy-SemiBold", fontSize: 22 }}>
          X Tasks today
        </Text>
        <ScrollView></ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 20,
  },
  headerTitle: {
    fontFamily: "Gilroy-SemiBold",
    fontSize: 22,
    color: "white",
  },
  headerIcons: {
    flexDirection: "row",
  },
  icon: {
    marginHorizontal: 10,
    color: "white",
  },
  scrollView: {
    maxHeight: "auto", // Adjust the max height as needed
    marginTop: 10,
    marginLeft: 10,
  },
});
