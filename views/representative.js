import axios from "axios";
import { useEffect, useState } from "react"
import { View } from "react-native";

export default Representative = (hetekaId, picture) => {

  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [pictureUrl, setPictureUrl] = useState(picture);
  const [rep, setRep] = useState("");

  const link =
    `https://avoindata.eduskunta.fi/api/v1/memberofparliament/${hetekaId}/fi`

  
  useEffect(() => {
    axios.get(link)
    .then((response) => {
      setRep(response.data)
    })
  }, [])

  return (
    <View>
      <Text>{}</Text>
    </View>
  )
}