import axios from "axios";
import { useEffect, useState } from "react";
import { FlatList, Text } from "react-native";
import { TextInput, ActivityIndicator, List, Divider } from "react-native-paper";
import styles from "../../styles/views/rep"

export default RepresentativesList = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [seatings, setSeatings] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredSeatings, setFilteredSeatings] = useState([]);

  const handleSearch = (query) => {
    setSearchQuery(query);
    const filteredData = seatings.filter(
      (seat) =>
        seat.firstname.toLowerCase().includes(query.toLowerCase()) ||
        seat.lastname.toLowerCase().includes(query.toLowerCase()) ||
        seat.party.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredSeatings(filteredData);
  };

  useEffect(() => {
    axios
      .get("https://avoindata.eduskunta.fi/api/v1/seating/")
      .then((response) => {
        sortList(response.data)
        setSeatings(response.data);
        setFilteredSeatings(response.data);
        setIsLoading(false);
      });
  }, []);

  const sortList = (list) => {
    list.sort((a, b) => {
      if (a.lastname < b.lastname) {
        return -1;
      }
      if (a.lastname > b.lastname) {
        return 1;
      }
      return 0;
    })
  }

  return (
    <>
      <TextInput
        placeholder="Hae kansanedustajaa"
        value={searchQuery}
        onChangeText={handleSearch}
      />
      {isLoading ? (
        <ActivityIndicator color="red" />
      ) : (
        <FlatList
          data={filteredSeatings}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <>
              <List.Item
                title={<Text>{item.lastname} {item.firstname}</Text>}
                description={
                  <Text>{item.party}</Text>}
                onPress={() =>
                  navigation.navigate("Kansanedustaja", {
                    id: item.hetekaId,
                    image: item.pictureUrl,
                    party: item.party,
                  })
                }
              />
              <Divider />
            </>
          )}
        />
      )}
    </>
  );
};