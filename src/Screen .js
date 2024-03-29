import React, { useState } from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  Pressable
} from 'react-native';
import COLORS from './COLORS';
import {Rating} from 'react-native-stock-star-rating';
const heart1 = require('./Logo/heart1.png')
const heart2 = require('./Logo/heart2.png')
const Screen = ({navigation, route}) => {
  const [like, setLike] =useState(false);
  const giveLike = () => {
    setLike(!like)
  }
  const Offices = route.params;
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: COLORS.white}}>
      <StatusBar translucent backgroundColor="rgba(0,0,0,0)"/>
        <Image source={Offices.image} style={{width:'100%', height:220, marginTop:30}}/>
        <View style={style.header}>
        <View style={style.imageDetails}>
          <Text
            style={{
              width: '70%',
              fontSize: 30,
              fontWeight: 'bold',
              color: COLORS.primary,
              marginBottom: 20,
            }}> 
          </Text>
          <View style={{flexDirection: 'row'}}>
            <Text
              style={{color: COLORS.white, fontWeight:'bold', fontSize: 20}}>
            </Text>
          </View>
        </View>
        </View>
      <View style={style.detailsContainer}>
        <View style={style.iconContainer}>
          <TouchableOpacity onPress={giveLike}>
          <Image  source={like ? heart1 : heart2} style={{width:30, height:30}}/>
          </TouchableOpacity>
        </View>
        <Text style={{marginTop: 20, lineHeight: 22, fontFamily:'Poppins-Bold', color:COLORS.primary}}>{Offices.about}</Text>
        <Rating stars={Offices.rating} maxStars={5} size={18} color={'#0466C8'}/>
        <Text style={{color:'black', fontFamily:'Poppins-Regular'}}>{Offices.description}</Text>
        <Text style={{color:'black', fontFamily:'Poppins-Regular'}}>{Offices.detail}</Text>
      </View>
      <View style={style.footer}>
        <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
       <Text style={{color:'white', fontWeight:"700", textDecorationLine:'underline', fontSize:20}}>{Offices.rate}</Text>
        </View>
        <TouchableOpacity>
        <View style={{backgroundColor:"white", alignItems:'center', justifyContent:'center', padding:10, borderRadius:20}}><Text style={{fontSize:16, fontWeight:"700", color:COLORS.primary}}>CALL NOW</Text></View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};
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
    top: -50,
    backgroundColor: COLORS.white,
    borderRadius: 30,
    right: 20,
    elevation: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  detailsContainer: {
    top: -32,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingVertical: 40,
    paddingHorizontal: 20,
    backgroundColor: COLORS.white,
    flex: 1,
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
export default Screen;