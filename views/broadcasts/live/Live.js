import React, { useState, useEffect, useRef } from "react";
import { View, Text, ScrollView } from "react-native";
import { WebView } from "react-native-webview";
import styles from "../../../styles/views/broadcasts";

export default Live = ({ route, navigation }) => {
  const { liveEvent } = route.params;
  const { title, urlName } = liveEvent;
  const webViewRef = useRef(null); // <-- Define a ref for the WebView
  const [eventInfo, setEventInfo] = useState(null);

  // Split the title at the '|' mark and take the first part
  const navigationTitle = title.split("|")[0].trim();

  // Construct the complete video URL
  const videoUrl = `https://eduskunta.videosync.fi/${urlName}?embed-view=1`;

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 60000); // Fetch data every minute

    return () => clearInterval(interval); // Clean up interval on component unmount
  }, []);

  const fetchData = () => {
    fetch(`https://eduskunta.videosync.fi/${urlName}/data`)
      .then((response) => response.json())
      .then((data) => {
        if (data && data.about) {
          const cleanedDescription = data.about.description.replace(
            /<[^>]+>/g,
            ""
          ); // Remove HTML-tags
          setEventInfo({ ...data.about, description: cleanedDescription });
        }
      })
      .catch((error) => console.error("Error fetching data:", error));
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
      styleElement.innerHTML = '.hidden-state { padding: 0; } body { font-size: 8px; }'; // Override padding to 0
      document.head.appendChild(styleElement);
    `);
  };

  return (
    <ScrollView style={styles.eventScroll}>
      <View style={styles.eventView}>
        <WebView
          ref={webViewRef}
          source={{ uri: videoUrl }}
          style={styles.webView}
          allowsFullscreenVideo={true}
          onLoad={handleMessage}
          javaScriptEnabled={true}
          onMessage={(event) => console.log(event.nativeEvent.data)}
        />
        <View style={styles.eventView2}>
        <Text style={styles.eventTitle}>
            {navigationTitle}
            </Text>
          {eventInfo && (
            <>
              <Text style={styles.eventDetails}>{eventInfo.title}</Text>
              <Text style={styles.eventDescript}>{eventInfo.description}</Text>
            </>
          )}
        </View>
      </View>
    </ScrollView>
  );
};