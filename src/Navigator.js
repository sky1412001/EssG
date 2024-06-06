import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './HomeScreen';
import { Text, Image } from 'react-native';
import Form from './Form';
import Blogs from './Blogs';
import COLORS from './COLORS';
import Icon from 'react-native-vector-icons/FontAwesome';
import Ways from './Ways';
import Status from '../Auth/Status'; // Ensure this is correctly imported
import { useAuth } from './AuthContext'; // Ensure this is correctly imported

const Tab = createBottomTabNavigator();

const Navigator = () => {
  const { isAuthenticated } = useAuth();

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          position: 'absolute',
          height: 55,
          padding: 14,
          margin:8,
          borderRadius:30
        },
      }}
      initialRouteName="HomeScreen"
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color, focused }) => (
            focused ? 
           
            <Image  source={require('./Tab/hom.png')} style =  {{width:focused ? 22 :22, height:focused ?22:22}}/>
            :
            <Icon
            name="home"
            size={focused ? 25 : 22} 
            color={focused ? COLORS.primary : 'grey'}
          /> 
          ),
          tabBarLabel: ({ focused }) => (
            <Text
              style={{
                fontFamily: 'Poppins-Regular',
                fontSize: focused ? 8 : 8,
                color: 'black',
              }}
            >
              Home
            </Text>
          ),
        }}
      />
      <Tab.Screen
        name="Blogs"
        component={Blogs}
        options={{
          tabBarIcon: ({ color, focused }) => (
            focused ? <Image source={require('./Tab/blogg.png')} style={{width:focused ? 27 :22, height:focused ?  27:22}}/>
           : <Icon
              name={ "file" }
              size={focused ? 25 : 22}
              color={focused ? COLORS.primary : 'grey'}
            />
          ),
          tabBarLabel: ({ focused }) => (
            <Text
              style={{
                fontFamily: 'Poppins-Regular',
                fontSize: focused ? 8 : 8,
                color: 'black',
              }}
            >
              Blogs
            </Text>
          ),
        }}
      />
      <Tab.Screen
        name="Contact"
        component={Form}
        options={{
          tabBarIcon: ({ color, focused }) => (
            focused ? <Image source={require('./Tab/form.png')} style={{width:focused ? 27 :22, height:focused ?27:22}} />
         :   <Icon
              name={"phone"}
              size={focused ? 25 : 24}
              color={focused ? COLORS.primary : 'grey'}
            />
          ),
          tabBarLabel: ({ focused }) => (
            <Text
              style={{
                fontFamily: 'Poppins-Regular',
                fontSize: focused ? 8 :8 ,
                color: 'black',
              }}
            >
              Contact us
            </Text>
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={isAuthenticated ? Status : Ways}
        options={{
          tabBarIcon: ({ color, focused }) => (
            focused ? <Image source={require('./Tab/uss.png')} style={{width:focused ? 27 :22, height:focused ?27:22}}/>
            :<Icon
              name={"users" }
              size={focused ? 25 : 22}
              color={focused ? COLORS.primary : 'grey'}
            />
          ),
          tabBarLabel: ({ focused }) => (
            <Text
              style={{
                fontFamily: 'Poppins-Regular',
                fontSize: focused ? 8 : 8,
                color: 'black',
              }}
            >
              User
            </Text>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default Navigator;