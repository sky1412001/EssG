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
      <View>
        <ImageBackground
          style={styles.header}
          source={require('./Tabicon/post.jpg')}>
          <View
            style={{
              width: '100%',
              height: '100%',
              backgroundColor: COLORS.primary,
              opacity: 0.8,
              justifyContent: 'flex-end',
              padding: 10,
            }}>
            <View style={{marginBottom: 40}}>
              <Text
                style={{
                  fontSize: 20,
                  fontFamily: 'Poppins-Bold',
                  color: 'white',
                }}>
                {getTimeOfDay()}
              </Text>
            </View>
          </View>
        </ImageBackground>
   
      </View>
      <View style={{top:-20, backgroundColor:'#FFFFFF', borderTopLeftRadius:20, borderTopRightRadius:20, height:490}}>

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
      backgroundColor: 'green',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius:70
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
          <View style={styles.divider}></View>
          <View style={{ gap: 10 }}>
      <TouchableOpacity onPress={()=>navigation.navigate("Login")}
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          width: 80,
          height: 80,
          backgroundColor: 'red',
          borderRadius: 60,
        }}
       
      >
        <Icon
          name="lock"
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
          Login
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
      borderRadius:70
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
          backgroundColor: 'orange',
          borderRadius: 60,
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
      
      <View style={{ gap: 10, alignSelf:'center', marginTop:30 }}>
      <TouchableOpacity
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          width: 80,
          height: 80,
          backgroundColor: 'pink',
          borderRadius: 60,
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
    alignItems: 'flex-end',
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
        {iterations: -1},
      ).start();
    };

    animateSkeleton();

    return () => {
      opacity.stopAnimation();
    };
  }, [opacity]);

  return (
    <Animated.View style={[styles.loadingContainer, {opacity}]}>
      <Animated.View style={[styles.sHeader, {opacity}]}>
        <Animated.View style={[styles.sText, {opacity}]}></Animated.View>
        <Animated.View style={[styles.sSubtitle, {opacity}]}></Animated.View>
      </Animated.View>
      <Animated.View style={[styles.sContext, {opacity}]}>
        <Animated.View style={[styles.row, {opacity}]}>
          <Animated.View style={[styles.sCard, {opacity}]}>
            <Animated.View
              style={[
                {
                  backgroundColor: 'white',
                  width: 30,
                  height: 30,
                  borderRadius: 50,
                },
                {opacity},
              ]}></Animated.View>
            <Animated.View
              style={[
                {backgroundColor: 'white', width: 60, height: 10},
                {opacity},
              ]}></Animated.View>
          </Animated.View>
          <Animated.View style={[styles.sCard, {opacity}]}>
            <Animated.View
              style={[
                {
                  backgroundColor: 'white',
                  width: 30,
                  height: 30,
                  borderRadius: 50,
                },
                {opacity},
              ]}></Animated.View>
            <Animated.View
              style={[
                {backgroundColor: 'white', width: 60, height: 10},
                {opacity},
              ]}></Animated.View>
          </Animated.View>
          <Animated.View style={[styles.sCard, {opacity}]}>
            <Animated.View
              style={[
                {
                  backgroundColor: 'white',
                  width: 30,
                  height: 30,
                  borderRadius: 50,
                },
                {opacity},
              ]}></Animated.View>
            <Animated.View
              style={[
                {backgroundColor: 'white', width: 60, height: 10},
                {opacity},
              ]}></Animated.View>
          </Animated.View>
        </Animated.View>
        <Animated.View style={[styles.row, {opacity}]}>
          <Animated.View style={[styles.sCard, {opacity}]}>
            <Animated.View
              style={[
                {
                  backgroundColor: 'white',
                  width: 30,
                  height: 30,
                  borderRadius: 50,
                },
                {opacity},
              ]}></Animated.View>
            <Animated.View
              style={[
                {backgroundColor: 'white', width: 60, height: 10},
                {opacity},
              ]}></Animated.View>
          </Animated.View>
          <Animated.View style={[styles.sCard, {opacity}]}>
            <Animated.View
              style={[
                {
                  backgroundColor: 'white',
                  width: 30,
                  height: 30,
                  borderRadius: 50,
                },
                {opacity},
              ]}></Animated.View>
            <Animated.View
              style={[
                {backgroundColor: 'white', width: 60, height: 10},
                {opacity},
              ]}></Animated.View>
          </Animated.View>
        </Animated.View>
      </Animated.View>
    </Animated.View>
  );
};
