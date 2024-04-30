import React, { useState, useEffect, useRef } from "react";
import { View, Text, Linking, ScrollView, StyleSheet } from "react-native";
import { WebView } from "react-native-webview";
import styles from "../../styles/views/broadcasts";

export default Plenum = ({ route, navigation }) => {
  const { taysistunnotEvent } = route.params;
  const { title, urlName } = taysistunnotEvent;
  const [decisions, setDecisions] = useState([]);
  const [topics, setTopics] = useState([]);
  const [speakersInfo, setSpeakersInfo] = useState([]);
  const webViewRef = useRef(null); // <-- Define a ref for the WebView

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
        if (
          data &&
          data.eventMeta &&
          data.eventMeta.plenum &&
          data.eventMeta.plenum.decisions &&
          data.eventMeta.plenum.decisions.fi
        ) {
          const decisionsFi = data.eventMeta.plenum.decisions.fi;
          // Split the text into individual decisions
          const decisionsArray = decisionsFi
            .split(";")
            .map((decision) => decision.trim());
          setDecisions(decisionsArray);
        }
        if (
          data &&
          data.eventMeta &&
          data.eventMeta.topics &&
          data.eventMeta.topics.length > 0
        ) {
          setTopics(data.eventMeta.topics);
        }
        if (data && data.eventMeta && data.eventMeta.speakers) {
          const speakers = data.eventMeta.speakers;
          const speakersInfoArray = speakers.map((speaker) => ({
            topicId: speaker.topicId,
            firstname: speaker.firstName,
            lastname: speaker.lastName,
            party: speaker.party.fi,
            time: formatTime(speaker.time),
          }));
          setSpeakersInfo(speakersInfoArray);
        }
      })
      .catch((error) => console.error("Error fetching data:", error));
  };

  // Function to format time in seconds to HH:MM:SS
  const formatTime = (timeInSeconds) => {
    const hours = Math.floor(timeInSeconds / 3600);
    const minutes = Math.floor((timeInSeconds % 3600) / 60);
    const seconds = timeInSeconds % 60;
    return `${hours}:${minutes < 10 ? "0" : ""}${minutes}:${
      seconds < 10 ? "0" : ""
    }${seconds}`;
  };

  // Function to open the document
  const openDocument = (decision) => {
    // Prepend 'https://' if it's not already included
    const decisionUrl = decision.startsWith("https://")
      ? decision
      : `https://${decision}`;
    navigation.navigate("Browser", { uri: decisionUrl });
  };

  // Set navigation title dynamically
  useEffect(() => {
    navigation.setOptions({ title: navigationTitle });
  }, [navigationTitle]);

  const renderDecisions = () => {
    return (
      <View>
        {decisions.map((decision, index) => (
          <Text
            key={index}
            style={styles.recordLink}
            onPress={() => openDocument(decision)}
          >
            Linkki täysistunnon pöytäkirjaan
          </Text>
        ))}
        <Text style={styles.eventDetails}>Käsiteltävät asiat:</Text>
      </View>
    );
  };

  const renderTopics = () => {
    return (
      <View>
        <Text style={styles.eventDetails}>Keskusteluaiheet:</Text>
        {topics.map((topic, index) => {
          return (
            <View key={index}>
              <Text style={styles.eventDetails}>
                {topic.id}. {topic.title.fi}
              </Text>
              <Text style={styles.plenumContent}>
                {topic.content.kasittelyvaiheNimi.fi}
              </Text>
            </View>
          );
        })}
      </View>
    );
  };

  const renderSpeakersInfo = () => {
    return (
      <View>
        <Text style={styles.eventDetails}>
          Puheenvuorot ({speakersInfo.length})
        </Text>
        {speakersInfo.map((speaker, index) => (
          <View key={index} style={styles.speakersView}>
            <Text style={styles.speakersText}>Puheaika: {speaker.time}</Text>
            <View style={styles.speakerView2}>
              <Text style={styles.speakersText}>Aihe: {speaker.topicId}</Text>
              <Text style={styles.speakersName}>
                {speaker.firstname} {speaker.lastname} / {speaker.party}
              </Text>
            </View>
          </View>
        ))}
      </View>
    );
  };

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
          <Text style={styles.eventTitle}>{navigationTitle}</Text>
          {renderDecisions()}
          {renderTopics()}
          {renderSpeakersInfo()}
        </View>
      </View>
    </ScrollView>
  );
};
