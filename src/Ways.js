import React, {useState, useEffect, useRef} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Image,
  Text,
  TouchableOpacity,
  Dimensions,
  ImageBackground,
  StatusBar,
  Animated,
} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import COLORS from './COLORS';
import Icon from 'react-native-vector-icons/FontAwesome';

const Ways = ({navigation}) => {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 2000);
    return () => clearTimeout(timeout);
  }, []);

  if (loading) {
    return <Skeleton />;
  }
  const getTimeOfDay = () => {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 12) {
      return 'GOOD MORNING';
    } else if (hour >= 12 && hour < 17) {
      return 'GOOD AFTERNOON';
    } else {
      return 'GOOD EVENING';
    }
  };
  const Stack = createNativeStackNavigator();
  return (
    <SafeAreaView style={styles.container}>
        <ImageBackground
          style={styles.header}
          source={require('./Tabicon/post.jpg')}>
      <View style={{backgroundColor:COLORS.primary, opacity:0.6, width:'100%', height:'100%'}}>

         <Text style={{fontSize:20, fontFamily:'Poppins-Bold', color:'white', marginLeft:15, marginTop:20}}>{getTimeOfDay()}</Text>
           
      </View>
        </ImageBackground>
   
      <View style={{top:-20, backgroundColor:'#FFF', borderTopLeftRadius:20, borderTopRightRadius:20, height:490}}>


      <View
        style={{
          flexDirection: 'row',
          marginTop: 50,
          justifyContent:"space-around"
        }}>

          <TouchableOpacity onPress={()=>navigation.navigate('Student')}>
          <View style={{ gap: 10 }}>
  <View
    style={{
      width: 80,
      height: 80,
      backgroundColor: COLORS.primary,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius:15,
      elevation:15
    }}
    >
    <Icon
      name="user"
      size={34}
      color="white"
      />
  </View>
  <View style={{ justifyContent: 'center', alignItems: 'center' }}>
    <Text
      style={{
        fontFamily: 'Poppins-Bold',
        fontSize: 12,
        color: COLORS.dark,
      }}
      >
      Student login
    </Text>
  </View>
</View>
          </TouchableOpacity>
       
    <View style={{flexDirection:'column', gap:10}}>

    <TouchableOpacity
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          width: 80,
          height: 80,
          backgroundColor: COLORS.primary,
          borderRadius: 15,
          elevation:15
        }}
        onPress={() =>navigation.navigate('About')}
        >
        <Icon
          name="star"
          size={36}
          color="white"
        />
      </TouchableOpacity>
      <View style={{ justifyContent: 'center', alignItems: 'center'}}>
        <Text
          style={{
            fontFamily: 'Poppins-Bold',
            fontSize: 12,
            color: COLORS.dark,
            textAlign: 'center',
          }}
        >
          About us
        </Text>
      </View>
    </View>
      </View>
      <View
        style={{
          flexDirection: 'row',
          marginTop: 20,
          justifyContent:"space-around"
        }}>

          <TouchableOpacity onPress={()=>navigation.navigate('Guide')}>
          <View style={{ gap: 10 }}>
  <View
    style={{
      width: 80,
      height: 80,
      backgroundColor:COLORS.primary,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius:15,
      elevation:16
    }}
  >
    <Icon
      name="tag"
      size={34}
      color="white"
      />
  </View>
  <View style={{ justifyContent: 'center', alignItems: 'center' }}>
    <Text
      style={{
        fontFamily: 'Poppins-Bold',
        fontSize: 12,
        color: COLORS.dark,
      }}
      >
      Student Guide
    </Text>
  </View>
