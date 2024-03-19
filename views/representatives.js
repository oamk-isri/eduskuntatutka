import axios from "axios";
import { useEffect, useState } from "react";
import { ScrollView } from "react-native";
import { Text, List, TextInput } from "react-native-paper";
import Representative from "./representative";


export default Representatives = () => {
  const [seatings, setSeatings] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredSeatings, setFilteredSeatings] = useState([]);

  useEffect(() => {

  }, []);

  const handleSearch = (query) => {
    setSearchQuery(query);
    const filteredData = seatings.filter(seat =>
      seat.firstname.toLowerCase().includes(query.toLowerCase()) ||
      seat.lastname.toLowerCase().includes(query.toLowerCase()) ||
      seat.party.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredSeatings(filteredData);
  };

  useEffect(() => {
    axios.get("https://avoindata.eduskunta.fi/api/v1/seating/")
    .then((response) => {
      setSeatings(response.data)
        setFilteredSeatings(response.data)
    })
  }, [])
  
  return (
    <ScrollView>
      <TextInput
        placeholder="Hae kansanedustajaa"
        value={searchQuery}
        onChangeText={handleSearch}
        />
        <List.Section>
        {filteredSeatings.map((seat, index) => (
          <List.Item
            key={index.toString()}
            title={<Text>{seat.firstname} {seat.lastname}</Text>}
            description={<Text>{seat.party}</Text>}
            
              // fix
              // onPress={<Representative/>}
              >
            </List.Item>
        ))}
      </List.Section>
    </ScrollView>
  );
};