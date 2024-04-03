import React, { useState, useEffect, useRef } from "react";
import { View, Text, Linking, ScrollView, StyleSheet } from "react-native";
import { WebView } from 'react-native-webview';

export default seminaari = ({ route, navigation }) => {
  const { event } = route.params;
  const { title, urlName } = event;
  const webViewRef = useRef(null); // <-- Define a ref for the WebView

  // Split the title at the '|' mark and take the first part
  const navigationTitle = title.split('|')[0].trim();

  // Construct the complete video URL
  const videoUrl = `https://eduskunta.videosync.fi/${urlName}?embed-view=1`;

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    fetch(`https://eduskunta.videosync.fi/${urlName}/data`)
      .then(response => response.json())
      .then(data => {
        if (data && data.eventMeta && data.eventMeta.plenum && data.eventMeta.plenum.decisions && data.eventMeta.plenum.decisions.fi) {
          const decisionsFi = data.eventMeta.plenum.decisions.fi;
        }
      })
      .catch(error => console.error('Error fetching data:', error));
  };

  // Set navigation title dynamically
  useEffect(() => {
    navigation.setOptions({ title: navigationTitle });
  }, [navigationTitle]);

  const handleMessage = () => {
    // Send a message to the web page to modify the styles
    webViewRef.current.injectJavaScript(`
      // Find and modify the CSS rule for footer, section, and elements with class .hidden-state
      var styleElement = document.createElement('style');
      styleElement.innerHTML = '.hidden-state { padding: 0; } body { font-size: 12px; }'; // Override padding to 0
      document.head.appendChild(styleElement);
    `);
  };

  return (
    <ScrollView style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        <WebView
          ref={webViewRef}
          source={{ uri: videoUrl }}
          style={styles.webView}
          allowsFullscreenVideo={true}
          onLoad={handleMessage}
          javaScriptEnabled={true}
          onMessage={(event) => console.log(event.nativeEvent.data)}
        />
        <View style={{ paddingHorizontal: 10 }}>

        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  webView: {
    height: 220, // Adjust the height as needed
    width: '100%',
  },
});