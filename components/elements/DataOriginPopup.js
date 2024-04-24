import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Modal,
  Button,
  TouchableOpacity,
  Linking,
  StatusBar,
} from "react-native";
import styles from "../../styles/components/elements"

export default DataOriginPopup = () => {
  const [showPopup, setShowPopup] = useState(true);
  const [dataOrigin, setDataOrigin] = useState("");

  useEffect(() => {
    const origin = "Sovellus käyttää eduskunnan avointa dataa.";
    setDataOrigin(origin);
  }, []);

  const handleLinkPress = () => {
    Linking.openURL("https://avoindata.eduskunta.fi/#/fi/home");
  };

  return (
    <Modal
      visible={showPopup}
      animationType="slide"
      transparent={true}
      onRequestClose={() => setShowPopup(false)}
    >
      <View
        style={styles.modalBackground}
      >
        <View
          style={styles.popupBackground}
        >
          <Text>{dataOrigin}</Text>
          <StatusBar backgroundColor="rgba(0, 0, 0, 0.5)" translucent={true} />
          <TouchableOpacity onPress={handleLinkPress} style={styles.popupOriginContainer}>
            <Text
              style={styles.popupOriginText}
            >
              Lue lisää
            </Text>
          </TouchableOpacity>
          <View style={styles.popupButton}>
          <Button title="Ok" onPress={() => setShowPopup(false)} />
          </View>
        </View>
      </View>
    </Modal>
  );
};
