import axios from "axios";
import React, { useEffect, useState } from "react";
import { View, TouchableOpacity } from "react-native";
import { Text, Card } from "react-native-paper";
import Heading from "../components/Heading";

export default MainViewLive = ({ navigation }) => {
  const [event, setEvent] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await axios.get(
        `https://verkkolahetys.eduskunta.fi/api/v1/categories/slug/taysistunnot?include=events&limit=1&page=${page}`
      );
      setEvent(response.data.events);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <View>
      {event.length > 0 && (
        <>
          <Heading size="h3">
            Seuraava {event[0].title.split("|")[0].trim().toLowerCase()}
          </Heading>
          <TouchableOpacity key={event[0]._id}>
            <Card style={{ margin: 25 }}>
              <Card.Cover
                source={{
                  uri: `https://eduskunta.videosync.fi${event[0].previewImg}`,
                }}
              />
              <Card.Content>
                <Text
                  style={{ fontSize: 18, fontWeight: "bold", paddingTop: 10 }}
                ></Text>
              </Card.Content>
            </Card>
          </TouchableOpacity>
        </>
      )}
      <View
        style={{
          marginVertical: 10,
        }}
      />
    </View>
  );
};
