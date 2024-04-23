import axios from "axios";
import React, { useEffect, useState } from "react";
import { View, TouchableOpacity, FlatList, ActivityIndicator } from "react-native";
import { Text, Card } from "react-native-paper";
import { FontAwesome } from '@expo/vector-icons';

export default LiveList = ({ navigation }) => {
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // State for loading indicator

  const categoryUrls = {
    Täysistunnot:
      "https://verkkolahetys.eduskunta.fi/api/v1/categories/slug/taysistunnot?include=events&states=0,3",
    "Valiokuntien julkiset kuulemiset ja avoimet kokoukset":
      "https://verkkolahetys.eduskunta.fi/api/v1/categories/slug/valiokuntien-julkiset-kuulemiset-ja-avoimet-kokoukset?include=events&states=0,3",
    Seminaarit:
      "https://verkkolahetys.eduskunta.fi/api/v1/categories/slug/seminaarit?include=events&states=0,3",
    Tiedotustilaisuudet:
      "https://verkkolahetys.eduskunta.fi/api/v1/categories/slug/tiedotustilaisuudet?include=events&states=0,3",
    Esittelyvideot:
      "https://verkkolahetys.eduskunta.fi/api/v1/categories/slug/esittelyvideot?include=events&states=0,3",
    Eduskuntaryhmät:
      "https://verkkolahetys.eduskunta.fi/api/v1/categories/slug/eduskuntaryhmat?include=events&states=0,3",
  };

  useEffect(() => {
    fetchEvents();
    const interval = setInterval(fetchEvents, 60000); // Fetch data every minute

    return () => clearInterval(interval); // Clean up interval on component unmount
  }, []);

  const fetchEvents = async () => {
    setIsLoading(true); // Set loading to true when fetching events

    const promises = Object.entries(categoryUrls).map(([category, url]) => {
      return axios.get(url).then(response => ({
        category,
        events: response.data.events.map(event => ({ ...event, categoryUrl: url }))
      }));
    });

    Promise.all(promises)
      .then(results => {
        const allEvents = results.flatMap(({ events }) => events);
        // Sort events by publishing date from oldest to newest
        const sortedEvents = allEvents.sort((a, b) => new Date(a.publishingDate) - new Date(b.publishingDate));
        setEvents(sortedEvents);
        setIsLoading(false); // Set loading to false after fetching events
      })
      .catch(error => {
        console.error("Error fetching data:", error);
        setIsLoading(false); // Set loading to false if an error occurs
      });
  };

  const handlePressEvent = (event) => {
    const categoryUrl = event.categoryUrl;
    let category;
    Object.entries(categoryUrls).forEach(([cat, url]) => {
      if (categoryUrl.includes(url)) {
        category = cat;
      }
    });

    console.log("Navigating to", category || "Suora lähetys");

    switch (category) {
      case "Täysistunnot":
        navigation.navigate("Täysistunto", { taysistunnotEvent: event });
        break;
      case "Valiokuntien julkiset kuulemiset ja avoimet kokoukset":
        navigation.navigate("Valiokunta", { valiokunnatEvent: event });
        break;
      case "Seminaarit":
        navigation.navigate("Seminaari", { seminaaritEvent: event });
        break;
      case "Tiedotustilaisuudet":
        navigation.navigate("Tiedotustilaisuus", { tiedotustilaisuudetEvent: event });
        break;
      case "Esittelyvideot":
        navigation.navigate("Esittelyvideo", { esittelyvideotEvent: event });
        break;
      case "Eduskuntaryhmät":
        navigation.navigate("Eduskuntaryhmä", { eduskuntaryhmatEvent: event });
        break;
      default:
        navigation.navigate("Suora lähetys", { liveEvent: event });
        break;
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

  const renderSection = (section) => {
    if (section.data.length === 0) return null;
    return (
      <>
        <Card style={{ margin: 5, backgroundColor: "lavender" }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
            {section.title === "Suorana nyt" && (
              <FontAwesome name="dot-circle-o" size={24} color="red" style={{ paddingLeft: 10, paddingRight: 5 }} />
            )}
            <Text style={{ fontSize: 20, fontWeight: "bold", margin: 10 }}>
              {section.title}
            </Text>
          </View>
        </Card>
        <FlatList
          data={section.data}
          renderItem={renderItem}
          keyExtractor={(event) => event._id}
          contentContainerStyle={{ paddingBottom: 5 }}
        />
      </>
    );
  };


  if (isLoading) { // Show loading indicator while fetching events
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="black" />
        <Text style={{ marginTop: 10, fontWeight: "bold", fontSize: 20 }}>
          Haetaan lähetyksiä...
        </Text>
      </View>
    );
  }

  if (events.length === 0) {
    return <Text style={{
      fontSize: 22,
      fontWeight: "bold",
      paddingBottom: 10,
      paddingTop: 10
    }}>Ei suoria lähetyksiä.</Text>;
  }

  return (
    <FlatList
      data={[
        { title: "Suorana nyt", data: events.filter(event => event.state === 0) },
        { title: "Tulevat lähetykset", data: events.filter(event => event.state === 3) }
      ]}
      renderItem={({ item }) => renderSection(item)}
      keyExtractor={(item, index) => index.toString()}
    />
  );
};
