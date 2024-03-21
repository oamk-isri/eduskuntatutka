import axios from "axios";
import { useEffect, useState } from "react"
import { View, Text } from "react-native";

export default Representative = ({route}) => {

  const { id, image } = route.params

  const [hetekaId, setHetekaId] = useState(id)
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [pictureUrl, setPictureUrl] = useState("https://avoindata.eduskunta.fi/" + image);

  const link =
    `https://avoindata.eduskunta.fi/api/v1/memberofparliament/${hetekaId}/fi`

  
  useEffect(() => {
    axios.get(link)
    .then((response) => {
      populateState(response.data.jsonNode)
    })
  }, [])

  const populateState = (data) => {
    setFirstname(data.Henkilo.KutsumaNimi);
    setLastname(data.Henkilo.SukuNimi)
  }

  return (
    <View>
      <Text>This is the representative view!</Text>
      <Text>This page is {firstname} {lastname}'s. {pictureUrl}</Text>
    </View>
  )
}