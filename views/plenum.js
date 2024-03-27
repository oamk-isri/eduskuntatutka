import React, { useState, useEffect } from "react";
import { View, Text, Linking } from "react-native";
import { WebView } from 'react-native-webview';

export default PlenumDetails = ({ route, navigation }) => {
  const { event } = route.params;
  const { title, urlName } = event;
  const [decisions, setDecisions] = useState([]);

  // Split the title at the '|' mark and take the first part
  const navigationTitle = title.split('|')[0].trim();

  // Construct the complete video URL
  const videoUrl = `https://eduskunta.videosync.fi/${urlName}?embed-view=1`;

  useEffect(() => {
    fetchDecisions();
  }, []);

  const fetchDecisions = () => {
    fetch(`https://eduskunta.videosync.fi/${urlName}/data`)
      .then(response => response.json())
      .then(data => {
        if (data && data.eventMeta && data.eventMeta.plenum && data.eventMeta.plenum.decisions && data.eventMeta.plenum.decisions.fi) {
          const decisionsFi = data.eventMeta.plenum.decisions.fi;
          // Split the text into individual decisions
          const decisionsArray = decisionsFi.split(';').map(decision => decision.trim());
          setDecisions(decisionsArray);
        }
      })
      .catch(error => console.error('Error fetching decisions:', error));
  };

  // Render the decisions as links
  const renderDecisions = () => {
    return (
      <View>
        {decisions.map((decision, index) => (
          <Text key={index} style={{ fontSize: 18, fontWeight: 'bold', textDecorationLine: 'underline', fontWeight: 'bold' }} onPress={() => openDocument(decision)}>Täysistunnon pöytäkirja</Text>
        ))}
      </View>
    );
  };

  // Function to open the document
  const openDocument = (decision) => {
    // Prepend 'https://' if it's not already included
    const decisionUrl = decision.startsWith('https://') ? decision : `https://${decision}`;
    Linking.openURL(decisionUrl);
  };

  // Set navigation title dynamically
  useEffect(() => {
    navigation.setOptions({ title: navigationTitle });
  }, [navigationTitle]);

  return (
    <View style={{ flex: 1 }}>
      {/* <Text style={{ fontSize: 20, fontWeight: 'bold', textAlign: 'center', marginVertical: 20 }}>{title}</Text> */}
      <WebView
        source={{ uri: videoUrl }}
        style={{ flex: 1 }}
        allowsFullscreenVideo={true}
      />
      {renderDecisions()}
    </View>
  );
};