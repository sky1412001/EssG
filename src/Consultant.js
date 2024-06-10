import React from 'react';
import {SafeAreaView, Text, View, Image, ScrollView, FlatList, Dimensions, TouchableOpacity, ImageBackground} from 'react-native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from 'react-native-responsive-screen';
  import {Rating} from 'react-native-stock-star-rating';
import COLORS from './COLORS';
import Dataco from './Data';
const Consultant = ({navigation}) => {
    const {width} = Dimensions.get('screen');
  const Consultant = ({Dataco}) => {
    return (
      <View
        style={{
          backgroundColor: 'white',
          padding: wp('2.9%'),
          margin: wp('1.5%'),
          elevation: 1,
          borderRadius: 10,
          width: Dimensions.get('window').width - 40,
          height: 100,
          flexDirection: 'row',
        }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: '60%',
          }}>
          <View>
            <Image
              source={Dataco.image}
              style={{
                width: wp('18%'),
                height: hp('9%'),
                borderRadius: hp('5%'),
              }}
            />
          </View>
          <View>
            <Text
              style={{
                fontSize: hp('1.7%'),
                color: '#222',
                fontFamily: 'Poppins-Bold',
              }}>
              {Dataco.name}
            </Text>
            <Text
              style={{
                fontSize: hp('1.3%'),
                color: '#222',
                fontFamily: 'Poppins-Regular',
              }}>
              {Dataco.about}
            </Text>
            <Rating
              stars={Dataco.rating}
              maxStars={5}
              size={14}
              color={'#0466C8'}
            />
          </View>
          <View>
          </View>
        </View>
        <View
          style={{
            width: '40%',
            alignItems: 'flex-end',
            justifyContent: 'space-between',
          }}>
          <Text style={{color: 'green', fontWeight: '700'}}>{Dataco.rate}</Text>
          <Text
            style={{
              color: COLORS.primary,
              fontSize: 11,
              fontWeight: '600',
              textDecorationLine: 'underline',
            }}>
            9:00AM TO 1:00PM
          </Text>
          <View
            style={{
              backgroundColor: COLORS.primary,
              padding: 4,
              borderRadius: 5,
            }}>
            <TouchableOpacity
              onPress={() => navigation.navigate('DeatailScreen', Dataco)}>
              <Text
                style={{
                  fontFamily: 'Poppins-Bold',
                  color: COLORS.light,
                  fontSize: 10,
                }}>
                View Profile
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      <ImageBackground source={require('./OnLogo/backicon.png')} style={{
          height: 270,
          backgroundColor: COLORS.primary,
          justifyContent: 'center',
          alignItems: 'flex-start',
          padding: 20,
        }}>
      <View>
            <View>
                <TouchableOpacity onPress={()=>navigation.goBack()}>
                <Image source={require('./Logo/back.png' )} style={{width:23, height:23, bottom:35}}/>
                </TouchableOpacity>
                </View>
        <View>
          <Text
            style={{
              fontFamily: 'Poppins-Bold',
              color: COLORS.light,
              fontSize: 28,
            }}>
            Our Top
          </Text>
          <Text
            style={{
              fontFamily: 'Poppins-Bold',
              color: COLORS.light,
              fontSize: 29,
            }}>
            Consultants
          </Text>
        </View>
      </View>
      </ImageBackground>
      <View
        style={{
          backgroundColor: 'white',
          top: -25,
          borderTopLeftRadius: 25,
          borderTopRightRadius: 25,
        }}>


<View style={{ justifyContent:'center', alignItems:'center', marginTop:20}}>
            <FlatList
              snapToInterval={width - 40}
              keyExtractor={item => item.id}
              contentContainerStyle={{ paddingBottom: 2}}
              showsHorizontalScrollIndicator={false}
              data={Dataco}
              renderItem={({item}) => (
                <Consultant Dataco={item} navigation={navigation}/>
              )}
            />
          </View>
        </View>
    </SafeAreaView>
  );
};
export default Consultant;
