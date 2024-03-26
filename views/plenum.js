import React from "react";
import { View, Text } from "react-native";
import { WebView } from 'react-native-webview';

export default PlenumDetails = ({ route }) => {
  const { event } = route.params;
  const { title, urlName } = event;

  // Construct the complete video URL
  const videoUrl = `https://eduskunta.videosync.fi/${urlName}?embed-view=1`;

  return (
    <View style={{ flex: 1 }}>
      <Text style={{ fontSize: 20, fontWeight: 'bold', textAlign: 'center', marginVertical: 20 }}>{title}</Text>
      <WebView
        source={{ uri: videoUrl }}
        style={{ flex: 1 }}
        allowsFullscreenVideo={true}
      />
    </View>
  );
};