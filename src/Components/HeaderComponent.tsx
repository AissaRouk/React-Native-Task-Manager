import { useContext } from "react";
import { StyleSheet, View, Text } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { AppContext } from "../Context/Context";

export default function HeaderComponent() {
  const { currentMonth } = useContext(AppContext);

  return (
    <View style={styles.header}>
      <Text style={styles.headerTitle}>My Tasks - {currentMonth?.name}</Text>
      <View style={styles.headerIcons}>
        <Icon name="search" size={25} style={styles.icon} />
        <Icon name="notifications" size={25} style={styles.icon} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
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
});
