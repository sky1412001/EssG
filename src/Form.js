import React, {useState} from "react";
import  {widthPercentageToDP as wp , heightPercentageToDP as hp } from 'react-native-responsive-screen';
import axios from "axios";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  Alert,
  TouchableWithoutFeedback,
  Keyboard,
  SafeAreaView,
  form,
  StatusBar,
  ScrollView,
  TextInput,
  Pressable,
  ImageBackground,
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
  const [date, setDate] = useState('')
  const data = {firstname, lastname, mobileNo, pickerValue,selectCounrty, email};

  const handleDateChange = (selectedDate) => {
    // Handle the selected date here
    setDate(selectedDate);
  };

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
      console.log('POST Response:', response.data);
      Alert.alert('Sussesfully added');
      refreshData();
    } catch (error){
      console.error('Error during POST request:', error);
      if (error.response) {
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
  return(
    <ScrollView style={{flex: 1, backgroundColor: '#e8ecf4'}}>
      <StatusBar translucent backgroundColor="rgba(0,0,0,0)" />
      <ImageBackground source={require('./Postdata/formBack.png')}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>
            Book <Text style={{fontFamily:'Poppins-Bold',color: '#075eec',textDecorationLine:'underline', textDecorationStyle:'dotted'}}>Appointment NOW!</Text>
          </Text>
          <Text style={styles.subtitle}>How can we help you ?</Text>
        </View>
        <View style={styles.form}>

          {/*FIRST  NAME*/}
           
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
         {/*LAST  NAME*/}
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

            {/*MOBILE NO*/}

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

            {/*QUERY TYPE SELECTOR*/}

          <View style={styles.input}>
          <Picker
           style={{width:wp('88%'), height:hp('7%')  ,  backgroundColor:'#fff',
           color: '#222', fontSize: 20, fontFamily:'Poppins-Regular', borderRadius:20,elevation:10}}
          selectedValue={pickerValue}
          onValueChange={(itemValue, itemIndex) => {
            setPickerValue(itemValue);
          }}
         >
          <Picker.Item label="Select Your Query" value=""/>
          <Picker.Item label="Study Visa" value="1" />
          <Picker.Item label="Work Visa" value="2" />
          <Picker.Item label="Tourist Visa" value="3" />
          <Picker.Item label="Permanent Residency" value="4" />
          <Picker.Item label="Bussiness query" value="5"/>
          <Picker.Item label="Citizenship by investment" value="6"/>
        </Picker>  
          </View>
            {/*COUNTRY TYPE*/}
          <View style={styles.input}>
          <Picker
           style={{width:wp('88%'), height:hp('7%'),backgroundColor: '#fff',
           color: '#222', fontSize: 20, fontFamily:'Poppins-Regular', elevation:10}}
          selectedValue={selectCounrty}
          onValueChange={(itemValue, itemIndex) => {
            setSelectCountry(itemValue);
          }} 
         >

          <Picker.Item label="Select Country " value=""/>
          <Picker.Item label="Austrlia" value="17" />
          <Picker.Item label="Canada" value="18" />
          <Picker.Item label="U.S.A" value="19" />
          <Picker.Item label="U.K" value="20" />     
        </Picker>              
          </View>

        {/*EMAIL TYPE SELECTOR*/}

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
          
          <View style={styles.input}>
         
          </View>
          <View style={styles.formAction}>
            <TouchableOpacity
              onPress={postData}
              disabled={email === '' || lastname === '' || mobileNo === '' || pickerValue === ''   || selectCounrty === "" || checkValidEmail} >
              <View  style={[
        styles.btn,
        { backgroundColor: (firstname === '' || lastname === '' || pickerValue === ''||checkValidEmail) ? 'grey' : COLORS.primary }
    ]}>
                <Text style={styles.btnText}>Register</Text>
              </View>
            </TouchableOpacity>
          </View> 
         
        </View>
      </View>
      </ImageBackground>
    </ScrollView>
  )
}
 export default Form;
const styles = StyleSheet.create({
  container: {
    padding: 20,
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
  },
  title: {
    fontSize: 27,
    fontFamily:'Poppins-Bold',
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
  /** Header */
  header: {
    marginVertical: 27,
  },
  headerImg: {
    width: 60,
    height: 60,
    alignSelf: 'center',
  },
  /** Form */
  form: {
    marginBottom: 24,
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
  },
  formAction: {
    marginVertical: 24,
  },
  formFooter: {
    fontSize: 17,
    fontWeight: '600',
    color: '#222',
    textAlign: 'center',
    letterSpacing: 0.15,
    
  },
  /** Input */
  input: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 17,
    fontWeight: '600',
    color: '#222',
  },
  inputControl: {
    height: 55,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    fontSize: 15,
    fontWeight: '500',
    elevation:10,

    color: '#222',
  },
  /* Button */
  btn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderColor: '#075eec',
  },
  btnText: {
    fontSize: 18,
    lineHeight: 26,
    fontWeight: '600',
    color: '#fff',
  },
});
