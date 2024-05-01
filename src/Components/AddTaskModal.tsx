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
import { AppContext } from "../Context/Context";
import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";

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
  const [date, setDate] = useState<Date>(new Date());
  const [showDatePicker, setShowDatePicker] = useState<boolean>(false);
  const [showTimePicker, setShowTimePicker] = useState<boolean>(false);
  const [selectedTime, setSelectedTime] = useState<Date>(new Date());

  const handleOnPress = () => {
    // Combine date and time into a single Date object
    const selectedDateTime = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
      selectedTime.getHours(),
      selectedTime.getMinutes()
    );

    // Add the task with the combined date and time
    addTask(taskName, taskContent, selectedDateTime);

    // Close the modal
    setModalShown(false);

    // Empty the TextInputs
    setTaskContent("");
    setTaskName("");
  };

  const toggleDatePicker = () => {
    setShowDatePicker(!showDatePicker);
  };

  const toggleTimePicker = () => {
    setShowTimePicker(!showTimePicker);
  };

  const onChangeDate = (event: DateTimePickerEvent, selectedDate?: Date) => {
    if (event.type === "set" && selectedDate) {
      // Update the date with the selected date
      setDate(selectedDate);
      toggleDatePicker();
    } else if (event.type === "dismissed") {
      toggleDatePicker();
    }
  };

  const onChangeTime = (event: DateTimePickerEvent, selectedTime?: Date) => {
    if (event.type === "set" && selectedTime) {
      // Update the selected time
      setSelectedTime(selectedTime);
      toggleTimePicker();
    } else if (event.type === "dismissed") {
      toggleTimePicker();
    }
  };

  return (
    <Modal visible={visible} animationType="slide" transparent={true}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          {/* Name Text Input */}
          <TextInput
            placeholder="Task Name"
            style={styles.input}
            value={taskName}
            onChangeText={setTaskName}
          />
          {/* Description TextInput */}
          <TextInput
            placeholder="Description"
            multiline={true}
            style={styles.input}
            onChangeText={setTaskContent}
          />
          {/* Date Picker */}
          {showDatePicker && (
            <DateTimePicker value={date} mode="date" onChange={onChangeDate} />
          )}
          {/* Time Picker */}
          {showTimePicker && (
            <DateTimePicker
              value={selectedTime}
              mode="time"
              onChange={onChangeTime}
            />
          )}
          {/* Starting Date Button */}
          <TouchableOpacity
            style={styles.input}
            onPress={() => toggleDatePicker()}
          >
            <Text style={styles.textColor}>
              Starting date: {date.toLocaleDateString()}
            </Text>
          </TouchableOpacity>
          {/* Starting Time Button */}
          <TouchableOpacity
            style={styles.input}
            onPress={() => toggleTimePicker()}
          >
            <Text style={styles.textColor}>
              Starting time: {selectedTime.toLocaleTimeString()}
            </Text>
          </TouchableOpacity>
          {/* Buttons View */}
          <View style={styles.buttonsContainer}>
            {/* Add Button */}
            <TouchableOpacity
              style={styles.button}
              onPress={() => handleOnPress()}
            >
              <Text>Add</Text>
            </TouchableOpacity>
            {/* Cancel Button */}
            <TouchableOpacity
              onPress={() => setModalShown(false)}
              style={styles.button}
            >
              <Text>Cancel</Text>
            </TouchableOpacity>
          </View>
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
    backgroundColor: "rgba(0, 0, 0, 0.5)",
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
    justifyContent: "space-around",
    marginTop: 10,
  },
  button: {
    padding: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#ccc",
    width: 70,
    alignItems: "center",
  },
  textColor: { color: "grey" },
});
