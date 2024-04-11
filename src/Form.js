import React, {useState, useEffect} from "react";
import  {widthPercentageToDP as wp , heightPercentageToDP as hp } from 'react-native-responsive-screen';
import axios from "axios";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
  SafeAreaView,
  StatusBar,
  TextInput,
  ImageBackground,
  Modal,
  ActivityIndicator,
  ScrollView
} from 'react-native';
import COLORS from "./COLORS";
import {Picker} from '@react-native-picker/picker';
const Form = () =>{
  const baseUrl = '';
  const [firstname, setFirstName] = useState('');
  const [lastname, setLastName] = useState('');
  const [mobileNo, setMobileNo] = useState('');
  const [email, setEmail] = useState('');
  const [checkValidEmail, setCheckValidEmail] = useState('');
  const [value, setValue] = useState('');
  const [pickerValue, setPickerValue] = useState('');
  const [selectCounrty, setSelectCountry] = useState('');
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const data = {firstname, lastname, mobileNo, pickerValue,selectCounrty, email};
  
  const refreshData = () => {
    setFirstName('');
    setLastName('');
    setMobileNo('');
    setPickerValue('');
    setSelectCountry('');
    setValue('');
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
 
 
  const postData = async () => {
    try {
      console.warn({firstname, lastname, email, mobileNo, pickerValue, selectCounrty})
      const response = await axios.post(baseUrl, data);
      setMobileNo(true)
      console.log('POST Response:', response.data);
      Alert.alert('Sussesfully added');
      refreshData();
    } catch (error){
      console.error('Error during POST request:', error);
      if (error.response){
        setValue(error.response.data.msg || 'Invalid User and Password');
      } else if (error.request){
        console.error('No response received:', error.request);
        setValue('No response received');
      } else {
        console.error('Error setting up the request:', error.message);
        setValue('Error setting up the request');
      }
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
  return(
    <ImageBackground source={require('./Postdata/formBack.png')} style={{flex: 1, backgroundColor: '#e8ecf4'}}>
      <ScrollView>
      <StatusBar translucent backgroundColor={'rgba(0,0,0,0)'} />
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>
            Book <Text style={{fontFamily:'Poppins-Bold',color: 'white',color:COLORS.primary, textDecorationStyle:'dotted'}}>an Appointment</Text>
          </Text>
          <Text style={styles.subtitle}>How can we help you ?</Text>
          <Text style={{fontFamily:'Poppins-Regular', fontSize:13, color:'#222'}}>Share your details with us and our team will contact you for assessment shortly.</Text>
        </View>
        <View style={styles.form}>
          <View style={styles.input}>
            <TextInput
              mode="outlined"
              label="Enter your Firstname"
              autoCapitalize="none"
              autoCorrect={false}
              placeholder="First Name"
              placeholderTextColor="#6b7280"
              style={styles.inputControl}
              value={firstname}
              onChangeText={(text)=>setFirstName(text)}
            />
          </View>
          <View style={styles.input}>
            <TextInput
              mode="outlined"
              autoCapitalize="none"
              autoCorrect={false}
              placeholder="Last Name"
              placeholderTextColor="#6b7280"
              style={styles.inputControl}
              value={lastname}
              onChangeText={(text)=>setLastName(text)}
            />
          </View>
          <View style={styles.input}>
            <TextInput
              mode="outlined"
              keyboardType="numeric"
              autoCorrect={false}
              onChangeText={text => setMobileNo(text)}
              placeholder="Mobile.NO"
              placeholderTextColor="#6b7280"
              style={styles.inputControl}
              value={mobileNo}
            />
          </View>
          <View style={styles.input}>
            <View  style={{width:wp('83%'), height:50,backgroundColor:'#fff',
           color: '#222', fontSize: 20, fontFamily:'Poppins-Regular', borderRadius:8}}>
        <Picker
        style={{width:wp('81%'), color:'#222'}}
        dropdownIconColor={COLORS.primary}
        selectedValue={pickerValue}
        onValueChange={(itemValue, itemIndex) => {
          setPickerValue(itemValue);
        }}
        itemStyle={{ fontSize: 16, color: 'blue' }} 
      >
        <Picker.Item label="Select Your Query" value=""  style={{color:'grey', fontSize:15}}/>
        <Picker.Item label="Study Visa" value="1"   style={{color:'#222'}}/>
        <Picker.Item label="Work Visa" value="2"   style={{color:'#222'}}/>
        <Picker.Item label="Tourist Visa" value="3"  style={{color:'#222'}}/>
        <Picker.Item label="Permanent Residency" value="4"  style={{color:'#222'}}/>
        <Picker.Item label="Business query" value="5"  style={{color:'#222'}}/>
        <Picker.Item label="Citizenship by investment" value="6"  style={{color:'#222'}}/>
      </Picker>
            </View>
          </View>
          <View style={styles.input}>
            <View   style={{width:wp('83%'), height:50,backgroundColor: '#fff',
           color: '#222', fontSize: 20, fontFamily:'Poppins-Regular', borderRadius:8}}>
          <Picker
          style={{width:wp('81%'), color:'#222', fontFamily:'Poppins-Regular'}}
         dropdownIconColor={COLORS.primary}
          selectedValue={selectCounrty}
          onValueChange={(itemValue, itemIndex) => {
            setSelectCountry(itemValue);
          }} 
         >
          <Picker.Item label="Select Country " value="" style={{color:'grey', fontSize:15}}/>
          <Picker.Item label="Austrlia" value="17"  style={{color:'#222'}}/>
          <Picker.Item label="Canada" value="18"  style={{color:'#222'}}/>
          <Picker.Item label="U.S.A" value="19"  style={{color:'#222'}}/>
          <Picker.Item label="U.K" value="20"  style={{color:'#222'}}/>     
        </Picker>              
            </View>
          </View>
          <View style={styles.input}>
            <TextInput
              mode="outlined"
              label="Enter your email"
              autoCapitalize="none"
              autoCorrect={false}
              onChangeText={text => handleCheckEmail(text)}
              placeholder="Enter your Email"
              placeholderTextColor="#6b7280"
              style={styles.inputControl}
              value={email}
            />   
          </View>
          <View style={styles.formAction}>
            <TouchableOpacity
              onPress={postData}
              disabled={email === '' || lastname === '' || mobileNo === '' || pickerValue === ''   || selectCounrty === "" || checkValidEmail} >
              <View  style={[
        styles.btn,
        { backgroundColor: (firstname === '' || lastname === '' || pickerValue === ''|| checkValidEmail) ? COLORS.primary : 'green' }
    ]}>    
    <Image source={require('./Blog/plane.png')} style={{width:26, height:26}}/>
              </View>
            </TouchableOpacity>
          </View> 
        </View>
      </View>
      <Modal
        animationType="slide"
        visible={modalVisible}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Your Information has been submitted</Text>
            <Image source={require('./Blog/done.png')} style={{width:58, height:58}}/>
          </View>
        </View>
      </Modal>
      </ScrollView>
    </ImageBackground>
  )
}
 export default Form;

 const Skelton = () =>{
  return(
    <SafeAreaView>
  <View style={styles.headers}>
      <View style={styles.titleSkeleton} />
      <View style={styles.subtitleSkeleton} />
      <View style={styles.descriptionSkeleton} />
    </View>
    <View style={styles.forms}>
    <View style={styles.inputControlSkeleton} />
      <View style={styles.inputControlSkeleton} />
      <View style={styles.inputControlSkeleton} />
      <View style={styles.inputControlSkeleton} />
      <View style={styles.inputControlSkeleton} /> 
      <View style={styles.inputControlSkeleton} />
    </View>
    </SafeAreaView>
  )
 }
const styles = StyleSheet.create({
  inputs: {
    gap:30
  },
  inputControlSkeleton: {
    height: 50,
    backgroundColor: '#d0d0d0', 
    borderRadius: 8,
  },
  container: {
    padding: 20,
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
  },
  title: {
    fontSize: 22,
    fontFamily:'Poppins-Bold',
    color: COLORS.primary,
    marginBottom: 3,
  },
  subtitle: {
    fontSize: 16,
    fontFamily:'Poppins-Regular',
    color:'#222',
  },
  header: {
    marginVertical:10,
  },
  headerImg: {
    width: 60,
    height: 60,
  },
  forms:{
    margin:10,
    gap:25,
    height:hp('70%'),
    padding:13,
    opacity:0.9,
    marginBottom: 16,
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
    borderRadius:10
  },
  form: {
    height:hp('70%'),
    padding:13,
    opacity:0.9,
    backgroundColor: '#EDF2FB',
    marginBottom: 16,
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
    elevation:2,
    borderRadius:10
  },
  formFooter: {
    fontSize: 17,
    fontWeight: '600',
    color: '#222',
    textAlign: 'center',
    letterSpacing: 0.15,
  },
  input: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 17,
    fontWeight: '600',
    color: '#222',
  },
  inputControl: {
    height: 50,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    fontSize: 15,
    fontWeight: '500',
    borderRadius:8,
    color: 'grey',
  },
  btn: {
    marginBottom:5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    paddingVertical: 20,
    width:65,
    height:65,
    alignSelf:'center',
    borderRadius:50
  },
  
  containers: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
    backgroundColor: 'white',
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
    color:'#222'
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headers: {
    marginVertical: 10,
    margin:10
  },
  titleSkeleton: {
    width: 200, 
    height: 30, 
    backgroundColor: '#d0d0d0', 
    borderRadius: 5, 
    marginBottom: 5, 
  },
  subtitleSkeleton: {
    width: 150, // Adjust width as needed
    height: 20, // Adjust height as needed
    backgroundColor: '#d0d0d0', // Placeholder color
    borderRadius: 5, // Adjust border radius as needed
    marginBottom: 5, // Adjust margin as needed
  },
  descriptionSkeleton: {
    width: 250, // Adjust width as needed
    height: 80, // Adjust height as needed
    backgroundColor: '#d0d0d0', // Placeholder color
    borderRadius: 5, // Adjust border radius as needed
  },
});
