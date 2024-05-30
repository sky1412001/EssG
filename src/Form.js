import React, {useState, useEffect, useRef} from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import axios from 'axios';
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
  Modal,
  ScrollView,
  Animated,
} from 'react-native';
import COLORS from './COLORS';
import DateTimePicker from '@react-native-community/datetimepicker';
import Icon from 'react-native-vector-icons/FontAwesome';
import Dropdown from './Dropdown';
const Form = () => {
  const baseUrl = '';
  const [firstname, setFirstName] = useState('');
  const [lastname, setLastName] = useState('');
  const [mobileNo, setMobileNo] = useState('');
  const [email, setEmail] = useState('');
  const [checkValidEmail, setCheckValidEmail] = useState('');
  const [value, setValue] = useState('');
  const [selectCounrty, setSelectCountry] = useState('');
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [isPickerShow, setIsPickerShow] = useState(false);
  const [date, setDate] = useState(new Date(Date.now()));
  const [showTextInput, setShowTextInput] = useState(false);
  const [textInputValue, setTextInputValue] = useState('');
  const [pickerValue, setPickerValue] = useState('');
  const [selectedOption, setSelectedOption] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState(null);
  const options = [
    { label: 'Australia', value: '1' },
    { label: 'Canada', value: '2' },
    { label: 'Europe', value: '3' },
    { label: 'USA', value: '4' },
    { label: 'The U.K', value: '5' },
    { label: 'Other', value: '6' },
  ];
  const queries = [
    { label: 'Bussiness query', value: '1' },
    { label: 'Permanent Residency', value: '2' },
    { label: 'Citizenship', value: '3' },
    { label: 'By Investment', value: '4' },
    { label: 'Tourist Visa', value: '5' },
  ];
  const handleSelect = (option) => {
    setSelectedOption(option);
  };
  const handleSelects = (option) => {
    setSelectedOptions(option);
  };
  const data = {
    firstname,
    lastname,
    mobileNo,
    pickerValue,
    selectCounrty,
    email,
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
    if (re.test(text) || regex.test(text)) {
      setCheckValidEmail(false);
    } else {
      setCheckValidEmail(true);
    }
  };
  const postData = async () => {
    try {
      const response = await axios.post(baseUrl, data);
      setMobileNo(true);
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
  useEffect(() => {
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 2000);
    return () => clearTimeout(timeout);
  }, []);
  if (loading) {
    return <Skelton />;
  }
  const showPicker = () => {
    setIsPickerShow(true);
  };

  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    const today = new Date();
    const maxDate = new Date(today.getFullYear(), today.getMonth() + 2, 0);
    const minDate = today; // Current date
    const clampedDate = new Date(
      Math.min(Math.max(currentDate, minDate), maxDate),
    ); // Clamp date within range
    setDate(clampedDate);
    setTextInputValue(formatDate(clampedDate)); // Format the date to display in TextInput
    if (Platform.OS === 'android') {
      setIsPickerShow(false); // Hide picker on Android after selecting
    } else {
      setIsPickerShow(false); // Hide picker on iOS after selecting
    }
  };
  const formatDate = date => {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear().toString();
    return `${day}-${month}-${year}`;
  };
  const onTextInputFocus = () => {
    setIsPickerShow(true);
    setShowTextInput(false);
  };
  return (
    <SafeAreaView>
      <ScrollView>
        <StatusBar translucent backgroundColor={'rgba(0,0,0,0)'} />
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.title}>
              Book{' '}
              <Text
                style={{
                  fontFamily: 'Poppins-Bold',
                  color: 'white',
                  color: COLORS.primary,
                  textDecorationStyle: 'dotted',
                }}>
                an Appointment
              </Text>
            </Text>
            <Text style={styles.subtitle}>How can we help you ?</Text>
            <Text
              style={{
                fontFamily: 'Poppins-Regular',
                fontSize: 13,
                color: '#222',
              }}>
              Share your details with us and our team will contact you for
              assessment shortly.
            </Text>
          </View>
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
              onChangeText={text => setFirstName(text)}
              require
            />
            <Icon.Button
              name="user"
              size={25}
              color={COLORS.primary}
              backgroundColor="transparent"
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
              onChangeText={text => setLastName(text)}
            />
            <Icon.Button
              name="plus"
              size={25}
              color={COLORS.primary}
              backgroundColor="transparent"
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
            <Icon.Button
              name="phone"
              size={25}
              color={COLORS.primary}
              backgroundColor="transparent"
            />
          </View>
            <TouchableOpacity onPress={showPicker}>
          <View style={styles.input}>
            <TextInput
              mode="outlined"
              editable={false}
              value={textInputValue}
              onFocus={onTextInputFocus}
              onChangeText={text => setTextInputValue(text)}
              placeholder="DD-MM-YY"
              placeholderTextColor="#6b7280"
              style={{
                color: 'grey',
                fontSize: 13,
                fontFamily:'Poppins-Regular',
                marginLeft: 8,
                width:wp('40%')
              }}
            />
              <View>
              <Icon.Button
                name="calendar"
                size={25}
                color={COLORS.primary}
                backgroundColor="transparent"
              />
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
            </TouchableOpacity>
      <Dropdown options={options} onSelect={handleSelect} placeholder='Select Your Country'/>
      <Dropdown options={queries} onSelect={handleSelects} placeholder='Select Your query'/>
      <View style={styles.input}>
            <TextInput
              mode="outlined"
              autoCorrect={false}
              onChangeText={text => setEmail(text)}
              placeholder="Email"
              placeholderTextColor="#6b7280"
              style={styles.inputControl}
              value={email}
            />
            <Icon.Button
              name="at"
              size={27}
              color={COLORS.primary}
              backgroundColor="transparent"
            />
          </View>
<TouchableOpacity>

          <View style={{width:wp('80%'), height:hp('6%'), backgroundColor:COLORS.primary, alignSelf:'center', justifyContent:'center', alignItems:'center', borderRadius:5}}>
            <Text style={{color:'white', fontFamily:"Poppins-Bold"}}>BOOK NOW!</Text>
          </View>
</TouchableOpacity>
        </View>
      
      </ScrollView>
    </SafeAreaView>
  );
};
export default Form;

