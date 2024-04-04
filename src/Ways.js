import React,{useState,useEffect} from "react";
import {SafeAreaView, StyleSheet,View, Image, Text, Pressable, Touchable, TouchableOpacity, ImageBackground, StatusBar,ActivityIndicator} from "react-native";
const imail = require('../Auth/icons/lock.png');
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import COLORS from "./COLORS";

const Ways = ({navigation}) =>{
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 2000);
    return () => clearTimeout(timeout);
  }, []);
  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={COLORS.primary}/>
      </View>
    );
  }
  const Stack = createNativeStackNavigator()
    return (
      <SafeAreaView style={{flex:1, backgroundColor:'white'}}>
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
           <TouchableOpacity onPress={()=>navigation.navigate('Guide')} style={{borderRadius:10,backgroundColor:'#B21E35', width:'50%', height:50, alignItems:'center', justifyContent:'center'}}>
            <Text style={{color:'white', fontSize:15, fontFamily:'Poppins-Bold'}}>Guide</Text>
           </TouchableOpacity>
           <View style={{flexDirection:'row', justifyContent:'space-evenly', alignItems:'flex-end', marginTop:180, gap:40}}>
           <TouchableOpacity onPress={()=>navigation.navigate('Chat')} style={{flexDirection:'row',borderWidth:1.6,borderColor:COLORS.primary,borderRadius:10,backgroundColor:'white', width:'35%', height:50, alignItems:'center', justifyContent:'space-evenly'}}>
          <View style={{alignItems:'center',justifyContent:'center'}} >
           <Image source={require('./Home/com.png')} style={{width:20, height:20}} />
          </View>
            <Text style={{color:COLORS.primary, fontSize:13, fontFamily:'Poppins-Bold'}}>Contact us</Text>
           </TouchableOpacity>
           <TouchableOpacity onPress={()=>navigation.navigate('About')} style={{borderColor:COLORS.primary,borderWidth:2,borderRadius:10,backgroundColor:'white', width:'35%', height:50, alignItems:'center', justifyContent:'space-evenly', flexDirection:'row'}}>
           <View style={{alignItems:'center',justifyContent:'center'}}>
          <Image source={require('./Home/about.png')} style={{width:20, height:20}} />
          </View>
            <Text style={{color:COLORS.primary, fontSize:13, fontFamily:'Poppins-Bold'}}>About us</Text>
           </TouchableOpacity>
           </View>
        </View>
        </SafeAreaView>
    )
}
export default Ways;
const styles = StyleSheet.create({
    title: {
        fontSize: 27,
        fontFamily:'Poppins-Bold',
        color: '#1d1d1d',
        marginBottom: 5,
        textAlign: 'center',
      },
      subtitle: {
        fontSize: 15,
        fontFamily:'Poppins-Regular',
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
      loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      },
})
