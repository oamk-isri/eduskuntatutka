import axios from "axios";
import { useEffect, useState } from "react";
import { ScrollView } from "react-native";
import { Text, List } from "react-native-paper";
import Representative from "./representative";


export default Representatives = () => {

  const [seatings, setSeatings] = useState([]);

  useEffect(() => {
    axios.get("https://avoindata.eduskunta.fi/api/v1/seating/")
    .then((response) => {
      setSeatings(response.data)
    })
  }, [])
  
  return (
    <ScrollView>
      <List.Section>
        {seatings.map((seat, index) => (
          <List.Item
            key={index.toString()}
            title={
              <Text>{seat.firstname} {seat.lastname}</Text>
            }
            description={
              <Text>{seat.party}</Text>
            }
            // fix
            // onPress={<Representative/>}
            
            >
          </List.Item>
        ))}
      </List.Section>
    </ScrollView>
  );
};