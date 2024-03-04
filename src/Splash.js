import React, { useEffect, useRef } from 'react';
import { View, Image, Animated, StyleSheet, Easing } from 'react-native';

const Logo = require('./Logo/LOGO.png');

const Splash = ({ navigation }) => {
  
  const animatedValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    moveImage();
    const timeout = setTimeout(() => {
      navigation.navigate('Onboard');
    }, 3000);
    return () => {
      clearTimeout(timeout); // Clear the timeout
      animatedValue.stopAnimation();
    };
  }, []);
  const moveImage = () => {
    Animated.loop(
      Animated.timing(animatedValue, {
        toValue: 1,
        duration: 3000,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();
  };

  const spin = animatedValue.interpolate({

    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'], 

    // Rotate from 0 to 360 degrees

  });

  // Calculate translateX and translateY based on the current angle of rotation
  
  return (
    <View style={styles.container}>
     
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#0466C8',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 100,
    height: 100,
  },
});

export default Splash;
