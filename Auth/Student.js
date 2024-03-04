import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  Alert,
  TouchableWithoutFeedback,
  Keyboard,
  SafeAreaView,
  form,
  StatusBar,
  ScrollView,
  TextInput,
  Pressable,
} from 'react-native';
const imail = require('./icons/lock.png');
const Student = () => {
  return (
    <ScrollView style={{flex: 1, backgroundColor: '#e8ecf4'}}>
      <StatusBar backgroundColor="white" />
      <View style={styles.container}>
        <View style={styles.header}>
          <Image source={imail} style={styles.headerImg}/>
          <Text style={styles.title}>
            Sign in to <Text style={{color: '#075eec'}}>ESS GLOBAL</Text>
          </Text>
          <Text style={styles.subtitle}>FIND NEW LIFE IN OVERSEAS</Text>
        </View>
        <View style={styles.form}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text style={styles.inputLabel}>Enter your File.no</Text>
          </View>
          <View style={styles.input}>
            <TextInput
              mode="outlined"
              label="Enter file no"
              autoCapitalize="none"
              autoCorrect={false}
              placeholder="62773838"
              placeholderTextColor="#6b7280"
              style={styles.inputControl}
            />
          </View>
          <View style={styles.input}>
            <Text style={styles.inputLabel}>Passport number</Text>
            <TextInput
              mode="outlined"
              label="Enter Passport no"
              autoCapitalize="none"
              autoCorrect={false}
              placeholder="***6355"
              placeholderTextColor="#6b7280"
              style={styles.inputControl}
            />
          </View>
          <View style={styles.formAction}>
            <TouchableOpacity>
              <View style={styles.btn}>
                <Text style={styles.btnText}>Log In</Text>
              </View>
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={{marginTop: 'none'}}>
            <Text style={styles.formFooter}>Don't have an account?</Text>
          </TouchableOpacity>
          
        </View>
      </View>
    </ScrollView>
  );
};
export default Student;

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
    backgroundColor: '#fff',
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
