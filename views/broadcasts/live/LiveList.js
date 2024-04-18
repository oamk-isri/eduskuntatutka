import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  Image,
  ScrollView,
  View,
  TouchableOpacity,
  Button,
} from "react-native";
import { Text, Card } from "react-native-paper";

export default LiveList = ({ navigation }) => {
  const [events, setEvents] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = () => {
    axios
      .get(
        `https://verkkolahetys.eduskunta.fi/api/v1/categories/slug/eduskunta-kanava?include=children,events&states=0&limit=8&page=${page}`
      )
      .then((response) => {
        const liveEvents = response.data.children
          .map((child) => child.events)
          .flat(); // Extracting events from children array
        if (liveEvents.length > 0) {
          setEvents([
            ...events,
            ...liveEvents.map((event) => {
              // Split the title at the '|' mark and take the first part
              const title = event.title.split("|")[0].trim();
              return { ...event, title };
            }),
          ]);
          setPage(page + 1);
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  const handlePressEvent = (event) => {
    const { urlName } = event; // Extracting urlName from the event
    if (urlName.includes("taysistunto")) {
      // If urlName includes "tayistunto", navigate to Täysistunto
      navigation.navigate("Täysistunto", { taysistunnotEvent: event });
    } else {
      // Otherwise, navigate to Suora lähetys
      navigation.navigate("Suora lähetys", { liveEvent: event });
    }
  };

  return (
    <ScrollView>
      {events.length === 0 && (
        <Text
          style={{
            fontSize: 18,
            fontWeight: "bold",
            textAlign: "center",
            marginVertical: 10,
          }}
        >
          Ei suoria lähetyksiä juuri nyt.
        </Text>
      )}
      {events.map((event) => (
        <TouchableOpacity
          key={event._id}
          onPress={() => handlePressEvent(event)}
        >
          <Card style={{ margin: 5 }}>
            <Card.Cover
              source={{
                uri: `https://eduskunta.videosync.fi${event.previewImg}`,
              }}
            />
            <Card.Content>
              <Text
                style={{ fontSize: 18, fontWeight: "bold", paddingTop: 10 }}
              >
                {event.title}
              </Text>
            </Card.Content>
          </Card>
        </TouchableOpacity>
      ))}
      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
          marginVertical: 10,
        }}
      >
        <Button title="Näytä lisää" onPress={fetchEvents} />
      </View>
    </ScrollView>
  );
};
