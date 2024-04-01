import React from "react";
import { ScrollView, StyleSheet, View, Text, Image, TouchableOpacity, Linking, StatusBar } from "react-native";
import COLORS from "./COLORS";
const FlagScreen = ({ navigation,route }) => {
    const Fdata = route.params;
    const handleAddressPress = () => {
        const encodedAddress = encodeURIComponent(`${Fdata.Adress1}`);
        const mapUrl = `https://www.google.com/maps/search/?api=1&query=${encodedAddress}`;
        Linking.openURL(mapUrl);
      };
    const handleEmailPress = () => {
        Linking.openURL(`mailto:${Fdata.email}`);
      };
    const handlePhonePress = () => {
        Linking.openURL(`tel:${Fdata.phoneno}`);
      };
    return (
        <ScrollView>
            <StatusBar backgroundColor={COLORS.primary}/>
            <View style={styles.header}>
                <TouchableOpacity onPress={()=>navigation.goBack()}>
                <View style={{alignItems:'center', justifyContent:'center',marginTop:30}}>
                    <Image source={require('./Logo/backon.png')}  style={{width:20, height:20}}/>
                </View>
                </TouchableOpacity>
                <View style={{elevation:1, alignItems:'center', justifyContent:'center'}}>
                    <Image source={Fdata.image} style={{width:70, height:50}}/>
                </View>
                <View style={{alignItems:'center', justifyContent:'center'}}>
                <Text style={{fontSize:20,fontFamily:'Poppins-Medium', marginTop:5, color:'black'}}>{Fdata.name}</Text>
                <Text style={{fontSize:20, marginTop:5, color:COLORS.primary}}>{Fdata.subname}</Text>
                </View>
            </View>
                <View>
                <Text style={{padding:12, fontFamily:"Poppins-Regular", fontSize:17, color:'grey'}}>Locations</Text>
                </View>
                <View style={{backgroundColor:"white", margin:15, padding:12, borderRadius:10, elevation:2}}>
                    <Text style={{color:'black', fontFamily:"Poppins-Medium"}}>{Fdata.officename}</Text>
                    <Text style={{color:'black', fontFamily:"Poppins-Regular", }}>{Fdata.office}</Text>
                    <TouchableOpacity onPress={handleAddressPress}>
                    <Text style={{color:'grey'}}>{Fdata.Adress1}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={handlePhonePress}>
                    <Text style={{color:COLORS.primary}}>Phone.no :{Fdata.phoneno}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={handleEmailPress}>
                    <Text style={{color:"green"}}>{Fdata.email}</Text>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity onPress={handlePhonePress}>
                <View style={{borderRadius:50,width:65, height:65, backgroundColor:COLORS.primary, justifyContent:'center', alignItems:'center', alignSelf:'flex-end', marginVertical:300,right:25}}>
                    <Image source={require('./Tabicon/contact.png')}  style={{width:40, height:40}}/>
                </View>
                </TouchableOpacity>
        </ScrollView>
    );
};
export default FlagScreen;
const styles = StyleSheet.create({
    header: {
        backgroundColor:COLORS.light,
        height:110,
        padding:10,
        flexDirection:"row",
        elevation:5,
        marginTop:20,
        gap:20
    }
});
