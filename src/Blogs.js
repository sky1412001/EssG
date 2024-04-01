import React, { useState,useEffect } from "react";
import { Text, View, ScrollView, Image, TouchableOpacity, FlatList, SafeAreaView, StyleSheet, Dimensions, ActivityIndicator } from "react-native";
import COLORS from "./COLORS";
import BlogD from "./BlogD";

const heart1 = require('./Logo/heart1.png');
const heart2 = require('./Logo/heart2.png');

const windowWidth = Dimensions.get('window').width;

const Blogs = ({ navigation }) => {
    const [like, setLike] = useState(false);
    const [loading, setLoading] = useState(true);
    const giveLike = () => {
        setLike(!like);
    };
    useEffect(() => {
        // Simulate loading delay for 2 seconds
        const timeout = setTimeout(() => {
          setLoading(false);
        }, 2000);
    
        return () => clearTimeout(timeout);
      }, []);
    
      if (loading) {
        return (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color={COLORS.primary} />
          </View>
        );
      }
    const BlogData = ({ BlogD }) => {
        return (
            <View style={styles.blogContainer}>
                <TouchableOpacity onPress={() => navigation.navigate('BlogScreen', BlogD)}>
                    <View style={styles.imageContainer}>
                        <Image source={BlogD.image} style={styles.image} />
                    </View>
                </TouchableOpacity>
                <View style={styles.detailsContainer}>
                    <View style={styles.textContainer}>
                        <Text style={styles.title}>{BlogD.title}</Text>
                        <Text style={styles.about}>{BlogD.About}</Text>
                    </View>
                    <TouchableOpacity onPress={giveLike}>
                        <Image source={like ? heart1 : heart2} style={styles.heartIcon}/>
                    </TouchableOpacity>
                </View>
            </View>
        );
    };
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerText}>Our Blogs</Text>
            </View>
            <ScrollView contentContainerStyle={styles.scrollViewContent}>
                <FlatList
                    keyExtractor={(item) => item.id}
                    data={BlogD}
                    renderItem={({ item }) => <BlogData BlogD={item}/>}
                />
            </ScrollView>
        </SafeAreaView>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
    },
    header: {
        borderBottomLeftRadius:25,
        borderBottomRightRadius:25,
        backgroundColor: COLORS.primary,
        height: 90,
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerText: {
        color: 'white',
        fontSize: 16,
        fontFamily:'Poppins-Bold'
    },
    scrollViewContent: {
        paddingVertical: 20,
    },
    blogContainer: {
        marginTop: 10,
        borderRadius:25,
        marginHorizontal: windowWidth * 0.05,
    },
    imageContainer: {
        width: windowWidth * 0.9,
        height: windowWidth * 0.5,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 1,
        borderRadius:15
    },
    image: {
        width: '100%',
        height: '100%',
        borderTopLeftRadius: 15,
    },
    detailsContainer: {
        elevation: 1,
        backgroundColor: 'white',
        padding: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottomLeftRadius:25,
        borderBottomRightRadius:25
    },
    textContainer: {
        flex: 1,
    },
    title: {
        fontFamily:"Poppins-Bold",
        fontSize: 16,
    },
    about: {
        color: 'black',
        fontSize: 13,
        fontFamily:'Poppins-Regular'
    },
    heartIcon: {
        width: 25,
        height: 25,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      },
});

export default Blogs;
