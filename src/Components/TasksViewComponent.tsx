import { ScrollView, View, Text } from "react-native";
import { Day, Task } from "../Types/Types";
import TaskComponent from "./TaskComponent";
import { useContext } from "react";
import { AppContext } from "../Context/Context";

export default function TasksViewComponent() {
  const { currentDay } = useContext(AppContext);
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "white",
        paddingTop: 20,
        paddingHorizontal: 20,
        borderTopRightRadius: 30,
        borderTopLeftRadius: 30,
      }}
    >
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text
          style={{
            fontFamily: "Gilroy-SemiBold",
            fontSize: 22,
            marginBottom: 20,
          }}
        >
          {currentDay?.tasks.length || "No"} Tasks today
        </Text>
        {currentDay?.tasks.map((item: Task) => (
          <TaskComponent key={item.id} task={item} />
        ))}
      </ScrollView>
    </View>
  );
}
