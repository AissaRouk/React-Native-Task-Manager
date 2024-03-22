import React from "react";
import { View, Text, StyleSheet } from "react-native";
import getRandomColor from "../Utils/getRandomColor";

export default function TaskComponent() {
  const backgroundColor = getRandomColor();

  return (
    <View style={styles.container}>
      <View style={[styles.taskView, { backgroundColor }]}>
        <Text style={styles.title}>Title</Text>
        <Text style={styles.content}>
          Content content content content content content content content
          content content content content
        </Text>
        <Text style={styles.time}>9:00 AM - 10:00 AM</Text>
      </View>
      <View style={styles.timeView}>
        <View style={[styles.dot, { backgroundColor }]} />
        <Text style={styles.timeText}>9:00 AM</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 20,
    marginBottom: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  taskView: {
    padding: 15,
    borderRadius: 20,
    maxWidth: "75%",
  },
  title: {
    fontFamily: "Gilroy-SemiBold",
    fontSize: 19,
  },
  content: {
    marginTop: 5,
    fontFamily: "Gilroy-Regular",
    overflow: "hidden",
  },
  time: {
    fontFamily: "Gilroy-SemiBold",
    fontSize: 15,
    marginTop: 10,
  },
  timeView: {
    flexDirection: "row",
    alignItems: "center",
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 10,
  },
  timeText: {
    fontFamily: "Gilroy-SemiBold",
    fontSize: 15,
  },
});
