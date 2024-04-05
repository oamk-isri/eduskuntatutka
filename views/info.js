import React, { useState } from "react";
import { Text, View, Image, StyleSheet, TouchableOpacity } from "react-native";


export default Info = () => {

  const [showInfo, setShowInfo] = useState(false);
  const [showAuthors, setShowAuthors] = useState(false);

  const toggleInfo = () => {
    setShowInfo(!showInfo);
    setShowAuthors(false);
  };

  const toggleAuthors = () => {
    setShowAuthors(!showAuthors);
    setShowInfo(false);
  };

  return (
    <View>
      <TouchableOpacity onPress={toggleInfo}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Tietoa sovelluksesta</Text>
          <Text style={styles.dropdownIcon}>{showInfo ? '▲' : '▼'}</Text>
        </View>
      </TouchableOpacity>
      {showInfo && (
        <View style={styles.infoContainer}>
          <View>
            <Text style={styles.text}>
              Eduskuntatutka tarjoaa käyttäjilleen helpon ja kätevän tavan pysyä ajantasalla Suomen eduskunnan toiminnasta.
              Sovelluksen avulla voit tutustua kansanedustajiin ja heidän taustoihinsa, seurata täysistuntoja ja saada tietoa ajankohtaisista poliittisista tapahtumista.
            </Text>
            <Text style={styles.text}>
              Sovellus hyödyntää eduskunnan avointa dataa, mikä tarkoittaa, että kaikki tieto on luotettavaa ja ajantasalla.
            </Text>
          </View>
        </View>
      )}
       <TouchableOpacity onPress={toggleAuthors}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Tekijät</Text>
          <Text style={styles.dropdownIcon}>{showAuthors ? '▲' : '▼'}</Text>
        </View>
      </TouchableOpacity>
      {showAuthors && (
        <View>
          <Text style={styles.author}>Aleksi Kallio</Text>
          <Text style={styles.author}>Riku Puonti</Text>
          <Text style={styles.author}>Risto-Matti Isola</Text>
          <Text style={styles.author}>Ossi Juvani</Text>          
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
  },
  title: {
    flex: 1,
    fontSize: 24,
    fontWeight: "bold",
  },
  dropdownIcon: {
    fontSize: 20,
  },
  infoContainer: {
    marginHorizontal: 20,
  },
  text: {
    fontSize: 18,
    paddingVertical: 15,
  },
  author: {
    fontSize: 18,
    padding: 15
  }
});