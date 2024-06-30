import React, {useEffect} from 'react';
import {View, ActivityIndicator, StyleSheet, Image, Text} from 'react-native';

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
      <Image
        source={require('../../assets/Image/round_logo.png')}
        style={styles.logo}
      />
      <ActivityIndicator
        size="large"
        color="black"
        style={{marginBottom: 20}}
      />
      <Text style={styles.text}>Loading</Text>
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
    width: 200,
    height: undefined,
    aspectRatio: 1,
    marginBottom: 20,
  },
  text: {fontFamily: 'Gilroy-Black', color: 'black', fontSize: 20},
});

export default LoadingScreen;
