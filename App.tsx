import React from 'react';
import {StyleSheet, SafeAreaView, StatusBar} from 'react-native';
import TasksViewComponent from './src/Components/TasksViewComponent';
import ContextProvider from './src/Context/Context';
import HeaderComponent from './src/Components/HeaderComponent';
import CalendarScrollViewComponent from './src/Components/CalendarScrollView';

export default function App() {
  return (
    <ContextProvider>
      <SafeAreaView style={styles.container}>
        {/* Header */}
        <HeaderComponent />
        {/* Tasks */}
        <CalendarScrollViewComponent />
        {/* Tasks View */}
        <TasksViewComponent />
      </SafeAreaView>
    </ContextProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    marginTop: StatusBar.currentHeight,
  },
});
