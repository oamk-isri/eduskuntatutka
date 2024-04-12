import axios from "axios";
import React, { useEffect, useState } from "react";
import { View, TouchableOpacity } from "react-native";
import { Text, Card } from "react-native-paper";

export default MainViewLive = ({ navigation }) => {
  const [event, setEvent] = useState(null);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const taysistuntoResponse = await axios.get(
          `https://verkkolahetys.eduskunta.fi/api/v1/categories/slug/taysistunnot?include=events&limit=1&page=${page}`
        );
        const seminaaritResponse = await axios.get(
          `https://verkkolahetys.eduskunta.fi/api/v1/categories/slug/seminaarit?include=events&limit=1&page=${page}`
        );

        const taysistuntoEvents = taysistuntoResponse.data.events.flat();
        const seminaaritEvents = seminaaritResponse.data.events.flat();

        const upcomingTaysistunto = taysistuntoEvents.find((event) =>
          isUpcoming(event.publishingDate)
        );
        const upcomingSeminaari = seminaaritEvents.find((event) =>
          isUpcoming(event.publishingDate)
        );

        let upcomingEvent;
        if (upcomingTaysistunto) {
          upcomingEvent = upcomingTaysistunto;
        } else if (upcomingSeminaari) {
          upcomingEvent = upcomingSeminaari;
        }

        setEvent(upcomingEvent);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const isUpcoming = (publishingDate) => {
    const parsedDate = new Date(publishingDate);

    const today = new Date();

    return parsedDate > today;
  };

  const handlePressEvent = (event) => {
    const { urlName } = event;
    if (urlName.includes("taysistunto")) {
      navigation.navigate("PlenumDetails", { taysistunnotEvent: event });
    } else {
      navigation.navigate("Suora lähetys", { liveEvent: event });
    }
  };

  return (
    <View>
      {event ? (
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
                Seuraava {event.title.split("|")[0].trim().toLowerCase()}
              </Text>
            </Card.Content>
          </Card>
        </TouchableOpacity>
      ) : (
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
    </View>
  );
};
