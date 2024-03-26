import React from "react";
import { Text, View, Image, StyleSheet } from "react-native";


export default Info = () => {
  
    return (
      <View style={styles.container}>
        <Text
            style={styles.title}>
            Tietoa sovelluksesta
        </Text>
          <View style={styles.textContainer}>
            <Text
              style={styles.text}>
              Eduskuntatutka tarjoaa käyttäjilleen helpon ja kätevän tavan pysyä ajantasalla Suomen eduskunnan toiminnasta.
              Sovelluksen avulla voit tutustua kansanedustajiin ja heidän taustoihinsa, seurata täysistuntoja ja saada tietoa ajankohtaisista poliittisista tapahtumista.            </Text>
            <Text
              style={styles.text}>
              Sovellus hyödyntää eduskunnan avointa dataa, mikä tarkoittaa, että kaikki tieto on luotettavaa ja ajantasalla.
            </Text>
          </View>
        <View style={styles.imageContainer}>
          <Image
            source={require('../images/eduskuntatalo.png')} // Replace with your image path
            style={styles.image}
            resizeMode="stretch"
          />
        </View>
      </View>
    );
  };

  
const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: "bold",
    padding: 20
  },
  textContainer: {
    marginBottom: 20,
  },
  text: {
    fontSize: 18,
    padding: 15
  },
  image: {
    width: "100%",
    height: 120,
  },
});