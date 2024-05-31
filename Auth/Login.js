import React, { useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  StatusBar,
  ScrollView,
  TextInput,
  Pressable,
  ImageBackground,
  Image
} from 'react-native';
import axios from 'axios';
import COLORS from '../src/COLORS';
const imail = require('./icons/lock.png');
const eyes = require('./icons/eye.png');
const hiden = require('./icons/hiden.png');

const Login = ({navigation},props) => {
  const baseUrl = 'http://10.0.2.2:9000/api/user/login';
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [checkValidEmail, setCheckValidEmail] = useState('');
  const [seepassword, setSeePassword] = useState(false);
  const [value, setValue] = useState('');
  const data = {name, email, password};
  const refreshData = () => {
    setEmail('');
    setPassword('');
    setValue('');
  };
  const postData = async () => {
    try {
      const response = await axios.post(baseUrl, data);
      console.log('POST Response:', response.data);
      Alert.alert('Login successfully');
      navigation.navigate('Navigator');
      refreshData();
    } catch (error) {
      console.error('Error during POST request:', error);
      if (error.response) {
        setValue(error.response.data.msg || 'Invalid User and Password');
      } else if (error.request){
        console.error('Internet Conection Failed:', error.request);
        setValue('Internet concection failed!');
      } else {
        console.error('Error setting up the request:', error.message);
        setValue('Error setting up the request');
      }
    }
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
  const toggleEye = () => {
    setSeePassword(!seepassword);
  };
  const pressSignUp = () => {
    navigation.navigate('Signup');
    refreshData();
  };
  return (
      <ImageBackground source={require('../src/Postdata/formBack.png')} style={{flex:1}}>
    <ScrollView style={{flex: 1}} keyboardDismissMode="interactive">
      <StatusBar translucent />
      <View>
        <TouchableOpacity onPress={()=>navigation.goBack()}>
        <Image source={require('../src/Logo/backon.png')} style={{width:25, height:25, marginTop:30, left:20}} />
        </TouchableOpacity>
      </View>
      <View style={styles.container}>
        <View style={styles.header}>
         <Image source={imail}  style={{width:55, height:55, alignSelf:'center'}} />
          <Text style={styles.title}>
            Sign in to <Text style={{color: '#075eec'}}>ESS GLOBAL</Text>
          </Text>
          <Text style={styles.subtitle}>FIND NEW LIFE IN OVERSEAS</Text>
        </View>
        <View style={styles.form}>
          <View style={{flexDirection:"row", justifyContent:'space-between'}}>
        <Text style={styles.inputLabel}>Email</Text>
        <Text style={{color: 'red', fontSize: 14}}>
              {value}
            </Text>
          </View>
          <View style={styles.input}>
            <TextInput
              mode="outlined"
              label="Enter your Email"
              autoCapitalize="none"
              autoCorrect={false}
              keyboardType="email-address"
              onChangeText={text => handleCheckEmail(text)}
              placeholder="gb@example.com"
              placeholderTextColor="#6b7280"
              style={styles.inputControl}
              value={email}
            />
            <View>
              {checkValidEmail ? (
                <Text style={{color: 'red', textAlign: 'right'}}>
                  Invalid Email format
                </Text>
              ) : null}
            </View>
          </View>
          <View style={styles.input}>
            <Text style={styles.inputLabel}>Password</Text>
            <TextInput
              mode="outlined"
              label="Enter your Password"
              autoCorrect={false}
              onChangeText={password => setPassword(password)}
              placeholder="********"
              placeholderTextColor="#6b7280"
              style={styles.inputControl}
              secureTextEntry={!seepassword}
              value={password}
            />

            <TouchableOpacity onPress={toggleEye}>
              <Image
                source={seepassword ? eyes : hiden}
                style={{
                  width: 30,
                  height: 30,
                  alignSelf: 'flex-end',
                  marginHorizontal: 12,
                  marginTop: -37,
                }}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.formAction}>
            <TouchableOpacity
              onPress={postData}
              disabled={email === '' || password === '' || checkValidEmail}>
              <View  style={[
        styles.btn,
        { backgroundColor: (email === '' || password === '' || checkValidEmail) ? 'gray' : COLORS.primary }
    ]}>
                <Text style={styles.btnText}>Sign in</Text>
              </View>
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={{marginTop: 'none'}}>
            <Text style={styles.formFooter}>
              Don't have an account?
              <Text
                onPress={pressSignUp}
                style={{
                  textDecorationLine: 'underline',
                  fontFamily: 'Poppins-Bold',
                  color: '#0466C8',
                }}>
                Sign up
              </Text>
            </Text>
          </TouchableOpacity>
          <View style={{flexDirection:"row", justifyContent:'space-around', marginTop:50, backgroundColor:"#e8ecf4",padding:10, borderRadius:10, elevation:10, margin:25}}>
            <TouchableOpacity>
            <Image source={require('./icons/google.png')} style={{width:35, height:35}}/>
            </TouchableOpacity>
            <TouchableOpacity>
            <Image source={require('./icons/fb.png')} style={{width:35, height:35}}/>
            </TouchableOpacity>
            <TouchableOpacity>
            <Image source={require('./icons/twitter.png')} style={{width:35, height:35}}/>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
      </ImageBackground>
  );
};
export default Login;
const styles = StyleSheet.create({
  container: {
    padding: 22,
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
    fontSize: 15,
    fontWeight: '500',
    color: '#929292',
    textAlign: 'center',
  },
  header: {
    marginVertical: 36,
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

