import {ScrollView, View, Text, TouchableOpacity} from 'react-native';
import {Task} from '../Types/Types';
import TaskComponent from './TaskComponent';
import {useContext, useEffect, useState} from 'react';
import {blackColor, whiteColor} from '../Utils/styles';
import Icon from 'react-native-vector-icons/Ionicons';
import AddTaskModal from './AddTaskModal';
import {AppContext} from '../Context/Context';

export default function TasksViewComponent() {
  const {currentDay} = useContext(AppContext);
  const [modalShown, setModalShown] = useState<boolean>(false);
  const [option, setOption] = useState<'add' | 'edit'>('add');

  useEffect(
    () => console.log('TasksViewComponent -> currentDay has changed'),
    [currentDay],
  );

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: 'white',
        paddingTop: 20,
        paddingHorizontal: 20,
        borderTopRightRadius: 30,
        borderTopLeftRadius: 30,
      }}>
      <AddTaskModal
        visible={modalShown}
        setModalShown={setModalShown}
        option={option}
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text
          style={{
            fontFamily: 'Gilroy-SemiBold',
            fontSize: 22,
            marginBottom: 20,
          }}>
          {currentDay?.tasks?.length || 'No'} Tasks today
        </Text>
        {currentDay?.tasks &&
          currentDay?.tasks?.length > 0 &&
          currentDay?.tasks?.map((item: Task) => (
            <TaskComponent key={item.id} task={item} />
          ))}
      </ScrollView>
      <TouchableOpacity
        style={{
          backgroundColor: blackColor,
          height: 60,
          width: 60,
          borderRadius: 30,
          justifyContent: 'center',
          alignItems: 'center',
          position: 'absolute',
          right: '5%',
          bottom: '3%',
        }}
        onPress={() => setModalShown(!modalShown)}>
        <Icon name="add-sharp" size={30} color={whiteColor} />
      </TouchableOpacity>
    </View>
  );
}
