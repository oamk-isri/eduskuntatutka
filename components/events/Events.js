import axios from "axios";
import { useEffect, useState } from "react";
import { View } from "react-native";
import { Text } from "react-native-paper";
import { isSameDay, parseISO, isAfter } from "date-fns";
import TodayEvents from "./TodayEvents";
import UpcomingEvents from "./UpcomingEvents";

export default Events = ({ navigation }) => {
  const [todayEvents, setTodayEvents] = useState([]);
  const [upcomingEvents, setUpcomingEvents] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://verkkolahetys.eduskunta.fi/api/v1/categories/slug/eduskunta-kanava?include=children,events&states=0,3"
        );
        const data = response.data;

        const allEvents = data.children.flatMap((category) =>
          category.events.map((event) => ({
            ...event,
            categorySlug: category.slug,
          }))
        );

        const todaysEvents = allEvents.filter((event) =>
          isSameDay(parseISO(event.publishingDate), new Date())
        );

        const upcomingEvents = allEvents.filter(
          (event) =>
            isAfter(parseISO(event.publishingDate), new Date()) &&
            !todaysEvents.some((todayEvent) => todayEvent._id === event._id)
        );

        setTodayEvents(todaysEvents);
        setUpcomingEvents(upcomingEvents);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handlePressEvent = (event) => {
    const { state, categorySlug } = event;
    switch (categorySlug) {
      case "taysistunnot":
        navigation.navigate("Täysistunto", {
          taysistunnotEvent: event,
          title: state === 0 ? "Suora lähetys" : "Täysistunto",
        });
        break;
      case "valiokuntien-julkiset-kuulemiset-ja-avoimet-kokoukset":
        navigation.navigate("Valiokunta", {
          valiokunnatEvent: event,
          title: state === 0 ? "Suora lähetys" : "Valiokunta",
        });
        break;
      case "seminaarit":
        navigation.navigate("Seminaari", {
          seminaaritEvent: event,
          title: state === 0 ? "Suora lähetys" : "Seminaari",
        });
        break;
      case "tiedotustilaisuudet":
        navigation.navigate("Tiedotustilaisuus", {
          tiedotustilaisuudetEvent: event,
          title: state === 0 ? "Suora lähetys" : "Tiedotustilaisuus",
        });
        break;
      case "esittelyvideot":
        navigation.navigate("Esittelyvideo", {
          esittelyvideotEvent: event,
          title: state === 0 ? "Suora lähetys" : "Esittelyvideo",
        });
        break;
      case "eduskuntaryhmat":
        navigation.navigate("Eduskuntaryhmä", {
          eduskuntaryhmatEvent: event,
          title: state === 0 ? "Suora lähetys" : "Esittelyvideo",
        });
        break;
    }
  };

  return (
    <View>
      {todayEvents.length > 0 && (
        <TodayEvents events={todayEvents} handlePressEvent={handlePressEvent} />
      )}
      {upcomingEvents.length > 0 && (
        <UpcomingEvents
          events={upcomingEvents}
          handlePressEvent={handlePressEvent}
        />
      )}
      {todayEvents.length === 0 && upcomingEvents.length === 0 && (
        <Text style={{ textAlign: "center", marginVertical: 10 }}>
          Ei suoria lähetyksiä tai tulevia tapahtumia.
        </Text>
      )}
    </View>
  );
};
