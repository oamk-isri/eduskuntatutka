import axios from "axios";
import React, { useEffect, useState } from "react";
import { Image, ScrollView, View, TouchableOpacity } from "react-native";
import { Text, Card } from "react-native-paper";
import PlenumDetails from "./plenum"; // Import the PlenumDetails component

// Placeholder image URL

export default PlenumList = ({ navigation }) => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    axios
      .get(
        "https://verkkolahetys.eduskunta.fi/api/v1/categories/slug/taysistunnot?include=events&limit=16&page=1"
      )
      .then((response) => {
        if (response.data && response.data.events) {
          setEvents(response.data.events);
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  return (
    <ScrollView>
      {events.map((event) => (
        <TouchableOpacity key={event._id} onPress={() => navigation.navigate("PlenumDetails", { event })}>
          <Card>
            
            <Card.Cover source={{ uri: `https://eduskunta.videosync.fi${event.previewImg}` }} />
            <Card.Content>
            <Text>{event.title}</Text>
          </Card.Content>
          </Card>
        </TouchableOpacity>
      ))}
      {/* Image at the bottom covering the whole width */}
      <View style={{ alignItems: "center", justifyContent: "center" }}>
        <Image
          source={require("../images/eduskuntatalo.png")}
          style={{ width: "100%", height: 120 }}
          resizeMode="stretch"
        />
      </View>
    </ScrollView>
  );
};
