// Step3.js
import React from 'react';
import { View, Text, TextInput, StyleSheet , Dimensions} from 'react-native';
import Dropdown from '../Dropdown';

const Qualification = [
  { label: '10th', value: '1' },
  { label: '12th', value: '2' },
  { label: 'Graduation', value: '3' },
  { label: 'Post-Graduation', value: '4' },
];

const Step3 = ({ formData, handleChange }) => (
  <View style={styles.stepContainer}>
    <Text style={styles.label}>Qualification</Text>
    <Dropdown
      placeholder='Choose Your Qualification'
      options={Qualification}
      onSelect={option => handleChange(option.label, 'qualification')}
      value={formData.qualification}
    />
    <Text style={styles.label}>Academic Year</Text>
    <TextInput
      style={styles.input}
      placeholder="Enter Your Academic Year"
      onChangeText={text => handleChange(text, 'Year')}
      value={formData.Year}
      keyboardType='numeric'
       placeholderTextColor="grey"
    />
    <Text style={styles.label}>Percentage</Text>
    <TextInput
      style={styles.input}
      placeholder="Enter Percentage"
      onChangeText={text => handleChange(text, 'percentage')}
      value={formData.percentage}
      keyboardType='numeric'
       placeholderTextColor="grey"
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

export default Step3;
