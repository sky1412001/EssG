import React from "react";
import { ScrollView,View, Text , FlatList, Image, SafeAreaView,Dimensions, TouchableOpacity} from "react-native";
import COLORS from "./COLORS";
import NewsData from "./NewsData";
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from 'react-native-responsive-screen';

const News = ({navigation}) =>{
    const {width} = Dimensions.get('screen');

    const NewsCart = ({NewsData}) =>{
        return(
            <SafeAreaView style={{padding:10}}>
            <View style={{flexDirection:"row",justifyContent:'space-around',  padding:10, backgroundColor:"white", elevation:1, width:width*0.95}}>
                <View style={{width:60, height:60}}>
                   
                <Image source={NewsData.img} style={{width:'100%', height:"100%"}}/>
                </View>
                <View style={{width:width* 0.7, height:80, justifyContent:"center", alignItems:"center"}}>
                <Text style={{fontFamily:'Poppins-Bold', color:"black", fontSize: width * 0.03}}>{NewsData.headline}</Text>
                </View>
            </View>
            </SafeAreaView>
        )
    }
    return(
        <SafeAreaView>
            <View style={{height:90,  justifyContent:"flex-start", padding:20, flexDirection:'row'}}>
                <View style={{justifyContent:'center', alignItems:'center', flexDirection:"row", gap:10}}>
<TouchableOpacity onPress={()=>navigation.goBack()}>

            <Image source={require('./Logo/backon.png')} style={{width:25, height:25}}/>
</TouchableOpacity>
                <Text style={{color:COLORS.primary, fontFamily:"Poppins-Bold", fontSize:20}}>
                    Immigartion News
                </Text>
                </View>
            </View>
            <FlatList
            keyExtractor={(item) => item.id.toString()}
            data={NewsData}
          renderItem={({ item }) => <NewsCart NewsData={item} />}
        />
        </SafeAreaView>
    )
}

export default News;