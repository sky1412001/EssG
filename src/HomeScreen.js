import React, {useState, useEffect, useRef} from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
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
  ActivityIndicator
} from 'react-native';
import {Rating} from 'react-native-stock-star-rating';
const currentDate = new Date();
import COLORS from './COLORS';
import Dataco from './Data';
import Slider from './Slider';
import Fdata from './Fdata';
import Visa from './Visa';
const date = currentDate.getDate();
const {width} = Dimensions.get('screen');
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
  const [loading, setLoading] = useState(true);
  const flatlistRef = useRef();
  const screenWidth = Dimensions.get('window').width;
  const [activeIndex, setActiveIndex] = useState(0);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [checkValidEmail, setCheckValidEmail] = useState('');
  useEffect(() => {
  
    let interval = setInterval(() => {
      const nextIndex = (activeIndex + 1) % Slider.length;
      flatlistRef.current.scrollToIndex({
        index: nextIndex,
        animated: true,
      });
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
    if (re.test(text) || regex.test(text)) {
      setCheckValidEmail(false);
    } else {
      setCheckValidEmail(true);
    }
  };
  useEffect(() => {
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timeout);
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={COLORS.primary} />
      </View>
    );
  }
  const Nation = ({Fdata}) => {
    return (
      <TouchableOpacity
        onPress={() => navigation.navigate('FlagScreen', Fdata)}>
        <View style={{ padding:6}}>
          <View
            style={{
              gap: 7,
              padding: 15,
              borderRadius: 10,
              alignItems: 'center',
              justifyContent: 'space-between',
              marginTop: 4,
              flexDirection:'row',
              backgroundColor:'white'
            }}>
            <Image source={Fdata.image} style={{width: 20, height: 10}} />
            <Text style={{textAlign: 'center', color: COLORS.primary, fontSize: 12, fontFamily:'Poppins-Bold'}}>
              {Fdata.name}
            </Text>
          <View style={{backgroundColor:COLORS.primary, width:wp('5%')}}><Text style={{textAlign:'center',color:'white'}}>+</Text></View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };
  const Consultant = ({Dataco}) => {
    return (
      <View style={{backgroundColor:'white', padding:wp('2.9%'), margin:wp('1.5%'), elevation:1, borderRadius:10}}>
        <View style={{flexDirection:'row', width:wp('38%'),justifyContent:'space-evenly'}}>
          <View>
          <Image source={Dataco.image} style={{width:wp('17%'), height:hp('9%'),borderRadius:30}}/>
          </View>
          <View>
            <Text style={{fontSize:hp('1.6%'), color:'#222',fontFamily:'Poppins-Bold'}}>{Dataco.name}</Text>
            <Text style={{fontSize:hp('1.6%'), color:'#222', fontFamily:'Poppins-Regular'}}>{Dataco.about}</Text>
            <Rating stars={Dataco.rating} maxStars={5} size={12} color={'#0466C8'}/>
          </View>
        </View>
        <View  style={{flexDirection:'row', justifyContent:'space-between',padding:5}}>
          <View style={{justifyContent:'center', alignItems:'center'}}>
          <Text style={{color:COLORS.primary, fontWeight:'700'}} >
            {Dataco.rate}
          </Text>
          </View>
          <View style={{borderWidth:1, padding:3, borderColor:COLORS.primary, borderRadius:4}}>
            <TouchableOpacity onPress={()=>navigation.navigate('DeatailScreen', Dataco)}>
              <Text style={{color:COLORS.primary,fontFamily:'Poppins-Regular', fontSize:12}}>See more</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };
  const RecommendedCard = ({Slider}) => {
    return (
      <TouchableOpacity onPress={() => navigation.navigate('Screen', Slider)}>
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
          </View>
        </ImageBackground>
      </TouchableOpacity>
    );
  };
  const Services = ({Visa}) =>{
    return(
      <SafeAreaView style={styles.container}>
      <View style={styles.card}>
        <View style={styles.content}>
          <Image source={Visa.image} style={styles.image} />
          <View style={styles.textContainer}>
            <Text style={styles.title}>{Visa.title}</Text>
            <Text style={styles.subtitle}>{Visa.sub}</Text>
          </View>
        </View>
        <TouchableOpacity onPress={()=>navigation.navigate('PostLandingForm', Visa)}>
        <View style={{backgroundColor:COLORS.primary, width:20,alignItems:'center', justifyContent:'center', marginHorizontal:wp('35%'), borderRadius:2}}>
          <Text style={{color:'white'}}>+</Text>
        </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
    )
  }
  return (
    <ScrollView>
      <View
        style={{
          borderBottomLeftRadius: 15,
          borderBottomRightRadius: 15,
          elevation: 10,
        }}>
          <View style={styles.header}>
            <StatusBar translucent backgroundColor="rgba(0,0,0,0)" />
            <View>
              <View style={{gap:-4}}>
                <View style={{flexDirection: 'row'}}></View>
                <Text style={styles.date}>Today {`${monthName} ${date}`}</Text>
                <View style={{flexDirection: 'column', gap: -9, marginTop: 4}}>
                  <Text style={styles.heading}>Find your</Text>
                  <Text style={styles.heading}>Immigration Consultant</Text>
                </View>
              </View>
            </View>
          </View>
      </View>
      <View style={{marginTop: 10}}>
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
        <Text style={styles.sectionTwo}>Popular Consultant</Text>
      </View>
      {/*Popular Consultant CARD*/}
      <View style={{marginTop: 2, backgroundColor: '#EDF2FB'}}>
        <FlatList
          snapToInterval={width - 45}
          keyExtractor={item => item.id}
          contentContainerStyle={{paddingLeft: 11, paddingBottom: 2}}
          showsHorizontalScrollIndicator={false}
          horizontal
          data={Dataco}
          renderItem={({item}) => (
            <Consultant Dataco={item} navigation={navigation}/>
          )}
        />
      </View>
      <View>
        <Text style={{marginHorizontal: 15, fontFamily:'Poppins-Bold', color: 'grey'}}>
          Our Offices
        </Text>
      </View>
      <View style={{backgroundColor: '#EDF2FB', marginTop: 5, padding:3}}>
        <FlatList
          snapToInterval={width - 20}
          keyExtractor={item => item.id}
          contentContainerStyle={{paddingLeft: 10}}
          showsHorizontalScrollIndicator={false}
          horizontal
          data={Fdata}
          renderItem={({item}) => (
            <Nation Fdata={item} navigation={navigation} />
          )}
        />
      </View>
      <View>
        <Text style={{marginHorizontal: 15, fontFamily:'Poppins-Bold', color: 'grey'}}>Our Services</Text>
      </View>
      <View style={{backgroundColor: '#EDF2FB', marginTop: 5, elevation: 1}}>
        <FlatList
          snapToInterval={width - 20}
          keyExtractor={item => item.id}
          contentContainerStyle={{paddingLeft: 10}}
          showsHorizontalScrollIndicator={false}
          horizontal
          data={Visa}
          renderItem={({item}) => (
            <Services Visa={item} navigation={navigation} />
          )}
        />
      </View>
    </ScrollView>
  );
};
export default HomeScreen;
const styles = StyleSheet.create({
  header:{
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    height: hp('17.5%'),
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor:COLORS.primary
  },
  date: {
    marginTop: 10,
    fontSize: 15,
    color: 'white',
    fontFamily: 'Poppins-Bold',
  },
  heading: {
    fontFamily:"Poppins-Bold",
    fontSize: hp('2.2%'),
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
    fontFamily:'Poppins-Bold',
    marginHorizontal: 15,
    color: 'grey',
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
  redDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  activeDot: {
    backgroundColor: COLORS.primary,
  },
  inactiveDot: {
    backgroundColor: 'rgba(0,0,0,0)',
    borderWidth: 1,
    borderColor: 'grey',
  },
  container: {
    flex: 1,
    padding: wp('1.2%'),
    margin: wp('1.7%'),
  },
  card: {
    backgroundColor: 'white',
    width: wp('40%'), // adjust as needed
    height: hp('10%'), // adjust as needed
    padding: wp('2%'),
    borderRadius: wp('2%'),
    elevation: 1,
  },
  content: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  image: {
    width: wp('7%'), // adjust as needed
    height: wp('7%'), // adjust as needed
  },
  textContainer: {
    flex: 1,
    marginLeft: wp('1%'),
    justifyContent: 'center',
  },
  title: {
    fontSize: wp('2.5%'), // adjust as needed
    color: '#222',
    fontFamily:'Poppins-Regular'
  },
  subtitle: {
    fontSize: wp('2%'), // adjust as needed
    color:COLORS.primary,
    fontWeight: '700',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
