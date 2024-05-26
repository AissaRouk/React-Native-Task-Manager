import {ScrollView, View, Text, TouchableOpacity} from 'react-native';
import {Task} from '../Types/Types';
import TaskComponent from './TaskComponent';
import {useContext, useState} from 'react';
import {blackColor, whiteColor} from '../Utils/styles';
import Icon from 'react-native-vector-icons/Ionicons';
import AddTaskModal from './AddTaskModal';
import {AppContext} from '../Context/Context';
import PushNotification from 'react-native-push-notification';

export default function TasksViewComponent() {
  const {currentDay} = useContext(AppContext);
  const [modalShown, setModalShown] = useState<boolean>(false);

  const scheduleLocalNotification = () => {
    var d1 = new Date(),
      d2 = new Date(d1);

    d1.setMinutes(d2.getMinutes() + 1);
    console.log('D1: ' + d1);

    PushNotification.localNotificationSchedule({
      title: 'notification',
      message: 'This is a scheduled notification',
      date: d1, // Fire in 5 seconds (adjust time)
      channelId: 'notification', // Notification channel ID (explained below)
    });
  };

  const pushLocalNotification = () => {
    PushNotification.localNotification({
      channelId: 'notification',
      message: 'Helloooo',
    });
  };

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
      <AddTaskModal visible={modalShown} setModalShown={setModalShown} />
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
        onPress={() => {
          scheduleLocalNotification();
        }}>
        <Icon name="add-sharp" size={30} color={whiteColor} />
      </TouchableOpacity>
    </View>
  );
}
