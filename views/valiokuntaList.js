import axios from "axios";
import React, { useEffect, useState } from "react";
import { Image, ScrollView, View, TouchableOpacity, Button } from "react-native";
import { Text, Card } from "react-native-paper";

export default valiokuntaList = ({ navigation }) => {
  const [events, setEvents] = useState([]);
  const [page, setPage] = useState(1);

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
          setEvents([...events, ...response.data.events.map(event => {
            // Split the title at the '|' mark and take the first part
            const title = event.title.split('|')[0].trim();
            return { ...event, title };
          })]);
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
        <TouchableOpacity key={event._id} onPress={() => navigation.navigate("Valiokunta", { valiokunnatEvent: event })}>
          <Card style={{margin:5}}>
            <Card.Cover source={{ uri: `https://eduskunta.videosync.fi${event.previewImg}` }} />
            <Card.Content>
              <Text style={{fontSize: 18, fontWeight: 'bold', paddingTop: 10}}>{event.title}</Text>
            </Card.Content>
          </Card>
        </TouchableOpacity>
      ))}
      <View style={{ alignItems: "center", justifyContent: "center", marginVertical: 10 }}>
        <Button title="Näytä lisää" onPress={fetchEvents} />
      </View>
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