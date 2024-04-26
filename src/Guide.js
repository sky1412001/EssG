import React,{useEffect} from "react";
import {Animated, Easing , SafeAreaView, ScrollView, View , Text, StatusBar, Image, TouchableOpacity} from "react-native";
import COLORS from "./COLORS";


const Guide = ({navigation}) =>{
    const slideAnim = new Animated.Value(-100); // Initial position off-screen
    useEffect(() => {
      Animated.timing(slideAnim, {
        toValue: 0, // Final position (0 means fully visible)
        duration: 500, // Animation duration in milliseconds
        easing: Easing.easeInOut, // Easing function (optional)
        useNativeDriver: true, // Optimize performance
      }).start(); // Start the animation
    }, []);
    return(
        <SafeAreaView>
            <ScrollView>
            <StatusBar translucent backgroundColor={'rgba(0,0,0,0)'}/>
                <Animated.View style={{height:120, backgroundColor:"rgb(250, 249, 246)", padding:30, flexDirection:"row", gap:20,   transform: [{ translateX: slideAnim }]}}>
                        
                    <View style={{justifyContent:'center', alignItems:'center'}}>
                    <TouchableOpacity onPress={()=>navigation.goBack()}>
                        <Image source={require('./Logo/backon.png')} style={{width:23, height:23}} />
                    </TouchableOpacity>
                    </View>
                    <Animated.View>
                        <Text style={{fontFamily:'Poppins-Bold', fontSize:25, color:COLORS.primary}}>STUDENT GUIDE</Text>
                        <Text style={{fontFamily:'Poppins-Bold', fontSize:15, color:"#222"}}>Must read this</Text>
                    </Animated.View>  
                </Animated.View>
                <Animated.View style={{backgroundColor:COLORS.og, padding:10,transform: [{ translateX: slideAnim }]}}>
                    <Text style={{fontFamily:'Poppins-Regular', color:'grey'}}>
                    When students embark on an overseas adventure, there are several essential items and preparations they should consider to ensure a smooth and enriching experience. Let’s delve into the key aspects:
                    </Text>
                </Animated.View>
                <View style={{padding:10}}>
                    <Text style={{fontFamily:'Poppins-Bold', color:COLORS.primary}}>
                        1. Passport & Visa:
                    </Text>
                </View>
                <Animated.View style={{backgroundColor:COLORS.og, padding:10,transform: [{ translateX: slideAnim }]}}>
                    <Text style={{color:'#222', fontFamily:'Poppins-Regular', fontSize:12}}>
                        i. Carry your passport and photocopies with you at all times. It’s your gateway to international travel.

                    </Text>
                    <Text style={{color:'#222', fontFamily:'Poppins-Regular', fontSize:12}}>
                        ii. Ensure you have the necessary student visa for your destination country.

                    </Text>
                </Animated.View>
                <View style={{padding:10}}>
                    <Text style={{fontFamily:'Poppins-Bold', color:COLORS.primary}}>
                        2.Important Documents:
                    </Text>
                </View>
                <Animated.View style={{backgroundColor:COLORS.og, padding:15,transform: [{ translateX: slideAnim }]}}>
                    <Text style={{color:'#222', fontFamily:'Poppins-Regular', fontSize:12}}>
                    Keep essential documents organized
                    </Text>
                    <Text style={{color:'black', fontFamily:'Poppins-Bold', fontSize:12}}>
                    1. Health insurance information
                    </Text>
                    <Text style={{color:'black', fontFamily:'Poppins-Bold', fontSize:12}}>
                    2. Emergency contacts
                    </Text>
                    <Text style={{color:'black', fontFamily:'Poppins-Bold', fontSize:12}}>
                    3. Proof of enrollment
                    </Text>
                    <Text style={{color:'black', fontFamily:'Poppins-Bold', fontSize:12}}>
                    4. Address of your accommodation
                    </Text>
                   
                </Animated.View>
                <View style={{padding:10}}>
                    <Text style={{fontFamily:'Poppins-Bold', color:COLORS.primary}}>
                        3.Basic First Aid Kit & Medication Prescriptions:
                    </Text>
                </View>
                <Animated.View style={{backgroundColor:COLORS.og, padding:15,transform: [{ translateX: slideAnim }]}}>
                    <Text style={{color:'#222', fontFamily:'Poppins-Regular', fontSize:12}}>
                   i. Pack a basic first aid kit with bandages, pain relievers, and any necessary medications.
                    </Text>
                    <Text style={{color:'black', fontFamily:'Poppins-Regular', fontSize:12}}>
                  ii.  Bring copies of your prescription medications and ensure you have enough supply for your entire stay.
                    </Text>
                </Animated.View>
                <View style={{padding:10}}>
                    <Text style={{fontFamily:'Poppins-Bold', color:COLORS.primary}}>
                        4.Local Currency
                    </Text>
                </View>
                <View style={{backgroundColor:COLORS.og, padding:17}}>
                    <Text style={{color:'#222', fontFamily:'Poppins-Regular', fontSize:12}}>
                   i. Exchange some currency before your departure or withdraw cash upon arrival.
                    </Text>
                    <Text style={{color:'black', fontFamily:'Poppins-Regular', fontSize:12}}>
                  ii.  Familiarize yourself with local currency denominations.
                    </Text>
                </View>
                <View style={{padding:10}}>
                    <Text style={{fontFamily:'Poppins-Bold', color:COLORS.primary}}>
                   5. Essential Toiletries
                    </Text>
                </View>
                <View style={{backgroundColor:COLORS.og, padding:15}}>
                    <Text style={{color:'#222', fontFamily:'Poppins-Regular', fontSize:12}}>
                    While you can buy toiletries abroad, having a few essentials from home can be comforting
                    </Text>
                    <Text style={{color:'black', fontFamily:'Poppins-Bold', fontSize:12}}>
                    1. Toothbrush and toothpaste
                    </Text>
                    <Text style={{color:'black', fontFamily:'Poppins-Bold', fontSize:12}}>
                    2. Shampoo and soap
                    </Text>
                    <Text style={{color:'black', fontFamily:'Poppins-Bold', fontSize:12}}>
                    3. Deodorant
                    </Text>
                    <Text style={{color:'black', fontFamily:'Poppins-Bold', fontSize:12}}>
                    4. Sunscreen
                    </Text>
                </View>
                <View style={{padding:10}}>
                    <Text style={{fontFamily:'Poppins-Bold', color:COLORS.primary}}>
                   6. Power Adapters & Converters
                    </Text>
                </View>
                <View style={{backgroundColor:COLORS.og, padding:17}}>
                    <Text style={{color:'#222', fontFamily:'Poppins-Regular', fontSize:12}}>
                   i. Different countries have varying plug types. Bring a universal travel adapter to charge your devices.
                    </Text>
                </View>
                <View style={{padding:10}}>
                    <Text style={{fontFamily:'Poppins-Bold', color:COLORS.primary}}>
                   7.Basic School Supplies:
                    </Text>
                </View>
                <View style={{backgroundColor:COLORS.og, padding:15}}>
                    <Text style={{color:'#222', fontFamily:'Poppins-Regular', fontSize:12}}>
                    Depending on your study program, you might need
                    </Text>
                    <Text style={{color:'black', fontFamily:'Poppins-Bold', fontSize:12}}>
                    1. Notebooks
                    </Text>
                    <Text style={{color:'black', fontFamily:'Poppins-Bold', fontSize:12}}>
                    2. Pens and pencils
                    </Text>
                    <Text style={{color:'black', fontFamily:'Poppins-Bold', fontSize:12}}>
                    3. Laptop or tablet
                    </Text>
                </View>
                <View style={{padding:10}}>
                    <Text style={{fontFamily:'Poppins-Bold', color:COLORS.primary}}>
                  8.  Quality Backpack & Day Bag
                    </Text>
                </View>
                <View style={{backgroundColor:COLORS.og, padding:17}}>
                    <Text style={{color:'#222', fontFamily:'Poppins-Regular', fontSize:12}}>
                   i. A sturdy backpack for travel and a smaller day bag for daily use are essential.
                    </Text>
                    <Text style={{color:'black', fontFamily:'Poppins-Regular', fontSize:12}}>
                  ii. Look for anti-theft features in your day bag.
                    </Text>
                </View>
                <View style={{padding:10}}>
                    <Text style={{fontFamily:'Poppins-Bold', color:COLORS.primary}}>
                  9. Versatile Clothing:
                    </Text>
                </View>
                <View style={{backgroundColor:COLORS.og, padding:17}}>
                    <Text style={{color:'#222', fontFamily:'Poppins-Regular', fontSize:12}}>
                   i. Pack clothes suitable for different weather conditions.

                    </Text>
                    <Text style={{color:'black', fontFamily:'Poppins-Regular', fontSize:12}}>
                  ii. Consider layering options and versatile pieces that can mix and match.
                    </Text>
                </View>
                <View style={{padding:10}}>
                    <Text style={{fontFamily:'Poppins-Bold', color:COLORS.primary}}>
                  10. Learn About the Culture
                    </Text>
                </View>
                <View style={{backgroundColor:COLORS.og, padding:17}}>
                    <Text style={{color:'#222', fontFamily:'Poppins-Regular', fontSize:12}}>
                   i. Understand the local culture, history, geography, economy, and government.

                    </Text>
                    <Text style={{color:'black', fontFamily:'Poppins-Regular', fontSize:12}}>
                  ii. This knowledge will help you avoid cultural faux pas and enhance your immersion experience
                    </Text>                       
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default Guide;