const Skelton = () => {
  const opacity = useRef(new Animated.Value(1)).current;
  useEffect(() => {
    const animateSkeleton = () => {
      Animated.loop(
        Animated.sequence([
          Animated.timing(opacity, {
            toValue: 0.5,
            duration: 500,
            useNativeDriver: true,
          }),
          Animated.timing(opacity, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true,
          }),
        ]),
        {iterations: -1},
      ).start();
    };

    animateSkeleton();

    return () => {
      opacity.stopAnimation();
    };
  }, [opacity]);
  return (
    <SafeAreaView>
      <Animated.View style={[styles.headers, {opacity}]}>
        <Animated.View style={[styles.titleSkeleton, {opacity}]} />
        <Animated.View style={[styles.subtitleSkeleton, {opacity}]} />
        <Animated.View style={[styles.descriptionSkeleton, {opacity}]} />
      </Animated.View>
      <Animated.View style={styles.forms}>
        <Animated.View style={[styles.inputControlSkeleton, {opacity}]} />
        <Animated.View style={[styles.inputControlSkeleton, {opacity}]} />
        <Animated.View style={[styles.inputControlSkeleton, {opacity}]} />
        <Animated.View style={[styles.inputControlSkeleton, {opacity}]} />
        <Animated.View style={[styles.inputControlSkeleton, {opacity}]} />
        <Animated.View style={[styles.inputControlSkeleton, {opacity}]} />
      </Animated.View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  inputs: {
    gap: 30,
  },
  inputControlSkeleton: {
    height: 50,
    backgroundColor: '#d0d0d0',
    borderRadius: 8,
    padding:5
  },
  container: {
    padding: 10,
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
  },
  title: {
    fontSize: 21,
    fontFamily: 'Poppins-Bold',
    color: COLORS.primary,
    marginBottom: 3,
  },
  subtitle: {
    fontSize: 12,
    fontFamily: 'Poppins-Regular',
    color: '#222',
  },
  header: {
    marginVertical: 20,
  },
  headerImg: {
    width: 60,
    height: 60,
  },
  forms: {
    margin: 10,
    gap: 25,
    height: hp('70%'),
    padding: 13,
    opacity: 0.9,
    marginBottom: 16,
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
    borderRadius: 10,
  },
  form: {
    height: hp('80%'),
    padding: 13,
    opacity: 0.9,
    backgroundColor: '#EDF2FB',
    marginBottom: 16,
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
    elevation: 2,
    borderRadius: 10,
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
    flexDirection: 'row',
    backgroundColor: '#e8ecf4',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius:10,
    elevation:2
  },
  inputLabel: {
    fontSize: 17,
    fontWeight: '600',
    color: '#222',
  },
  inputControl: {
    height: 50,
    width:wp('40%'),
    paddingHorizontal: 14,
    fontSize: 13,
    fontFamily:'Poppins-Regular',
    borderRadius: 8,
    color: 'grey',
  },
  btn: {
    
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    paddingVertical: 20,
    height: 45,
    alignSelf: 'center',
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
    color: '#222',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headers: {
    marginVertical: 10,
    margin: 10,
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
