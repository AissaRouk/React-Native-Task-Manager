import {useContext, useState} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import Icon from 'react-native-vector-icons/dist/Ionicons';
import {AppContext} from '../Context/Context';
import {Dropdown} from 'react-native-element-dropdown';
import {monthNamesEnum} from '../Types/Types';
import getMonthName from '../Utils/getMonthName';

export default function HeaderComponent() {
  const {currentMonth} = useContext(AppContext);
  const [chosenMonth, setChosenMonth] = useState<{
    label: String;
    value: string;
  }>({
    label: '' + getMonthName(new Date()),
    value: '' + getMonthName(new Date()),
  });

  const monthObjects = [
    {label: 'January', value: 'January'},
    {label: 'February', value: 'February'},
    {label: 'March', value: 'March'},
    {label: 'April', value: 'April'},
    {label: 'May', value: 'May'},
    {label: 'June', value: 'June'},
    {label: 'July', value: 'July'},
    {label: 'August', value: 'August'},
    {label: 'September', value: 'September'},
    {label: 'October', value: 'October'},
    {label: 'November', value: 'November'},
    {label: 'December', value: 'December'},
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
            setChosenMonth(item);
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
