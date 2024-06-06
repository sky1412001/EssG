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
import LottieView from 'lottie-react-native';

const Ways = ({navigation}) => {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 2000);
    return () => clearTimeout(timeout);
  }, []);

  if (loading) {
    return <Skelton />;
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
    containers: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
});
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
