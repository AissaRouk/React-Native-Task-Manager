import React, {useContext, useEffect, useRef} from 'react';
import {ScrollView, StyleSheet} from 'react-native';
import DayComponent from './DayComponent';
import {AppContext} from '../Context/Context';
import getDayOfWeek from '../Utils/getDayOfWeek';

export default function CalendarScrollViewComponent() {
  const {currentMonth, currentDay} = useContext(AppContext);
  const scrollViewRef = useRef<ScrollView>(null);

  useEffect(() => {
    // Scroll to today's date when the component mounts
    console.log(
      'CalendarScrollViewComponent useEffect.currentMonth -> ' +
        JSON.stringify(currentMonth) +
        '\ncurrentDay: ' +
        JSON.stringify(currentDay),
    );
    if (scrollViewRef.current && currentMonth && currentDay) {
      console.log('entered');
      if (currentDay && currentDay.day > 1) {
        const offset = (currentDay.day - 1) * (55 + 16); // Adjust based on your DayComponent's width and margin
        scrollViewRef.current.scrollTo({x: offset, animated: true});
      }
    }
  }, [currentMonth, currentDay]);

  if (!currentMonth) {
    return null; // Return null if currentMonth is not available
  }

  return (
    <ScrollView
      ref={scrollViewRef}
      horizontal={true}
      style={styles.scrollView}
      showsHorizontalScrollIndicator={false}>
      {/* I'm creating an array in here to make a Daycomponent for each day that exists in the month */}
      {[...Array(currentMonth.totalDays)].map((_, index) => {
        // Calculate the day number
        const dayNumber = index;
        // If the day exists in the month, fetch it, if not create an empty new day
        const day = currentMonth.days?.find(d => d.day === dayNumber) || {
          day: dayNumber,
          dayOfTheWeek: getDayOfWeek(
            currentMonth.year,
            currentMonth.name,
            dayNumber,
          ),
          id: dayNumber + ':' + currentMonth.name,
          tasks: [],
        };

        return (
          <DayComponent
            key={index} // Ensure unique keys for each DayComponent
            day={day} // Pass the day object to the DayComponent
          />
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    maxHeight: 60, // Adjust the max height as needed
    minHeight: 60,
    marginTop: 10,
    marginLeft: 10,
    marginBottom: 20,
  },
});
