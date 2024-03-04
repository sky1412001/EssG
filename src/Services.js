import React,{useState, useRef, useEffect} from "react";
import { ScrollView, View, Text, StatusBar , Image, SafeAreaView, TouchableOpacity,FlatList, Dimensions, ImageBackground} from "react-native";
import COLORS from "./COLORS";
const glode = require("./Logo/glode.png");
import Service from "./Service";


const Services = ({navigation}) =>{
  const Card = ({Service})=>{
    return(
   <TouchableOpacity onPress={()=>navigation.navigate('PostLandingForm', Service)} >
    <View style={{flexDirection:'row', padding:8, margin:8, backgroundColor:'white', elevation:5, borderRadius:10}}>
      <Image source={Service.image} style={{width:70, height:70, borderRadius:50, margin:10,}}/>
      <View style={{flexDirection:'column'}}>
      <Text style={{fontSize:17, fontFamily:'Poppins-Bold', color:'black'}}>{Service.title}</Text>
      <Text style={{fontSize:12, fontFamily:'Poppins-regular', color:'gray'}}>{Service.info}</Text>
      </View>
    </View>
   </TouchableOpacity>
    )
  }
return(
  <ScrollView>
  <SafeAreaView>
    <ImageBackground source={require('./Home/postback.png')} style={{height:190}}>
    
    </ImageBackground>
    <View style={{marginTop:10}}>
    <FlatList
        keyExtractor={(item) => item.id}
        contentContainerStyle={{paddingLeft: 11, paddingBottom: 20}}
        showsVerticalScrollIndicator={true}
        data={Service}
        renderItem={({item}) => <Card Service={item}/>}
        />
         </View>
  </SafeAreaView>
  </ScrollView>

)
}

export default Services;