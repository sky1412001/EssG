import React from 'react';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createDrawerNavigator } from '@react-navigation/drawer';
import HomeScreen from './HomeScreen';
import {Image, Pressable, SafeAreaView, Text, View} from 'react-native';
import Form from './Form';
import Services from './Services';
import COLORS from './COLORS';
import Profile from './Profile';
import Login from '../Auth/Login';
import Ways from './Ways';
const home = require('./Tabicon/home.png');
const commu = require('./Tabicon/commu.png');
const files = require('./Tabicon/files.png');
const profile = require('./Tabicon/profile.png');
const contact = require('./Tabicon/contact.png');
const Stack = createNativeStackNavigator();
const Navigator = () => {
  const Tab = createMaterialBottomTabNavigator();
  return (
       <Tab.Navigator
      initialRouteName="HomeScreen"
      barStyle={{ backgroundColor: 'white', height:60}}
      inactiveColor='rgba(0,0,0,0)'
      activeColor="rgba(0,0,0,0)"
      activeIndicatorStyle={{
      height:60,
      width:65,
      backgroundColor:'rgba(0,0,0,0)',
      borderTopWidth:7,
      borderColor:COLORS.primary,
      borderRadius:0,
      }}
      screenOptions={{
        tabBarStyle: {
          height: 50   
        },
      }}>
      <Tab.Screen  options={{ tabBarIcon: () => (
      <Image source={home} style={{width: 30, height: 30}}/>  
          ),
        }}
        name="HomeScreen"
        component={HomeScreen}
      />
      <Tab.Screen
        options={{
          tabBarIcon: () => (
            <Image source={commu} style={{width: 30, height: 30}}/>
          ),
        }}
        name="Services"
        component={Services}
      />
      <Tab.Screen
        options={{
          tabBarIcon: () => (
            <Image source={contact} style={{width: 30, height: 30}}/>
          ),
        }}
        name="Contact us"
        component={Form}
      />
        <Tab.Screen
        options={{
          tabBarIcon: () => (
          <Image source={profile} style={{width: 30, height: 30}}/>
          ),
        }}
        name="Ways"
        component={Ways}
      />  
    </Tab.Navigator> 
   
  );
};
export default Navigator;


