import React, { useEffect, useRef } from 'react';
import { View, Image, Animated, StyleSheet, Easing } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
const Logo = require('./Logo/LOGO.png');

const Splash = ({ navigation }) => {
  const animatedValue = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    const checkOnboardingStatus = async () => {
      try {
        const onboardingShown = await AsyncStorage.getItem('onboardingShown');
        if (!onboardingShown) { 
          moveImage();
          const timeout = setTimeout(() => {
            navigation.navigate('Onboard');
          }, 3000);
          return () => {
            clearTimeout(timeout); 
            animatedValue.stopAnimation();
          };
        } else {
          navigation.navigate('Navigator');
        }
      } catch (error) {
        console.error('Error checking onboarding status:', error);
        navigation.navigate('Navigator');
      }
    };
    checkOnboardingStatus();
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
  });
  return (
    <View style={styles.container}>
      <Animated.Image
        source={Logo}
        style={[styles.image, { transform: [{ rotate: spin }]}]}
      />
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
