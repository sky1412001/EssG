import React, { useState, useEffect, useRef } from "react";
import { Text, View, ScrollView, Image, TouchableOpacity, FlatList, SafeAreaView, StyleSheet, Dimensions, Animated } from "react-native";
import COLORS from "./COLORS";
import BlogD from "./BlogD";

const heart1 = require('./Logo/heart1.png');
const heart2 = require('./Logo/heart2.png');
const windowWidth = Dimensions.get('window').width;

const Skeleton = () => {

   
  return (
    <View style={styles.skeletonContainer}>
      <View style={styles.skeletonImage} />
      <View style={styles.skeletonDetails}>
        <View style={styles.skeletonText} />
        <View style={styles.skeletonText} />
      </View>
    </View>
  );
};

const Blogs = ({ navigation }) => {
    const [like, setLike] = useState(false);
    const [loading, setLoading] = useState(true);
    const giveLike = () => {
        setLike(!like);
    };
    useEffect(() => {
        const timeout = setTimeout(() => {
          setLoading(false);
        }, 2000);
    
        return () => clearTimeout(timeout);
      }, []);

      
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
    if (loading) {
      return (
        <SafeAreaView style={styles.container}>
          <View style={styles.headers}>
              <Text style={styles.headerText}></Text>
              <Text style={{ fontFamily: 'Poppins-Regular', color: COLORS.primary }}></Text>
          </View>
          <ScrollView contentContainerStyle={styles.scrollViewContent}>
            {[...Array(5)].map((_, index) => (
              <Skeleton key={index} />
            ))}
          </ScrollView>
        </SafeAreaView>
      );
    }
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
            <Text style={styles.headerText}>Our Blogs</Text>
            <Text style={{ fontFamily: 'Poppins-Regular', color: COLORS.primary }}>About Overseas Study Visa</Text>
        </View>
        <FlatList
          keyExtractor={(item) => item.id}
          data={BlogD}
          renderItem={({ item }) => <BlogData BlogD={item} />}
        />
      </SafeAreaView>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "rgb(250, 249, 246)"
    },
    header: {
        padding: 25,
        height: 90,
        backgroundColor: "rgb(250, 249, 246)"
    },
    headers:{
      padding: 25,
      height: 90,
      backgroundColor: "#d0d0d0"
    },
    headerText: {
        color: COLORS.primary,
        fontSize: 22,
        fontFamily: 'Poppins-Bold'
    },
    scrollViewContent: {
        paddingVertical: 7,
    },
    blogContainer: {
        marginTop: 2,
        borderRadius: 25,
        marginHorizontal: windowWidth * 0.05,
        padding: 2,
    },
    imageContainer: {
        width: windowWidth * 0.9,
        height: windowWidth * 0.4,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 15,
        elevation: 1
    },
    image: {
        width: '100%',
        height: '100%',
        borderTopLeftRadius: 15,
    },
    detailsContainer: {
        backgroundColor: 'white',
        padding: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottomLeftRadius: 25,
        borderBottomRightRadius: 25,
        elevation: 1
    },
    textContainer: {
        flex: 1,
    },
    title: {
        fontFamily: "Poppins-Bold",
        fontSize: 16,
        color: COLORS.primary
    },
    about: {
        color: 'black',
        fontSize: 13,
        fontFamily: 'Poppins-Regular'
    },
    heartIcon: {
        width: 25,
        height: 25,
    },
    skeletonContainer: {
      marginTop: 2,
      borderRadius: 25,
      marginHorizontal: windowWidth * 0.05,
      padding: 2,
    },
    skeletonImage: {
      width: windowWidth * 0.9,
      height: windowWidth * 0.4,
      backgroundColor: '#dcdcdc',
      borderRadius: 15,
    },
    skeletonDetails: {
      backgroundColor: 'white',
      padding: 10,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      borderBottomLeftRadius: 25,
      borderBottomRightRadius: 25,
      elevation: 1
    },
    skeletonText: {
      width: '50%',
      height: 20,
      backgroundColor: '#dcdcdc',
      marginBottom: 5,
      borderRadius: 5,
    }
});

export default Blogs;
