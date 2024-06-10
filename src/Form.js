// App.js
import React, { useState } from 'react';
import { View, FlatList, StyleSheet, TouchableOpacity, Text, ImageBackground } from 'react-native';
import Step1 from './Form/Step1';
import Step2 from './Form/Step2';
import Step3 from './Form/Step3';
import Step4 from './Form/Step4';
import COLORS from './COLORS';

const Form = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    email: '',
    city: '',
    visaType: '',
    country: '',
    qualification: '',
    Year: '',
    percentage: '',
    test: '',
    branch: '',
  });

  const handleChange = (value, field) => {
    setFormData(prevState => ({
      ...prevState,
      [field]: value
    }));
  };

  const handleSubmit = () => {
    console.log(formData); // Do something with the form data
  };

  const steps = [
    <Step1 formData={formData} handleChange={handleChange} />,
    <Step2 formData={formData} handleChange={handleChange} />,
    <Step3 formData={formData} handleChange={handleChange} />,
    <Step4 formData={formData} handleChange={handleChange} handleSubmit={handleSubmit} />,
  ];

  return (
    <View style={styles.container}>
      <View style={{height:150, padding:30}}>
        <Text style={{fontFamily:"Prompt-Bold", fontSize:23, color:COLORS.primary}}>Book An Appointment</Text>
        <Text style={{fontFamily:"Prompt-Medium", fontSize:16, color:'grey'}}>How Can We Help You?</Text>
        <Text style={{fontFamily:'Prompt-Regular', fontSize:13, color:'silver'}}>Share your details with us and our team will contact you for assessment shortly.</Text>
      </View>
      <FlatList
        data={steps}
        renderItem={({ item }) => <View style={styles.step}>{item}</View>}
        keyExtractor={(item, index) => index.toString()}
        horizontal
        pagingEnabledss
        scrollEnabled={false}
        ref={ref => this.flatListRef = ref}
        initialScrollIndex={currentStep}
        />
        
      <View style={styles.navigation}>
        <TouchableOpacity
          style={styles.navButton}
          onPress={() => {
            if (currentStep > 0) {
              setCurrentStep(currentStep - 1);
              this.flatListRef.scrollToIndex({ animated: true, index: currentStep - 1 });
            }
          }}
        >
          <Text style={styles.navButtonText}>Back</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navButton}
          onPress={() => {
            if (currentStep < steps.length - 1) {
              setCurrentStep(currentStep + 1);
              this.flatListRef.scrollToIndex({ animated: true, index: currentStep + 1 });
            }
          }}
        >
          <Text style={styles.navButtonText}>{currentStep === steps.length - 1 ? 'Submit' : 'Next'}</Text>
        </TouchableOpacity>
      </View>
      <View style={{height:60}}>

      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor: '#fff',
  },
  step: {
    width: '100%',
    flex: 0.5,
  },
  navigation: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
  },
  navButton: {
    backgroundColor: '#007bff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  navButtonText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'Poppins-Bold',
  },
});

export default Form;
