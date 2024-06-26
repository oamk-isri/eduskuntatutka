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
import styles from "../../styles/components/elements";

export default DataOriginPopup = () => {
  const [showPopup, setShowPopup] = useState(true);
  const [dataOrigin, setDataOrigin] = useState("");

  useEffect(() => {
    const origin = "Sovellus käyttää eduskunnan avointa dataa.";
    setDataOrigin(origin);
  }, []);

  return (
    <Modal
      visible={showPopup}
      animationType="slide"
      transparent={true}
      statusBarTranslucent
      onRequestClose={() => setShowPopup(false)}
    >
      <View style={styles.modalBackground}>
        <View style={styles.popupBackground}>
          <Text style={styles.infoText}>{dataOrigin}</Text>
          <StatusBar backgroundColor="rgba(0, 0, 0, 0.5)" translucent={true} />

          <View style={styles.popupButton}>
            <TouchableOpacity
              onPress={() => setShowPopup(false)}
              style={styles.pButton}
            >
              <Text style={styles.buttonText}>OK</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};
