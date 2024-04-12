import axios from "axios";
import { useEffect, useState } from "react"
import { StyleSheet, View, Text, Image, ScrollView } from "react-native";
import { ActivityIndicator } from "react-native-paper";
import Absences from "../components/AbsenceParser";
import RepSpeeches from "../components/repSpeeches";

export default Representative = ({ route }) => {

  const { id, image } = route.params

  const [hetekaId, setHetekaId] = useState(id)
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [pictureUrl, setPictureUrl] = useState("https://avoindata.eduskunta.fi/" + image);
  const [isLoading, setIsLoading] = useState(true);

  const link =
    `https://avoindata.eduskunta.fi/api/v1/memberofparliament/${hetekaId}/fi`


  useEffect(() => {
    axios.get(link)
      .then((response) => {
        populateState(response.data.jsonNode)
        setIsLoading(false)
      })
  }, [])

  const populateState = (data) => {
    setFirstname(data.Henkilo.KutsumaNimi);
    setLastname(data.Henkilo.SukuNimi)
  }

  return (
    <View>
      <ScrollView>
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
      <Speeches id={hetekaId}/>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <Absences first={firstname} last={lastname} />
      )}
      
      </ScrollView>
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