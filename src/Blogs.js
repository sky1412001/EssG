import React, { useState, useEffect, useRef } from "react";
import { Text, View, ScrollView,Easing, Image, TouchableOpacity, FlatList, SafeAreaView, StyleSheet, Dimensions, Animated, ImageBackground, StatusBar } from "react-native";
import COLORS from "./COLORS";
import BlogD from "./BlogD";
import { Rating } from 'react-native-stock-star-rating';
import Dataj from "./Dataj";
import LottieView from 'lottie-react-native';
const windowWidth = Dimensions.get('window').width;

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

 
  const Data = ({ Dataj }) => {
    return (
      <TouchableOpacity onPress={() => navigation.navigate('BlogScreen', Dataj)} activeOpacity={0.9}>
        <View style={styles.containers}>
          <View style={styles.imageContainers}>
            <Image source={Dataj.image} style={styles.image} />
          </View>
          <View style={styles.textContainers}>
            <Text style={styles.shortText}>{Dataj.short}</Text>
            <Text style={styles.titleText}>{Dataj.title}</Text>
          </View>
        </View>
      </TouchableOpacity>
    )
  }

  const BlogData = ({ BlogD }) => {
    return (
      <TouchableOpacity onPress={() => navigation.navigate('BlogScreen', BlogD)} activeOpacity={0.9}>
        <ImageBackground source={BlogD.image} style={styles.rmCardImage}>
          <View style={{ backgroundColor:"rgba(0,0,0,0.3)",height:'100%', flexDirection:"column", justifyContent:"space-between" }}>
            <View style={{padding:10}}>
              <Text style={{fontFamily:'Poppins-Bold', fontSize:20, color:"white"}}>{BlogD.country}</Text>
              <Text style={{fontFamily:'Poppins-Bold', fontSize:13, color:"white"}}>{BlogD.content}</Text>
            </View>
            <View style={{padding:10}}>
            <Text style={{ fontFamily: "Poppins-Bold", color: COLORS.light }}>{BlogD.title}</Text>
            <Rating
              stars={6}
              maxStars={5}
              size={12}
              color={'gold'}
            />
            </View>
          </View>
        </ImageBackground>
      </TouchableOpacity>
    );
  };

  if (loading) {
    return <Skelton />
  }
  return (
      <SafeAreaView  style={styles.container}>
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <View style={{marginHorizontal:8}}>
        <Text style={styles.headerText}>Our Blogs</Text>
        <Text style={{ fontFamily: 'Poppins-Regular', color: COLORS.dark }}>About Overseas Study Visa</Text>
        </View>
      </View>
      <View style={{ margin: 4 }}>
        <View style={{ padding: 8 }}>
          <Text style={{ fontFamily: 'Poppins-Bold', color: COLORS.primary, fontSize: 15 }}>
            Trending Now
          </Text>
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{backgroundColor:'#fdf9f9'}}>
          {BlogD.map((item, index) => (
            <BlogData key={index} BlogD={item} />
          ))}
        </ScrollView>
      </View>
      <View style={{ marginTop: 8, margin: 4, padding:12 }}>
        <View style={{ padding: 10 }}>
          <Text style={{ fontFamily: 'Poppins-Bold', color: COLORS.primary, fontSize: 15}}>
            Latest Services
          </Text>
        </View>
        <FlatList
          keyExtractor={(item) => item.id}
          data={Dataj}
          renderItem={({ item }) => <Data Dataj={item} />}
          showsVerticalScrollIndicator={true}
        />
        <View style={{height:50}}>

        </View>
      </View>
    </ScrollView>
      </SafeAreaView>
  );
};
const Skelton = () => {
 
  return (
    <View style={styles.containerss}>
    <LottieView 
      source={require('./Page/loader.json')} 
      autoPlay 
      loop 
      style={{width:200, height:200}}
    />
  </View>
    
  );
};
const styles = StyleSheet.create({
  containerss: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    width: Dimensions.get('window').width,
    flex: 1,
    backgroundColor:'#EDF2FB'
    
  },
  header: {
    padding: 5,
    height: 80,
    marginTop:20
  },
  headers: {
    padding: 10,
    height: 90,
    backgroundColor: "#d0d0d0"
  },
  headerText: {
    color: COLORS.primary,
    fontSize: 22,
    fontFamily: 'Poppins-Bold',
    marginTop:10
  },
  scrollViewContent: {
    paddingVertical: 7,
  },
  blogContainer: {
    height: windowWidth * 0.6,
    width: windowWidth * 0.6,
    marginTop: 1,
    marginHorizontal: windowWidth * 0.03,
    padding: 2,
  },
  imageContainer: {
    width: windowWidth * 0.5,
    height: windowWidth * 0.4,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15,
  },
  image: {
    width: '100%',
    height: '100%',
    borderTopLeftRadius: 15,
  },
  detailsContainer: {
    padding: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
  },
  rmCardImage: {
    width: Dimensions.get('window').width - 160,
    height: 260,
    marginRight: 10,
    borderRadius: 10,
    overflow: 'hidden',
    elevation:1,
  },
  rmCardImages: {
    width: Dimensions.get('window').width - 160,
    height: 260,
    marginRight: 10,
    borderRadius: 10,
    overflow: 'hidden',
  },
  containers: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 10,
    marginTop: 8,
    width: Dimensions.get('window').width - 30,
    elevation:1
  },
  imageContainers: {
    width: 80,
    height: 80,
    borderRadius: 15,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 15,
    backgroundColor:'white'
  },
  textContainers: {
    flex: 1,
    padding: 5,
  },
  shortText: {
    fontSize: 12,
    color: COLORS.primary, 
    fontFamily:'Poppins-Regular'// Update with your color
  },
  titleText: {
    fontSize: 12,
    color: '#222',
    fontFamily:"Poppins-Regular"
  },
  overlay: {
    flex: 1,
    backgroundColor: '#d0d0d0',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  contentContainer: {
    padding: 10,
  },
  textContainer: {},
  titleContainer: {},
  placeholderText: {
    backgroundColor: 'white',
    height: 20,
    borderRadius: 5,
  },
});

export default Blogs;
