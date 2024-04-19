import React, { useState, useEffect, useRef } from "react";
import { View, Text, Linking, ScrollView, StyleSheet } from "react-native";
import { WebView } from "react-native-webview";

export default Plenum = ({ route, navigation }) => {
  const { taysistunnotEvent } = route.params;
  const { title, urlName } = taysistunnotEvent;
  const [decisions, setDecisions] = useState([]);
  const [topics, setTopics] = useState([]);
  const [speakersInfo, setSpeakersInfo] = useState([]);
  const webViewRef = useRef(null); // <-- Define a ref for the WebView
  const [isFetching, setIsFetching] = useState(true);

  // Split the title at the '|' mark and take the first part
  const navigationTitle = title.split("|")[0].trim();

  // Construct the complete video URL
  const videoUrl = `https://eduskunta.videosync.fi/${urlName}?embed-view=1`;

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 10000); // Fetch data every 10 seconds
    return () => clearInterval(interval); // Clean up the interval on unmount
  }, []);

  const fetchData = () => {
    fetch(`https://eduskunta.videosync.fi/${urlName}/data`)
      .then((response) => response.json())
      .then((data) => {
        if (data.state === "0") {
          setIsFetching(true);
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
          setIsFetching(false);
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
    Linking.openURL(decisionUrl);
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
            style={{
              fontSize: 18,
              fontWeight: "bold",
              textDecorationLine: "underline",
            }}
            onPress={() => openDocument(decision)}
          >
            Linkki täysistunnon pöytäkirjaan
          </Text>
        ))}
        <Text style={{ fontSize: 20, fontWeight: "bold", marginTop: 20 }}>
          Käsiteltävät asiat:
        </Text>
      </View>
    );
  };

  const renderTopics = () => {
    return (
      <View style={{ marginTop: 20 }}>
        <Text style={{ fontSize: 20, fontWeight: "bold" }}>
          Keskusteluaiheet:
        </Text>
        {topics.map((topic, index) => {
          return (
            <View key={index} style={{ marginTop: 10 }}>
              <Text style={{ fontSize: 18, fontWeight: "bold" }}>
                {topic.id}. {topic.title.fi}
              </Text>
              <Text style={{ marginLeft: 10 }}>
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
      <View style={{ marginTop: 20 }}>
        <Text style={{ fontSize: 20, fontWeight: "bold" }}>
          Puheenvuorot ({speakersInfo.length})
        </Text>
        {speakersInfo.map((speaker, index) => (
          <View key={index} style={{ marginTop: 10 }}>
            <Text style={{ fontWeight: "bold" }}>Puheaika: {speaker.time}</Text>
            <View style={{ flexDirection: "row", marginTop: 5 }}>
              <Text style={{ fontWeight: "bold" }}>
                Aihe: {speaker.topicId}
              </Text>
              <Text style={{ fontWeight: "bold", marginLeft: 10 }}>
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
    <ScrollView style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        {isFetching ? (
          <Text>Loading...</Text>
        ) : (
          <>
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
              {renderDecisions()}
              {renderTopics()}
              {renderSpeakersInfo()}
            </View>
          </>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  webView: {
    height: 220, // Adjust the height as needed
    width: "100%",
  },
});
