import React, { useState } from "react";
import {
  Text,
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  Linking,
  ScrollView,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome6";
import styles from "../../styles/views/details"

export default Info = () => {
  const [showInfo, setShowInfo] = useState(false);
  const [showAuthors, setShowAuthors] = useState(false);
  const [showChannels, setShowChannels] = useState(false);

  const toggleInfo = () => {
    setShowInfo(!showInfo);
  };

  const toggleAuthors = () => {
    setShowAuthors(!showAuthors);
  };

  const toggleChannels = () => {
    setShowChannels(!showChannels);
  };

  const openFacebook = () => {
    Linking.openURL("https://www.facebook.com/suomeneduskunta");
  };

  const openInstagram = () => {
    Linking.openURL("https://www.instagram.com/eduskunta_riksdagen/");
  };

  const openX = () => {
    Linking.openURL("https://twitter.com/suomeneduskunta");
  };

  const openYoutube = () => {
    Linking.openURL("https://www.youtube.com/user/suomeneduskunta");
  };

  const openFlickr = () => {
    Linking.openURL("https://www.flickr.com/photos/finnishparliament/");
  };

  const openLinkedIn = () => {
    Linking.openURL("https://www.linkedin.com/company/suomeneduskunta/");
  };

  return (
    <ScrollView>
      <TouchableOpacity onPress={toggleInfo}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Tietoa sovelluksesta</Text>
          <Text style={styles.dropdownIcon}>{showInfo ? "▲" : "▼"}</Text>
        </View>
      </TouchableOpacity>
      {showInfo && (
        <View style={styles.infoContainer}>
          <View>
            <Text style={styles.text}>
              Eduskuntatutka tarjoaa käyttäjilleen helpon ja kätevän tavan pysyä
              ajantasalla Suomen eduskunnan toiminnasta. Sovelluksen avulla voit
              tutustua kansanedustajiin ja heidän taustoihinsa, seurata
              täysistuntoja ja saada tietoa ajankohtaisista poliittisista
              tapahtumista.
            </Text>
            <Text style={styles.text}>
              Sovellus hyödyntää eduskunnan avointa dataa, mikä tarkoittaa, että
              kaikki tieto on luotettavaa ja ajantasalla.
            </Text>
          </View>
        </View>
      )}
      
      <TouchableOpacity onPress={toggleChannels}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Eduskunta muissa kanavissa</Text>
          <Text style={styles.dropdownIcon}>{showChannels ? "▲" : "▼"}</Text>
        </View>
      </TouchableOpacity>
      {showChannels && (
        <View style={{paddingBottom: 40}}>
          <TouchableOpacity onPress={openFacebook}>
            <View style={styles.channelItem}>
              <Icon name="logo-facebook" size={50} color="#1877F2" />
              <Text style={styles.channelText}>Facebook</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={openInstagram}>
            <View style={styles.channelItem}>
              <Icon name="logo-instagram" size={50} color="#C13584" />
              <Text style={styles.channelText}>Instagram</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={openX}>
            <View style={styles.channelItem}>
              <FontAwesomeIcon name="x-twitter" size={50} />
              <Text style={styles.channelText}>X</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={openYoutube}>
            <View style={styles.channelItem}>
              <Icon name="logo-youtube" size={50} color="#FF0000" />
              <Text style={styles.channelText}>Youtube</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={openFlickr}>
            <View style={styles.channelItem}>
              <Icon name="logo-flickr" size={50} color="#0063DC" />
              <Text style={styles.channelText}>Flickr</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={openLinkedIn}>
            <View style={styles.channelItem}>
              <Icon name="logo-linkedin" size={50} color="#0077B5" />
              <Text style={styles.channelText}>LinkedIn</Text>
            </View>
          </TouchableOpacity>
        </View>
      )}

        <TouchableOpacity onPress={toggleAuthors}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Tekijät</Text>
          <Text style={styles.dropdownIcon}>{showAuthors ? "▲" : "▼"}</Text>
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
    </ScrollView>
  );
};