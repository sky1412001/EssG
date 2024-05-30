import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
  StatusBar,
  ScrollView,
  TextInput,
  ImageBackground
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

import { useAuth } from '../src/AuthContext';
import axios from 'axios';
import COLORS from '../src/COLORS';
const lockIcon = require('./icons/lock.png');
import DateTimePicker from '@react-native-community/datetimepicker';
import Icon from 'react-native-vector-icons/FontAwesome';
const Student = ({ navigation }) => {
  const [fileNo, setFileNo] = useState('');
  const [isPickerShow, setIsPickerShow] = useState(false);
  const [date, setDate] = useState(new Date(Date.now()));
  const [showTextInput, setShowTextInput] = useState(false);
  const [dob, setdob] = useState('')
  const [value, setValue] =useState('')
  const baseUrl = "https://essglobal.com/ionicApi/api.php?tag=login";
  const { login } = useAuth();
 
  
  
  const postData = async () => {
    login();
    try {
      const response = await axios.post(baseUrl, {fileNo,  dob });
      console.log('POST Response:', response);
  
      if (response.status === 200 && response.data && response.data.msg === "Login successfully !") {
        // If status is 200 and response data indicates successful login
        Alert.alert('Login successfully');
        
        // Store response data in AsyncStorage
        await AsyncStorage.setItem('userData', JSON.stringify(response.data));
        
        // Navigate to the home screen
        navigation.navigate('Status');
        refreshData();
      } else {
        // If status is not 200 or response data indicates unsuccessful login
        setValue(response.data.msg || 'Invalid User and Password');
      }
    } catch (error) {
      console.error('Error during POST request:', error);
      if (error.response) {
        setValue(error.response.data.msg || 'Invalid User and Password');
      } else if (error.request) {
        console.error('Internet Connection Failed:', error.request);
        setValue('Internet connection failed!');
      } else {
        console.error('Error setting up the request:', error.message);
        setValue('Error setting up the request');
      }
    }};
  const refreshData = () => {
    setFileNo('');
    setdob('')
  };
  const showPicker = () => {
    setIsPickerShow(true);
  };
  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setDate(currentDate);
    setdob(formatDate(currentDate));
    setIsPickerShow(false); // Hide picker after selecting
  };
  const formatDate = date => {
    const year = date.getFullYear().toString();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  };
  const onTextInputFocus = () => {
    setIsPickerShow(true);
    setShowTextInput(false);
  };

  return (
    <ImageBackground source={require('../src/Postdata/formBack.png')} style={{flex:1}}>
    <ScrollView style={styles.container}>
      <StatusBar backgroundColor={COLORS.primary} />
      
      <View>
        <TouchableOpacity onPress={()=>navigation.goBack()}>

        <Image source={require('../src/Logo/backon.png')} style={{width:25, height:25, marginTop:30}}/>
        </TouchableOpacity>
      </View>
      <View>
        <View style={styles.header}>
          <Image source={lockIcon} style={styles.headerImg}/>
          <Text style={styles.title}>
            Sign in to <Text style={{ color: '#075eec' }}>ESS GLOBAL</Text>
          </Text>
          <Text style={styles.subtitle}>FIND NEW LIFE IN OVERSEAS</Text>
        </View>
        <View style={styles.form}>
          <View style={[styles.inputContainer,{flexDirection:"row", justifyContent:"space-between"}]}>
            <Text style={styles.inputLabel}>Enter your File.no</Text>
            <Text style={{color:"red", fontWeight:"900"}}>{value ? "Invaild user" : ""}</Text>
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.inputControl}
              keyboardType='numeric'
              placeholder="62773838"
              placeholderTextColor="#6b7280"
              value={fileNo}
              onChangeText={(text) => setFileNo(text)}
            />
          </View>
            <Text style={[styles.inputLabel]}>Passport number</Text>
          <View style={styles.inputContainer}>
            <TouchableOpacity onPress={showPicker} style={{flexDirection:"row",justifyContent:"space-between",backgroundColor: '#e8ecf4',borderRadius:15}}>
            <TextInput
              mode="outlined"
              editable={false}
              value={dob}
              onFocus={onTextInputFocus}
              onChangeText={text => setdob(text)}
              placeholder="YY-MM-DD"
              placeholderTextColor="#6b7280"
              style={styles.inputControl}
            />
              <Icon.Button
                name="calendar"
                size={25}
                color={COLORS.primary}
                backgroundColor="transparent"
                />
            </TouchableOpacity>
                <View>
              </View>
            {Platform.OS === 'android' && isPickerShow && (
              <DateTimePicker
              value={date}
              mode="date"
              display="default"
              onChange={handleDateChange}
              />
            )}
          </View>
          <TouchableOpacity onPress={postData} disabled={fileNo === "" || dob === ""}>
            <View style={styles.btn}>
              <Text style={styles.btnText}>Log In</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    
    </ScrollView>
    </ImageBackground>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 22,
  },
  header: {
    marginVertical: 36,
    alignItems: 'center',
  },
  headerImg: {
    width: 60,
    height: 60,
  },
  title: {
    fontSize: 27,
    fontFamily:'Poppins-Bold',
    color: '#1d1d1d',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 15,
    fontFamily:'Poppins-Regular',
    color: '#929292',
  },
  form: {
    marginBottom: 24,
  },
  inputContainer: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 17,
    fontWeight: '600',
    color: '#222',
  },
  inputControl: {
    height: 44,
    backgroundColor: '#e8ecf4',
    paddingHorizontal: 16,
    borderRadius: 12,
    fontSize: 15,
    fontWeight: '500',
    color: '#222',
  },
  btn: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderWidth: 1,
    backgroundColor: '#0466C8',
    borderColor: '#075eec',
  },
  btnText: {
    fontSize: 18,
    lineHeight: 26,
    fontWeight: '600',
    color: '#fff',
  },
});
export default Student;
