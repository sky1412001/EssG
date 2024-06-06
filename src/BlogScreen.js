import React from "react";
import { SafeAreaView, TouchableOpacity, View, Text, Image, ImageBackground, StatusBar, StyleSheet } from "react-native";
import COLORS from "./COLORS";
import LottieView from 'lottie-react-native';
const BlogScreen = ({navigation, route}) =>{
    const Data = route.params
    return(
        <SafeAreaView style={{flex: 1, backgroundColor:'#FBFFFF'}}>
        <StatusBar translucent backgroundColor="rgba(0,0,0,0)"/>
        <ImageBackground style={{flex: 0.7}} source={Data.image}>
          <View style={style.header}>
            <TouchableOpacity onPress={navigation.goBack}>
              <Image source={require('./Logo/back.png')} style={{width:20, height:20}}/>
            </TouchableOpacity>
          </View>
          <View style={style.imageDetails}>
            <Text
              style={{
                width: '70%',
                fontSize: 30,
                fontWeight: 'bold',
                color: COLORS.primary,
                marginBottom: 20,
              }}> 
              {Data.name}
            </Text>
          
          </View>
        </ImageBackground>
        <View style={style.detailsContainer}>
          <Text style={{color:COLORS.primary, fontFamily:'Poppins-Bold'}}>{Data.title}</Text>
          <Text style={{marginTop: 20, lineHeight: 22,fontWeight:'700', color:COLORS.primary, }}>{Data.About}</Text>
          <Text style={{color:'black', fontFamily:'Poppins-Regular', fontSize:12}}>{Data.message}</Text>
        </View>
        <View style={style.footer}>
          <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
         <Text style={{color:'white', fontWeight:"700", textDecorationLine:'underline', fontSize:20}}>{Data.rate}</Text>
          </View>
          <TouchableOpacity onPress={()=>navigation.navigate('Contact')}>
          <View style={{backgroundColor:"white", alignItems:'center', justifyContent:'center', padding:10, borderRadius:20}}><Text style={{fontSize:16, fontWeight:"700", color:COLORS.primary}}>Register now</Text></View>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    )
}
export default BlogScreen;
const style = StyleSheet.create({
    bookNowBtn: {
      height: 50,
      width: 150,
      backgroundColor: COLORS.white,
      borderRadius: 10,
      justifyContent: 'center',
      alignItems: 'center',
    },
    iconContainer: {
      height: 60,
      width: 60,
      position: 'absolute',
      top: -30,
      backgroundColor: COLORS.white,
      borderRadius: 30,
      right: 20,
      elevation: 10,
      justifyContent: 'center',
      alignItems: 'center',
    },
    detailsContainer: {
      top: -30,
      borderTopLeftRadius: 30,
      borderTopRightRadius: 30,
      paddingVertical: 40,
      paddingHorizontal: 20,
      backgroundColor: COLORS.white,
      flex: 0.8,
    },
    header: {
      marginTop: 60,
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingHorizontal: 20,
    },
    imageDetails: {
      padding: 20,
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: '100%',
      position: 'absolute',
      bottom: 30,
    },
    footer: {
      flexDirection: 'row',
      backgroundColor: COLORS.primary,
      height: 70,
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: 20,
      borderTopLeftRadius: 15,
      borderTopRightRadius: 15,
    },
  });