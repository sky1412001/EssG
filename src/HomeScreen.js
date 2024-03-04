import React, {useState, useEffect, useRef} from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Geolocation from '@react-native-community/geolocation';

import {
  View,
  Text,
  SafeAreaView,
  Image,
  StatusBar,
  TouchableOpacity,
  TouchableHighlight,
  ScrollView,
  Pressable,
  StyleSheet,
  Dimensions,
  FlatList,
  ImageBackground,
  Modal,
  Button,
} from 'react-native';
import {Avatar, TextInput} from 'react-native-paper';
import {Rating} from 'react-native-stock-star-rating';


const currentDate = new Date();
import COLORS from './COLORS';
import Dataco from './Data';
import Slider from './Slider';
import Fdata from './Fdata';
const date = currentDate.getDate();
const {width} = Dimensions.get('screen');

const edu = require('./Tabicon/edu.png');
const four = require('./Tabicon/four.png');
const six = require('./Tabicon/six.png');

const monthNames = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'June',
  'July',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];
const monthIndex = currentDate.getMonth();
const monthName = monthNames[monthIndex];

const HomeScreen = ({navigation}) => {

  const flatlistRef = useRef();
  // Get Dimesnions
  const screenWidth = Dimensions.get('window').width;
  const [activeIndex, setActiveIndex] = useState(0);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const [email, setEmail] = useState('');
  const [checkValidEmail, setCheckValidEmail] = useState('')

  // Auto Scroll

  useEffect(() => {
    let interval = setInterval(() => {
      // Calculate the next index to scroll to
      const nextIndex = (activeIndex + 1) % Slider.length;
      // Scroll to the next index
      flatlistRef.current.scrollToIndex({
        index: nextIndex,
        animated: true,
      });
      // Update the active index
      setActiveIndex(nextIndex);
    }, 3500);

    // Cleanup the interval on unmount or change of activeIndex

    return () => clearInterval(interval);

  }, [activeIndex]);
  const getItemLayout = (data, index) => ({
    length: screenWidth,
    offset: screenWidth * index,
    index: index,
  });

  const handleScroll = event => {
    const scrollPosition = event.nativeEvent.contentOffset.x;
    const index = Math.floor(scrollPosition / screenWidth);
    setActiveIndex(index);
  };
  const handleCheckEmail = text => {
    let re = /\$+@\$+\.\$+/;
    let regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    setEmail(text);
    if (re.test(text) || regex.test(text)){
      setCheckValidEmail(false);
    } else {
      setCheckValidEmail(true);
    }
  };

  // Recommended Card //
  const Nation = ({Fdata})=> {
    return(
      <TouchableOpacity onPress={()=>navigation.navigate('FlagScreen', Fdata)}>

      <View style={{padding:10}}>
        <View  style={{padding:20, backgroundColor:"white",borderRadius:10, elevation:3}}>
          <Image source={Fdata.image} style={{width:70, height:50}}/>
        </View>
        <View>
        </View>
      </View>


      </TouchableOpacity>
    )

  }
  
  const RecommendedCard = ({Slider}) => {
    return (
      <TouchableOpacity
        onPress={() => navigation.navigate('Screen', Slider)}>
        <ImageBackground style={styles.rmCardImage} source={Slider.image}>
          <Text
            style={{
              color: 'white',
              fontSize: 22,
              fontWeight: 'bold',
              marginTop: 10,
            }}></Text>
          <View
            style={{
              flex: 1,
              justifyContent: 'space-between',
              alignItems: 'flex-end',
            }}>
            <View style={{width: '100%', flexDirection: 'row', marginTop: 10}}>
              <View style={{flexDirection: 'row'}}>
                <Text style={{color: 'white', marginLeft: 5}}></Text>
              </View>
              <View style={{flexDirection: 'row'}}>
                <Text style={{color: 'white', marginLeft: 5}}></Text>
              </View>
            </View>
            <Text style={{color: 'white', fontSize: 13}}></Text>
          </View>
        </ImageBackground>
      </TouchableOpacity>
    );
  };
 
  return (
    <ScrollView>
      {/*Header with Date info */}
      <View style={{borderBottomLeftRadius:15, borderBottomRightRadius:15, elevation:10}}>

<ImageBackground style={{flex:1,height: hp('21%'), elevation:5}} source={require('./Home/header.png')}>
      <View style={styles.header}>
      <StatusBar translucent backgroundColor='rgba(0,0,0,0)'/>
        <View>
          <View>
            <View style={{flexDirection: 'row'}}>
            </View>
              <Text style={styles.date}>Today {`${monthName} ${date}`}</Text>
            <View style={{flexDirection:'column',gap:-8, marginTop:4}}>
            <Text style={styles.heading}>Find your</Text>
            <Text style={styles.heading}>Immigration Consultant</Text>
            </View>
          </View>
        </View>
        <View>
        </View>
      </View>
</ImageBackground>
      </View>
      {/*Our Services*/}
      <View style={{marginTop:10}}>
        <FlatList
          snapToInterval={width - 20}
          ref={flatlistRef}
          getItemLayout={getItemLayout}
          keyExtractor={item => item.id}
          contentContainerStyle={{paddingLeft: 11, paddingBottom: 20}}
          showsHorizontalScrollIndicator={false}
          horizontal
          data={Slider}
          onScroll={handleScroll}
          renderItem={({item}) => <RecommendedCard Slider={item} />}
        />
      
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-around',
          padding: 5,
          margin: 8,
        }}>
          <TouchableOpacity onPress={()=>setIsModalVisible(true)}>
        <View
          style={{
            backgroundColor: 'white',
            alignItems: 'center',
            justifyContent: 'center',
            width: 55,
            height: 55,
            elevation: 3,
            borderRadius: 10,
          }} >
          <Image source={edu} style={{width:35, height: 35}} />
        </View>
          </TouchableOpacity>
        <Modal
          visible={isModalVisible}
          transparent
          onRequestClose={() => setIsModalVisible(false)}
           animationType='slide'
          >
            <View style={{alignItems:"center", justifyContent:'flex-end', marginTop:30,}}>
              <ImageBackground source={require('./Postdata/formBack.png')} style={{flex:1}}>

              <View style={{backgroundColor:'#ffff',width:350, height:700, borderRadius:20, elevation:20}}>
                <View style={{borderWidth:2, width:70, borderColor:'grey', marginTop:10, alignSelf:'center'}}></View>
                <View style={{flexDirection:'row', justifyContent:'space-between'}}>
              <View style={{flexDirection:"row", alignItems:"center", justifyContent:'space-between', padding:10}}>
               <Text style={{textAlign:"center", fontSize:17, fontFamily:'Poppins-Bold', color:COLORS.primary}}>Apply Now</Text>
              </View>
              <View style={{alignSelf:'flex-end'}}>
               <TouchableOpacity onPress={()=>setIsModalVisible(false)}>
               <Image source={require('./Tabicon/cross.png')} style={{width:30, height:30,marginHorizontal:10}}/>
               </TouchableOpacity>

              </View>

                </View>
              <View  style={{alignItems:"center"}}>
              <Text style={{fontSize:17, fontFamily:'Poppins-Medium', color:'black'}}>Join our<Text style={{color:COLORS.primary, textDecorationLine:"underline"}}> Webinar</Text></Text>
              <TextInput  placeholder='Email' autoCorrect={false} value={email}   style={{width:270, height:50, marginTop:10, backgroundColor:'white'}} onChangeText={(text)=>handleCheckEmail(text)}/>
              <View>
              {checkValidEmail ?(
                <Text style={{color: 'red', textAlign: 'right'}}>
                  Invalid Email format
                </Text>
              ) : null}
            </View>
              </View>
              <TouchableOpacity disabled={email === '' || checkValidEmail}>
              <View style={{alignSelf:'center', borderWidth:1, padding:10,borderColor:COLORS.primary, marginTop:70, width:100, height:50, alignItems:'center', justifyContent:'center', borderRadius:10}}>
                <Text style={[
        { color: (email === ''  || checkValidEmail) ? 'red' : 'green' ,fontFamily:"Poppins-Bold" , fontSize:15}
    ]}>Submit</Text>
              </View>
              </TouchableOpacity>
              </View>
              </ImageBackground>
              </View>
              </Modal>
              <TouchableOpacity onPress={()=>setIsModalVisible(true)}>
          <View
          style={{
            backgroundColor: 'white',
            alignItems: 'center',
            justifyContent: 'center',
            width: 55,
            height: 55,
            elevation: 3,
            borderRadius: 10,
          }}>
          <Image source={four} style={{width: 30, height: 30}} />
        </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={()=>setIsModalVisible(true)}>
        <View
          style={{
            backgroundColor: 'white',
            alignItems: 'center',
            justifyContent: 'center',
            width: 55,
            height: 55,
            elevation: 3,
            borderRadius: 10,
          }}>
          <Image source={six} style={{width: 30, height: 30}}/>
        </View>
              </TouchableOpacity> 
      </View>
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <Text style={styles.sectionTwo}>Popular consultant</Text>
      </View>
      {/*Popular Consultant CARD*/}
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <View style={styles.card}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Avatar.Image size={80} source={Dataco[0]?.image} />
            <View style={{marginLeft: 10}}>
              <Text style={styles.name}>{Dataco[0]?.name}</Text>
              <Text style={styles.details}>{Dataco[0]?.about}</Text>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Rating
                  stars={Dataco[0]?.rating}
                  maxStars={5}
                  size={16}
                  color={'#0466C8'}
                />
              </View>
            </View>
          </View>
          <Text style={styles.charges}>{Dataco[0]?.rate}</Text>
          <TouchableOpacity
            onPress={() => navigation.navigate('Consultant')}>
            <View style={{alignItems: 'center', justifyContent: 'center'}}>
              <Text
                style={{
                  color: COLORS.primary,
                  fontWeight: '800',
                  textDecorationLine: 'underline',
                }}>
                SEE All
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
      <View>
        <Text style={{marginHorizontal:20, fontFamily:"Poppins-Bold", color:'grey'}}>Our Offices</Text>
      </View>
      <View style={{marginTop:3}}>
        <FlatList
          snapToInterval={width - 20}
          keyExtractor={item => item.id}
          contentContainerStyle={{paddingLeft: 11, paddingBottom: 20}}
          showsHorizontalScrollIndicator={false}
          horizontal
          data={Fdata}
          renderItem={({ item }) => <Nation Fdata={item} navigation={navigation}/>}
        />
      </View>
    </ScrollView>
  );
};

