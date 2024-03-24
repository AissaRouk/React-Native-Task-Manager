import React from "react";
import { View, Text, StyleSheet } from "react-native";
import getRandomColor from "../Utils/getRandomColor";
import { Task } from "../Types/Types";

export default function TaskComponent({ task }: { task: Task }) {
  const backgroundColor = getRandomColor();

  // Function to format time as hh:mm
  const formatTime = (date: Date) => {
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    return `${hours}:${minutes}`;
  };

  return (
    <View style={styles.container}>
      <View style={[styles.taskView, { backgroundColor }]}>
        <Text style={styles.title}>{task.name}</Text>
        <Text style={styles.content}>{task.content}</Text>
        <Text style={styles.time}>
          {formatTime(task.hourOfStarting)} - {formatTime(task.hourOfEnding)}
        </Text>
      </View>
      <View style={styles.timeView}>
        <View style={[styles.dot, { backgroundColor }]} />
        <Text style={styles.timeText}>{formatTime(task.hourOfStarting)}</Text>
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