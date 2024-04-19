import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  ScrollView,
  View,
  TouchableOpacity,
} from "react-native";
import { Text, Card } from "react-native-paper";
import { AntDesign } from '@expo/vector-icons';

export default CommitteeList = ({ navigation }) => {
  const [events, setEvents] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMoreEvents, setHasMoreEvents] = useState(true);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = () => {
    axios
      .get(
        `https://verkkolahetys.eduskunta.fi/api/v1/categories/slug/valiokuntien-julkiset-kuulemiset-ja-avoimet-kokoukset?include=events&limit=16&page=${page}`
      )
      .then((response) => {
        if (response.data && response.data.events) {
          if (response.data.events.length === 0 || response.data.events.length < 16) {
            // No more events available
            setHasMoreEvents(false);
          }
          setEvents([
            ...events,
            ...response.data.events.map((event) => {
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

  return (
    <ScrollView>
      {events.map((event) => (
        <TouchableOpacity
          key={event._id}
          onPress={() =>
            navigation.navigate("Valiokunta", { valiokunnatEvent: event })
          }
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

      {/* "Näytä lisää" button */}
      {hasMoreEvents && (
        <TouchableOpacity
          onPress={fetchEvents}
          style={{
            backgroundColor: "lavender",
            margin: 5,
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 10,
            elevation: 3,
            flexDirection: "row",
          }}
        >
          <Text
            style={{
              fontSize: 18,
              fontWeight: "bold",
              padding: 5,
            }}
          >
            Näytä lisää
          </Text>
          <AntDesign name="caretdown" size={18} color="black" />
        </TouchableOpacity>
      )}
      {/* Add some marginBottom to create spacing */}

      <View style={{ marginBottom: 5 }}></View>
    </ScrollView>
  );
};
