import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, Text, PermissionsAndroid, Platform, Image, ActivityIndicator, ImageBackground, StyleSheet, SafeAreaView , StatusBar, Modal} from 'react-native';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import COLORS from "../src/COLORS";
import axios from 'axios';
import { useAuth } from '../src/AuthContext';
import Services from '../src/Services';
const y = require('./icons/y.png')
const camera = require('./icons/camera.png')
import Icon from 'react-native-vector-icons/FontAwesome';
import LottieView from 'lottie-react-native';
const Status = ({ navigation }) => {
  const {logout} = useAuth()
  const [profilePicture, setProfilePicture] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [userName, setUserName] = useState('');
  const [branch, setBranch] = useState('');
  const [email, setEmail] = useState("");
  const [phoneNO , setPhoneNo] = useState('');
  const [dob, setDob] = useState("");
  const [country , setCountry] = useState('');
  const [file, setFile] = useState('');
  const [status, setStatus] = useState('');
  const [show, setShow] = useState('')
  const [loading, setLoading] = useState(false)
  
  useEffect(() => {
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 2000);
    return () => clearTimeout(timeout);
  }, []);

  if (loading) {
    return <Skelton />;
  }

  const Logout =()=>{
    logout()
  }
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const storedUserData = await AsyncStorage.getItem('userData');
        console.log('Stored User Data:', storedUserData);
        if (storedUserData) {
          const userData = JSON.parse(storedUserData);
          setUserName(userData.data.app_name);
          setBranch(userData.data.branch);
          setEmail(userData.data.email)
          setPhoneNo(userData.data.phone_one);
          setDob(userData.data.dob)
          setCountry(userData.data.country)
          setFile(userData.data.ess_file_open_date)
          setStatus(userData.data.main_status)
        }
      } catch (error) {
        console.error('Error retrieving user data:', error);
      }
    };
    fetchUserData(); 
  }, []);
  const requestCameraPermission = async (mediaType) => {
    try {
      if (Platform.OS === 'android') {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA,
          {
            title: 'Camera Permission',
            message: 'App needs access to your camera',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          }
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED){
          console.log('Camera permission granted');
          if (mediaType === 'profile'){
            openCamera('profile');
          } else if (mediaType === 'cover'){
            openGallery('cover');
          }
        } else {
          console.log('Camera permission denied');
        }
      } else {
        if (mediaType === 'profile') {
          openCamera('profile');
        } else if (mediaType === 'cover'){
          openGallery('cover');
        }
      }
    } catch (err) {
      console.warn(err);
    }
  };
  const openCamera = (mediaType) => {
    const options = {
      mediaType: 'photo',
      maxWidth: 800,
      maxHeight: 600,
      quality: 1.5,
    };
    launchCamera(options, async (response) => {
      if (response.didCancel) {
        console.log('User cancelled camera');
      } else if (response.errorCode) {
        console.log('Camera error:', response.errorMessage);
      } else {
        console.log('Camera photo:', response.assets[0]);
        if (mediaType === 'profile') {
          setProfilePicture(response.assets[0].uri);
          try {
            await AsyncStorage.setItem('profilePicture', response.assets[0].uri);
            console.log('Profile picture stored successfully');
          } catch (error) {
            console.log('Error storing profile picture:', error);
          }
        } else if (mediaType === 'cover') {
          setCoverPicture(response.assets[0].uri);
          try {
            await AsyncStorage.setItem('coverPicture', response.assets[0].uri);
            console.log('Cover picture stored successfully');
          } catch (error){
            console.log('Error storing cover picture:', error);
          }
        }
      }
    });
  };
  const openImageModal = (imageUri) => {
    setSelectedImage([{ url: imageUri }]);
    setModalVisible(true);
  };
  const closeModal = () => {
    setSelectedImage(null);
    setModalVisible(false);
  };
  return(
    <SafeAreaView style={{flex: 1}}>
      <StatusBar translucent backgroundColor="rgba(0,0,0,0)"/>
      <ImageBackground source={require('../src/Page/Homej.jpg')} style={{flex: 0.3, alignItems:'flex-end'}}> 
      <TouchableOpacity style={{marginTop:30, right:30}} onPress={logout}>
        <Image source={require('./icons/log.png')}  style={{width:30, height:30}}/>
      </TouchableOpacity>
      </ImageBackground>
      <ImageBackground source={require('../src/Page/VV.jpg')} style={{flex:0.7, alignItems:'center'}}>
        <View style={{height:230, backgroundColor:'white', width:'70%', top:-70, elevation:2, borderRadius:10}}>
        <View style={style.iconContainer}>
            <Image source={profilePicture ? {uri: profilePicture} : camera} style={{width: 75,height: 75, borderRadius: 100, tintColor:'#ccc' }} />
          </View>
        <TouchableOpacity onPress={()=>requestCameraPermission("profile")} style={{elevation:1, zIndex:1, alignSelf:'center'}}>
          <Image source={require('./icons/plus.png')} style={{width:25, height:25, top:-56}}/>
        </TouchableOpacity>
        <View>
          <Text style={{top:-40, fontFamily:'Poppins-Bold', fontSize:20, marginLeft:7, textAlign:'center', color:COLORS.primary}}>{userName.replace(/\(\*\)/g, '')}</Text>
        </View>
        <View style={{flexDirection:'row', justifyContent:"space-evenly", }}>
          <View style={{padding:10}}>
<Text style={{fontFamily:'Poppins-Bold', color:'black', fontSize:12}}>{dob}</Text>
          </View>
          <View style={{padding:10}}>
<Text style={{fontFamily:'Poppins-Bold', color:"black", fontSize:12}}>{country}</Text>
          </View>
          <View style={{padding:10}}>
<Text style={{fontFamily:'Poppins-Bold', color:"green", fontSize:12}}>{status}</Text>
          </View>
        </View>
        </View>

<View style={{marginBottom:40}}>

 <Services />
</View>
      </ImageBackground>
    </SafeAreaView>
  )
}

export default Status;

const style = StyleSheet.create({
  bookNowBtn: {
    height: 50,
    width: 150,
    backgroundColor: COLORS.white,
    borderRadius: 10,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  iconContainer: {
    height: 85,
    width: 85,
    backgroundColor: COLORS.white,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf:'center',
    top:-40,
    elevation:4
  },
  detailsContainer: {
    borderTopLeftRadius: 30,
    borderTopRightRadius:30,
    backgroundColor: COLORS.white,
    flex: 1.5,
    padding:5,
    top:-20 
  },
  imageDetails: {
    width: '100%',
  },
  footer: {
    flexDirection: 'row',
    backgroundColor: COLORS.og,
    height: 70,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 1, 0.8)', 
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  openButton: {
    backgroundColor: '#F194FF',
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
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
      source={require('../src/Page/loader.json')} 
      autoPlay 
      loop 
      style={{width:200, height:200}}
    />
  </View>
    
  );
};
