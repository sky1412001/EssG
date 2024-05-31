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
  Animated,
  RefreshControl,
  TextInput,
} from 'react-native';
import {Rating} from 'react-native-stock-star-rating';
import Icon from 'react-native-vector-icons/FontAwesome';

const currentDate = new Date();
import COLORS from './COLORS';
import Dataco from './Data';
import Slider from './Slider';
import Fdata from './Fdata';
import Visa from './Visa';
import {FadeIn} from 'react-native-reanimated';
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
  const [searchQuery, setSearchQuery] = useState('');
  const [data, setData] = useState([]); // Your components data
  const [filteredData, setFilteredData] = useState([]); // Filtered data
  const flatlistRef = useRef();
  const screenWidth = Dimensions.get('window').width;
  const [activeIndex, setActiveIndex] = useState(0);
  const windowWidth = Dimensions.get('window').width;

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
    return <Skelton />;
  }
  const Nation = ({Fdata}) => {
    return (
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() => navigation.navigate('FlagScreen', Fdata)}>
        <View
          style={{
            width: 120,
            height: 90,
            padding: 5,
            backgroundColor: 'white',
            margin: 5,
            borderRadius: 10,
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <Image source={Fdata.image} style={{width: 33, height: 20}} />

            <Icon.Button
              name="angle-right"
              size={33}
              color={'green'}
              backgroundColor="transparent"
            />
          </View>
          <View>
            <Text
              style={{
                fontSize: 12,
                color: 'black',
                fontFamily: 'Poppins-Bold',
              }}>
              {Fdata.name}
            </Text>
            <Text
              style={{
                fontSize: 10,
                color: 'grey',
                fontFamily: 'Poppins-Regular',
              }}>
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
                fontFamily: 'Poppins-Regular',
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
            <Text></Text>
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
        <TouchableOpacity
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
    <SafeAreaView style={{flex: 1, backgroundColor: '#F5F5F5 '}}>
      <ImageBackground
        source={require('./OnLogo/backicon.png')}
        style={{padding: 25}}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <View
            style={{
              flexDirection: 'column',
              justifyContent: 'space-between',
              marginTop: 7,
            }}>
            <Text
              style={{
                fontFamily: 'Poppins-Regular',
                color: 'white',
                fontSize: 16,
              }}>
              Today {`${monthName} ${date}`}
            </Text>
            <View style={{flexDirection: 'column', gap: -9, marginTop: 5}}>
              <Text style={[styles.heading, {fontSize: 15}]}>Find your</Text>
              <Text style={[styles.heading, {fontSize: 15}]}>
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
            borderRadius: 10,
            flexDirection: 'row',
            alignItems: 'center',
            top: 10,
            width: wp('88%'),
            height: wp('11.1%'),
          }}>
          <View style={{marginLeft: 13}}>
            <Image
              source={require('./OnLogo/find.png')}
              style={{width: 25, height: 25}}
            />
          </View>
          <TextInput
            placeholderTextColor="#6b7280"
            placeholder="Search..."
            style={{fontWeight: '700', width: 135, color: 'grey'}}
            onChange={handleSearch}
            value={searchQuery.text}
          />
        </View>
      </ImageBackground>
      <ScrollView>
        <View>
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
              <Consultant key={item.id} Dataco={item} navigation={navigation} />
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
                <Nation Fdata={item} navigation={navigation} />
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
              Our Services
            </Text>
          </View>
          <View style={{backgroundColor: '#EDF2FB', elevation: 1}}>
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
        </View>
        <View style={{height: 60}}></View>
      </ScrollView>
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
            width: 20,
          }),
          Animated.timing(opacity, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true,
          }),
        ]),
        {iterations: -1},
      ).start();
    };
    animateSkeleton();
    return () => {
      opacity.stopAnimation();
    };
  }, [opacity]);

  return (
    <SafeAreaView style={{padding: 3}}>
      <Animated.View
        style={{
          borderBottomLeftRadius: 15,
          borderBottomRightRadius: 15,
          elevation: 1,
          backgroundColor: '#d0d0d0',
        }}>
        <Animated.View style={[styles.headers, {opacity}]}>
          <Animated.View>
            <Animated.View style={{gap: -4}}>
              <Animated.View style={{flexDirection: 'row', marginBottom: 10}}>
                <Animated.View
                  style={{flex: 1, backgroundColor: '#d0d0d0', height: 1}}
                />
              </Animated.View>
              <Animated.View style={{flexDirection: 'row', marginBottom: 10}}>
                <Animated.View
                  style={{width: 100, height: 20, backgroundColor: '#d0d0d0'}}
                />
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
          padding: 2,
        }}>
        <Animated.View
          style={{
            width: Dimensions.get('window').width - 20,
            height: 120,
            backgroundColor: '#d0d0d0',
            alignSelf: 'center',
            borderRadius: 10,
            marginTop: 10,
          }}></Animated.View>
        <Animated.View
          style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text style={styles.sectionTwo}></Text>
        </Animated.View>
        <Animated.View style={{flexDirection: 'row', marginTop: 20}}>
          <Animated.View
            style={{
              backgroundColor: 'white',
              borderRadius: 10,
              flexDirection: 'row',
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
                <TouchableOpacity style={styles.addButtonSkeleton} />
              </Animated.View>
            </Animated.View>
          </Animated.View>
        </Animated.View>
        <Animated.View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            height: 40,
            backgroundColor: '#d0d0d0',
          }}>
          <Text style={styles.sectionTwo}></Text>
        </Animated.View>
        <Animated.View style={{padding: 3, marginTop: 30}}>
          <Animated.View
            style={[
              {
                gap: 7,
                padding: 15,
                borderRadius: 10,
                alignItems: 'center',
                justifyContent: 'space-around',
                marginTop: 3,
                flexDirection: 'row',
                backgroundColor: '#d0d0d0',
                elevation: 1,
              },
              {opacity},
            ]}>
            <Animated.View
              style={{width: 20, height: 10, backgroundColor: 'white'}}
            />
            <Text
              style={{
                textAlign: 'center',
                fontSize: 11,
                fontFamily: 'Poppins-Bold',
              }}></Text>
            <Animated.View style={{backgroundColor: 'white', width: wp('5%')}}>
              <Text style={{textAlign: 'center', color: 'white'}}></Text>
            </Animated.View>
            <Animated.View
              style={{width: 20, height: 10, backgroundColor: 'white'}}
            />
            <Text
              style={{
                textAlign: 'center',
                fontSize: 11,
                fontFamily: 'Poppins-Bold',
              }}></Text>
            <Animated.View style={{backgroundColor: 'white', width: wp('5%')}}>
              <Text style={{textAlign: 'center', color: 'white'}}></Text>
            </Animated.View>
            <Animated.View
              style={{width: 20, height: 10, backgroundColor: 'white'}}
            />
            <Animated.View style={{backgroundColor: 'white', width: wp('5%')}}>
              <Text style={{textAlign: 'center', color: 'white'}}></Text>
            </Animated.View>
          </Animated.View>
        </Animated.View>
      </Animated.View>
      <Animated.View
        style={[
          {
            flexDirection: 'row',
            justifyContent: 'space-between',
            backgroundColor: '#d0d0d0',
          },
          {opacity},
        ]}>
        <Text style={styles.sectionTwo}></Text>
      </Animated.View>
      <Animated.View style={{flexDirection: 'row'}}>
        <Animated.View style={styles.container}>
          <Animated.View
            style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Animated.View style={styles.card}>
              <Animated.View style={styles.content}>
                <Animated.View style={styles.textContainer}>
                  <Text style={styles.title}></Text>
                </Animated.View>
              </Animated.View>
              <Animated.View
                style={[
                  {
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  },
                  {opacity},
                ]}>
                <Text style={styles.subtitle}></Text>
                <TouchableOpacity
                  style={{backgroundColor: '#d0d0d0', width: 21}}>
                  <Text
                    style={{color: COLORS.light, textAlign: 'center'}}></Text>
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
                  <Text
                    style={{color: COLORS.light, textAlign: 'center'}}></Text>
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
  date: {
    marginTop: 5,
    fontSize: 14,
    color: 'white',
    fontFamily: 'Poppins-Bold',
  },
  heading: {
    fontFamily: 'Poppins-Bold',
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
    height: 160,
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
    width: wp('40%'), // adjust as needed
    height: hp('11%'), // adjust as needed
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
