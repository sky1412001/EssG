import React from "react";
import { SafeAreaView, View, Text, Image, TouchableOpacity, StatusBar } from "react-native";
import COLORS from "./COLORS";

const Notification =({navigation}) =>{
    return(
        <SafeAreaView style={{flex:1}}>
            <StatusBar backgroundColor={COLORS.primary} />
            <View style={{flex:0.1, padding:10, flexDirection:'row',alignItems:'center', gap:20, elevation:1, backgroundColor:'white', marginTop:10}}>
               <TouchableOpacity onPress={()=>navigation.goBack()}>
                <Image source={require('./Logo/backon.png')} style={{width:25, height:25}}/>
               </TouchableOpacity>
                <Text style={{fontFamily:'Poppins-Regular', fontSize:18, color:COLORS.dark}}>Notifications</Text></View>
            <View style={{flex:0.8, justifyContent:'center', alignItems:'center'}}>
                <Image source={require('./Logo/empty.png')} style={{width:50, height:50}}/>
                <Text style={{fontFamily:'Poppins-Regular', color:'grey'}}>No Notification</Text></View>
        </SafeAreaView>
    )
}
export default Notification;