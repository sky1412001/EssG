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
  const screenWidth = Dimensions.get('window').width;
  const [activeIndex, setActiveIndex] = useState(0);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const [email, setEmail] = useState('');
  const [checkValidEmail, setCheckValidEmail] = useState('')


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
  const Nation = ({Fdata})=> {
    return(
      <TouchableOpacity onPress={()=>navigation.navigate('FlagScreen', Fdata)}>
      <View style={{padding:3}}>
        <View  style={{gap:5,padding:13, backgroundColor:"white",borderRadius:10, elevation:3, alignItems:'center', justifyContent:'center'}}>
          <Image source={Fdata.image} style={{width:50, height:30}}/>
        <Text style={{textAlign:'auto'}}>{Fdata.name}</Text>
        </View>
        <View>
        </View>
      </View>
      </TouchableOpacity>
    )
  }
  const Consultant = ({Dataco}) =>{
    return(
      <TouchableOpacity onPress={()=>navigation.navigate('DeatailScreen', Dataco)}>

      <View style={styles.card}>
      <View style={{flexDirection:'column'}}>
      <Image source={Dataco.image} style={{width:75, height:75, borderRadius:50}}/>
        </View>
        <View style={{justifyContent:"center", alignItems:'center'}}>
          <Text style={styles.name}>{Dataco.name}</Text>
          <Rating stars={Dataco.rating} maxStars={5} size={13} color={'#FFD700'}/>
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
<ImageBackground style={{flex:1,height: hp('17%'), elevation:5}} source={require('./Home/header.png')}>
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
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <Text style={styles.sectionTwo}>Popular consultant</Text>
      </View>
      {/*Popular Consultant CARD*/}
      <View style={{marginTop:2, backgroundColor:'white'}}>
        <FlatList
          snapToInterval={width - 45}
          keyExtractor={item => item.id}
          contentContainerStyle={{paddingLeft: 11, paddingBottom: 2}}
          showsHorizontalScrollIndicator={false}
          horizontal
          data={Dataco}
          renderItem={({ item }) => <Consultant Dataco={item} navigation={navigation}/>}
        />
      </View>
      <View>
        <Text style={{marginHorizontal:15, fontFamily:"Poppins-Bold", color:'grey'}}>Our Offices</Text>
      </View>
      <View style={{backgroundColor:'#FFFFFF'}}>
        <FlatList
          snapToInterval={width - 20}
          keyExtractor={item => item.id}
          contentContainerStyle={{paddingLeft: 10, paddingBottom: 7}}
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
    backgroundColor:'#fff',
    padding: 3,
    margin: 5,
    flex: 1,
    borderRadius: 5,
    borderColor:COLORS.primary,
    height:hp("15"),
    elevation:0.7
    
  },
  name: {
    fontFamily: 'Poppins-Regular',
    fontSize: 10,
    color: 'black',
    textAlign:'center'
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
    width: width - 20,
    height: 145,
    marginRight: 20,
    borderRadius: 10,
    overflow: 'hidden',
    padding: 10,
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
