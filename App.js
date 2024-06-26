import 'react-native-gesture-handler';
import React from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "react-native";
import Splash from "./src/Splash";
import Onboard from "./src/Onboard";
import Login from "./Auth/Login";
import Signup from "./Auth/Signup";
import Student from "./Auth/Student";
import Ways from "./src/Ways";
import { Navigator, HomeScreen, DeatailScreen, PostLandingForm, Screen, FlagScreen,Chat, About, Blogs, BlogScreen, Guide, Notification, Consultant, News} from "./src";
import Status from "./Auth/Status";
import { AuthProvider, useAuth } from './src/AuthContext';
const Stack = createNativeStackNavigator();
const AppNavigator = () =>{
  const { isAuthenticated } = useAuth();
  return(
    <NavigationContainer>
    <StatusBar translucent backgroundColor='rgba(0,0,0,0)'/>
    <Stack.Navigator initialRouteName="Splash" screenOptions={{headerShown:false}}>
      <Stack.Screen name="Splash" component={Splash} />
      <Stack.Screen name="Onboard" component={Onboard} />
      <Stack.Screen name="Navigator" component={Navigator} screenOptions={{headerShown:false}}/>
      <Stack.Screen name="Signup" component={Signup} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="HomeScreen" component={HomeScreen}/>
      <Stack.Screen name="DeatailScreen" component={DeatailScreen}/>
      <Stack.Screen name= "PostLandingForm" component={PostLandingForm}/>
      <Stack.Screen name="Screen" component={Screen}/>
      <Stack.Screen name="Ways" component={Ways} />
      <Stack.Screen name="FlagScreen" component={FlagScreen} />
      <Stack.Screen name="Student" component={Student} />
      <Stack.Screen name="Status" component={Status} />
      <Stack.Screen name="Chat" component={Chat} />
      <Stack.Screen name="About" component={About} />
      <Stack.Screen name="Blogs" component={Blogs} />
      <Stack.Screen name="BlogScreen" component={BlogScreen} />
      <Stack.Screen name='Guide' component={Guide} />
      <Stack.Screen name='Notification' component={Notification} />
      <Stack.Screen name='Consultant' component={Consultant} />
      <Stack.Screen name='News' component={News} />
    </Stack.Navigator>
  </NavigationContainer>
  )
}

const App =()=>{
  return (
    <AuthProvider>
      <AppNavigator />
    </AuthProvider>
  );
}
export default App;
