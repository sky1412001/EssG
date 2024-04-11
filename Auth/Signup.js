import React, {useState} from 'react';
import axios from 'axios';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Image,
  ScrollView,
  ImageBackground,
  StatusBar
} from 'react-native';
const imail = require('./icons/lock.png');
const eyes = require('./icons/eye.png');
const hiden = require('./icons/hiden.png');
import COLORS from '../src/COLORS';
const Signup = ({navigation}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [checkValidEmail, setCheckValidEmail] = useState('');
  const [seepassword, setSeePassword] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [strength, setStrength] = useState('');
  const baseUrl = 'http://10.0.2.2:9000/api/user/register';
  const data = {name, email, password};
  const refreshData = () => {
    setName('');
    setEmail('');
    setPassword('');
    setValue('');
  };
  const postData = async () => {
    try {
      const response = await axios.post(baseUrl, data);
      console.log('POST Response:', response.data);
      alert('User Registers succesfully');
      navigation.navigate('Login');
      refreshData();
    } catch (error) {
      console.error('Error during POST request:', error.message);
    }
  };
  const validatePassword = input => {
    let newSuggestions = [];
    if (input.length < 8) {
      newSuggestions.push('Password should be at least 8 characters long');
    }
    if (!/\d/.test(input)) {
      newSuggestions.push('Add at least one number');
    }
    if (!/[A-Z]/.test(input) || !/[a-z]/.test(input)) {
      newSuggestions.push('Include both upper and lower case letters');
    }
    if (!/[^A-Za-z0-9]/.test(input)){
      newSuggestions.push('Include at least one special character');
    }
    setSuggestions(newSuggestions);
    if (newSuggestions.length === 0) {
      setStrength('Very Strong');
    } else if (newSuggestions.length <= 1) {
      setStrength('Strong');
    } else if (newSuggestions.length <= 2) {
      setStrength('Moderate');
    } else if (newSuggestions.length <= 3) {
      setStrength('Weak');
    } else {
      setStrength('Too Weak');
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
  }
  return (
    <ImageBackground source={require('../src/Postdata/formBack.png')} style={{flex:1}}>
    <ScrollView style={{flex:1}}>
      <StatusBar translucent />
      <View style={styles.container}>
        <View style={styles.header}>
        <Image source={imail} style={styles.headerImg}/>
          <Text style={styles.title}>
            Signup in to <Text style={{color: '#075eec'}}>ESS GLOBAL</Text>
          </Text>
        </View>
        <View style={styles.form}>
         {/*USERNAME */}
          <View style={styles.input}>
            <Text style={styles.inputLabel}>Username</Text>
            <TextInput
              autoCapitalize="none"
              autoCorrect={false}
              placeholder="gbUsername"
              placeholderTextColor="#6b7280"
              style={styles.inputControl}
              value={name}
              onChangeText={text => setName(text)}
            />
          </View>
          {/*EMAIL  ADDRESS*/}
          <View style={styles.input}>
            <View style={{flexDirection:'row', justifyContent:'space-between'}}>
            <Text style={styles.inputLabel}>Email address</Text>
            <View>
              {checkValidEmail ? (
                <Text style={{color: 'red', textAlign: 'right'}}>
                  Invalid Email format
                </Text>
              ) : <></>}
            </View>
            </View>
            <TextInput
              autoCapitalize="none"
              autoCorrect={false}
              onChangeText={text => handleCheckEmail(text)}
              placeholder="gb@example.com"
              placeholderTextColor="#6b7280"
              style={styles.inputControl}
              value={email}
            />    
          </View>
          {/*PASSWORD*/}
          <View style={styles.input}>
            <View style={{flexDirection:'row' ,justifyContent:'space-between'}}>
            <Text style={styles.inputLabel}>Password</Text>
            <Text
              style={{
                color:
                  strength === 'Too Weak'
                    ? 'red'
                    : strength === 'Weak'
                    ? 'orange'
                    : strength === 'Moderate'
                    ? 'black'
                    : strength === 'Strong'
                    ? 'green'
                    : 'blue',
                    fontFamily:"Poppins-Medium",
                    fontSize:14,
                    textAlign:'right',
                    marginTop:4,
                    marginRight:4
              }}>{strength}</Text>
            </View>
            <TextInput
              autoCorrect={false}
              onChangeText={text => {
                setPassword(text);
                validatePassword(text);
              }}
              placeholder="********"
              placeholderTextColor="#6b7280"
              style={styles.inputControl}
              secureTextEntry={!seepassword}
              value={password}
            />
                {/*SHOW & HIDE PASSWORd*/}  
            <TouchableOpacity onPress={toggleEye}>
              <Image
                source={seepassword ? eyes : hiden}
                style={{
                  width: 30,
                  height: 30,
                  alignSelf: 'flex-end',
                  marginHorizontal: 12,
                  marginTop: -35,
                }}
              />
            </TouchableOpacity>
            <Text>{suggestions}</Text>
          </View>
          {/*REGISTER BUTTON*/}
          <View style={styles.formAction}>
            <TouchableOpacity
              onPress={postData}
              disabled={
                name === '' ||
                email === '' ||
                password === '' ||
                checkValidEmail 
              }>
              <View  style={[styles.btn,
        { backgroundColor: ( name === "" || email === '' || password === '' || checkValidEmail) ? 'gray' : COLORS.primary }
    ]}>
                <Text style={styles.btnText}>Sign up</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
        <View style={{boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',flexDirection:"row", justifyContent:'space-around', marginTop:20, backgroundColor:"#e8ecf4",padding:10, borderRadius:10,  margin:25}}>
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
    </ScrollView>
    </ImageBackground>
  );
};
export default Signup;
const styles = StyleSheet.create({
  container: {
    padding: 24,
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
    marginVertical: 33,
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
    marginVertical: 10,
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
    marginBottom: 8,
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#075eec',
    borderColor: '#075eec',
  },
  btnText: {
    fontSize: 18,
    lineHeight: 26,
    fontWeight: '600',
    color: '#fff',
  },
});