import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  ScrollView,
  View,
  TouchableOpacity,
} from "react-native";
import { Text, Card } from "react-native-paper";
import { AntDesign, FontAwesome } from "@expo/vector-icons";

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
            const categoryEvents = category.events;
            categoryEvents.forEach((event) => {
              const eventDateTime = new Date(event.publishingDate).getTime();
              if (event.state === 0 && (!nearestLiveEvent || eventDateTime > new Date(nearestLiveEvent.publishingDate).getTime())) {
                nearestLiveEvent = { ...event, title: event.title.split("|")[0].trim(), previewImg: event.previewImg };
              }
              if (eventDateTime > currentTime && (!nearestFutureEvent || eventDateTime < new Date(nearestFutureEvent.publishingDate).getTime())) {
                nearestFutureEvent = { ...event, title: event.title.split("|")[0].trim(), previewImg: event.previewImg };
              }
            });
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
        <Card style={{ margin: 5, backgroundColor: "lavender" }}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                fontSize: 18,
                fontWeight: "bold",
                padding: 10,
                margin: 5,
              }}
            >
              Verkkolähetysten haku
            </Text>
            <FontAwesome
              name="search"
              size={24}
              color="black"
              style={{ paddingEnd: 15 }}
            />
          </View>
        </Card>
      </TouchableOpacity>

      {/* Suorat lähetykset */}
      <TouchableOpacity
        onPress={() => navigation.navigate("Suorat lähetykset")}
      >
        <Card style={{ margin: 5, backgroundColor: "lavender" }}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                fontSize: 18,
                fontWeight: "bold",
                padding: 10,
                margin: 5,
              }}
            >
              Suorat lähetykset
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

      {liveEvent !== null ? (
  <TouchableOpacity
    onPress={() => {
      // Check if urlName contains "taysistunto"
      const { urlName } = liveEvent; // Extracting urlName from the event
      if (urlName.includes("taysistunto")) {
        // If urlName includes "tayistunto", navigate to Täysistunto
        navigation.navigate("Täysistunto", {
          taysistunnotEvent: liveEvent,
        });
      } else {
        // Otherwise, navigate to Suora lähetys
        navigation.navigate("Suora lähetys", { liveEvent: liveEvent });
      }
    }}
  >
    <Card style={{ margin: 5 }}>
      <Card.Content>
      <Text style={{ paddingBottom: 10 }}>
          {liveEvent.state === 0
            ? "Suorana nyt:"
            : liveEvent.state === 3
            ? "Seuraava suora lähetys:"
            : ""}
        </Text>
        <Card.Cover
          source={{
            uri: `https://eduskunta.videosync.fi${liveEvent.previewImg}`,
          }}
        />
        <Text
          style={{ fontSize: 18, fontWeight: "bold", paddingTop: 10 }}
        >
          {liveEvent.title}
        </Text>
        {/* Render other details of liveEvent if needed */}
      </Card.Content>
    </Card>
  </TouchableOpacity>
) : (
  <View>
    {/* Render a default card or whatever you prefer */}
    <Card style={{ margin: 5 }}>
      <Card.Content>
        <Text>Ei suoria lähetyksiä juuri nyt.</Text>
        {/* Render other default details */}
      </Card.Content>
    </Card>
  </View>
)}

      {/* Täysistunnot */}

      <TouchableOpacity onPress={() => navigation.navigate("Täysistunnot")}>
        <Card style={{ margin: 5, backgroundColor: "lavender" }}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                fontSize: 18,
                fontWeight: "bold",
                padding: 10,
                margin: 5,
              }}
            >
              Täysistunnot
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
          navigation.navigate("Täysistunto", { taysistunnotEvent })
        }
      >
        <Card style={{ margin: 5 }}>
          <Card.Content>
            <Text style={{ paddingBottom: 10 }}>Viimeisin tallenne:</Text>

            {taysistunnotEvent && (
              <>
                <Card.Cover
                  source={{
                    uri: `https://eduskunta.videosync.fi${taysistunnotEvent.previewImg}`,
                  }}
                />
                <Text
                  style={{ fontSize: 18, fontWeight: "bold", paddingTop: 10 }}
                >
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
        <Card style={{ margin: 5, backgroundColor: "lavender" }}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                fontSize: 18,
                fontWeight: "bold",
                padding: 10,
                margin: 5,
              }}
            >
              Valiokuntien julkiset kuulemiset ja avoimet kokoukset
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
        onPress={() => navigation.navigate("Valiokunta", { valiokunnatEvent })}
      >
        <Card style={{ margin: 5 }}>
          <Card.Content>
            <Text style={{ paddingBottom: 10 }}>Viimeisin tallenne:</Text>

            {valiokunnatEvent && (
              <>
                <Card.Cover
                  source={{
                    uri: `https://eduskunta.videosync.fi${valiokunnatEvent.previewImg}`,
                  }}
                />
                <Text
                  style={{ fontSize: 18, fontWeight: "bold", paddingTop: 10 }}
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
        <Card style={{ margin: 5, backgroundColor: "lavender" }}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                fontSize: 18,
                fontWeight: "bold",
                padding: 10,
                margin: 5,
              }}
            >
              Seminaarit
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
        onPress={() => navigation.navigate("Seminaari", { seminaaritEvent })}
      >
        <Card style={{ margin: 5 }}>
          <Card.Content>
            <Text style={{ paddingBottom: 10 }}>Viimeisin tallenne:</Text>

            {seminaaritEvent && (
              <>
                <Card.Cover
                  source={{
                    uri: `https://eduskunta.videosync.fi${seminaaritEvent.previewImg}`,
                  }}
                />
                <Text
                  style={{ fontSize: 18, fontWeight: "bold", paddingTop: 10 }}
                >
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
        <Card style={{ margin: 5, backgroundColor: "lavender" }}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                fontSize: 18,
                fontWeight: "bold",
                padding: 10,
                margin: 5,
              }}
            >
              Tiedotustilaisuudet
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
          navigation.navigate("Tiedotustilaisuus", { tiedotustilaisuudetEvent })
        }
      >
        <Card style={{ margin: 5 }}>
          <Card.Content>
            <Text style={{ paddingBottom: 10 }}>Viimeisin tallenne:</Text>

            {tiedotustilaisuudetEvent && (
              <>
                <Card.Cover
                  source={{
                    uri: `https://eduskunta.videosync.fi${tiedotustilaisuudetEvent.previewImg}`,
                  }}
                />
                <Text
                  style={{ fontSize: 18, fontWeight: "bold", paddingTop: 10 }}
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
        <Card style={{ margin: 5, backgroundColor: "lavender" }}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                fontSize: 18,
                fontWeight: "bold",
                padding: 10,
                margin: 5,
              }}
            >
              Esittelyvideot
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
          navigation.navigate("Esittelyvideo", { esittelyvideotEvent })
        }
      >
        <Card style={{ margin: 5 }}>
          <Card.Content>
            <Text style={{ paddingBottom: 10 }}>Viimeisin tallenne:</Text>

            {esittelyvideotEvent && (
              <>
                <Card.Cover
                  source={{
                    uri: `https://eduskunta.videosync.fi${esittelyvideotEvent.previewImg}`,
                  }}
                />
                <Text
                  style={{ fontSize: 18, fontWeight: "bold", paddingTop: 10 }}
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
        <Card style={{ margin: 5, backgroundColor: "lavender" }}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                fontSize: 18,
                fontWeight: "bold",
                padding: 10,
                margin: 5,
              }}
            >
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
        <Card style={{ margin: 5 }}>
          <Card.Content>
            <Text style={{ paddingBottom: 10 }}>Viimeisin tallenne:</Text>

            {eduskuntaryhmatEvent && (
              <>
                <Card.Cover
                  source={{
                    uri: `https://eduskunta.videosync.fi${eduskuntaryhmatEvent.previewImg}`,
                  }}
                />
                <Text
                  style={{ fontSize: 18, fontWeight: "bold", paddingTop: 10 }}
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
