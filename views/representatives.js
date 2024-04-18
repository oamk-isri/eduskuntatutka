import axios from "axios";
import { useEffect, useState } from "react";
import { Image, ScrollView, View } from "react-native";
import { Text, List, TextInput, ActivityIndicator } from "react-native-paper";
import Representative from "./representative";

export default Representatives = ({ navigation }) => {
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
        setSeatings(response.data);
        setFilteredSeatings(response.data);
        setIsLoading(false);
      });
  }, []);

  return (
    <ScrollView scrollIndicatorInsets={{ right: 1 }}>
      <TextInput
        placeholder="Hae kansanedustajaa"
        value={searchQuery}
        onChangeText={handleSearch}
      />
      {isLoading ? (
        <ActivityIndicator color="red" />
      ) : (
        <List.Section>
          {filteredSeatings.map((seat, index) => (
            <List.Item
              key={index.toString()}
              title={
                <Text>
                  {seat.firstname} {seat.lastname}
                </Text>
              }
              description={<Text>{seat.party}</Text>}
              onPress={() =>
                navigation.navigate("Kansanedustaja", {
                  id: seat.hetekaId,
                  image: seat.pictureUrl,
                  party: seat.party,
                })
              }
            ></List.Item>
          ))}
        </List.Section>
      )}
    </ScrollView>
  );
};
