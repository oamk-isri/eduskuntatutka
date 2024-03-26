import axios from "axios";
import { useEffect, useState } from "react"
import { StyleSheet, View, Text, Image } from "react-native";

export default Representative = ({ route }) => {

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
      <View styles={styles.container}>
        <Image
          source={{ uri: pictureUrl }}
          style={styles.image}
        />
        <Text
          style={styles.titleName}>
          {firstname} {lastname}
        </Text>
      </View>

    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  image: {
    height: 200,
    width: 200,
    borderRadius: 100,
    alignSelf: "center",
  },
  titleName: {
    fontSize: 25,
    paddingTop: 15,
    alignSelf: "center"
  }
});