export default HomeScreen;
const styles = StyleSheet.create({
  header: {
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    height: hp('20%'),
    padding: 18,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  date: {
    marginTop:10,
    fontSize: 15,
    color: 'white',
    fontFamily:'Poppins-Medium'
  },
  heading: {
    fontFamily: 'Poppins-Bold',
    fontSize: hp('2.5%'),
    color: 'white',
  },
  sectionOne: {
    fontSize: 17,
    fontFamily: 'Poppins-Bold',
    padding: 10,
    color: '#0466C8',
  },
  sectionOneItems: {
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    gap: 17,
  },
  Items: {
    padding: 12,
    height: 80,
    width: 80,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },
  sectionTwo: {
    fontSize: 15,
    fontFamily: 'Poppins-Bold',
    marginHorizontal:15,
    color: 'grey',
  },
  card: {
    backgroundColor: '#FFFFFF',
    padding: 16,
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
    color: 'grey',
    textDecorationLine: 'underline',
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
    textDecorationLine: 'underline',
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
  time: {
    fontFamily: 'Poppins-Medium',
    color: 'black',
  },
  rmCardImage: {
    width: width - 20, // Adjust the padding and margin accordingly
    height: 190,
    marginRight: 20,
    borderRadius: 10,
    overflow: 'hidden',
    padding: 10,
    elevation: 2,
  },
  redDotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  
  },
  // Style for each red dot
  redDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  // Style for active red dot
  activeDot: {
    backgroundColor: COLORS.primary,
  },
  // Style for inactive red dot
  inactiveDot: {
    backgroundColor: 'rgba(0,0,0,0)',
    borderWidth:1,
    borderColor:'grey'
  },
});
