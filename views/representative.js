import axios from "axios";
import { useEffect, useState } from "react"
import { StyleSheet, View, Text, Image, ScrollView } from "react-native";
import Absences from "../components/AbsenceParser";
import Speeches from "../components/repSpeeches";
import Details from "../components/repDetails";
import parties from "../styles/parties";

export default Representative = ({ route }) => {

  const { id, image, party } = route.params

  const [hetekaId, setHetekaId] = useState(id)
  const [shortParty, setShortParty] = useState(party)
  const [longParty, setLongParty] = useState("")
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [pictureUrl, setPictureUrl] = useState("https://avoindata.eduskunta.fi/" + image);
  const [data, setData] = useState([]);

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
    setData(data.Henkilo)
    setLongParty(data.Henkilo.Eduskuntaryhmat.NykyinenEduskuntaryhma.Nimi)
  }

  return (
    <View>
      <ScrollView>
      <View styles={styles.container}>
        <Image
          source={{ uri: pictureUrl }}
          style={[styles.image, styles[shortParty]]}
        />
        <Text
          style={styles.titleName}>
          {firstname} {lastname}
        </Text>
        <Text
          style={styles.longParty}>{longParty}</Text>
      </View>

      <Details data={data} longParty={longParty} />
      <Speeches id={hetekaId} />
      <Absences first={firstname} last={lastname} />
      
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
    borderWidth: 5
  },
  titleName: {
    fontSize: 25,
    paddingTop: 15,
    paddingBottom: 3,
    alignSelf: "center"
  },
  longParty: {
    fontSize: 18,
    flexWrap: "wrap",
    alignSelf: "center",
    paddingBottom: 15
  },
  kd: {borderColor: "rgb(255, 147, 4)"},
  kesk: {borderColor: "rgb(0, 107, 106)"},
  kok: {borderColor: "rgb(0, 92, 169)"},
  liik: {borderColor: "rgb(174, 35, 117)"},
  ps: {borderColor: "rgb(255, 213, 0)"},
  r: {borderColor: "rgb(255, 251, 218)"},
  sd: {borderColor: "rgb(225, 25, 49)"},
  vas: {borderColor: "rgb(255, 120, 200)"},
  vihr: {borderColor: "rgb(118, 183, 42)"},
});