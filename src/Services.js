import React, { useState } from "react";
import { ScrollView, View, Text, Image, SafeAreaView, TouchableOpacity, FlatList, ImageBackground, StyleSheet , Modal, TextInput} from "react-native";
import COLORS from "./COLORS";
import Service from "./Service";

const Services = ({ navigation }) => {
  const [modalVisible , setModalVisible] = useState(false)
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [mobileNo, setMobileNo] = useState('');
  const [checkValidEmail, setCheckValidEmail] = useState('');
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
  const Card = ({ service }) => {
    
    return (
      <TouchableOpacity onPress={() => setModalVisible(true)} activeOpacity={0.9}>
        <View style={styles.cardContainer}>
          <Image source={service.image} style={styles.cardImage} />
          <View style={styles.cardTextContainer}>
            <Text style={styles.cardTitle}>{service.title}</Text>
            <Text style={styles.cardInfo}>{service.info}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };
  return (
    <SafeAreaView style={styles.container}>
   <Text style={{fontFamily:'Poppins-Bold',color:COLORS.primary, textAlign:'center',marginTop:10}}>Post Landing Services</Text>
      <View style={styles.cardListContainer}>
        <FlatList
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.flatListContent}
          horizontal
          showsHorizontalScrollIndicator={false}
          data={Service}
          renderItem={({ item }) => <Card service={item} />}
        />
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
      >
        <View style={{
      flex: 1,
      justifyContent: 'flex-end',
      alignItems: 'center',
    }}>
           <TouchableOpacity onPress={()=>setModalVisible(false)} style={{width:'100%', height:'33%'}}>

           </TouchableOpacity>
          <View style={{backgroundColor:COLORS.simple, width:"100%", height:"77%", borderTopLeftRadius:28, borderTopRightRadius:28}}>
            <View style={{width:40, height:4, backgroundColor:"grey", alignSelf:'center', marginTop:10, borderRadius:10}}></View>
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
                ? COLORS.primary
                : COLORS.primary,
              },
            ]}>
            <Text style={styles.btnText}>Register</Text>
          </View>
        </TouchableOpacity>
      </View>
     
     
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  imageBackground: {
    height: 180,

  },
  cardListContainer: {
    paddingBottom: 20,
  },
  flatListContent: {
    flexGrow: 1,
    gap:15
  },
  cardContainer: {
    flexDirection: 'row',
    padding: 10,
    marginVertical: 8,
    backgroundColor: 'white',
    elevation: 5,
    borderRadius: 10,
    marginLeft:10
  },
  cardImage: {
    width: 50,
    height: 50,
    margin: 10,
  },
  cardTextContainer: {
    flexDirection: 'column',
    justifyContent:'center'
  },
  cardTitle: {
    fontSize: 12,
    fontFamily: 'Poppins-Bold',
    color: 'black',
  },
  cardInfo: {
    fontSize: 10,
    fontFamily:'Poppins-Regular',
    color: 'gray',
  },
  input: {
    margin: 15,
  },
  inputLabel: {
    fontSize: 17,
    fontWeight: '600',
    color: '#222',
  },
  inputControl: {
    height: 50,
    backgroundColor: '#EDEDF4',
    paddingHorizontal: 20,
    fontSize: 14,
    fontWeight: '500',
    elevation: 1,
    color: '#222',
    margin: 5,
    borderRadius:10
  },
  btn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 20,
    width:'65%',
    alignSelf:'center'
  },
  btnText: {
    fontSize: 17,
    lineHeight: 26,
    fontWeight: '600',
    color: '#fff',
  },

});
export default Services;
