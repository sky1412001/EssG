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
import { Navigator, HomeScreen, DeatailScreen, PostLandingForm, Screen, FlagScreen,Chat, About, Blogs, BlogScreen} from "./src";
import Status from "./Auth/Status";

const App = () =>{
  const Stack = createNativeStackNavigator();
  return(
    <NavigationContainer>
    <StatusBar translucent backgroundColor='rgba(0,0,0,0)'/>
    <Stack.Navigator initialRouteName="Splash" screenOptions={{headerShown:false}}>
      <Stack.Screen name="Splash" component={Splash} />
      <Stack.Screen name="Onboard" component={Onboard} />
      <Stack.Screen name="Navigator" component={Navigator} screenOptions={{headerShown:false}}/>
      <Stack.Screen name="Student" component={Student} />
      <Stack.Screen name="Signup" component={Signup} />
      <Stack.Screen name="Ways" component={Ways} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="HomeScreen" component={HomeScreen}/>
      <Stack.Screen name="DeatailScreen" component={DeatailScreen}/>
      <Stack.Screen name= "PostLandingForm" component={PostLandingForm}/>
      <Stack.Screen name="Screen" component={Screen}/>
      <Stack.Screen name="FlagScreen" component={FlagScreen} />
      <Stack.Screen name="Status" component={Status} />
      <Stack.Screen name="Chat" component={Chat} />
      <Stack.Screen name="About" component={About} />
      <Stack.Screen name="Blogs" component={Blogs} />
      <Stack.Screen name="BlogScreen" component={BlogScreen} />

    </Stack.Navigator>
  </NavigationContainer>
  )
}
export default App;
