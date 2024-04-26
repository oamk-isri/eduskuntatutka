import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  ScrollView,
  View,
  TouchableOpacity,
} from "react-native";
import { Text, Card } from "react-native-paper";
import { AntDesign, FontAwesome } from "@expo/vector-icons";
import styles from "../../styles/views/broadcasts";

export default Broadcasts = ({ navigation }) => {
  const [liveEvent, setLiveEvent] = useState(null);
  const [taysistunnotEvent, setTaysistunnotEvent] = useState(null);
  const [valiokunnatEvent, setValiokunnatEvent] = useState(null);
  const [seminaaritEvent, setSeminaaritEvent] = useState(null);
  const [tiedotustilaisuudetEvent, setTiedotustilaisuudetEvent] =
    useState(null);
  const [esittelyvideotEvent, setEsittelyvideotEvent] = useState(null);
  const [eduskuntaryhmatEvent, setEduskuntaryhmatEvent] = useState(null);

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 60000); // Fetch data every minute

    return () => clearInterval(interval); // Clean up interval on component unmount
  }, []);

  const fetchData = () => {
    fetchFirstLiveEvent();
    fetchFirstEvent("taysistunnot", setTaysistunnotEvent);
    fetchFirstEvent("valiokunnat", setValiokunnatEvent);
    fetchFirstEvent("seminaarit", setSeminaaritEvent);
    fetchFirstEvent("tiedotustilaisuudet", setTiedotustilaisuudetEvent);
    fetchFirstEvent("esittelyvideot", setEsittelyvideotEvent);
    fetchFirstEvent("eduskuntaryhmat", setEduskuntaryhmatEvent);
  };

  const fetchFirstLiveEvent = () => {
    axios
      .get(
        `https://verkkolahetys.eduskunta.fi/api/v1/categories/slug/eduskunta-kanava?include=children,events&states=0,3&limit=10&page=1`
      )
      .then((response) => {
        if (
          response.data &&
          response.data.children &&
          response.data.children.length > 0
        ) {
          const categories = response.data.children;
          let nearestLiveEvent = null;
          let nearestFutureEvent = null;
          const currentTime = new Date().getTime();
  
          // Iterate over categories to search for live events and future events
          categories.forEach((category) => {
            const { slug, events } = category;
            if (events.length > 0) {
              events.forEach((event) => {
                const eventDateTime = new Date(event.publishingDate).getTime();
                if (
                  event.state === 0 &&
                  (!nearestLiveEvent ||
                    eventDateTime >
                      new Date(nearestLiveEvent.publishingDate).getTime())
                ) {
                  nearestLiveEvent = {
                    ...event,
                    title: event.title.split("|")[0].trim(),
                    previewImg: event.previewImg,
                    categorySlug: slug, // Add the category slug to the live event
                  };
                } else if (
                  event.state === 3 &&
                  (!nearestFutureEvent ||
                    eventDateTime < new Date(nearestFutureEvent.publishingDate).getTime())
                ) {
                  nearestFutureEvent = {
                    ...event,
                    title: event.title.split("|")[0].trim(),
                    previewImg: event.previewImg,
                    categorySlug: slug, // Add the category slug to the future event
                  };
                }
              });
            }
          });
  
          // Set the live event to the nearest live event, if available; otherwise, set it to the nearest future event
          if (nearestLiveEvent) {
            setLiveEvent(nearestLiveEvent);
          } else if (nearestFutureEvent) {
            setLiveEvent(nearestFutureEvent);
          } else {
            setLiveEvent(null);
          }
        }
      })
      .catch((error) => {
        console.error("Error fetching live event data:", error);
      });
  };
  
  

  const fetchFirstEvent = (categorySlug, setEvent) => {
    let apiUrl;
    switch (categorySlug) {
      case "taysistunnot":
        apiUrl = `https://verkkolahetys.eduskunta.fi/api/v1/categories/slug/taysistunnot?include=events&states=1&limit=1&page=1`;
        break;
      case "valiokunnat":
        apiUrl = `https://verkkolahetys.eduskunta.fi/api/v1/categories/slug/valiokuntien-julkiset-kuulemiset-ja-avoimet-kokoukset?include=events&states=1&limit=16&page=1`;
        break;
      case "seminaarit":
        apiUrl = `https://verkkolahetys.eduskunta.fi/api/v1/categories/slug/seminaarit?include=events&states=1&limit=1&page=1`;
        break;
      case "tiedotustilaisuudet":
        apiUrl = `https://verkkolahetys.eduskunta.fi/api/v1/categories/slug/tiedotustilaisuudet?include=events&states=1&limit=1&page=1`;
        break;
      case "esittelyvideot":
        apiUrl = `https://verkkolahetys.eduskunta.fi/api/v1/categories/slug/esittelyvideot?include=events&states=1&limit=1&page=1`;
        break;
      case "eduskuntaryhmat":
        apiUrl = `https://verkkolahetys.eduskunta.fi/api/v1/categories/slug/eduskuntaryhmat?include=events&states=1&limit=1&page=1`;
        break;
      default:
        console.error("Invalid category slug");
        return;
    }

    axios
      .get(apiUrl)
      .then((response) => {
        if (
          response.data &&
          response.data.events &&
          response.data.events.length > 0
        ) {
          const event = response.data.events[0];
          // Split the title at the '|' mark and take the first part
          const title = event.title.split("|")[0].trim();
          const previewImg = event.previewImg;
          setEvent({ ...event, title, previewImg });
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  return (
    <ScrollView scrollIndicatorInsets={{ right: 1 }}>
      {/* Verkkolähetysten haku */}

      <TouchableOpacity
        onPress={() => navigation.navigate("Verkkolähetysten haku")}
      >
        <Card style={styles.listNavCard}>
          <View style={styles.listNavView}>
            <Text style={styles.listNavText}>
              Verkkolähetysten haku
            </Text>
            <FontAwesome
              name="search"
              size={24}
              color="black"
              style={styles.listNavIcon}
            />
          </View>
        </Card>
      </TouchableOpacity>

      {/* Suorat lähetykset */}
      <TouchableOpacity
        onPress={() => navigation.navigate("Suorat lähetykset")}
      >
        <Card style={styles.listNavCard}>
          <View
            style={styles.listNavView}>
            <Text
              style={styles.listNavText}>
              Suorat lähetykset
            </Text>
            <AntDesign
              name="caretright"
              size={16}
              color="black"
              style={styles.listNavIcon}
            />
          </View>
        </Card>
      </TouchableOpacity>

      {liveEvent !== null ? (
        <TouchableOpacity
          onPress={() => {
            const { categorySlug } = liveEvent;
            switch (categorySlug) {
              case "taysistunnot":
                navigation.navigate("Täysistunto", {
                  taysistunnotEvent: liveEvent,
                });
                break;
              case "valiokuntien-julkiset-kuulemiset-ja-avoimet-kokoukset":
                navigation.navigate("Valiokunta", {
                  valiokunnatEvent: liveEvent,
                });
                break;
              case "seminaarit":
                navigation.navigate("Seminaari", {
                  seminaaritEvent: liveEvent,
                });
                break;
              case "tiedotustilaisuudet":
                navigation.navigate("Tiedotustilaisuus", {
                  tiedotustilaisuudetEvent: liveEvent,
                });
                break;
              case "esittelyvideot":
                navigation.navigate("Esittelyvideo", {
                  esittelyvideotEvent: liveEvent,
                });
                break;
              case "eduskuntaryhmat":
                navigation.navigate("Eduskuntaryhmä", {
                  eduskuntaryhmatEvent: liveEvent,
                });
                break;
              default:
                console.error("Invalid category slug");
            }
          }}
        >
          <Card style={styles.listEventCard}>
            <Card.Content>
              {liveEvent !== null && (
                <View style={styles.listEventView}>
                  {liveEvent.state === 0 && (
                    <FontAwesome
                      name="dot-circle-o"
                      size={14}
                      color="red"
                      style={styles.listLiveIcon} // Add margin here
                    />
                  )}
                  <Text>
                    {liveEvent.state === 0
                      ? "Suorana nyt:"
                      : liveEvent.state === 3
                        ? "Seuraava suora lähetys:"
                        : ""}
                  </Text>
                </View>
              )}
              <Card.Cover
                source={{
                  uri: `https://eduskunta.videosync.fi${liveEvent.previewImg}`,
                }}
              />
              <Text style={styles.listEventTitle}>
                {liveEvent.title}
              </Text>
              {/* Render other details of liveEvent if needed */}
            </Card.Content>
          </Card>
        </TouchableOpacity>
      ) : (
        <View>
          {/* Render a default card or whatever you prefer */}
          <Card style={styles.listEventCard}>
            <Card.Content>
              <Text style={styles.listPrevText}>
                Ei suoria lähetyksiä juuri nyt.
                </Text>
              {/* Render other default details */}
            </Card.Content>
          </Card>
        </View>
      )}


      {/* Täysistunnot */}

      <TouchableOpacity onPress={() => navigation.navigate("Täysistunnot")}>
        <Card style={styles.listNavCard}>
          <View
            style={styles.listNavView}>
            <Text
              style={styles.listNavText}>
              Täysistunnot
            </Text>
            <AntDesign
              name="caretright"
              size={16}
              color="black"
              style={styles.listNavIcon}
            />
          </View>
        </Card>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() =>
          navigation.navigate("Täysistunto", { taysistunnotEvent })
        }
      >
        <Card style={styles.listEventCard}>
          <Card.Content>
            <Text style={styles.listPrevText}>Viimeisin tallenne:</Text>

            {taysistunnotEvent && (
              <>
                <Card.Cover
                  source={{
                    uri: `https://eduskunta.videosync.fi${taysistunnotEvent.previewImg}`,
                  }}
                />
                <Text
                  style={styles.listEventTitle}>
                  {taysistunnotEvent.title}
                </Text>
                {/* Render other details of taysistunnotEvent if needed */}
              </>
            )}
          </Card.Content>
        </Card>
      </TouchableOpacity>

      {/* Valiokunnat */}
      <TouchableOpacity
        onPress={() =>
          navigation.navigate(
            "Valiokuntien julkiset kuulemiset ja avoimet kokoukset"
          )
        }
      >
        <Card style={styles.listNavCard}>
          <View
            style={styles.listNavView}>
            <Text
              style={styles.listNavText}>
              Valiokuntien julkiset kuulemiset ja avoimet kokoukset
            </Text>
            <AntDesign
              name="caretright"
              size={16}
              color="black"
              style={styles.listNavIcon}
            />
          </View>
        </Card>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => navigation.navigate("Valiokunta", { valiokunnatEvent })}
      >
        <Card style={styles.listEventCard}>
          <Card.Content>
            <Text style={styles.listPrevText}>Viimeisin tallenne:</Text>

            {valiokunnatEvent && (
              <>
                <Card.Cover
                  source={{
                    uri: `https://eduskunta.videosync.fi${valiokunnatEvent.previewImg}`,
                  }}
                />
                <Text
                  style={styles.listEventTitle}
                >
                  {valiokunnatEvent.title}
                </Text>
                {/* Render other details of valiokunnatEvent if needed */}
              </>
            )}
          </Card.Content>
        </Card>
      </TouchableOpacity>

      {/* Seminaarit */}
      <TouchableOpacity onPress={() => navigation.navigate("Seminaarit")}>
        <Card style={styles.listNavCard}>
          <View
            style={styles.listNavView}>
            <Text
              style={styles.listNavText}>
              Seminaarit
            </Text>
            <AntDesign
              name="caretright"
              size={16}
              color="black"
              style={styles.listNavIcon}
            />
          </View>
        </Card>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => navigation.navigate("Seminaari", { seminaaritEvent })}
      >
        <Card style={styles.listEventCard}>
          <Card.Content>
            <Text style={styles.listPrevText}>Viimeisin tallenne:</Text>

            {seminaaritEvent && (
              <>
                <Card.Cover
                  source={{
                    uri: `https://eduskunta.videosync.fi${seminaaritEvent.previewImg}`,
                  }}
                />
                <Text
                  style={styles.listEventTitle}>
                  {seminaaritEvent.title}
                </Text>
                {/* Render other details of seminaaritEvent if needed */}
              </>
            )}
          </Card.Content>
        </Card>
      </TouchableOpacity>

      {/* Tiedotustilaisuudet */}
      <TouchableOpacity
        onPress={() => navigation.navigate("Tiedotustilaisuudet")}
      >
        <Card style={styles.listNavCard}>
          <View
            style={styles.listNavView}>
            <Text
              style={styles.listNavText}>
              Tiedotustilaisuudet
            </Text>
            <AntDesign
              name="caretright"
              size={16}
              color="black"
              style={styles.listNavIcon}
            />
          </View>
        </Card>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() =>
          navigation.navigate("Tiedotustilaisuus", { tiedotustilaisuudetEvent })
        }
      >
        <Card style={styles.listEventCard}>
          <Card.Content>
            <Text style={styles.listPrevText}>Viimeisin tallenne:</Text>

            {tiedotustilaisuudetEvent && (
              <>
                <Card.Cover
                  source={{
                    uri: `https://eduskunta.videosync.fi${tiedotustilaisuudetEvent.previewImg}`,
                  }}
                />
                <Text
                  style={styles.listEventTitle}
                >
                  {tiedotustilaisuudetEvent.title}
                </Text>
                {/* Render other details of tiedotustilaisuudetEvent if needed */}
              </>
            )}
          </Card.Content>
        </Card>
      </TouchableOpacity>

      {/* Esittelyvideot */}
      <TouchableOpacity onPress={() => navigation.navigate("Esittelyvideot")}>
        <Card style={styles.listNavCard}>
          <View
            style={styles.listNavView}>
            <Text
              style={styles.listNavText}>
              Esittelyvideot
            </Text>
            <AntDesign
              name="caretright"
              size={16}
              color="black"
              style={styles.listNavIcon}
            />
          </View>
        </Card>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() =>
          navigation.navigate("Esittelyvideo", { esittelyvideotEvent })
        }
      >
        <Card style={styles.listEventCard}>
          <Card.Content>
            <Text style={styles.listPrevText}>Viimeisin tallenne:</Text>

            {esittelyvideotEvent && (
              <>
                <Card.Cover
                  source={{
                    uri: `https://eduskunta.videosync.fi${esittelyvideotEvent.previewImg}`,
                  }}
                />
                <Text
                  style={styles.listEventTitle}
                >
                  {esittelyvideotEvent.title}
                </Text>
                {/* Render other details of esittelyvideotEvent if needed */}
              </>
            )}
          </Card.Content>
        </Card>
      </TouchableOpacity>

      {/* Eduskuntaryhmät */}
      <TouchableOpacity onPress={() => navigation.navigate("Eduskuntaryhmät")}>
        <Card style={styles.listNavCard}>
          <View
            style={styles.listNavView}>
            <Text
              style={styles.listNavText}>
              Eduskuntaryhmät
            </Text>
            <AntDesign
              name="caretright"
              size={16}
              color="black"
              style={{ paddingEnd: 15 }}
            />
          </View>
        </Card>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() =>
          navigation.navigate("Eduskuntaryhmä", { eduskuntaryhmatEvent })
        }
      >
        <Card style={styles.listEventCard}>
          <Card.Content>
            <Text style={styles.listPrevText}>Viimeisin tallenne:</Text>

            {eduskuntaryhmatEvent && (
              <>
                <Card.Cover
                  source={{
                    uri: `https://eduskunta.videosync.fi${eduskuntaryhmatEvent.previewImg}`,
                  }}
                />
                <Text
                  style={styles.listEventTitle}
                >
                  {eduskuntaryhmatEvent.title}
                </Text>
                {/* Render other details of eduskuntaryhmatEvent if needed */}
              </>
            )}
          </Card.Content>
        </Card>
      </TouchableOpacity>
    </ScrollView>
  );
};
