import React from "react";
import { ScrollView, View, Text, Image, SafeAreaView, TouchableOpacity, FlatList, ImageBackground, StyleSheet } from "react-native";
import COLORS from "./COLORS";
import Service from "./Service";

const Services = ({ navigation }) => {
  const Card = ({ service }) => {
    return (
      <TouchableOpacity onPress={() => navigation.navigate('PostLandingForm', service)}>
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
      <ImageBackground source={require('./Home/postback.png')} style={styles.imageBackground}>
      </ImageBackground>
      <View style={styles.cardListContainer}>
        <FlatList
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.flatListContent}
          showsVerticalScrollIndicator={false}
          data={Service}
          renderItem={({ item }) => <Card service={item} />}
        />
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  imageBackground: {
    height: 190,
    // Add styling for the image background
  },
  cardListContainer: {
    marginTop: 10,
    paddingHorizontal: 11,
    paddingBottom: 20,
  },
  flatListContent: {
    flexGrow: 1,
  },
  cardContainer: {
    flexDirection: 'row',
    padding: 8,
    marginVertical: 8,
    backgroundColor: 'white',
    elevation: 5,
    borderRadius: 10,
  },
  cardImage: {
    width: 70,
    height: 70,
    borderRadius: 50,
    margin: 10,
  },
  cardTextContainer: {
    flexDirection: 'column',
  },
  cardTitle: {
    fontSize: 17,
    fontFamily: 'Poppins-Bold',
    color: 'black',
  },
  cardInfo: {
    fontSize: 12,
    fontFamily: 'Poppins-Regular',
    color: 'gray',
  },
});
export default Services;
