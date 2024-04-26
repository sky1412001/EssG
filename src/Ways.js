import React, {useState, useEffect,useRef} from 'react';
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
  Animated
} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import COLORS from './COLORS';

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
    } else if (hour >= 12 && hour < 17){
      return 'GOOD AFTERNOON';
    } else {
      return 'GOOD EVENING';
    }
  };
  const Stack = createNativeStackNavigator();
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={{marginTop:30}}>
          <Text style={{fontSize:24, fontFamily:'Poppins-Regular', color:'white'}}>{getTimeOfDay()}</Text>
          <Text style={styles.title}>ESS GLOBAL</Text>
          <Text style={styles.subtitle}>FIND A NEW LIFE IN OVERSEAS</Text>
        </View>
      </View>
      <View style={{  flex: 1,
    backgroundColor: COLORS.primary,
    }}>
      <View style={styles.content}>
        <View>
          <Text style={{color:COLORS.primary, fontSize:16, fontFamily:"Poppins-Bold"}}>Our Services</Text>
        </View>
        <View style={styles.row}>
          <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate('Student')}>
            <Image
              source={require('./Login/students.png')}
              style={styles.icon}
            />
            <Text style={styles.cardText}>Student Login</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate('Login')}>
            <Image source={require('./Login/simple.png')} style={styles.icon}/>
            <Text style={styles.cardText}>Public Login</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate('Guide')}>
            <Image source={require('./Login/guide.png')} style={styles.icon}/>
            <Text style={styles.cardText}>Student Guide</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.row}>
          <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate('Chat')}>
            <Image source={require('./Home/com.png')} style={styles.icon}/>
            <Text style={styles.cardText}>Contact Now</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate('About')}>
            <Image source={require('./Login/about.png')} style={styles.icon}/>
            <Text style={styles.cardText}>About Company</Text>
          </TouchableOpacity>
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
    backgroundColor: 'white',
  },
  header: {
    backgroundColor: COLORS.primary,
    padding: 25,
    height: 360,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomLeftRadius:50,
    alignItems:'center'
  },
  title: {
  
    fontSize: windowWidth * 0.08,
    fontFamily: 'Poppins-Bold',
    color: '#fff',
    
  },
  subtitle: {
    fontSize: windowWidth * 0.06,
    fontFamily: 'Poppins-Regular',
    color: 'white',
  },
  content: {
    flex: 1,
    backgroundColor: 'white',
    borderTopRightRadius: 50,
    padding: 10,
    paddingTop: 30,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    flexWrap: 'wrap',
  },
  card: {
    gap: 10,
    backgroundColor: '#EDF2FB',
    padding: 8,
    elevation: 1,
    borderRadius: windowWidth * 0.05,
    width: windowWidth * 0.3,
    height: windowHeight * 0.15,
    marginBottom: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    width: windowWidth * 0.1,
    height: windowWidth * 0.1,
  },
  cardText: {
    fontFamily: 'Poppins-Bold',
    color: '#222',
    fontSize: windowWidth * 0.03,
    textAlign: 'center',
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
    borderTopRightRadius:50,
    paddingTop:20
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
        { iterations: -1 }
      ).start();
    };

    animateSkeleton();

    return () => {
      opacity.stopAnimation();
    };
  }, [opacity]);


  return (
    <Animated.View style={[styles.loadingContainer, {opacity}]}>
      <Animated.View style={[styles.sHeader,{opacity}]}>
        <Animated.View style={[styles.sText, {opacity}]}></Animated.View>
        <Animated.View style={[styles.sSubtitle,{opacity}]}></Animated.View>
      </Animated.View>
      <Animated.View style={[styles.sContext, {opacity}]}>
        <Animated.View style={[styles.row, {opacity}]}>
          <Animated.View style={[styles.sCard, {opacity}]}>
          <Animated.View style={[{backgroundColor:'white', width:30, height:30, borderRadius:50},{opacity}]}></Animated.View>
          <Animated.View style={[{backgroundColor:'white', width:60, height:10},{opacity}]}></Animated.View>
          </Animated.View>
          <Animated.View style={[styles.sCard,{opacity}]}>
          <Animated.View style={[{backgroundColor:'white', width:30, height:30, borderRadius:50},{opacity}]}></Animated.View>
          <Animated.View style={[{backgroundColor:'white', width:60, height:10},{opacity}]}></Animated.View>
          </Animated.View>
          <Animated.View style={[styles.sCard,{opacity}]}>
          <Animated.View style={[{backgroundColor:'white', width:30, height:30, borderRadius:50},{opacity}]}></Animated.View>
          <Animated.View style={[{backgroundColor:'white', width:60, height:10},{opacity}]}></Animated.View>
          </Animated.View>
        </Animated.View>
        <Animated.View style={[styles.row,{opacity}]}>
          <Animated.View style={[styles.sCard,{opacity}]}>
          <Animated.View style={[{backgroundColor:'white', width:30, height:30, borderRadius:50},{opacity}]}></Animated.View>
          <Animated.View style={[{backgroundColor:'white', width:60, height:10},{opacity}]}></Animated.View>
          </Animated.View>
          <Animated.View style={[styles.sCard,{opacity}]}>
          <Animated.View style={[{backgroundColor:'white', width:30, height:30, borderRadius:50},{opacity}]}></Animated.View>
          <Animated.View style={[{backgroundColor:'white', width:60, height:10},{opacity}]}></Animated.View>
          </Animated.View>
        </Animated.View>
      </Animated.View>
    </Animated.View>
  );
};
