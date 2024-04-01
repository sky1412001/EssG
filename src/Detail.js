import React, { useState, useRef, useEffect } from "react";
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  View,
  Image,
  ScrollView,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  ImageBackground,
  Dimensions,
  Pressable,
} from 'react-native';
import product from "./Product";
const { width: screenWidth } = Dimensions.get('window');
const Detail = () => {
  const flatlistRef = useRef();
  const [activeIndex, setActiveIndex] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      if (activeIndex === product.length - 1) {
        setActiveIndex(0);
        flatlistRef.current.scrollToIndex({
          animated: true,
          index: 0,
        });
      } else {
        setActiveIndex((prevIndex) => prevIndex + 1);
        flatlistRef.current.scrollToIndex({
          animated: true,
          index: activeIndex + 1,
        });
      }
    }, 3500);
    return () => clearInterval(interval);
  }, [activeIndex]);
  const getItemLayout = (data, index) => ({
    length: screenWidth,
    offset: screenWidth * index,
    index: index,
  });
  const handleScroll = (event) => {
    const scrollPosition = event.nativeEvent.contentOffset.x;
    const index = Math.floor(scrollPosition / screenWidth);
    setActiveIndex(index);
  };
  const Card = ({ product }) => {
    return (
      <TouchableOpacity   activeOpacity={0.8}>
        <ImageBackground style={Styles.rmCardImage} source={product.image}>
          <Text style={{ color: 'white', fontSize: 22, fontWeight: 'bold', marginTop: 10 }}>
            {product.name}
          </Text>
          <View style={{ flex: 1, justifyContent: 'space-between', alignItems: 'flex-end' }}>
            <View style={{ width: '100%', flexDirection: 'row', marginTop: 10 }}>
              <View style={{ flexDirection: 'row' }}>
                <Text style={{ color: 'white', marginLeft: 5 }}>{product.location}</Text>
              </View>
              <View style={{ flexDirection: 'row' }}>
                <Text style={{ color: 'white', marginLeft: 5 }}>5.0</Text>
              </View>
            </View>
            <Text style={{ color: 'white', fontSize: 13 }}>{product.details}</Text>
          </View>
        </ImageBackground>
      </TouchableOpacity>
    );
  };
  return (
    <ScrollView showVerticalScrollIndicator={false}>
      <View>
        <FlatList
          snapToInterval={screenWidth - 30}
          ref={flatlistRef}
          getItemLayout={getItemLayout}
          keyExtractor={(item) => item.id.toString()} 
          contentContainerStyle={{ paddingLeft: 4, paddingBottom: 20 }}
          showsHorizontalScrollIndicator={false}
          horizontal
          data={product}
          onScroll={handleScroll}
          renderItem={({ item }) => <Card product={item} />}
        />
      </View>
    </ScrollView>
  );
};
export default Detail;
const Styles = StyleSheet.create({     
    imgContainer: {
      height: 60,
      width:90,
      backgroundColor: '#C3C3C1',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 10,
      elevation: 10,
    },
    titleSection: {
      marginHorizontal: 20,
      marginVertical: 20,
      fontWeight: 'bold',
      fontSize: 20,
      color: 'black',
    },
    rmCardImage: {
        screenwidth:screenWidth*2,
      height: 120,
      marginRight: 20,
      borderRadius: 10,
      overflow: 'hidden',
      padding: 10,
      elevation: 10
    },
    sectionTitle: {
      marginHorizontal: 20,
      marginVertical: 20,
      fontWeight: 'bold',
      fontSize: 20,
    },
  });