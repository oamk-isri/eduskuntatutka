import axios from "axios";
import React, { useEffect, useState } from "react";
import { View, TouchableOpacity, FlatList } from "react-native";
import { Text, Card } from "react-native-paper";
import { AntDesign } from '@expo/vector-icons';

export default LiveList = ({ navigation }) => {
  const [events, setEvents] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMoreEvents, setHasMoreEvents] = useState(true); // Track availability of more events

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = () => {
    axios
      .get(
        `https://verkkolahetys.eduskunta.fi/api/v1/categories/slug/eduskunta-kanava?include=children,events&states=0,3`
      )
      .then((response) => {
        const liveEvents = response.data.children
          .map((child) => child.events)
          .flat(); // Extracting events from children array
        if (liveEvents.length > 0) {
          // Filter out duplicate events
          const uniqueEvents = liveEvents.filter((event) => {
            return !events.some((existingEvent) => existingEvent._id === event._id);
          });
          setEvents([...events, ...uniqueEvents]);
          setPage(page + 1);
          if (liveEvents.length < 16) {
            // If less than 16 events fetched, no more events available
            setHasMoreEvents(false);
          }
        } else {
          // No more events available
          setHasMoreEvents(false);
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

  const renderItem = ({ item }) => (
    <TouchableOpacity
      key={item._id}
      onPress={() => handlePressEvent(item)}
    >
      <Card style={{ margin: 5 }}>
        <Card.Cover
          source={{
            uri: `https://eduskunta.videosync.fi${item.previewImg}`,
          }}
        />
        <Card.Content>
          <Text style={{ fontSize: 18, fontWeight: "bold", paddingTop: 10 }}>
            {item.title}
          </Text>
        </Card.Content>
      </Card>
    </TouchableOpacity>
  );

  // Categorize events based on their state
  const liveEvents = events.filter(event => event.state === 0);
  const upcomingEvents = events.filter(event => event.state === 3);

  return (
    <FlatList
      data={[
        { title: "Suorat lähetykset", data: liveEvents },
        { title: "Tulevat lähetykset", data: upcomingEvents }
      ].filter(section => section.data.length > 0)}
      renderItem={({ item }) => (
        <>
          <Card style={{ margin: 5, backgroundColor: "lavender" }}>
            <Text style={{ fontSize: 20, fontWeight: "bold", margin: 10 }}>
              {item.title}
            </Text>
          </Card>
          <FlatList
            data={item.data}
            renderItem={renderItem}
            keyExtractor={(event) => event._id}
            contentContainerStyle={{ paddingBottom: 5 }}
          />
        </>
      )}
      keyExtractor={(item, index) => index.toString()}
      onEndReached={fetchEvents}
      onEndReachedThreshold={0.5}
    />
  );
};
