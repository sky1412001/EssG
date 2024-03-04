import React from "react";
import {SafeAreaView, StyleSheet,View, Image, Text, Pressable, Touchable, TouchableOpacity, ImageBackground} from "react-native";
const imail = require('../Auth/icons/lock.png');
import { createNativeStackNavigator } from "@react-navigation/native-stack";


const Ways = ({navigation}) =>{
  const Stack = createNativeStackNavigator()
    return(
      <SafeAreaView style={{flex:1}}>
        <ImageBackground source={require('./Postdata/formBack.png')} style={{flex:1}}>
          <View style={styles.header}>
          <Image source={imail} style={styles.headerImg} />
          <Text style={styles.title}>
            WELCOME TO <Text style={{color: '#075eec'}}>ESS GLOBAL</Text>
          </Text>
          <Text style={styles.subtitle}>FIND NEW LIFE IN OVERSEAS</Text>
        </View>
        <View style={{flexDirection:'column',justifyContent:'space-between', alignItems:'center', gap:20}}>
           <TouchableOpacity onPress={()=>navigation.navigate('Student')} style={{borderRadius:10,backgroundColor:'#075eec', width:'50%', height:50, alignItems:'center', justifyContent:'center'}}>
            <Text style={{color:'white', fontSize:15, fontFamily:'Poppins-Bold'}}>Public Login</Text>
           </TouchableOpacity>
           <TouchableOpacity onPress={()=>navigation.navigate('Login')} style={{borderRadius:10,backgroundColor:'#B21E35', width:'50%', height:50, alignItems:'center', justifyContent:'center'}}>
            <Text style={{color:'white', fontSize:15, fontFamily:'Poppins-Bold'}}>Login with Gmail</Text>
           </TouchableOpacity>
        </View>
        </ImageBackground>
        </SafeAreaView>
    )
}
export default Ways;
const styles = StyleSheet.create({
    title: {
        fontSize: 27,
        fontWeight: '700',
        color: '#1d1d1d',
        marginBottom: 5,
        textAlign: 'center',
      },
      subtitle: {
        fontSize: 15,
        fontWeight: '500',
        color: '#929292',
        textAlign: 'center',
      },
      header: {
        marginVertical: 36,
      },
      headerImg: {
        width: 60,
        height: 60,
        alignSelf: 'center',
      },
})
