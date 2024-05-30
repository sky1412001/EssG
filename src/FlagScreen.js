import React from "react";
import { ScrollView, StyleSheet, View, Text, Image, TouchableOpacity, Linking, StatusBar , SafeAreaView, ImageBackground} from "react-native";
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
        <SafeAreaView style={{flex:1}}>
            <StatusBar backgroundColor={COLORS.primary}/>
            <View style={styles.header}>
                <View style={{flexDirection:'row',gap:20}}>
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
                <TouchableOpacity onPress={handlePhonePress}>
                <View style={{borderRadius:50,width:55, height:55, backgroundColor:COLORS.primary, justifyContent:'center', alignItems:'center', alignSelf:'flex-end',}}>
                    <Image source={require('./Tabicon/contact.png')}  style={{width:36, height:36}}/>
                </View>
                </TouchableOpacity>
            </View>
            <ScrollView>
                <View>
                <Text style={{padding:7, color:COLORS.primary,fontFamily:"Poppins-Bold", fontSize:14, color:COLORS.primary, marginHorizontal:15}}>Locations</Text>
                </View>
                <View style={{backgroundColor:"white", margin:15, padding:10, borderRadius:10, elevation:2}}>
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
                <View style={{marginHorizontal:15}}>
                   <Text style={{fontFamily:'Poppins-Bold', color:COLORS.dark}}>Latest News for Immigartion</Text>
                </View>
                <View>
                    <View style={{backgroundColor:'white', padding:20}}>
                        <View>

                        <Text style={{color:COLORS.primary, fontFamily:'Poppins-Bold', margin:2}}>
                           {Fdata.titlenews}
                        </Text>
                        </View>
                        <View style={{ padding:5}}>
                        <Text style={{color:'grey', fontFamily:'Poppins-Regular'}}>
                            {Fdata.news}
                        </Text>
                        </View>
                        <Text style={{color:'green', fontFamily:'Poppins-Bold', textDecorationLine:'underline', fontSize:12}}>
                            {Fdata.time}
                        </Text>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};
export default FlagScreen;
const styles = StyleSheet.create({
    header: {
        backgroundColor:COLORS.light,
        padding:10,
        flexDirection:"row",
        marginTop:30,
        justifyContent:'space-between',
        alignItems:'center'
    }
});
