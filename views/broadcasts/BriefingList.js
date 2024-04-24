import React, { useEffect, useState } from "react";
import { 
  View, 
  TouchableOpacity, 
  FlatList, 
  ActivityIndicator } from "react-native";
import { Text, Card } from "react-native-paper";
import axios from "axios";
import { FontAwesome } from '@expo/vector-icons';

export default BriefingList = ({ navigation }) => {
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchEvents();
    const interval = setInterval(fetchEvents, 60000); // Fetch data every minute

    return () => clearInterval(interval); // Clean up interval on component unmount
  }, []);

  const fetchEvents = () => {
    axios
      .get(
        `https://verkkolahetys.eduskunta.fi/api/v1/categories/slug/tiedotustilaisuudet?include=events`
      )
      .then((response) => {
        if (response.data && response.data.events) {
          const updatedEvents = response.data.events.map((event) => {
            // Split the title at the '|' mark and take the first part
            const title = event.title.split("|")[0].trim();
            return { ...event, title };
          });
          setEvents(updatedEvents);
        }
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setIsLoading(false);
      });
  };

  const renderCardItem = ({ item, index }) => {
    if (index === 0 || item.state !== events[index - 1].state) {
      return (
        <Card style={{ margin: 5, backgroundColor: "lavender" }}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            {item.state === 0 && ( // Render the icon only for "Suora lähetys"
              <FontAwesome name="dot-circle-o" size={24} color="red" style={{ paddingLeft: 10, paddingRight: 5 }} />
            )}
            <Text style={{ fontSize: 18, fontWeight: "bold", margin: 10 }}>
              {item.state === 0
                ? "Suora lähetys"
                : item.state === 3
                  ? "Tulevat lähetykset"
                  : "Päättyneet lähetykset"}
            </Text>
          </View>
        </Card>
      );
    } else {
      return null;
    }
  };

  const renderItem = ({ item, index }) => (
    <TouchableOpacity
      onPress={() => navigation.navigate("Tiedotustilaisuus", {
        tiedotustilaisuudetEvent: item,
      })}
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

  return (
    <View style={{ flex: 1 }}>
      {isLoading ? (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
          <ActivityIndicator size="large" color="black" />
          <Text style={{ marginTop: 10, fontWeight: "bold", fontSize: 20 }}>
            Haetaan lähetyksiä...
            </Text>
        </View>
      ) : (
        <FlatList
          data={events}
          renderItem={({ item, index }) => (
            <>
              {renderCardItem({ item, index })}
              {renderItem({ item, index })}
            </>
          )}
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={{ paddingBottom: 5 }}
        />
      )}
    </View>
  );
};
