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
  ScrollView,
  StyleSheet,
  Dimensions,
  FlatList,
  ImageBackground,
  Animated
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
    if (re.test(text) || regex.test(text)){
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
    return <Skelton />;
    
  }
  const Nation = ({Fdata}) => {
    return (
      <TouchableOpacity
        onPress={() => navigation.navigate('FlagScreen', Fdata)}>
        <View style={{padding: 6}}>
          <View
            style={{
              gap: 7,
              padding: 15,
              borderRadius: 10,
              alignItems: 'center',
              justifyContent: 'space-between',
              marginTop: 3,
              flexDirection: 'row',
              backgroundColor: 'white',
            }}>
            <Image source={Fdata.image} style={{width: 20, height: 10}} />
            <Text
              style={{
                textAlign: 'center',
                color: COLORS.primary,
                fontSize: 11,
                fontFamily: 'Poppins-Bold',
              }}>
              {Fdata.name}
            </Text>
            <View style={{backgroundColor: COLORS.primary, width: wp('5%')}}>
              <Text style={{textAlign: 'center', color: 'white'}}>+</Text>
            </View>
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
          padding: wp('2.9%'),
          margin: wp('1.5%'),
          elevation: 1,
          borderRadius: 10,
        }}>
        <View
          style={{
            flexDirection: 'row',
            width: wp('38%'),
            justifyContent: 'space-evenly',
          }}>
          <View>
            <Image
              source={Dataco.image}
              style={{width: wp('17%'), height: hp('9%'), borderRadius: hp('3%')}}
            />
          </View>
          <View>
            <Text
              style={{
                fontSize: hp('1.4%'),
                color: '#222',
                fontFamily: 'Poppins-Bold',
              }}>
              {Dataco.name}
            </Text>
            <Text
              style={{
                fontSize: hp('1.2%'),
                color: '#222',
                fontFamily: 'Poppins-Regular',
              }}>
              {Dataco.about}
            </Text>
            <Rating
              stars={Dataco.rating}
              maxStars={5}
              size={12}
              color={'#0466C8'}
            />
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            padding: 5,
          }}>
          <View style={{justifyContent: 'center', alignItems: 'center'}}>
            <Text style={{color: COLORS.primary, fontWeight: '700'}}>
              {Dataco.rate}
            </Text>
          </View>
          <View
            style={{
              borderWidth: 1,
              padding: 3,
              borderColor: COLORS.primary,
              borderRadius: 4,
            }}>
            <TouchableOpacity
              onPress={() => navigation.navigate('DeatailScreen', Dataco)}>
              <Text
                style={{
                  color: COLORS.primary,
                  fontFamily: 'Poppins-Regular',
                  fontSize: 12,
                }}>
                See more
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
        <View style={styles.card}>
          <View style={styles.content}>
            <Image source={Visa.image} style={styles.image} />
            <View style={styles.textContainer}>
              <Text style={styles.title}>{Visa.title}</Text>
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <Text style={styles.subtitle}>{Visa.sub}</Text>
            <TouchableOpacity
              onPress={() => navigation.navigate('PostLandingForm', Visa)}
              style={{backgroundColor: COLORS.primary, width: 21}}>
              <Text style={{color: COLORS.light, textAlign:'center'}}>+</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    );
  };
  return (
    <SafeAreaView style={{backgroundColor: 'white'}}>
      <View
        style={{
          borderBottomLeftRadius: 15,
          borderBottomRightRadius: 15,
          elevation: 10,
        }}>
        <View style={styles.header}>
          <StatusBar
            translucent
            backgroundColor="rgba(0,0,0,0)"
            color={'red'}
          />
          <View>
            <View>
              <View style={{flexDirection: 'column', justifyContent:"space-between"}}>
              <Text style={{fontFamily:"Poppins-Bold", color:'white', marginTop:10}}>Today {`${monthName} ${date}`}</Text>
              </View>
              <View style={{flexDirection: 'column', gap: -9, marginTop: 1}}>
                <Text style={styles.heading}>Find your</Text>
                <Text style={styles.heading}>Immigration Consultant</Text>
              </View>
            </View>
          </View>
        </View>
      </View>
      <View
        style={{
          top: -23,
          backgroundColor: 'white',
          borderTopLeftRadius: 26,
          borderTopRightRadius: 26,
        }}>
        <ScrollView>
          <View style={{marginTop: 24}}>
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
          <View style={{backgroundColor: '#EDF2FB'}}>
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
          <View>
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
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};
export default HomeScreen;

