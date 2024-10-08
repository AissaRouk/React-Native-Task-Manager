import React, {useEffect, useState} from 'react';
import {StyleSheet, SafeAreaView, PermissionsAndroid} from 'react-native';
import TasksViewComponent from './src/Components/TasksViewComponent';
import ContextProvider from './src/Context/Context';
import HeaderComponent from './src/Components/HeaderComponent';
import CalendarScrollViewComponent from './src/Components/CalendarScrollView';
import PushNotification from 'react-native-push-notification';
import LoadingScreen from './src/Components/LoadingComponent';

export const ChannelId: string = 'channelId';

const requestNotificationPermission = async () => {
  const exists = await PermissionsAndroid.check(
    PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
  );
  if (!exists) {
    const isGranted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
      {
        title: 'Task Manager App Camera Permission',
        message: 'Allow this permission so the app can work',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      },
    );
    if (isGranted == PermissionsAndroid.RESULTS.GRANTED) {
      console.log('Notification permission granted ');
    } else console.error('Notification permission not granted!!');
  }
};

const App = () => {
  //
  const [loading, setIsLoading] = useState<boolean>(true);

  // Function to schedule a local notification (modify notification details as needed)
  requestNotificationPermission();
  // Handle notification channel creation on component mount (Android Oreo+)
  useEffect(() => {
    //Request permission for notifications

    //create a newChanner if it doesn't exist already
    PushNotification.createChannel(
      {
        channelId: ChannelId,
        channelName: 'My Notification Channel',
        channelDescription: 'A channel for scheduled notifications',
        importance: 4, // Importance level (HIGH in this case),
      },
      created => {
        console.log('Notification channel: ' + created);
      },
    );
  }, []);

  return (
    <ContextProvider>
      <SafeAreaView style={styles.container}>
        {loading ? (
          <LoadingScreen setIsLoading={setIsLoading} />
        ) : (
          <>
            {/* Header */}
            <HeaderComponent />
            {/* Tasks */}
            <CalendarScrollViewComponent />
            {/* Tasks View */}
            <TasksViewComponent />
          </>
        )}
      </SafeAreaView>
    </ContextProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
});

export default App;
