import React, { useEffect, useState } from "react";
import { 
  View, 
  TouchableOpacity, 
  FlatList, 
  ActivityIndicator } from "react-native";
import { Text, Card } from "react-native-paper";
import axios from "axios";
import { FontAwesome } from '@expo/vector-icons';
import styles from "../../styles/views/broadcasts";

export default IntroList = ({ navigation }) => {
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
        `https://verkkolahetys.eduskunta.fi/api/v1/categories/slug/esittelyvideot?include=events`
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
        <Card style={styles.listNavCard}>
          <View style={styles.cardItemView}>
            {item.state === 0 && ( // Render the icon only for "Suora lähetys"
              <FontAwesome name="dot-circle-o" size={24} color="red" style={styles.liveIcon} />
            )}
            <Text style={styles.listNavText}>
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
      onPress={() => navigation.navigate("Esittelyvideo", { esittelyvideotEvent: item })}
    >
      <Card style={styles.listEventCard}>
        <Card.Cover
          source={{
            uri: `https://eduskunta.videosync.fi${item.previewImg}`,
          }}
        />
        <Card.Content>
          <Text style={styles.listEventTitle}>
            {item.title}
          </Text>
        </Card.Content>
      </Card>
    </TouchableOpacity>
  );

  return (
    <View style={styles.listView}>
      {isLoading ? (
        <View style={styles.loadingView}>
          <ActivityIndicator size="large" color="black" />
          <Text style={styles.loadingText}>
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
          contentContainerStyle={styles.flatPad}
        />
      )}
    </View>
  );
};
