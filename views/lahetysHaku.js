import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, TouchableOpacity, Button, TextInput, Image } from "react-native";
import { Card } from "react-native-paper";
import axios from "axios";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import Icon from 'react-native-vector-icons/FontAwesome'; // Import your arrow icon component

export default lahetysHaku = ({ navigation }) => {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [searchResults, setSearchResults] = useState([]);
  const [isStartDatePickerVisible, setStartDatePickerVisible] = useState(false);
  const [isEndDatePickerVisible, setEndDatePickerVisible] = useState(false);
  const [totalResults, setTotalResults] = useState(0);
  const [displayedResults, setDisplayedResults] = useState(16);
  const [isLoading, setIsLoading] = useState(false); // Added loading state
  const [hasSearched, setHasSearched] = useState(false); // Added search flag
  

  // Define API URLs for categories
  const categoryUrls = {
    'Täysistunnot': "https://verkkolahetys.eduskunta.fi/api/v1/categories/slug/taysistunnot?include=events",
    'Valiokuntien julkiset kuulemiset ja avoimet kokoukset': "https://verkkolahetys.eduskunta.fi/api/v1/categories/slug/valiokuntien-julkiset-kuulemiset-ja-avoimet-kokoukset?include=events",
    'Seminaarit': "https://verkkolahetys.eduskunta.fi/api/v1/categories/slug/seminaarit?include=events",
    'Tiedotustilaisuudet': "https://verkkolahetys.eduskunta.fi/api/v1/categories/slug/tiedotustilaisuudet?include=events",
    'Esittelyvideot': "https://verkkolahetys.eduskunta.fi/api/v1/categories/slug/esittelyvideot?include=events",
    'Eduskuntaryhmät': "https://verkkolahetys.eduskunta.fi/api/v1/categories/slug/eduskuntaryhmat?include=events"
  };

  // Function to fetch events from the API based on the selected category URL
  const fetchEvents = async (url) => {
    console.log("Fetching events from:", url);
    try {
      const response = await axios.get(url);
      return response.data.events || [];
    } catch (error) {
      console.error("Error fetching data:", error);
      return [];
    }
  };

  // Function to filter events based on date range
  const filterEventsByDate = (events) => {
    if (!startDate || !endDate) {
      return events;
    }

    return events.filter(event => {
      const eventDate = new Date(event.publishingDate);
      return eventDate >= startDate && eventDate <= endDate;
    });
  };

  // Function to handle search button press
  const handleSearch = async () => {
    // Check if both categories and dates are selected
    if (selectedCategories.length === 0 || (!startDate || !endDate)) {
      alert("Valitse vähintään yksi kategoria ja määritä aloitus- ja lopetuspäivämäärä ennen hakua.");
      return;
    }

    setIsLoading(true); // Set loading state to true
    setHasSearched(true); // Set search flag to true

    let filteredEvents = [];
    
    // Fetch events based on selected categories
    if (selectedCategories.includes('Kaikki')) {
      // If "Kaikki" category is selected, fetch events from all URLs
      for (const category of Object.values(categoryUrls)) {
        const events = await fetchEvents(category);
        filteredEvents = [...filteredEvents, ...events];
      }
    } else {
      // Fetch events based on individual selected categories
      for (const category of selectedCategories) {
        const url = categoryUrls[category];
        const events = await fetchEvents(url);
        filteredEvents = [...filteredEvents, ...events];
      }
    }

    // Filter events based on date range
    filteredEvents = filterEventsByDate(filteredEvents);

// Modify titles to remove content after '|'
const modifiedSearchResults = filteredEvents.map(event => ({
  ...event,
  title: event.title.split('|')[0].trim()
}));

// Store the total number of results
setTotalResults(modifiedSearchResults.length);

// Update displayed results
setSearchResults(modifiedSearchResults);
setDisplayedResults(16);
setIsLoading(false); // Set loading state to false after results are fetched
  };

  // Function to load more search results
  const handleLoadMore = () => {
    setDisplayedResults(prevDisplayedResults => prevDisplayedResults + 16);
  };

  // Functions to handle date picker visibility
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

  // Functions to handle date selection
  const handleStartDateConfirm = (date) => {
    setStartDate(date);
    setStartDatePickerVisible(false); // Hide the startDate picker
    setEndDatePickerVisible(true); // Show the endDate picker
  };

  const handleEndDateConfirm = (date) => {
    setEndDate(date);
    hideEndDatePicker();
  };

// Function to handle press event based on the event's slug
const handlePressEvent = (event) => {
  const { slug } = event; // Extracting slug from the event
  switch (slug) {
    case "taysistunnot":
      console.log("Navigating to PlenumDetails");
      navigation.navigate("PlenumDetails", { taysistunnotEvent: event });
      break;
    case "valiokuntien-julkiset-kuulemiset-ja-avoimet-kokoukset":
      console.log("Navigating to Valiokunta");
      navigation.navigate("Valiokunta", { valiokunnatEvent: event });
      break;
    case "seminaarit":
      console.log("Navigating to Seminaari");
      navigation.navigate("Seminaari", { seminaaritEvent: event });
      break;
    case "tiedotustilaisuudet":
      console.log("Navigating to Tiedotustilaisuus");
      navigation.navigate("Tiedotustilaisuus", { tiedotustilaisuudetEvent: event });
      break;
    case "esittelyvideot":
      console.log("Navigating to Esittelyvideo");
      navigation.navigate("Esittelyvideo", { esittelyvideotEvent: event });
      break;
    case "eduskuntaryhmat":
      console.log("Navigating to Eduskuntaryhmä");
      navigation.navigate("Eduskuntaryhmä", { eduskuntaryhmatEvent: event });
      break;
    default:
      console.log("Navigating to Suora lähetys");
      navigation.navigate("Suora lähetys", { liveEvent: event });
      break;
  }
};

  const formattedStartDate = startDate ? `${startDate.getDate()}.${startDate.getMonth() + 1}.${startDate.getFullYear()}` : '';
  const formattedEndDate = endDate ? `${endDate.getDate()}.${endDate.getMonth() + 1}.${endDate.getFullYear()}` : '';

  return (
    <ScrollView>
      <View style={{ margin: 10 }}>
        {/* Checkboxes for categories */}
        <View style={{ flexDirection: "row", flexWrap: "wrap", marginBottom: 10 }}>
          {['Kaikki', ...Object.keys(categoryUrls)].map((key) => (
            <TouchableOpacity key={key} onPress={() => {
              if (key === 'Kaikki') {
                setSelectedCategories(['Kaikki']);
              } else {
                setSelectedCategories(prevState => {
                  if (prevState.includes('Kaikki')) {
                    return [key];
                  } else {
                    return prevState.includes(key) ? prevState.filter(cat => cat !== key) : [...prevState, key];
                  }
                });
              }
            }}>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <View style={{ height: 24, width: 24, borderRadius: 12, borderWidth: 1, marginRight: 5, justifyContent: "center", alignItems: "center", borderColor: selectedCategories.includes(key) ? "#007AFF" : "#CCCCCC" }}>
                  {selectedCategories.includes(key) && <View style={{ height: 12, width: 12, borderRadius: 6, backgroundColor: "#007AFF" }} />}
                </View>
                <Text>{key}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
        {/* Date selection */}
        <View style={{ marginBottom: 10 }}>
          <Text>Rajaa hakua:</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <TouchableOpacity onPress={showStartDatePicker} style={{ flex: 1 }}>
              <TextInput
                style={{ flex: 1, height: 40, borderColor: 'gray', borderWidth: 1, marginRight: 5, textAlign:"center" }}
                value={formattedStartDate || 'Valitse aloituspvm'} // Render preview text if startDate is null
                editable={false}
                onTouchEnd={showStartDatePicker}
              />
            </TouchableOpacity>
            <Icon name="arrow-right" size={20} color="black" style={{ marginRight: 5 }} />
            <TouchableOpacity onPress={showStartDatePicker} style={{ flex: 1 }}>
              <TextInput
                style={{ flex: 1, height: 40, borderColor: 'gray', borderWidth: 1, marginLeft: 5, textAlign:"center" }}
                value={formattedEndDate || 'Valitse lopetuspvm'} // Render preview text if endDate is null
                editable={false}
                onTouchEnd={showEndDatePicker}
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
        {/* Search button */}
        <Button title="Hae" onPress={handleSearch} />
      </View>
      {/* Display search results */}
      {isLoading && <Text style={{ textAlign: 'center', marginTop: 10, fontWeight: "bold" }}>Ladataan hakutuloksia...</Text>}
      {hasSearched && !isLoading && searchResults.length === 0 && (
        <Text style={{ textAlign: 'center', marginTop: 10, fontWeight: "bold" }}>Ei hakutuloksia.</Text>
      )}
      {searchResults.slice(0, displayedResults).map((event) => (
  <TouchableOpacity key={event._id} onPress={() => handlePressEvent(event)}>
          <Card style={{ margin: 5 }}>
            <Card.Cover source={{ uri: `https://eduskunta.videosync.fi${event.previewImg}` }} />
            <Card.Content>
              <Text style={{ fontSize: 18, fontWeight: 'bold', paddingTop: 10 }}>{event.title}</Text>
            </Card.Content>
          </Card>
        </TouchableOpacity>
      ))}
      {/* "Näytä lisää" button */}
      {!isLoading && displayedResults < totalResults && (
        <Button title="Näytä lisää" onPress={handleLoadMore} />
      )}
      <View style={{ alignItems: "center", justifyContent: "center" }}>
        {/* Image */}
        {/* Include your image component here */}
        <Image
          source={require("../images/eduskuntatalo.png")}
          style={{ width: "100%", height: 120 }}
          resizeMode="stretch"
        />
      </View>
    </ScrollView>
  );
};