</View>
          </TouchableOpacity>
          <View style={{ gap: 10 }}>
      <TouchableOpacity
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          width: 80,
          height: 80,
          backgroundColor:COLORS.primary,
          borderRadius: 15,
          elevation:15,
        }}
        onPress={() =>navigation.navigate('Chat')}
        >
        <Icon
          name="comment"
          size={36}
          color="white"
          />
      </TouchableOpacity>
      <View style={{ justifyContent: 'center', alignItems: 'center' }}>
        <Text
          style={{
            fontFamily: 'Poppins-Bold',
            fontSize: 12,
            color: COLORS.dark,
            textAlign: 'center',
          }}
          >
          Contact us
        </Text>
      </View>
    </View>
 
      </View>
      <View style={{ gap: 10 }}>
      <TouchableOpacity onPress={()=>navigation.navigate("Login")}
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          width: 80,
          height: 80,
          backgroundColor: COLORS.primary,
          borderRadius: 15,elevation:15, alignSelf:'center', marginTop:20
        }}
        
      >
        <Icon
          name="lock"
          size={36}
          color="white"
        />
      </TouchableOpacity>
      <View style={{ justifyContent: 'center', alignItems: 'center'}}>
        <Text
          style={{
            fontFamily: 'Poppins-Bold',
            fontSize: 12,
            color: COLORS.dark,
            textAlign: 'center',
          }}
          >
          Login
        </Text>
      </View>
    </View>
      
      <View style={{ gap: 10, alignSelf:'center', marginTop:30 }}>
   
    </View>
      </View>
     
    </SafeAreaView>
  );
};
export default Ways;
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    height: 250,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent:"flex-start",
    borderBottomLeftRadius: 30,
  },
  title: {
    fontSize: windowWidth * 0.08,
    fontFamily: 'Poppins-Regular',
    color: '#fff',
  },
  subtitle: {
    fontSize: windowWidth * 0.06,
    fontFamily: 'Poppins-Regular',
    color: 'white',
  },

  skeletonItem: {
    width: 200,
    height: 20,
    backgroundColor: '#E0E0E0',
    marginVertical: 10,
  },
  loadingContainer: {
    flex: 1,
    backgroundColor: 'white',
  },
  sHeader: {
    backgroundColor: COLORS.grey,
    padding: 20,
    height: 360,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  sText: {
    marginTop: 40,
    backgroundColor: 'white',
    marginBottom: 5,
  },
  sSubtitle: {
    backgroundColor: 'white',
  },
  sContext: {
    flex: 1,
    borderTopRightRadius: 50,
    paddingTop: 20,
  },
  sRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    flexWrap: 'wrap',
  },
  sCard: {
    gap: 10,
    backgroundColor: '#dcdcdc',
    padding: 8,
    elevation: 1,
    borderRadius: windowWidth * 0.05,
    width: windowWidth * 0.3,
    height: windowHeight * 0.15,
    marginBottom: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  divider: {
    borderWidth: 0.0,
    borderColor: 'grey',
    borderRadius:70,
    height:90
    },
});
const Skeleton = () => {
  const opacity = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const animateSkeleton = () => {
      Animated.loop(
        Animated.sequence([
          Animated.timing(opacity, {
            toValue: 0.9,
            duration: 1000,
            useNativeDriver: true,
          }),
          Animated.timing(opacity, {
            toValue: 1,
            duration: 1000,
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
    <View>
    <View
      style={styles.header}
      >
      <Animated.View
        style={{
          width: '100%',
          height: '100%',
          backgroundColor: COLORS.primary,
          opacity: 0.8,
          justifyContent: 'flex-end',
          padding: 10,
        }}>
        <Animated.View style={{ marginBottom: 40 }}>
          {/* Clear the text for skeleton */}
          {/* <Text style={{ fontSize: 20, fontFamily: 'Poppins-Bold', color: 'white' }}>
            {getTimeOfDay()}
          </Text> */}
        </Animated.View>
      </Animated.View>
    </View>
    <Animated.View style={{ top: -20, backgroundColor: '#FFFFFF', borderTopLeftRadius: 20, borderTopRightRadius: 20, height: 490, }}>
      <Animated.View
        style={{
          flexDirection: 'row',
          marginTop: 50,
          justifyContent: "space-around"
        }}>

        <TouchableOpacity onPress={() => navigation.navigate('Student')}>
          <Animated.View style={{ gap: 10 }}>
            <Animated.View
              style={{
                width: 80,
                height: 80,
                backgroundColor: '#ccc',
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 70,
                 opacity
              }}
            >
             
            </Animated.View>
            <Animated.View style={{ justifyContent: 'center', alignItems: 'center' }}>
              {/* Clear the text for skeleton */}
              {/* <Text style={{ fontFamily: 'Poppins-Bold', fontSize: 12, color: COLORS.dark }}>
                Student login
              </Text> */}
            </Animated.View>
          </Animated.View>
        </TouchableOpacity>
        <Animated.View style={styles.divider}></Animated.View>
        <Animated.View style={{ gap: 10 }}>
          <TouchableOpacity onPress={() => navigation.navigate("Login")}
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              width: 80,
              height: 80,
              backgroundColor: '#ccc',
              borderRadius: 60,
            }}>

           
          </TouchableOpacity>
          <Animated.View style={{ justifyContent: 'center', alignItems: 'center' }}>
            {/* Clear the text for skeleton */}
            {/* <Text style={{ fontFamily: 'Poppins-Bold', fontSize: 12, color: COLORS.dark, textAlign: 'center' }}>
              Login
            </Text> */}
          </Animated.View>
        </Animated.View>
      </Animated.View>
      <Animated.View
        style={{
          flexDirection: 'row',
          marginTop: 20,
          justifyContent: "space-around"
        }}>

          <Animated.View style={{ gap: 10 }}>
            <Animated.View
              style={{
                width: 80,
                height: 80,
                backgroundColor: '#ccc',
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 70
              }}
            >
            
            </Animated.View>
            <Animated.View style={{ justifyContent: 'center', alignItems: 'center' }}>
              {/* Clear the text for skeleton */}
              {/* <Text style={{ fontFamily: 'Poppins-Bold', fontSize: 12, color: COLORS.dark }}>
                Student Guide
              </Text> */}
            </Animated.View>
          </Animated.View>
        <Animated.View style={{ gap: 10 }}>
          <TouchableOpacity
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              width: 80,
              height: 80,
              backgroundColor: '#ccc',
              borderRadius: 60,
            }}
          >
          
          </TouchableOpacity>
          <Animated.View style={{ justifyContent: 'center', alignItems: 'center' }}>
            {/* Clear the text for skeleton */}
            {/* <Text style={{ fontFamily: 'Poppins-Bold', fontSize: 12, color: COLORS.dark, textAlign: 'center' }}>
              Contact us
            </Text> */}
          </Animated.View>
        </Animated.View>
      </Animated.View>
      <Animated.View style={{ gap: 10, alignSelf: 'center', marginTop: 30 }}>
        <TouchableOpacity
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            width: 80,
            height: 80,
            backgroundColor: '#ccc',
            borderRadius: 60,
          }}
        >
        
        </TouchableOpacity>
        <Animated.View style={{ justifyContent: 'center', alignItems: 'center' }}>
          {/* Clear the text for skeleton */}
          {/* <Text style={{ fontFamily: 'Poppins-Bold', fontSize: 12, color: COLORS.dark, textAlign: 'center' }}>
            About us
          </Text> */}
        </Animated.View>
      </Animated.View>
    </Animated.View>
  </View>
  );
};
