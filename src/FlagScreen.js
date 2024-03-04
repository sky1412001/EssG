import React from "react";
import { ScrollView, StyleSheet, View, Text, Image, TouchableOpacity, Linking } from "react-native";
import { useNavigation } from '@react-navigation/native';
import COLORS from "./COLORS";
import { StatusBar } from "native-base";

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
            <StatusBar backgroundColor={COLORS.light}/>
            <View style={styles.header}>
                <View style={{elevation:10}}>
                    <Image source={Fdata.image} style={{width:70, height:50}}/>
                </View>
                <View>
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
        </ScrollView>
    );
};

export default FlagScreen;

const styles = StyleSheet.create({
    header: {
        backgroundColor:COLORS.light,
        height:110,
        padding:40,
        flexDirection:"row",
        justifyContent:"space-around",
        elevation:5
    }
});
