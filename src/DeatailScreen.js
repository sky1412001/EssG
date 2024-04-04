import React, { useState } from 'react';
import {
  ImageBackground,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  Linking
} from 'react-native';
import COLORS from './COLORS';
import {Rating} from 'react-native-stock-star-rating';
const heart1 = require('./Logo/heart1.png')
const heart2 = require('./Logo/heart2.png')
const DeatailScreen = ({navigation, route}) => {
  const [like, setLike] =useState(false);
  const giveLike = () => {
    setLike(!like)
  }
  const handlePhonePress = () => {
    Linking.openURL(`tel:${Fdata.phoneno}`);
  };
 const Data = route.params;
 const Fdata = route.params;
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: COLORS.white}}>
      <StatusBar translucent backgroundColor="rgba(0,0,0,0)"/>
      <ImageBackground style={{flex: 0.7}} source={Data.image}>
        <View style={style.header}>
          <TouchableOpacity onPress={navigation.goBack}>
            <Image source={require('./Logo/backon.png')} style={{width:25, height:25}}/>
          </TouchableOpacity>
        </View>
        <View style={style.imageDetails}>
          <Text
            style={{
              width: '70%',
              fontSize: 30,
              fontFamily:'Poppins-Bold',
              color: COLORS.primary,
              marginBottom: 20,
            }}> 
            {Data.name}
          </Text>
        </View>
      </ImageBackground>
      <View style={style.detailsContainer}>
        <View style={style.iconContainer}>
          <TouchableOpacity onPress={giveLike}>
          <Image  source={like ? heart1 : heart2} style={{width:30, height:30}}/>
          </TouchableOpacity>
        </View>
        <Text style={{marginTop: 20, lineHeight: 22, fontFamily:'Poppins-Bold', color:COLORS.primary}}>{Data.about}</Text>
        <Rating stars={Data.rating} maxStars={5} size={16} color={'#0466C8'}/>
        <Text style={{color:'black', fontFamily:'Poppins-Regular'}}>{Data.description}</Text>
        <Text style={{color:'black', fontFamily:'Poppins-Regular'}}>{Data.detail}</Text>
      </View>
      <View style={style.footer}>
        <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
       <Text style={{color:'white', fontWeight:"700", textDecorationLine:'underline', fontSize:20}}>{Data.rate}</Text>
        </View>
        <TouchableOpacity onPress={handlePhonePress}>
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
    flex: 0.3,
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
export default DeatailScreen;
