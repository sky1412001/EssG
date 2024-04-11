import React from "react";
import { SafeAreaView, Text, ScrollView, View, Image, StyleSheet, TouchableOpacity } from "react-native";
import COLORS from "./COLORS";

const target = require('./Logo/target.png');
const vision = require('./Logo/Vision.png');

const About = ({navigation}) => {
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>

                <View style={{alignItems:'center', justifyContent:"center"}}>
            <TouchableOpacity onPress={navigation.goBack}>

            <Image source={require('./Logo/backon.png')} style={{width:28, height:28}}/>
          </TouchableOpacity>
                </View>
          <View style={{alignItems:'center', justifyContent:'center'}}>
                <Text style={styles.headerText}>About ESS Global</Text>
          </View>
            </View>
            <ScrollView contentContainerStyle={styles.scrollViewContent}>
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>
                        Redefining Excellence in Education and Immigration For Over A Decade
                    </Text>
                </View>
                <View style={styles.card}>
                   <Text style={styles.cardText}>
                        ESS Global has been at the forefront of revolutionising overseas education and immigration since its inception in 2013. With a widespread presence spanning various regions of the country, our 15 branches across India and four branches overseas—Australia, Canada and Dubai—stand as testaments to our unwavering commitment to excellence.
                    </Text>
                </View>
                <View style={styles.row}>
                    <Image source={target} style={styles.icon}/>
                    <View style={styles.textContainer}>
                        <Text style={styles.sectionTitle}>Our Mission</Text>
                    </View>
                </View>
                <View style={styles.card}>
                    <Text style={styles.cardText}>
                        Our mission is to help students achieve their dreams of studying in international universities and becoming successful leaders. We provide support to overcome any obstacles in their path with the assistance of qualified experts who hold certifications such as Canada Course Graduate CCG00337, Australian Qualified Education Agent Counsellor F258, Education New Zealand Trained Agent, and Qualified Professional Development Programming in Promoting UK EDUCATION, and more
                    </Text>
                </View>
                <View style={styles.row}>
                    <Image source={vision} style={styles.icon}/>
                    <View style={styles.textContainer}>
                        <Text style={styles.sectionTitle}>VISION OF THE COMPANY</Text>
                    </View>
                </View>
                <View style={styles.card}>
                    <Text style={styles.cardText}>
                        ESS Global shall infuse a culture of values to support and partner international academic aspirations of students.
                    </Text>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        height: 100,
        padding:25,
        flexDirection:'row',
        justifyContent:'flex-start',
        gap:10,
        borderBottomLeftRadius:30,
        borderBottomRightRadius:30
    },
    headerText: {
        fontSize: 23,
        color:COLORS.primary,
        fontFamily:'Poppins-Bold',
        marginTop:5
    },
    scrollViewContent: {
        paddingVertical: 20,
    },
    section: {
        margin: 20,
    },
    sectionTitle: {
        fontSize: 19,
        color: 'black',
        fontFamily:'Poppins-Bold'
    },
    card: {
        backgroundColor: 'white',
        margin: 20,
        padding: 10,
        elevation: 1,
    },
    cardText: {
        color: 'grey',
        fontSize: 15,
        fontFamily:'Poppins-Regular'
    },
    row: {
        flexDirection: 'row',
        padding: 10,
        alignItems: 'center',
    },
    icon: {
        width: 60,
        height: 60,
    },
    textContainer: {
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default About;
