import React, {useState, useEffect, useRef} from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  View,
  Text,
  SafeAreaView,
  Image,
  StatusBar,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Dimensions,
  FlatList,
  ImageBackground,
  Animated,
  RefreshControl,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import LottieView from 'lottie-react-native';
import {Rating} from 'react-native-stock-star-rating';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useAuth } from '../src/AuthContext';
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
  const { isAuthenticated } = useAuth();
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [data, setData] = useState([]); // Your components data
  const [filteredData, setFilteredData] = useState([]); // Filtered data
  const flatlistRef = useRef();
  const screenWidth = Dimensions.get('window').width;
  const [activeIndex, setActiveIndex] = useState(0);
  const windowWidth = Dimensions.get('window').width;
  const [userName, setUserName] = useState('')
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const storedUserData = await AsyncStorage.getItem('userData');
        console.log('Stored User Data:', storedUserData);

        if (storedUserData) {
          const userData = JSON.parse(storedUserData);
          setUserName(userData.data.app_name);
        }
      } catch (error) {
        console.error('Error retrieving user data:', error);
      }
    };
    fetchUserData(); 
  }, []);
  const handleSearch = text => {
    const filteredData = data.filter(item => {
      const itemData = item.name.toUpperCase();
      const textData = text.toUpperCase();
      return itemData.indexOf(textData) > -1;
    }); 
    setSearchQuery(text);
    setData(filteredData);
  };

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
  useEffect(() => {
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 2000);
    return () => clearTimeout(timeout);
  }, []);
  if (loading) {
    return  <Skelton />;
  }
  const Nation = ({Fdata}) => {
    return (
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() => navigation.navigate('FlagScreen', Fdata)}>
        <View
          style={{
            width: width *0.25,
            height: width * 0.19,
            padding: 5,
            backgroundColor: 'white',
            margin: 5,
            borderRadius: 10,
            alignItems:'center', justifyContent:'center', gap:5,elevation:2
          }}>
            <Image source={Fdata.image} style={{width: 30, height: 20}} />
          <View>
            <Text
              style={{
                fontSize: 10,
                color: 'grey',
                fontFamily: 'Poppins-Bold',
              }}>
              {Fdata.name}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };
  const Consultant = ({Dataco}) => {
    return (
      <View
        style={{
          backgroundColor: 'white',
          padding: wp('2.5%'),
          margin: wp('1.3%'),
          elevation: 2,
          borderRadius: 7,
          width: Dimensions.get('window').width - 35,
          height: 100,
          flexDirection: 'row',
        }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'flex-start',
            width: '60%',
            gap:20, alignItems:'center'
            
          }}>
          <View>
            <Image
              source={Dataco.image}
              style={{
                width: wp('20%'),
                height: hp('10%'),
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
  const RecommendedCard = ({Slider}) => {
    return (
      <TouchableOpacity onPress={() => navigation.navigate('Screen', Slider)}>
        <ImageBackground
          style={styles.rmCardImage}
          source={Slider.image}>
          </ImageBackground>
      </TouchableOpacity>
    );
  };
  const Services = ({Visa}) => {
    return (
      <SafeAreaView style={styles.container}>
        <TouchableOpacity activeOpacity={0.8}
          onPress={() => navigation.navigate('PostLandingForm', Visa)}>
          <View style={styles.card}>
            <View style={styles.content}>
              <Image source={Visa.image} style={styles.image} />
              <View style={styles.textContainer}>
                <Text style={styles.title}>{Visa.title}</Text>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      </SafeAreaView>
    );
  };
  return (
    <ScrollView>

    <SafeAreaView style={{flex: 1, backgroundColor: '#FFFEFE',}}>
      <ImageBackground source={require('./Page/Homej.jpg') } 
       
        style={{padding: 24, tintColor:COLORS.primary}}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <View
            style={{
              flexDirection: 'column',
              justifyContent: 'space-between',
              marginTop: 9,
            }}>
            <Text
              style={{
                fontFamily: 'Poppins-Bold',
                color: COLORS.light,
                fontSize: 16,
              }}>
              {isAuthenticated ? `Hello, ${userName.split(' ')[0].replace(/[*()\[\]]/g, '')}` :`Today ${monthName} ${date}`}
            </Text>
            <View style={{flexDirection: 'column', gap: -5, marginTop: 6}}>
              <Text style={[styles.heading, {fontSize: 16}]}>Find your</Text>
              <Text style={[styles.heading, {fontSize: 16}]}>
                Immigration Consultant
              </Text>
            </View>
          </View>
          <View
            style={{
              backgroundColor: 'white',
              width: 36,
              height: 36,
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 10,
              marginTop:10
            }}>
            <TouchableOpacity
              onPress={() => navigation.navigate('Notification')}>
              <Image
                source={require('./OnLogo/bell.png')}
                style={{width: 30, height: 30}}
              />
            </TouchableOpacity>
          </View>
        </View>
        <View
          style={{
            backgroundColor: '#FBFFFF',
            opacity:0.8,
            borderRadius: 10,
            flexDirection: 'row',
            alignItems: 'center',
            top: 6,
            width: wp('88%'),
            height: wp('12%'),
            elevation:5
          }}>
          <View style={{marginLeft: 10}}>
            <Image
              source={require('./OnLogo/find.png')}
              style={{width: 25, height: 25}}
            />
          </View>
          <TextInput
            placeholderTextColor="#6b7280"
            placeholder="Search..."
            style={{fontWeight: '700', width: 120, color: 'grey'}}
            onChange={handleSearch}
            value={searchQuery.text}
          />
        </View>
      </ImageBackground>
        <View style={{backgroundColor:'snow', top:-10, borderTopLeftRadius:20, borderTopRightRadius:20, elevation:5}}>
          <View style={{marginTop: 20}}>
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
              borderLeftWidth: 7,
              borderColor: COLORS.primary,
              backgroundColor: COLORS.light,
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <Text style={styles.sectionTwo}>For you</Text>  
          </View>
          <View style={{flexDirection:"row", justifyContent:"space-around", padding:5,   backgroundColor: '#EDF2FB',}}>
            <View style={{gap:7}}>
            <View style={{width:80, height:60, backgroundColor:"white", elevation:2, alignItems:'center', justifyContent:'center', borderRadius:10}}>
              <Image source={require('./Page/passs.png')}  style={{width:35, height:35}}/>
            </View>
            <View style={{width:80, height:20, alignItems:'center', justifyContent:'center'}}>
          <Text style={{fontFamily:"Poppins-Bold", fontSize:10, color:COLORS.primary}}>Immigration</Text>
            </View>
            </View>
            <View style={{gap:7}}>
            <View style={{width:80, height:60, backgroundColor:"white", elevation:2, alignItems:'center', justifyContent:'center', borderRadius:10}}>
              <Image source={require('./Page/educate.png')}  style={{width:35, height:35}}/>
            </View>
            <View style={{width:80, height:20,  alignItems:'center', justifyContent:'center'}}>
          <Text style={{fontFamily:"Poppins-Bold", fontSize:10,color:COLORS.primary}}>Education</Text>
            </View>
            </View>
            <View style={{gap:7}}>
            <TouchableOpacity onPress={()=>navigation.navigate('News')} activeOpacity={0.9}>
            <View style={{width:80, height:60, backgroundColor:"white", elevation:2, alignItems:'center', justifyContent:'center', borderRadius:10}}>
              <Image source={require('./Page/new.png')}  style={{width:35, height:35}}/>
            </View>
           </TouchableOpacity>
            <View style={{width:80, height:20,  alignItems:'center', justifyContent:'center'}}>
          <Text style={{fontFamily:"Poppins-Bold", fontSize:10, color:COLORS.primary}}>Visa News</Text>
            </View>
            </View>
          </View>
          <View
            style={{
              borderLeftWidth: 7,
              borderColor: COLORS.primary,
              backgroundColor: COLORS.light,
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <Text style={styles.sectionTwo}>Popular Consultant</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Consultant')}>
              <Text style={[styles.sectionTwo, {color: COLORS.primary}]}>
                See More
              </Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              backgroundColor: '#EDF2FB',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            {Dataco.slice(0, 2).map(item => (
              <Consultant key={item.id} Dataco={item} navigation={navigation}/>
            ))}
          </View>
          
          <View
            style={{
              borderLeftWidth: 7,
              borderColor: COLORS.primary,
              backgroundColor: COLORS.light,
            }}>
            <Text
              style={{
                marginHorizontal: 15,
                fontFamily: 'Poppins-Bold',
                color: 'grey',
                fontSize: 12,
              }}>
              Our Services
            </Text>
          </View>
          <View style={{backgroundColor: '#EDF2FB', elevation:1}}>
            <FlatList
              snapToInterval={width - 20}
              keyExtractor={item => item.id}
              contentContainerStyle={{paddingLeft: 10}}
              showsHorizontalScrollIndicator={false}
              horizontal
              data={Visa}
              renderItem={({item}) => (
                <Services Visa={item} navigation={navigation}/>
              )}
            />
          </View>
          <View
            style={{
              borderLeftWidth: 7,
              borderColor: COLORS.primary,
              backgroundColor: COLORS.light,
            }}>
            <Text
              style={{
                marginHorizontal: 15,
                fontFamily: 'Poppins-Bold',
                color: 'grey',
                fontSize: 12,
              }}>
              Our Offices
            </Text>
          </View>
          <View style={{backgroundColor: '#EDF2FB', padding: 3}}>
            <FlatList
              snapToInterval={width - 20}
              keyExtractor={item => item.id}
              contentContainerStyle={{paddingLeft: 10}}
              showsHorizontalScrollIndicator={false}
              horizontal
              data={Fdata}
              renderItem={({item}) => (
                <Nation Fdata={item} navigation={navigation}/>
              )}
            />
          </View>
        </View>
        <View style={{height: 50}}></View>
    </SafeAreaView>
    </ScrollView>
  );
};
export default HomeScreen;

const Skelton = () => {
 
  return (
    <View style={styles.containers}>
    <LottieView 
      source={require('./Page/loader.json')} 
      autoPlay 
      loop 
      style={{width:200, height:200}}
    />
  </View>
    
  );
};

const styles = StyleSheet.create({
  containers: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  date: {
    marginTop: 5,
    fontSize: 14,
    color: COLORS.primary,
    fontFamily: 'Poppins-Bold',
  },
  heading: {
    fontFamily: 'Poppins-Bold',
    color: COLORS.light,
    fontSize:15
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
    fontSize: 12,
    fontFamily: 'Poppins-Bold',
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
    width: Dimensions.get('window').width - 20,
    height: 140,
    marginRight: 20,
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: 'white',
    justifyContent:"flex-end"
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
    width: width * 0.4, // adjust as needed
    height: hp('11%'), // adjust as needed
    padding: wp('2%'),
    borderRadius: wp('2%'),
    elevation: 1,
    justifyContent:'center',
    alignItems:'center'
  },
  content: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  image: {
    width: width * 0.11, // adjust as needed
    height: width * 0.11, // adjust as needed
  },
  textContainer: {
    flex: 1,
    marginLeft: wp('1%'),
    justifyContent: 'center',
  },
  title: {
    fontSize: wp('2.5%'), // adjust as needed
    color: 'grey',
    fontFamily: 'Poppins-Bold',
  },
  subtitle: {
    fontSize: wp('2%'), // adjust as needed
    color: COLORS.primary,
    fontFamily: 'Poppins-Regular',
    textAlign: 'center',
  },
  cardss: {
    backgroundColor: '#fff', // Card background color
    borderRadius: 10,
    marginHorizontal: 10,
    marginBottom: 10,
    elevation: 1,
  },
  contents: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  imageSkeleton: {
    width: 80, // Width of image skeleton
    height: 80, // Height of image skeleton
    backgroundColor: '#d0d0d0', // Color of image skeleton
    borderRadius: 5, // Border radius of image skeleton
  },
  textContainer: {
    marginLeft: 10,
    flex: 1,
  },
  titleSkeleton: {
    height: 20, // Height of title skeleton
    backgroundColor: '#d0d0d0', // Color of title skeleton
    borderRadius: 5, // Border radius of title skeleton
  },
  subtitleSkeleton: {
    width: '70%', // Width of subtitle skeleton
    height: 15, // Height of subtitle skeleton
    backgroundColor: '#d0d0d0', // Color of subtitle skeleton
    borderRadius: 5, // Border radius of subtitle skeleton
  },
  addButtonSkeleton: {
    width: 21, // Width of add button skeleton
    height: 21, // Height of add button skeleton
    borderRadius: 10.5, // Border radius of add button skeleton
  },
  cardSkeleton: {
    backgroundColor: '#f0f0f0', // Set background color for skeleton
    borderRadius: 10,
    marginHorizontal: 6,
    marginBottom: 10,
    width: 160,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  imageSkeleton: {
    width: 80, // Width of image skeleton
    height: 80, // Height of image skeleton
    backgroundColor: '#d0d0d0', // Color of image skeleton
    borderRadius: 5, // Border radius of image skeleton
  },
  textContainer: {
    marginLeft: 10,
    flex: 1,
  },
  titleSkeleton: {
    height: 20, // Height of title skeleton
    backgroundColor: '#d0d0d0', // Color of title skeleton
    borderRadius: 5, // Border radius of title skeleton
  },
  subtitleButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },
  subtitleSkeleton: {
    width: '70%', // Width of subtitle skeleton
    height: 15, // Height of subtitle skeleton
    backgroundColor: '#d0d0d0', // Color of subtitle skeleton
    borderRadius: 5, // Border radius of subtitle skeleton
  },
  addButtonSkeleton: {
    width: 21, // Width of add button skeleton
    height: 21, // Height of add button skeleton
    backgroundColor: '#d0d0d0', // Color of add button skeleton
    borderRadius: 10.5, // Border radius of add button skeleton
  },
  headers: {
    height: hp('19%'),
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#d0d0d0',
  },
});
