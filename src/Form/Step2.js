// Step2.js
import React from 'react';
import { View, Text, TextInput, StyleSheet, Dimensions } from 'react-native';
import Dropdown from '../Dropdown';

const dropdownOptions = [
  { label: 'Student', value: 'option1' },
  { label: 'Tourist', value: 'option2' },
  { label: 'Dependent', value: 'option3' },
];

const Options = [
  { label: 'Australia', value: 'value1' },
  { label: 'Canada', value: 'value2' },
  { label: 'Europe', value: 'value3' },
  { label: 'U.S.A', value: 'value4' },
  { label: 'The U.K', value: 'value5' },
  { label: 'others', value: 'value6' },
];

const Step2 = ({ formData, handleChange }) => (
  <View style={styles.stepContainer}>
    <Text style={styles.label}>City</Text>
    <TextInput
      style={styles.input}
      placeholder="Enter Your City"
      onChangeText={text => handleChange(text, 'city')}
       placeholderTextColor="grey"
      value={formData.city}
    />
    <Text style={styles.label}>Visa Type</Text>
    <Dropdown
      placeholder='Choose Your Visa type'
      options={dropdownOptions}
      onSelect={option => handleChange(option.label, 'visaType')}
      value={formData.visaType}
    />
    <Text style={styles.label}>Country</Text>
    <Dropdown
      placeholder='Choose Your Country'
      options={Options}
      onSelect={option => handleChange(option.label, 'country')}
      value={formData.country}
    />
  </View>
);
const { width } = Dimensions.get('window');
const styles = StyleSheet.create({
    scrollContainer: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    stepContainer: {
        flex: 1,
        padding: 20,
        width: width * 1,
        maxWidth: 400,
    },
 placeholder:{
    color:"grey"
 },
  label: {
    fontSize: 16,
    marginBottom: 5,
    fontFamily: 'Poppins-Regular',
    color:'black'
  },
  input: {
    height: 50,
    borderColor: 'black',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    fontFamily: 'Poppins-Regular',
  },
});

export default Step2;
