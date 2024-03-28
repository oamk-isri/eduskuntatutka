import React, { useState, useEffect } from 'react';
import { View, Text, Modal, Button, TouchableOpacity, Linking, StatusBar } from 'react-native';

const DataOriginPopup = () => {
  const [showPopup, setShowPopup] = useState(true);
  const [dataOrigin, setDataOrigin] = useState('');

  useEffect(() => {
    const origin = "Sovelluksessa käytetty eduskunnan avointa dataa";
    setDataOrigin(origin);
  }, []);

  const handleLinkPress = () => {
    Linking.openURL('https://avoindata.eduskunta.fi/#/fi/home');
  };


  return (
    <Modal
      visible={showPopup}
      animationType="slide"
      transparent={true}
      onRequestClose={() => setShowPopup(false)}>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
        <View style={{ backgroundColor: 'white', padding: 20, borderRadius: 10 }}>
            <Text>{dataOrigin}</Text>
            <StatusBar backgroundColor="rgba(0, 0, 0, 0.5)" translucent={true} />
                <TouchableOpacity onPress={handleLinkPress}>
                <Text>Lue Lisää</Text>
                </TouchableOpacity> 
            <Button title="Ok" onPress={() => setShowPopup(false)} />
        </View>
      </View>
    </Modal>
  );
};

export default DataOriginPopup;
