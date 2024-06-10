// Step4.js
import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView , Dimensions} from 'react-native';
import Dropdown from '../Dropdown';

const Test = [
  { label: 'IELTS', value: 'a' },
  { label: 'Pearson', value: 'b' },
  { label: 'GMAT', value: 'c' },
  { label: 'GRE', value: 'd' },
  { label: 'SAT', value: 'e' },
];

const Step4 = ({ formData, handleChange, handleSubmit }) => {
  const [textInputVisible, setTextInputVisible] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    if (option === 'option1') {
      setTextInputVisible(true);
    } else {
      setTextInputVisible(false);
      handleChange('', 'test');
    }
  };

  return (
    <ScrollView>

    <View style={styles.stepContainer}>
      <Text style={styles.label}>Test Status</Text>
      <View style={styles.radioButtonGroup}>
        <TouchableOpacity
          style={[styles.radioButton, selectedOption === 'option1' && styles.radioButtonSelected]}
          onPress={() => handleOptionSelect('option1')}
        />
        <Text style={styles.radioButtonText}>Yes</Text>
        <TouchableOpacity
          style={[styles.radioButton, selectedOption === 'option2' && styles.radioButtonSelected]}
          onPress={() => handleOptionSelect('option2')}
        />
        <Text style={styles.radioButtonText}>No</Text>
      </View>
      {textInputVisible && (
        <>
          <Text style={styles.label}>Test</Text>
          <Dropdown
            placeholder='Choose Your Test'
            options={Test}
            onSelect={option => handleChange(option.label, 'test')}
            value={formData.test}
          />
        </>
      )}
      <Text style={styles.label}>Nearest Branch</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter Your Nearest Branch"
        onChangeText={text => handleChange(text, 'branch')}
        value={formData.branch}
         placeholderTextColor="grey"
      />
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>
    </View>
    </ScrollView>
  );
};
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
  radioButtonGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    justifyContent:"flex-start",
    gap:10
  },
  radioButton: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    marginRight: 5,
  },
  radioButtonSelected: {
    backgroundColor: '#007bff',
  },
  radioButtonText: {
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
    color:'black'
  },
  button: {
    backgroundColor: '#007bff',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'Poppins-Bold',
  },
});

export default Step4;