const Skelton = () => {
  const opacity = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const animateSkeleton = () => {
      Animated.loop(
        Animated.sequence([
          Animated.timing(opacity, {
            toValue: 0.5,
            duration: 500,
            useNativeDriver: true,
          }),
          Animated.timing(opacity, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true,
          }),
        ]),
        { iterations: -1 }
      ).start();
    };

    animateSkeleton();

    return () => {
      opacity.stopAnimation();
    };
  }, [opacity]);

  return (
 <SafeAreaView style={{padding:3}}>
<Animated.View
  style={{
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    elevation: 10,
    backgroundColor: '#d0d0d0',
  }}>
  <Animated.View style={[styles.headers,{opacity}]}>
    <Animated.View>
      <Animated.View style={{ gap: -4 }}>
        <Animated.View style={{ flexDirection: 'row', marginBottom: 10 }}>
          <Animated.View style={{ flex: 1, backgroundColor: '#d0d0d0', height: 1 }} />
        </Animated.View>
        <Animated.View style={{ flexDirection: 'row', marginBottom: 10 }}>
          <Animated.View style={{ width: 100, height: 20, backgroundColor: '#d0d0d0' }} />
        </Animated.View>
      </Animated.View>
    </Animated.View>
  </Animated.View>
</Animated.View>
<Animated.View
        style={{
          top: -27,
          backgroundColor: 'white',
          borderTopLeftRadius: 26,
          borderTopRightRadius: 26,
          padding:2
        }}>

      <Animated.View style={{ width: Dimensions.get('window').width - 20,
    height: 120, backgroundColor:'#d0d0d0', alignSelf:'center', borderRadius:10 , marginTop:10}}>
    </Animated.View>
    <Animated.View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text style={styles.sectionTwo}></Text>
          </Animated.View>
    <Animated.View style={{flexDirection:"row", marginTop:20}}>
<Animated.View
        style={{
          backgroundColor: 'white',
          borderRadius: 10,
          flexDirection:"row"
        }}>
    <Animated.View style={[styles.cardSkeleton, {opacity}]}>
      <Animated.View style={styles.content}>
        <Animated.View style={styles.imageSkeleton} />
        <Animated.View style={styles.textContainer}>
          <Animated.View style={styles.titleSkeleton} />
        </Animated.View>
      </Animated.View>
      <Animated.View style={styles.subtitleButtonContainer}>
        
        <Animated.View style={[styles.subtitleSkeleton, {opacity}]} />
        <TouchableOpacity style={styles.addButtonSkeleton} />
      </Animated.View>
    </Animated.View>
    <Animated.View style={[styles.cardSkeleton, {opacity}]}>
      <Animated.View style={styles.content}>
        <Animated.View style={styles.imageSkeleton} />
        <Animated.View style={styles.textContainer}>
          <Animated.View style={styles.titleSkeleton} />
        </Animated.View>
      </Animated.View>
      <Animated.View style={styles.subtitleButtonContainer}>
        <Animated.View style={styles.subtitleSkeleton} />
        <TouchableOpacity style={styles.addButtonSkeleton}/>
      </Animated.View>
    </Animated.View>
    <Animated.View style={[styles.cardSkeleton, {opacity}]}>
      <Animated.View style={styles.content}>
        <Animated.View style={styles.imageSkeleton}/>
        <Animated.View style={styles.textContainer}>
          <Animated.View style={styles.titleSkeleton}/>
        </Animated.View>
      </Animated.View>
      <Animated.View style={styles.subtitleButtonContainer}>
        <Animated.View style={styles.subtitleSkeleton} />
        <TouchableOpacity style={styles.addButtonSkeleton}/>
      </Animated.View>
    </Animated.View>
</Animated.View>
    </Animated.View>
    <Animated.View style={{flexDirection: 'row', justifyContent: 'space-between', height:40, backgroundColor:"#d0d0d0"}}>
            <Text style={styles.sectionTwo}></Text>
          </Animated.View>
          <Animated.View style={{padding: 3, marginTop:30}}>
          <Animated.View
            style={[{
              gap: 7,
              padding: 15,
              borderRadius: 10,
              alignItems: 'center',
              justifyContent: 'space-around',
              marginTop: 3,
              flexDirection: 'row',
              backgroundColor: '#d0d0d0',
              elevation:1
            },{opacity}]}>
            <Animated.View style={{width: 20, height: 10, backgroundColor:'white'}}/>
            <Text
              style={{
                textAlign: 'center',
                fontSize: 11,
                fontFamily: 'Poppins-Bold',
              }}>
            </Text>
            <Animated.View style={{backgroundColor: "white", width: wp('5%')}}>
              <Text style={{textAlign: 'center', color: 'white'}}></Text>
            </Animated.View>
            <Animated.View style={{width: 20, height: 10, backgroundColor:'white'}}/>
            <Text
              style={{
                textAlign: 'center',
                fontSize: 11,
                fontFamily: 'Poppins-Bold',
              }}>
            </Text>
            <Animated.View style={{backgroundColor: "white", width: wp('5%')}}>
              <Text style={{textAlign: 'center', color: 'white'}}></Text>
            </Animated.View>
            <Animated.View style={{width: 20, height: 10, backgroundColor:'white'}} />
           
            <Animated.View style={{backgroundColor: "white", width: wp('5%')}}>
              <Text style={{textAlign: 'center', color: 'white'}}></Text>
            </Animated.View>
          </Animated.View>
        </Animated.View>
          </Animated.View>
          <Animated.View style={[{flexDirection: 'row', justifyContent: 'space-between', backgroundColor:"#d0d0d0"},{opacity}]}>
            <Text style={styles.sectionTwo}></Text>
          </Animated.View>
          <Animated.View style={{flexDirection:'row'}}>
          <Animated.View style={styles.container}>
            <Animated.View style={{flexDirection:'row', justifyContent:'space-between'}}>
        <Animated.View style={styles.card}>
          <Animated.View style={styles.content}>
            <Animated.View style={styles.textContainer}>
              <Text style={styles.title}></Text>
            </Animated.View>
          </Animated.View>
          <Animated.View
            style={[{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            },{opacity}]}>
            <Text style={styles.subtitle}></Text>
            <TouchableOpacity
              
              style={{backgroundColor: '#d0d0d0', width: 21}}>
              <Text style={{color: COLORS.light, textAlign: 'center'}}></Text>
            </TouchableOpacity>
          </Animated.View>
            </Animated.View>
        <Animated.View style={styles.card}>
          <Animated.View style={styles.content}>
            <Animated.View style={styles.textContainer}>
              <Text style={styles.title}></Text>
            </Animated.View>
          </Animated.View>
          <Animated.View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <Text style={styles.subtitle}></Text>
            <TouchableOpacity
              
              style={{backgroundColor: '#d0d0d0', width: 21}}>
              <Text style={{color: COLORS.light, textAlign: 'center'}}></Text>
            </TouchableOpacity>
          </Animated.View>
        </Animated.View>
        </Animated.View>
       
      </Animated.View>
          </Animated.View>
 </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  header: {
    height: hp('19%'),
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: COLORS.primary,
  },
  date: {
    marginTop: 5,
    fontSize: 14,
    color: 'white',
    fontFamily: 'Poppins-Bold',
  },
  heading: {
    fontFamily: 'Poppins-Bold',
    fontSize: hp('2.1%'),
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
    height: 145,
    marginRight: 20,
    borderRadius: 10,
    overflow: 'hidden',
    padding: 10,
    backgroundColor: 'white',
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
    height: hp('12%'), // adjust as needed
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
    width: wp('12%'), // adjust as needed
    height: hp('7%'), // adjust as needed
  },
  textContainer: {
    flex: 1,
    marginLeft: wp('1%'),
    justifyContent: 'center',
  },
  title: {
    fontSize: wp('2.5%'), // adjust as needed
    color: '#222',
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
    width:160
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
  headers:{
    height: hp('19%'),
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#d0d0d0'
  }
});
