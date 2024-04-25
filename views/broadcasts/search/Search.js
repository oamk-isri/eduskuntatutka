import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
} from "react-native";
import { Card } from "react-native-paper";
import axios from "axios";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import Icon from "react-native-vector-icons/FontAwesome";
import { FontAwesome, AntDesign } from "@expo/vector-icons";
import styles from "../../../styles/views/broadcasts";

export default Search = ({ navigation }) => {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [searchResults, setSearchResults] = useState([]);
  const [isStartDatePickerVisible, setStartDatePickerVisible] = useState(false);
  const [isEndDatePickerVisible, setEndDatePickerVisible] = useState(false);
  const [totalResults, setTotalResults] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [searchOptionsVisible, setSearchOptionsVisible] = useState(true);
  const [displayedResults, setDisplayedResults] = useState(16); // Update displayedResults state

  const categoryUrls = {
    Täysistunnot:
      "https://verkkolahetys.eduskunta.fi/api/v1/categories/slug/taysistunnot?include=events",
    "Valiokuntien julkiset kuulemiset ja avoimet kokoukset":
      "https://verkkolahetys.eduskunta.fi/api/v1/categories/slug/valiokuntien-julkiset-kuulemiset-ja-avoimet-kokoukset?include=events",
    Seminaarit:
      "https://verkkolahetys.eduskunta.fi/api/v1/categories/slug/seminaarit?include=events",
    Tiedotustilaisuudet:
      "https://verkkolahetys.eduskunta.fi/api/v1/categories/slug/tiedotustilaisuudet?include=events",
    Esittelyvideot:
      "https://verkkolahetys.eduskunta.fi/api/v1/categories/slug/esittelyvideot?include=events",
    Eduskuntaryhmät:
      "https://verkkolahetys.eduskunta.fi/api/v1/categories/slug/eduskuntaryhmat?include=events",
  };

  const fetchEvents = async (url, category) => {
    try {
      const response = await axios.get(url);
      const events = response.data.events.map(event => ({ ...event, categoryUrl: url }));
      return events || [];
    } catch (error) {
      console.error("Error fetching data:", error);
      return [];
    }
  };

  const filterEventsByDate = (events) => {
    if (!startDate || !endDate) {
      return events;
    }
  
    // Sort events by publishing date
    events.sort((a, b) => {
      const dateA = new Date(a.publishingDate);
      const dateB = new Date(b.publishingDate);
      return dateB - dateA; // Reverse the order to sort from newest to oldest
    });
  
    return events.filter((event) => {
      const eventDate = new Date(event.publishingDate);
      return eventDate >= startDate && eventDate <= endDate;
    });
  };

  const handleSearch = async () => {
    if (selectedCategories.length === 0 || !startDate || !endDate) {
      alert("Valitse vähintään yksi kategoria ja määritä aloitus- ja lopetuspäivämäärä ennen hakua.");
      return;
    }
  
    // Reset searchResults to an empty array at the beginning of the search
    setSearchResults([]);
  
    // Set isLoading to true at the beginning of the search
    setIsLoading(true);
    setHasSearched(true);
  
    let filteredEvents = [];
  
    if (selectedCategories.includes("Kaikki")) {
      for (const category of Object.values(categoryUrls)) {
        const events = await fetchEvents(category);
        filteredEvents = [...filteredEvents, ...events];
      }
    } else {
      for (const category of selectedCategories) {
        const url = categoryUrls[category];
        const events = await fetchEvents(url);
        filteredEvents = [...filteredEvents, ...events];
      }
    }
  
    filteredEvents = filterEventsByDate(filteredEvents);
  
    const modifiedSearchResults = filteredEvents.map((event) => ({
      ...event,
      title: event.title.split("|")[0].trim(),
    }));
  
    setTotalResults(modifiedSearchResults.length);
    setSearchResults(modifiedSearchResults);
    setIsLoading(false); // Set isLoading to false when the search is complete
    setDisplayedResults(16); // Reset displayedResults state
  };

  const handleLoadMore = () => {
    setDisplayedResults(prevDisplayedResults => prevDisplayedResults + 16); // Increase displayedResults state
  };

  const showStartDatePicker = () => {
    setStartDatePickerVisible(true);
  };

  const hideStartDatePicker = () => {
    setStartDatePickerVisible(false);
  };

  const showEndDatePicker = () => {
    setEndDatePickerVisible(true);
  };

  const hideEndDatePicker = () => {
    setEndDatePickerVisible(false);
  };

  const handleStartDateConfirm = (date) => {
    setStartDate(date);
    setStartDatePickerVisible(false);
    setEndDatePickerVisible();
  };

  const handleEndDateConfirm = (date) => {
    setEndDate(date);
    hideEndDatePicker();
  };

  const toggleSearchOptionsVisibility = () => {
    setSearchOptionsVisible(prevState => !prevState);
  };

    // Function to handle press event based on the event's category URL
    const handlePressEvent = (event) => {
      // Extract the category URL of the event
      const categoryUrl = event.categoryUrl;
  
      // Determine the category based on the category URL
      let category;
      if (categoryUrl.includes("taysistunnot")) {
        category = "Täysistunnot";
      } else if (categoryUrl.includes("valiokuntien-julkiset-kuulemiset-ja-avoimet-kokoukset")) {
        category = "Valiokuntien julkiset kuulemiset ja avoimet kokoukset";
      } else if (categoryUrl.includes("seminaarit")) {
        category = "Seminaarit";
      } else if (categoryUrl.includes("tiedotustilaisuudet")) {
        category = "Tiedotustilaisuudet";
      } else if (categoryUrl.includes("esittelyvideot")) {
        category = "Esittelyvideot";
      } else if (categoryUrl.includes("eduskuntaryhmat")) {
        category = "Eduskuntaryhmät";
      }
  
      // Navigate based on the determined category, or navigate to "Suora lähetys" if category is not found
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


  return (
    <View style={styles.searchMainView}>
      <FlatList
        data={searchResults.slice(0, displayedResults)} // Slice searchResults based on displayedResults state
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handlePressEvent(item)}>
            <Card style={styles.listEventCard}>
              <Card.Cover
                source={{ uri: `https://eduskunta.videosync.fi${item.previewImg}` }}
              />
              <Card.Content>
                <Text style={styles.listEventTitle}>
                  {item.title}
                </Text>
              </Card.Content>
            </Card>
          </TouchableOpacity>
        )}
        keyExtractor={(item, index) => index.toString()}
        ListHeaderComponent={(
          <View style={styles.searchOptView}>
            {searchOptionsVisible && (
              <View>
                <Text style={styles.searchTitle}>
                  Rajaa hakua:
                </Text>
                <View
                  style={styles.searchView}>
                  {['Kaikki', ...Object.keys(categoryUrls)].map((key) => (
                    <TouchableOpacity
                      style={styles.searchCateg}
                      key={key}
                      onPress={() => {
                        if (key === 'Kaikki') {
                          setSelectedCategories(['Kaikki']);
                        } else {
                          setSelectedCategories(prevState => {
                            if (prevState.includes('Kaikki')) {
                              return prevState
                                .filter(cat => cat !== 'Kaikki')
                                .concat(key);
                            } else {
                              return prevState.includes(key)
                                ? prevState.filter(cat => cat !== key)
                                : [...prevState, key];
                            }
                          });
                        }
                      }}
                    >
                      <Text>{key}</Text>
                      <View style={styles.searchView2}>
                        <View
                          style={[
                            styles.checkboxView,
                            selectedCategories.includes(key)
                              ? styles.selected
                              : styles.unselected
                          ]}
                        >
                          {selectedCategories.includes(key) &&
                            <FontAwesome
                              name="check"
                              size={16}
                              color={selectedCategories.includes(key) ? "#000000" : "#CCCCCC"}
                            />
                          }
                        </View>
                      </View>
                    </TouchableOpacity>
                  ))}
                </View>
                <View style={styles.dateView}>
                  <View
                    style={styles.dateView2}
                  >
                    <TouchableOpacity onPress={showStartDatePicker} style={styles.pickerTouch}>
                      <TextInput
                        style={styles.dateTextInput}
                        value={startDate ? `${startDate.getDate()}.${startDate.getMonth() + 1}.${startDate.getFullYear()}` : 'Valitse aloituspvm'}
                        editable={false}
                      />
                    </TouchableOpacity>
                    <Icon
                      name="arrow-right"
                      size={20}
                      color="black"
                      style={styles.searchArrow}
                    />
                    <TouchableOpacity onPress={showEndDatePicker} style={styles.pickerTouch}>
                      <TextInput
                        style={styles.dateTextInput}
                        value={endDate ? `${endDate.getDate()}.${endDate.getMonth() + 1}.${endDate.getFullYear()}` : 'Valitse lopetuspvm'}
                        editable={false}
                      />
                    </TouchableOpacity>
                  </View>
                  <DateTimePickerModal
                    isVisible={isStartDatePickerVisible}
                    mode="date"
                    onConfirm={handleStartDateConfirm}
                    onCancel={hideStartDatePicker}
                  />
                  <DateTimePickerModal
                    isVisible={isEndDatePickerVisible}
                    mode="date"
                    onConfirm={handleEndDateConfirm}
                    onCancel={hideEndDatePicker}
                  />
                </View>
                <TouchableOpacity
                  onPress={handleSearch}
                  style={styles.searchButton}>
                  <Text style={styles.searchButtonText}>
                    Hae
                  </Text>
                  <FontAwesome
                    name="search"
                    size={18}
                    color="black"
                    style={styles.searchButtonIcon}
                  />
                </TouchableOpacity>
              </View>
            )}
            <TouchableOpacity onPress={toggleSearchOptionsVisibility}
              style={styles.hideButton}>
              <Text
                style={styles.hideButtonText}
              >
                {searchOptionsVisible ? "Piilota hakupalkki" : "Näytä hakupalkki"}
              </Text>
              <AntDesign
                name={searchOptionsVisible
                  ? "caretup"
                  : "caretdown"}
                size={20}
                color="black"
              />
            </TouchableOpacity>
          </View>
        )}
        ListFooterComponent={(
          <>
            {isLoading && (
        <View style={styles.loadingView}>
        <ActivityIndicator size="large" color="black" />
        <Text style={styles.loadingText}>
          Haetaan lähetyksiä...
          </Text>
      </View>
            )}
            {hasSearched && !isLoading && searchResults.length === 0 && (
              <Text style={styles.noResults}>
                Ei hakutuloksia.
              </Text>
            )}
            <View style={styles.searchBottomView} />
          </>
        )}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5}
      />
    </View>
  );
};
