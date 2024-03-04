import React from 'react';

import {Text, View, Image, StatusBar} from 'react-native';
const Study = require('./OnLogo/study.jpg');
const work = require('./OnLogo/work.jpg');
const settle = require('./OnLogo/settle.jpg')
const next = require('./OnLogo/next.png')
import Onboarding from 'react-native-onboarding-swiper';
import COLORS from './COLORS';
const Onboard = ({navigation}) => {

  const goToLogin=()=>{
    navigation.navigate('Navigator')
  }
  return (
    <Onboarding
    color='yellow'
    bottomBarColor='white'
    onSkip={goToLogin}
    onDone={goToLogin}
    skipLabel={<Text  style={{fontFamily:'Poppins-Medium', color:COLORS.primary, textDecorationLine:'underline'}}>SKIP</Text>}
    nextLabel={<Text  style={{fontFamily:'Poppins-Medium', color:COLORS.primary,textDecorationLine:'underline'}}>NEXT</Text>}
      pages={  
        [   
        { 
          backgroundColor: 'white',
          image: <Image source={Study} style={{width: 300, height: 240}} />,
          title: (
            <Text
              style={{
                fontSize: 40,
                color: '#0466C8',
                fontFamily: 'Poppins-Bold',
              }}>
              STUDY
            </Text>
          ),
          subtitle: (
            <Text
              style={{
                fontSize: 17,
                fontFamily: 'Poppins-Medium',
                color: 'black',
              }}>
              Get Ready for your Student<Text style={{fontFamily:"Poppins-Bold",color:'#0466C8'}}> Visa</Text>
            </Text>
          ),
        },
        {
          backgroundColor: 'white',
          image: <Image source={work} style={{width: 300, height: 250}} />,
          title: (
            <Text
              style={{
                fontSize: 40,
                color: '#0466C8',
                fontFamily: 'Poppins-Bold',
              }}>
              WORK
            </Text>
          ),
          subtitle: (
            <Text
              style={{
                fontSize: 17,
                fontFamily: 'Poppins-Medium',
                color: 'black',
              }}>
              Your work visa story begins<Text style={{fontFamily:"Poppins-Bold", color:COLORS.primary}}> NOW!</Text>
            </Text>
          ),
        },
        {
          backgroundColor: 'white',
          image: <Image source={settle} style={{width: 300, height: 250}} />,
          title: (
            <Text
              style={{
                fontSize: 40,
                color: '#0466C8',
                fontFamily: 'Poppins-Bold',
              }}>
              Settle
            </Text>
          ),
          subtitle: (
            <Text
              style={{
                fontSize: 17,
                fontFamily: 'Poppins-Medium',
                color: 'black',
              }}>
              Your Citizenship visa story begin!
            </Text>
          ),
        },
      ]}
    />
  );
};
export default Onboard;

