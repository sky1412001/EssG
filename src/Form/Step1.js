import React from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView, Dimensions } from 'react-native';

const Step1 = ({ formData, handleChange }) => (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.stepContainer}>
            <Text style={styles.label}>Name</Text>
            <TextInput
                style={styles.input}
                placeholder="Enter Your Name"
                onChangeText={text => handleChange(text, 'name')}
                value={formData.name}
                placeholderTextColor="grey"
            />
            <Text style={styles.label}>Mobile.No</Text>
            <TextInput
                style={styles.input}
                placeholder="Enter Your Mobile"
                onChangeText={text => handleChange(text, 'mobile')}
                value={formData.mobile}
                 placeholderTextColor="grey"
            />
            <Text style={styles.label}>Email</Text>
            <TextInput
                style={styles.input}
                placeholder="Enter Your Email"
                onChangeText={text => handleChange(text, 'email')}
                value={formData.email}
                 placeholderTextColor="grey"
            />
        </View>
    </ScrollView>
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
        color: 'black',
    },
    input: {
        height: 50,
        borderColor: 'black',
        borderWidth: 1,
        marginBottom: 10,
        paddingHorizontal: 10,
        fontFamily: 'Poppins-Regular',
        width: '100%',
    },
});

export default Step1;
