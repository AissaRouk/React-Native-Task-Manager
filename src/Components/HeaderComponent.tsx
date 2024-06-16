import {useContext, useState} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import Icon from 'react-native-vector-icons/dist/Ionicons';
import {AppContext} from '../Context/Context';
import {Dropdown} from 'react-native-element-dropdown';
import getMonthName from '../Utils/getMonthName';

export default function HeaderComponent() {
  const {getMonth} = useContext(AppContext);
  const [chosenMonth, setChosenMonth] = useState<{
    label: String;
    value: string;
    index: number;
  }>({
    label: '' + getMonthName(new Date()),
    value: '' + getMonthName(new Date()),
    index: new Date().getMonth(),
  });

  const monthObjects = [
    {label: 'January', value: 'January', index: 1},
    {label: 'February', value: 'February', index: 2},
    {label: 'March', value: 'March', index: 3},
    {label: 'April', value: 'April', index: 4},
    {label: 'May', value: 'May', index: 5},
    {label: 'June', value: 'June', index: 6},
    {label: 'July', value: 'July', index: 7},
    {label: 'August', value: 'August', index: 8},
    {label: 'September', value: 'September', index: 9},
    {label: 'October', value: 'October', index: 10},
    {label: 'November', value: 'November', index: 11},
    {label: 'December', value: 'December', index: 12},
  ];

  return (
    <View style={styles.header}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Text style={[styles.headerTitle]}>My Tasks -</Text>
        <Dropdown
          data={monthObjects}
          labelField={'label'}
          valueField={'value'}
          onChange={item => {
            if (item != chosenMonth) {
              setChosenMonth(item);
              getMonth(item.value, item.index);
            }
          }}
          style={{marginLeft: 5, flex: 1, minWidth: 150}}
          selectedTextStyle={styles.headerTitle}
          value={chosenMonth}
        />
      </View>
      <View style={styles.headerIcons}>
        <Icon name="search" size={25} style={styles.icon} />
        <Icon name="notifications" size={25} style={styles.icon} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 20,
  },
  headerTitle: {
    fontFamily: 'Gilroy-SemiBold',
    fontSize: 22,
    color: 'white',
  },
  headerIcons: {
    flexDirection: 'row',
  },
  icon: {
    marginHorizontal: 10,
    color: 'white',
  },
});
