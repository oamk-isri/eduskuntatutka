import React, { useState, useEffect, useRef } from "react";
import { View, Text, Linking, TouchableOpacity, ScrollView } from "react-native";
import { WebView } from 'react-native-webview';

export default PlenumDetails = ({ route, navigation }) => {
  const { event } = route.params;
  const { title, urlName } = event;
  const [decisions, setDecisions] = useState([]);
  const [expandedDecision, setExpandedDecision] = useState(null);
  const webViewRef = useRef(null);

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

  // Function to toggle decision visibility
  const toggleDecision = index => {
    setExpandedDecision(prevIndex => (prevIndex === index ? null : index));
  };

  // Set navigation title dynamically
  useEffect(() => {
    navigation.setOptions({ title: navigationTitle });
  }, [navigationTitle]);

  return (
    <View style={{ flex: 1 }}>
      <WebView
        ref={webViewRef}
        source={{ uri: videoUrl }}
        style={{ flex: 1 }}
        allowsFullscreenVideo={true}
      />
      <ScrollView style={{ flex: 1 }}>
        {decisions.map((decision, index) => {
          const decisionUrl = decision.startsWith('https:') ? decision : `https:${decision}`;
          return (
            <View key={index}>
              <TouchableOpacity onPress={() => toggleDecision(index)}>
                <Text style={{ fontSize: 18, fontWeight: 'bold', textDecorationLine: 'underline', marginTop: 10 }}>
                  Täysistunnon pöytäkirja {index + 1}
                </Text>
              </TouchableOpacity>
              {expandedDecision === index && (
                <WebView
                  nestedScrollEnabled
                  source={{ uri: decisionUrl }}
                  style={{ height: 300, flex: 0 }} // Adjust height as needed
                  onContentSizeChange={(event) => {
                    const { height } = event.nativeEvent.contentSize;
                    webViewRef.current.setNativeProps({
                      style: { height }
                    });
                  }}
                />
              )}
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
};
