import axios from "axios";
import react, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { ActivityIndicator, List } from "react-native-paper";
import { parse, isAfter, isBefore } from "date-fns";

export default Speeches = (props) => {

  const [speeches, setSpeeches] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [expanded, setExpanded] = useState(true);
  const handlePress = () => setExpanded(!expanded);

  const valtiopaiva_start = "2023-4-12"

  useEffect(() => {
    (async () => {
      let list = await createList(props.id);
      let filteredList = filterList(list);
      setSpeeches(filteredList);
      setIsLoading(false);
    })();
  }, [])

  const filterList = (list) => {
    for (const item of list) {
      if (isBefore(
        parse(valtiopaiva_start, "yyyy-MM-dd", new Date()),
        parse(item[11], "yyyy-MM-dd HH:mm:ss", new Date())
      )) {
        const filteredList = list.slice(list.indexOf(item));
        return filteredList;
      }
    }
  // if there isn't any speeches newer than valtiopaiva_start
  return []
  }

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
        acc.push(row);
      })
      page++;

    } while (hasMore);
    return acc;
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
        title={
          isLoading ? (
            <ActivityIndicator />
          ) : (
            "Puheenvuorot (" + speeches.length + ")"
          )}
          
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