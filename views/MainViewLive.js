import axios from "axios";
import { useEffect, useState } from "react";
import { View, TouchableOpacity } from "react-native";
import { Text, Card } from "react-native-paper";
import { isSameDay, parseISO, isAfter } from "date-fns";
import Heading from "../components/Heading";

const TodayEvents = ({ events, handlePressEvent }) => {
  return (
    <>
      <Heading size="h3" style={{ paddingBottom: 20 }}>
        Lähetykset tänään
      </Heading>
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
                Tänään: {event.title.split("|")[0].trim().toLowerCase()}
              </Text>
            </Card.Content>
          </Card>
        </TouchableOpacity>
      ))}
    </>
  );
};

const UpcomingEvents = ({ events, handlePressEvent }) => {
  return (
    <>
      <Heading size="h3" style={{ paddingBottom: 20 }}>
        Tulevat lähetykset
      </Heading>
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
                {event.title.split("|")[0].trim().toLowerCase()}
              </Text>
            </Card.Content>
          </Card>
        </TouchableOpacity>
      ))}
    </>
  );
};

export default MainViewLive = ({ navigation }) => {
  const [eventsToday, setEventsToday] = useState([]);
  const [eventsUpcoming, setEventsUpcoming] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const taysistuntoResponse = await axios.get(
          `https://verkkolahetys.eduskunta.fi/api/v1/categories/slug/taysistunnot?include=events&limit=1&page=1`
        );
        const seminaaritResponse = await axios.get(
          `https://verkkolahetys.eduskunta.fi/api/v1/categories/slug/seminaarit?include=events&limit=1&page=1`
        );
        const valiokunnatResponse = await axios.get(
          `https://verkkolahetys.eduskunta.fi/api/v1/categories/slug/valiokuntien-julkiset-kuulemiset-ja-avoimet-kokoukset?include=events&limit=1&page=1`
        );
        const tiedotustilaisuudetResponse = await axios.get(
          `https://verkkolahetys.eduskunta.fi/api/v1/categories/slug/tiedotustilaisuudet?include=events&states=1&limit=1&page=1`
        );
        const esittelyResponse = await axios.get(
          `https://verkkolahetys.eduskunta.fi/api/v1/categories/slug/esittelyvideot?include=events&states=1&limit=1&page=1`
        );
        const eduskuntaryhmatResponse = await axios.get(
          `https://verkkolahetys.eduskunta.fi/api/v1/categories/slug/eduskuntaryhmat?include=events&states=1&limit=1&page=1`
        );

        const taysistuntoEvents = taysistuntoResponse.data.events.flat();
        const seminaaritEvents = seminaaritResponse.data.events.flat();
        const valiokunnatEvents = valiokunnatResponse.data.events.flat();
        const tiedotustilaisuudetEvents =
          tiedotustilaisuudetResponse.data.events.flat();
        const esittelyEvents = esittelyResponse.data.events.flat();
        const eduskuntaryhmatEvents =
          eduskuntaryhmatResponse.data.events.flat();

        const allEvents = [
          ...taysistuntoEvents,
          ...seminaaritEvents,
          ...valiokunnatEvents,
          ...tiedotustilaisuudetEvents,
          ...esittelyEvents,
          ...eduskuntaryhmatEvents,
        ];

        const todaysEvents = allEvents.filter((event) =>
          isSameDay(parseISO(event.publishingDate), new Date())
        );

        const upcomingEvents = allEvents.filter(
          (event) =>
            isAfter(parseISO(event.publishingDate), new Date()) &&
            !todaysEvents.some((todayEvent) => todayEvent._id === event._id)
        );

        setEventsToday(todaysEvents);
        setEventsUpcoming(upcomingEvents);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

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
      {eventsToday.length > 0 && (
        <TodayEvents events={eventsToday} handlePressEvent={handlePressEvent} />
      )}
      {eventsUpcoming.length > 0 && (
        <UpcomingEvents
          events={eventsUpcoming}
          handlePressEvent={handlePressEvent}
        />
      )}
      {eventsToday.length === 0 && eventsUpcoming.length === 0 && (
        <Text style={{ textAlign: "center", marginVertical: 10 }}>
          Ei suoria lähetyksiä tai tulevia tapahtumia.
        </Text>
      )}
    </View>
  );
};
