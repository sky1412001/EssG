import React, { useState } from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  Pressable,
  ImageBackground, 
  Modal,
  TextInput
} from 'react-native';
import COLORS from './COLORS';
import {Rating} from 'react-native-stock-star-rating';
const Screen = ({navigation, route}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [mobileNo, setMobileNo] = useState('');
  const [checkValidEmail, setCheckValidEmail] = useState('');
  const Offices = route.params;
  const handleCheckEmail = text => {
    let re = /\$+@\$+\.\$+/;
    let regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    setEmail(text);
    if (re.test(text) || regex.test(text)) {
      setCheckValidEmail(false);
    } else {
      setCheckValidEmail(true);
    }
  };
  const postData = async () => {
    try {
      const response = await axios.post(baseUrl, data);
      console.log('POST Response:', response.data);
      Alert.alert('Sussesfully added');
      refreshData();
    } catch (error) {
      console.error('Error during POST request:', error);
      if (error.response) {
        setValue(error.response.data.msg || 'Invalid User and Password');
      } else if (error.request) {
        console.error('No response received:', error.request);
        setValue('No response received');
      } else {
        console.error('Error setting up the request:', error.message);
        setValue('Error setting up the request');
      }
    }
  };
  return (
    <SafeAreaView style={{flex: 1, backgroundColor:'white'}}>
      <StatusBar translucent backgroundColor={'rgba(0,0,0,0)'}/>
        <ImageBackground source={Offices.image} style={{flex:0.4}}>
<TouchableOpacity onPress={()=>navigation.goBack()}>
        <Image source={require('./Logo/backon.png')} style={{width:30, height:20, left:20, top:25}}/>
</TouchableOpacity>
        </ImageBackground>
        <View style={styles.header}>
        <View style={styles.imageDetails}>
          <View style={{flexDirection: 'row'}}>
            <Text
              style={{color: COLORS.white, fontWeight:'bold', fontSize: 20}}>
            </Text>
          </View>
        </View>
        </View>
      <View style={styles.detailsContainer}>
        <Text style={{marginTop: 20, lineHeight: 22, fontFamily:'Poppins-Bold', color:COLORS.primary}}>{Offices.about}</Text>
        <Rating stars={Offices.rating} maxStars={5} size={18} color={'#0466C8'}/>
        <Text style={{color:'black', fontFamily:'Poppins-Regular'}}>{Offices.description}</Text>
        <Text style={{color:'black', fontFamily:'Poppins-Regular'}}>{Offices.detail}</Text>
      </View>
      <View style={styles.footer}>
        <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
       <Text style={{color:'white', fontWeight:"700", textDecorationLine:'underline', fontSize:20}}>{Offices.rate}</Text>
        </View>
        <TouchableOpacity onPress={()=>setModalVisible(true)}>
        <View style={{backgroundColor:"white", alignItems:'center', justifyContent:'center', padding:10, borderRadius:20}}><Text style={{fontSize:16, fontWeight:"700", color:COLORS.primary}}>Register NOW</Text></View>
        </TouchableOpacity>
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
      >
        <View style={{
      flex: 1,
      justifyContent: 'flex-end',
      alignItems: 'center',
    }}>
           <TouchableOpacity onPress={()=>setModalVisible(false)} style={{width:'100%', height:'33%'}}>

           </TouchableOpacity>
          <View style={{backgroundColor:COLORS.simple, width:"100%", height:"77%", borderTopLeftRadius:28, borderTopRightRadius:28}}>
            <View style={{width:40, height:4, backgroundColor:"grey", alignSelf:'center', marginTop:10, borderRadius:10}}></View>
            <View style={styles.input}>
        <TextInput
          mode="outlined"
          label="Enter your FullName"
          autoCapitalize="none"
          autoCorrect={false}
          placeholder="FullName"
          placeholderTextColor="#6b7280"
          style={styles.inputControl}
          value={fullName}
          onChangeText={text => setFullName(text)}
          />
      </View>
      <View style={styles.input}>
        <TextInput
          mode="outlined"
          label="Enter your Email"
          autoCapitalize="none"
          autoCorrect={false}
          placeholder="Email"
          placeholderTextColor="#6b7280"
          style={styles.inputControl}
          value={email}
          onChangeText={text => handleCheckEmail(text)}
          />
      </View>
      <View style={styles.input}>
        <TextInput
          mode="outlined"
          keyboardType='numeric'
          onChangeText={text => setMobileNo(text)}
          placeholder="Mobile.NO"
          placeholderTextColor="#6b7280"
          style={styles.inputControl}
          value={mobileNo}
          />
      </View>
      <View style={styles.formAction}>
        <TouchableOpacity
          onPress={postData}
          disabled={
            email === '' ||
            fullName === '' ||
            mobileNo === '' ||
            checkValidEmail
          }>
          <View
            style={[
              styles.btn,
              {
                backgroundColor:
                fullName === '' ||
                mobileNo === '' ||
                checkValidEmail ||
                email === ''
                ? COLORS.primary
                : COLORS.primary,
              },
            ]}>
            <Text style={styles.btnText}>Register</Text>
          </View>
        </TouchableOpacity>
      </View>
      <View style={{justifyContent:"space-evenly", flexDirection:'row', alignItems:'center',}}>
        <View style={{width:80, borderWidth:0.7, borderTopWidth:0, borderLeftWidth:0, borderRightWidth:0}}></View>
        <View>

        <Text style={{fontSize:17, color:'grey'}}>or</Text>
        </View>
        <View style={{width:80, borderWidth:0.7, borderTopWidth:0, borderLeftWidth:0, borderRightWidth:0}}></View>
      </View>
      <View style={[styles.formAction]}>
        <TouchableOpacity
          onPress={()=>navigation.push('Consultant')}
       >
          <View
            style={[styles.btn, {backgroundColor:'green'}]}>
            <Text style={styles.btnText}>Talk with Consultant</Text>
          </View>
        </TouchableOpacity>
      </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  bookNowBtn: {
    height: 50,
    width: 150,
    backgroundColor: COLORS.white,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconContainer: {
    height: 60,
    width: 60,
    position: 'absolute',
    top: -50,
    backgroundColor: COLORS.white,
    borderRadius: 30,
    right: 20,
    elevation: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  detailsContainer: {
    top: -32,
    paddingVertical: 40,
    paddingHorizontal: 20,
    backgroundColor: COLORS.white,
    flex: 0.6,
  },
  header: {
    marginTop: 60,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  imageDetails: {
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
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
    padding: 20,
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
  },
  title: {
    fontSize: 27,
    fontWeight: '700',
    color: '#1d1d1d',
    marginBottom: 5,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 17,
    fontWeight: '500',
    color: '#929292',
    textAlign: 'center',
  },
  header: {
    marginVertical: 27,
  },
  headerImg: {
    width: 60,
    height: 60,
    alignSelf: 'center',
  },
  form: {
    marginBottom: 24,
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
    margin: 20,
  },
  formAction: {
    margin: 20,
    marginVertical: 35,
  },
  formFooter: {
    fontSize: 17,
    fontWeight: '600',
    color: '#222',
    textAlign: 'center',
    letterSpacing: 0.15,
  },
  input: {
    margin: 15,
  },
  inputLabel: {
    fontSize: 17,
    fontWeight: '600',
    color: '#222',
  },
  inputControl: {
    height: 50,
    backgroundColor: '#EDEDF4',
    paddingHorizontal: 20,
    fontSize: 14,
    fontWeight: '500',
    elevation: 1,
    color: '#222',
    margin: 5,
    borderRadius:10
  },
  btn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  btnText: {
    fontSize: 17,
    lineHeight: 26,
    fontWeight: '600',
    color: '#fff',
  },
});
export default Screen;


