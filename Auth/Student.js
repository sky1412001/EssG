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
import axios from 'axios';
import COLORS from '../src/COLORS';
const lockIcon = require('./icons/lock.png');
const Student = ({ navigation }) => {
  const [fileNo, setFileNo] = useState('');
  const [passportNo, setPassportNo] = useState('');
  const baseUrl = "https://essglobal.com/ionicApi/api.php?tag=login";
  const postData = async () => {
    try {
      const response = await axios.post(baseUrl, { fileNo, passportNo });
      console.log('POST Response:', response.data);
      if (response.data.success) {
        Alert.alert('Login successful');
        refreshData();
      } else {
        Alert.alert('Invalid User and Password');
      }
    } catch (error) {
      console.error('Error during POST request:', error);
      Alert.alert('Error', 'Failed to login. Please try again later.');
    }
  };
  const refreshData = () => {
    setFileNo('');
    setPassportNo('');
  };
  return (
    <ImageBackground source={require('../src/Postdata/formBack.png')} style={{flex:1}}>
    <ScrollView style={styles.container}>
      <StatusBar backgroundColor={COLORS.primary} />
      
      <View>
        <TouchableOpacity onPress={()=>navigation.goBack()}>

        <Image source={require('../src/Logo/backon.png')} style={{width:25, height:25, marginTop:30}} />
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
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Enter your File.no</Text>
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
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Passport number</Text>
            <TextInput
              style={styles.inputControl}
              autoCorrect={false}
              placeholder="***6355"
              placeholderTextColor="#6b7280"
              value={passportNo}
              onChangeText={(text) => setPassportNo(text)}
            />
          </View>
          <TouchableOpacity onPress={()=>navigation.navigate('Status')}>
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
