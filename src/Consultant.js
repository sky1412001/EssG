import React from "react";
import { SafeAreaView , View, Text, StyleSheet, ScrollView, FlatList, TouchableOpacity, ImageBackground, Image} from "react-native";
import COLORS from "./COLORS";
import {Avatar,} from 'react-native-paper';
import {Rating} from 'react-native-stock-star-rating';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from 'react-native-responsive-screen';

import Data from "./Data";
const Consultant = ({navigation}) =>{


    const Team = ({Data}) =>{
        return(
<TouchableOpacity onPress={()=>navigation.navigate('DeatailScreen', Data)}>
<ScrollView>
            <View style={styles.card}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Avatar.Image size={80} source={Data.image}/>
              <View style={{ marginLeft: 10 }}>
                <Text style={styles.name}>{Data.name}</Text>
                <Text style={styles.details}>{Data.about}</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center'}}>
                  <Rating stars={Data.rating} maxStars={5} size={16} color={'#0466C8'}/>
                </View>
              </View>
            </View>
            <Text style={styles.charges}>{Data.rate}</Text>
          </View>
</ScrollView>
</TouchableOpacity>
        )
    }
    return(
        <SafeAreaView>
          <ImageBackground source={require('./Home/header.png')} style={{height:90}}>
            <View style={{ padding:10, flexDirection:'row', padding:16, gap:10, marginTop:20}}>
              <TouchableOpacity  onPress={navigation.goBack}>
              <Image source={require('./Logo/backv.png')} style={{width:20, height:20, marginTop:3}}/>
              </TouchableOpacity>
                <Text  style={{fontFamily:'Poppins-Medium', fontSize:18, color:COLORS.light}}>
                    Popular Consultant
                </Text>
            </View>
          </ImageBackground>
          <FlatList
            keyExtractor={(item) => item.id}
            contentContainerStyle={{paddingLeft: 11, paddingBottom: 20}}
            showsVerticalScrollIndicator={true}
            data={Data}
            renderItem={({item}) => <Team Data={item}/>}
          />
        </SafeAreaView>
    )
}
export default Consultant;
const styles = StyleSheet.create({
    card: {
        backgroundColor: '#FFFFFF',
        padding: 15,
        margin: 10,
        flex: 1,
        borderRadius: 10,
        elevation: 5,
      },
      name: {
        fontFamily: 'Poppins-Medium',
        fontSize: 15,
        paddingLeft: 10,
        color: 'black',
      },
      details: {
        fontFamily: 'Poppins-Bold',
        fontSize: 10,
        paddingLeft: 10,
        color:'grey',
        textDecorationLine:'underline'
      },
      Rating: {
        fontFamily: 'Poppins-Bold',
        fontSize: 13,
        marginTop: 10,
        paddingLeft: 3,
      },
      charges: {
        fontFamily: 'Poppins-Bold',
        textAlign: 'right',
        fontSize: 15,
        color: 'black',
        textDecorationLine:'underline'
      },
      Timming: {
        backgroundColor: '#F0F4EF',
        width: wp('17%'),
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 20,
        elevation: 7,
        gap: 10,
      },
      button: {
        marginTop: 10,
        width: wp('45%'),
        height: hp('7%'),
        backgroundColor: '#0466C8',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 30,
        alignSelf: 'center',
        elevation: 2,
      },
})
