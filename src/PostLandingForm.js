import {StatusBar} from 'native-base';
import React, {useState} from 'react';
import {
  SafeAreaView,
  Image,
  Text,
  ScrollView,
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import COLORS from './COLORS';

const PostLandingForm = ({navigation, route}) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [mobileNo, setMobileNo] = useState('');
  const [checkValidEmail, setCheckValidEmail] = useState('');
  const Service = route.params;

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
      } else if (error.request){
        console.error('No response received:', error.request);
        setValue('No response received');
      } else {
        console.error('Error setting up the request:', error.message);
        setValue('Error setting up the request');
      }
    }
  };
  return (
      <SafeAreaView style={{flex:1}}>
      <ImageBackground source={require('./Postdata/formBack.png')} style={{flex:1}}>
    <ScrollView style={{flex:1}}>

      <StatusBar translucent backgroundColor='rgba(0,0,0,0)' />
      <View
        style={{
          flexDirection: 'row',
          padding: 20,
          backgroundColor: 'white',
          justifyContent:'space-evenly',

          marginTop:10
        }}>
        <View>
          <Image source={Service.image} style={{width: 180, height: 180,}} />
        </View>
      </View>
      <View>
        <Text
          style={{
            fontSize: 20,
            fontFamily: 'Poppins-Bold',
            textAlign: 'center',
            textDecorationLine: 'underline',
            color: 'black',
          }}>
          {Service.title}
        </Text>
      </View>
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
                    ? 'lightblue'
                    : COLORS.primary,
              },
            ]}>
            <Text style={styles.btnText}>Register</Text>
          </View>
        </TouchableOpacity>
      </View>
    </ScrollView>
      </ImageBackground>
      </SafeAreaView>
  );
};
export default PostLandingForm;
const styles = StyleSheet.create({
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
    margin: 20,
  },
  formAction: {
    margin: 20,
    marginVertical: 46,
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
    margin: 15,
  },
  inputLabel: {
    fontSize: 17,
    fontWeight: '600',
    color: '#222',
  },
  inputControl: {
    height: 55,
    backgroundColor: '#EDEDF4',
    paddingHorizontal: 20,
    fontSize: 15,
    fontWeight: '500',
    elevation: 10,
    color: '#222',
    margin: 5,
    borderRadius:10
  },
  /* Button */
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
