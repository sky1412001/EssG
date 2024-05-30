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
      <View style={{flex: 0.6,backgroundColor:COLORS.primary, alignItems:'center', justifyContent:"center"}}> 
        <View style={style.imageDetails}>
          <View style={style.iconContainer}>
            <Image source={profilePicture ? {uri: profilePicture} : camera} style={{width: 75,height: 75, borderRadius: 100 }} />
          </View>
        <TouchableOpacity onPress={()=>requestCameraPermission("profile")}>
          <Image source={require('./icons/plus.png')} style={{width:25, height:25,alignSelf:"center", top:-10}}/>
        </TouchableOpacity>
        <Text style={{marginTop:2, fontFamily:'Poppins-Bold', color:COLORS.light,fontSize:25, textAlign:"center"}}>{userName.replace(/[*()\[\]]/g, '')}</Text>
        </View>
      </View>
      <View style={style.detailsContainer}>
        <View style={{borderRadius:10,padding:5,flexDirection:'row', justifyContent:'flex-start', alignItems:'center', elevation:5, backgroundColor:"white", marginTop:10,}}>
        <Icon.Button
              name="location-arrow"
              size={25}
              color="green"
              backgroundColor="transparent"
            />
        <Text style={{color:'grey', fontFamily:'Poppins-Bold'}}>Branch : {branch}</Text>
        </View>
        <View style={{borderRadius:10,padding:5,flexDirection:'row', justifyContent:'flex-start', alignItems:'center',elevation:5, backgroundColor:"white", marginTop:5}}>
        <Icon.Button
              name="at"
              size={20}
              color="blue"
              backgroundColor="transparent"
            />
        <Text style={{color:'grey', fontFamily:'Poppins-Bold'}}>{email}</Text>
        </View>
        <View style={{borderRadius:10,padding:5,flexDirection:'row', justifyContent:'flex-start', alignItems:'center',elevation:5, backgroundColor:"white", marginTop:5}}>
        <Icon.Button
              name="phone"
              size={20}
              color="red"
              backgroundColor="transparent"
            />
        <Text style={{color:'grey', fontFamily:'Poppins-Bold'}}>Phone : {phoneNO}</Text>
        </View>
        <View style={{borderRadius:10,padding:5,flexDirection:'row', justifyContent:'flex-start', alignItems:'center',elevation:5, backgroundColor:"white", marginTop:5}}>
        <Icon.Button
              name="globe"
              size={20}
              color={COLORS.primary}
              backgroundColor="transparent"
            />
        <Text style={{color:'grey', fontFamily:'Poppins-Bold'}}>Country : {country}</Text>
        </View>
        <View style={{borderRadius:10,padding:5,flexDirection:'row', justifyContent:'flex-start', alignItems:'center',elevation:5, backgroundColor:"white", marginTop:5}}>
        <Icon.Button
              name="signal"
              size={20}
              color="orange"
              backgroundColor="transparent"
            />
        <Text style={{color:'green', fontFamily:'Poppins-Bold'}}>Status : {status}</Text>
        </View>
      {
        status === "V-G" ? (
          <Services />
        ):(
          <Text style={{color:"black", textAlign:"center"}}>Postlanding Services is not Available For you Right Now</Text>
        )
      }
      <View style={{justifyContent:'space-around', flexDirection:"row", bottom:60}}>

        <TouchableOpacity onPress={Logout}>
      <View  style={{alignSelf:'flex-start',flexDirection:'row', justifyContent:'flex-start', alignItems:'center', backgroundColor:COLORS.primary, width:150, marginBottom:10, borderRadius:10,height:50}}>
      <Icon.Button
              name="gear"
              size={20}
              color="white"
              backgroundColor="transparent"
            />
        <Text style={{fontSize:10, fontWeight:"700", color:'white'}}>Logout</Text>
      </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={()=>navigation.navigate('Chat')}>
      <View  style={{alignSelf:'flex-start',flexDirection:'row', justifyContent:'flex-start', alignItems:'center', backgroundColor:"red", width:150, marginBottom:10, borderRadius:10,height:50}}>
      <Icon.Button
              name="comment"
              size={20}
              color="white"
              backgroundColor="transparent"
            />
        <Text style={{fontSize:10, fontWeight:"700", color:'white'}}>Report a problem</Text>
      </View>
      </TouchableOpacity>
      </View>
      </View>
     
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
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconContainer: {
    height: 85,
    width: 85,
    backgroundColor: COLORS.white,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor:COLORS.primary,
    borderWidth:1,
    alignSelf:'center',
  },
  detailsContainer: {
    borderTopLeftRadius: 30,
    backgroundColor: COLORS.white,
    flex: 1.5,
    padding:5
    
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
  
});
