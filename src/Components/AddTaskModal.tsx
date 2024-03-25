import React, { useContext, useState } from "react";
import {
  Modal,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  StyleSheet,
} from "react-native";
import { whiteColor } from "../Utils/styles";
import getRandomColor from "../Utils/getRandomColor";
import { AppContext } from "../Context/Context";
import { Task } from "../Types/Types";

export default function AddTaskModal({
  visible,
  setModalShown,
}: {
  visible: boolean;
  setModalShown: (visibility: boolean) => void;
}) {
  const { addTask } = useContext(AppContext);
  const [taskName, setTaskName] = useState<string>("");
  const [taskContent, setTaskContent] = useState<string>("");

  const handleOnPress = () => {
    const currentDate: Date = new Date();
    const newTask: Task = {
      id: currentDate.getHours() + ":" + currentDate.getMinutes(),
      name: taskName,
      content: taskContent,
      hourOfStarting: currentDate,
      hourOfEnding: currentDate,
    };
    addTask(newTask);
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      style={[styles.modalContainer]}
      transparent={true}
    >
      <View style={styles.modalContent}>
        <TextInput
          placeholder="Task Name"
          style={styles.input}
          value={taskName}
          onChangeText={setTaskName}
        />
        <TextInput
          placeholder="Description"
          multiline={true}
          style={styles.input}
          onChangeText={setTaskContent}
        />
        <View style={styles.buttonsContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => handleOnPress()}
          >
            <Text>Add</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setModalShown(false)}
            style={styles.button}
          >
            <Text>Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: whiteColor,
    width: "80%",
    padding: 20,
    borderRadius: 10,
  },
  input: {
    marginBottom: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  button: {
    padding: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#ccc",
  },
});
