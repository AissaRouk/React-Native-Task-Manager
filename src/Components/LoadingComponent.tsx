import React, {useEffect} from 'react';
import {View, ActivityIndicator, StyleSheet, Image} from 'react-native';

const LoadingScreen = ({
  setIsLoading,
}: {
  setIsLoading: (boolean: boolean) => void;
}) => {
  useEffect(() => {
    // Simulate some loading time (replace with your initialization logic)
    setTimeout(() => {
      setIsLoading(false);
    }, 2000); // Adjust the delay for your desired loading time
  }, []);

  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#00ff00" />
      <Image alt="Logo" src={require('../../assets/Image/round_logo.png')} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  logo: {
    width: 100,
    height: 100,
    marginTop: 20,
  },
});

export default LoadingScreen;
