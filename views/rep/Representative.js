import axios from "axios";
import { useEffect, useState } from "react";
import { View, Text, Image, ScrollView } from "react-native";
import parties from "../../styles/parties";
import { ActivityIndicator, List } from "react-native-paper";
import RepDetails from "../../components/representatives/RepDetails";
import RepSpeeches from "../../components/representatives/RepSpeeches";
import RepAbsences from "../../components/representatives/RepAbsences";
import styles from "../../styles/views/rep"

export default Representative = ({ route }) => {
  const { id, image, party } = route.params;

  const [hetekaId, setHetekaId] = useState(id);
  const [shortParty, setShortParty] = useState(party);
  const [longParty, setLongParty] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [pictureUrl, setPictureUrl] = useState(
    "https://avoindata.eduskunta.fi/" + image
  );
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const link = `https://avoindata.eduskunta.fi/api/v1/memberofparliament/${hetekaId}/fi`;

  useEffect(() => {
    axios.get(link).then((response) => {
      populateState(response.data.jsonNode);
    });
  }, []);

  const populateState = (data) => {
    setFirstname(data.Henkilo.KutsumaNimi);
    setLastname(data.Henkilo.SukuNimi);
    setData(data.Henkilo);
    setLongParty(data.Henkilo.Eduskuntaryhmat.NykyinenEduskuntaryhma.Nimi);
    setIsLoading(false);
  };

  return (
    <View>
      <ScrollView>
        <View styles={styles.container}>
          <Image
            source={{ uri: pictureUrl }}
            style={[styles.image, styles[shortParty]]}
          />
          <Text style={styles.titleName}>
            {firstname} {lastname}
          </Text>
          <Text style={styles.longParty}>{longParty}</Text>
        </View>

        <RepDetails data={data} longParty={longParty} />
        <RepSpeeches id={hetekaId} />
        {isLoading ? (
          // mockup list
          <List.Accordion
            left={(props) => <List.Icon {...props} icon="account-cancel" />}
            title={<ActivityIndicator />}
          />
        ) : (
          <RepAbsences first={firstname} last={lastname} />
        )}
      </ScrollView>
    </View>
  );
};