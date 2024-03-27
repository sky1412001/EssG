
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet, StatusBar, Image } from 'react-native';
import COLORS from './COLORS';
const user = require('../Auth/icons/camera.png')
const Chat = () => {
  const [message, setMessage] = useState('');
  const [chatMessages, setChatMessages] = useState([]);

  const handleSend = () => {
    if (message.trim() !== '') {
      // Add user's message to chat messages list
      setChatMessages([...chatMessages, { text: message, fromUser: true }]);
      // Clear input field
      setMessage('');
    }
  };

  useEffect(() => {
    if (chatMessages.length > 0 && chatMessages[chatMessages.length - 1].fromUser) {
      setTimeout(() => {
        setChatMessages([
          ...chatMessages,
          { text: "Thank you for your message!", fromUser: false }
        ]);
      }, 1000);
    }
  }, [chatMessages]);
  return (
    <View style={styles.container}>
        <StatusBar backgroundColor={COLORS.primary}/>
        <View style={{elevation:1, height:50, marginTop:20, color:'white', flexDirection:'row', padding:10, gap:4}}>
            <Image source={user} style={{width:38, height:38}}/>
            <View style={{alignItems:'center', justifyContent:'center'}}>
                <Text style={{fontSize:15}}>Admin</Text>
            </View>
        </View>
      <ScrollView style={styles.chatContainer}>
        {chatMessages.map((chat, index) => (
          <View key={index} style={[styles.messageContainer, chat.fromUser && styles.userMessage]}>
            <Text>{chat.text}</Text>
          </View>
        ))}
      </ScrollView>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Type your message..."
          value={message}
          onChangeText={text => setMessage(text)}
        />
        <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
          <Text style={styles.sendButtonText}>Send</Text>
        </TouchableOpacity>
      </View>
    </View>
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
    marginBottom: 5,
    borderRadius: 5,
    backgroundColor: '#f0f0f0',
    maxWidth: '80%',
  },
  userMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#dcf8c6',
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
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginRight: 10,
  },
  sendButton: {
    backgroundColor: '#007bff',
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
