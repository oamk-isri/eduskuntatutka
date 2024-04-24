import axios from "axios";
import { useEffect, useState } from "react";
import { View } from "react-native";
import { Text } from "react-native-paper";
import { isSameDay, parseISO, isAfter } from "date-fns";
import TodayEvents from "./TodayEvents";
import UpcomingEvents from "./UpcomingEvents";
import styles from "../../styles/components/events";

export default Events = ({ navigation }) => {
  const [eventsToday, setEventsToday] = useState([]);
  const [eventsUpcoming, setEventsUpcoming] = useState([]);

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
          `https://verkkolahetys.eduskunta.fi/api/v1/categories/slug/tiedotustilaisuudet?include=events&limit=1&page=1`
        );
        const esittelyResponse = await axios.get(
          `https://verkkolahetys.eduskunta.fi/api/v1/categories/slug/esittelyvideot?include=events&limit=1&page=1`
        );
        const eduskuntaryhmatResponse = await axios.get(
          `https://verkkolahetys.eduskunta.fi/api/v1/categories/slug/eduskuntaryhmat?include=events&limit=1&page=1`
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
      navigation.navigate("Täysistunto", { taysistunnotEvent: event });
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
        <Text style={styles.noEvents}>
          Ei suoria lähetyksiä tai tulevia tapahtumia.
        </Text>
      )}
    </View>
  );
};
