import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, Text, PermissionsAndroid, Platform, Image, ImageBackground, StyleSheet, SafeAreaView , StatusBar, Modal} from 'react-native';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import COLORS from "../src/COLORS";
const y = require('./icons/y.png')
const camera = require('./icons/camera.png')
const Status =()=>{
  const [profilePicture, setProfilePicture] = useState(null);
  const [coverPicture, setCoverPicture] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  useEffect(() => {
    const getImages = async () => {
      try {
        const profileUri = await AsyncStorage.getItem('profilePicture');
        const coverUri = await AsyncStorage.getItem('coverPicture');
        if (profileUri !== null) {
          setProfilePicture(profileUri);
        }
        if (coverUri !== null) {
          setCoverPicture(coverUri);
        }
      } catch (error) {
        console.log('Error retrieving images:', error);
      }
    };
    getImages();
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
  const openGallery = (mediaType) => {
    const options = {
      mediaType: 'photo',
      maxWidth: 800,
      maxHeight: 600,
      quality: 1.5,
    };
    launchImageLibrary(options, async (response) => {
      if (response.didCancel) {
        console.log('User cancelled gallery');
      } else if (response.errorCode) {
        console.log('Gallery error:', response.errorMessage);
      } else {
        console.log('Gallery photo:', response.assets[0]);
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
          } catch (error) {
            console.log('Error storing cover picture:', error);
          }
        }
      }
    });
  };
  const ClearAsyncStorageButton = () => {
    const clearAsyncStorage = async () => {
      try {
        await AsyncStorage.clear();
        console.log('AsyncStorage cleared successfully!');
      } catch (error) {
        console.error('Error clearing AsyncStorage:', error);
      }
    };
  }
  const openImageModal = (imageUri) => {
    setSelectedImage([{ url: imageUri }]);
    setModalVisible(true);
  };
  const closeModal = () => {
    setSelectedImage(null);
    setModalVisible(false);
  };
    return(
 <SafeAreaView style={{flex: 1, backgroundColor: COLORS.white}}>
      <StatusBar translucent backgroundColor="rgba(0,0,0,0)"/>
      <ImageBackground style={{flex: 0.7,backgroundColor:'lightblue'}} source={{uri: coverPicture}}> 
        <View style={style.header}>
        </View>
        <View style={style.imageDetails}>
        <TouchableOpacity onPress={()=>requestCameraPermission("cover")}>
         <Image source={require('./icons/camera.png')} style={{width:20, height:20,}}/>
        </TouchableOpacity>
        </View>
      </ImageBackground>
      <View style={style.detailsContainer}>
        <TouchableOpacity onPress={() => openImageModal(profilePicture)}>
        <View style={style.iconContainer}>
            <Image source={profilePicture ? {uri: profilePicture} : camera} style={{ width: 65, height: 65, borderRadius: 100 }} />
        </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>requestCameraPermission("cover")}>
        <Image source={require('./icons/plus.png')} style={{width:25, height:25,left:85}}/>
        </TouchableOpacity>
        <Text style={{marginTop: 40, lineHeight: 32, fontFamily:'Poppins-Bold', color:COLORS.primary}}>Ess Global</Text>
        <Text style={{color:'black', fontFamily:'Poppins-Regular'}}>File .no : 5473534</Text>
        <Text style={{color:'black', fontFamily:'Poppins-Regular'}}>Passport no : U536427</Text>
      </View>
      <View style={style.footer}>
        <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
       <Text style={{color:'white', fontWeight:"700", textDecorationLine:'underline', fontSize:20}}>Active</Text>
        </View>
        <TouchableOpacity>
        <View style={{backgroundColor:"white", alignItems:'center', justifyContent:'center', padding:10, borderRadius:20}}><Text style={{fontSize:16, fontWeight:"700", color:COLORS.primary}}>LOG OUT</Text></View>
        </TouchableOpacity>  
      </View>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
      >
        <View style={style.centeredView}>
          <TouchableOpacity onPress={()=>setModalVisible(false)}>
        <View style={{marginBottom:20}}><Text style={{color:'white', fontSize:20}}>Close</Text></View>
          </TouchableOpacity>
            <Image source={profilePicture ? {uri: profilePicture} : camera} style={{width:150, height:150}}/>
        </View>
      </Modal>
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
    height: 80,
    width: 80,
    position: 'absolute',
    top: -60,
    backgroundColor: COLORS.white,
    borderRadius: 50,
    left:27,
    elevation: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor:COLORS.primary,
    borderWidth:1
  },
  detailsContainer: {
    top: -30,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingVertical: 25,
    paddingHorizontal: 15,
    backgroundColor: COLORS.white,
    flex: 1.5,
  },
  header: {
    marginTop: 70,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20, 
  },
  imageDetails: {
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    width: '100%',
    position: 'absolute',
    bottom: 30,
  },
  footer: {
    flexDirection: 'row',
    backgroundColor: COLORS.primary,
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