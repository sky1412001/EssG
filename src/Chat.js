import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet, StatusBar, Image, SafeAreaView } from 'react-native';
import COLORS from './COLORS';
const user = require('../Auth/icons/camera.png')
const Chat = ({navigation}) => {
  const [message, setMessage] = useState('');
  const [chatMessages, setChatMessages] = useState([]);

  const handleSend = () => {
    if (message.trim() !== '') {
      setChatMessages([...chatMessages, { text: message, fromUser: true }]);
      setMessage('');
    }
  };
  useEffect(() => {
    if (chatMessages.length > 0 && chatMessages[chatMessages.length - 1].fromUser) {
      setTimeout(() => {
        setChatMessages([
          ...chatMessages,
          { text: "Thank you for reaching out to us regarding the problem you encountered with our App of ESS Global. We truly appreciate your proactive approach in bringing this matter to our attention.", fromUser: false }
        ]);
      }, 1000);
    }
  }, [chatMessages]);
  return (
    <SafeAreaView style={styles.container}>
        <StatusBar backgroundColor={COLORS.primary}/>
        <View style={{height:50, marginTop:20, color:'white', flexDirection:'row', padding:10, gap:20, borderColor:'#ccc', alignItems:'center', justifyContent:'flex-start'}}>
         <TouchableOpacity onPress={()=>navigation.goBack()}>
          <View style={{alignItems:"center", justifyContent:'center'}}>
          <Image source={require('./Logo/backon.png')} style={{width:20, height:20}}/>
          </View>
         </TouchableOpacity>
            <Image source={user} style={{width:36, height:36}}/>
            <View style={{alignItems:'center', justifyContent:'center'}}>
                <Text style={{fontSize:15, color:COLORS.primary, fontFamily:'Poppins-Bold'}}>ESS GLOBAL</Text>
            </View>
        </View>
      <ScrollView style={styles.chatContainer}>
        {chatMessages.map((chat, index) => (
          <View key={index} style={[styles.messageContainer, chat.fromUser && styles.userMessage]}>
            <Text style={{color:'white'}}>{chat.text}</Text>
          </View>
        ))}
      </ScrollView>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Type your message..."
          placeholderTextColor={'#222'}
          value={message}
          onChangeText={text => setMessage(text)}
        />
        <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
          <Text style={styles.sendButtonText}>Send</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  chatContainer: {
    flex: 1,
  },
  messageContainer: {
    padding: 10,
    marginBottom: 9,
    borderRadius: 5,
    backgroundColor: COLORS.primary,
    maxWidth: '80%',           
  },
  userMessage: {
    alignSelf: 'flex-end',
    backgroundColor: 'skyblue',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    paddingTop: 10,
  },
  input: {
    flex: 1,
    color:'black',
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginRight: 10,
  },
  sendButton: {
    backgroundColor: COLORS.primary,
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  sendButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
export default Chat;