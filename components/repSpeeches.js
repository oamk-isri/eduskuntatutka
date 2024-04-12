import axios from "axios";
import react, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { List } from "react-native-paper";

export default Speeches = (props) => {

  const [speeches, setSpeeches] = useState([]);

  const [expanded, setExpanded] = useState(true);
  const handlePress = () => setExpanded(!expanded);

  const valtiopaiva_start = "12.4.2023"

  useEffect(() => {
    (async () => {
      let list = await createList(props.id)
      setSpeeches(list);
    })();
  }, [])

  const createList = async (id) => {

    let page = 0;
    let acc = [];
    let speechList;
    let hasMore = Boolean;

    do {
      let link =
        "https://avoindata.eduskunta.fi/api/v1/tables" +
        "/SaliDBPuheenvuoro/rows?" +
        `columnName=henkilonumero&columnValue=${id}` +
        `&page=${page}` +
        "&perPage=100";
      speechList = await axiosFetch(link);
      hasMore = speechList.hasMore;
      (speechList.rowData).map((row) => {
        acc.push(row)
      })
      page++;

    } while (hasMore);
    return acc
  }

  const axiosFetch = async (link) => {
    try {
      const response = await axios.get(link);
      return response.data;
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  return (
    <View>
      <List.Accordion
        title={"Puheenvuorot (" + speeches.length + ")"}
        left={props => <List.Icon {...props} icon="account-voice" />}
        expanded={expanded}
        onPress={handlePress}>

        {speeches.map((speech, index) => (
          <List.Item
            key={index.toString()}
            title={speech[11]}
            description={<Text>{speech[0]}</Text>}
          >
          </List.Item>
        ))}
      </List.Accordion>
    </View>
  )
}