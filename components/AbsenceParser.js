import React, { useEffect, useState } from "react";
import { Text, List } from "react-native-paper";
import { View } from "react-native";
import { usePapaParse } from "react-papaparse";

export default Absences = (props) => {

  const { readRemoteFile } = usePapaParse();
  const url = "https://datawrapper.dwcdn.net/cJbCO/260/dataset.csv"

  const [absences, setAbsences] = useState([]);
  const [firstname, setFirstname] = useState(props.first);
  const [lastname, setLastname] = useState(props.last);

  const [expanded, setExpanded] = useState(true);
  const handlePress = () => setExpanded(!expanded);

  const handleReadRemoteFile = () => {
    readRemoteFile(url, {

      // config option to set csv header line as keys for data
      header: true,

      complete: (results) => {
        data = results.data
        const res = data.filter((absence) =>
          absence.Kansanedustaja == firstname + " " + lastname
        )
        setAbsences(res)
      },
    });
  };

  useEffect(() => {
    handleReadRemoteFile()
  }, [firstname, lastname])

  const format = (absenceDate) => {
    dates = absenceDate.split("@@")
    if (dates[0] === dates [1]) {
      return dates[0]
    } else {
      return dates[0] + " - " + dates[1]
    }
  }


  return (
    <View>
      <List.Accordion
        title={"Poissaolot (" + absences.length + ")"}
        left={props => <List.Icon {...props} icon="account-cancel" />}
        expanded={expanded}
        onPress={handlePress}>

        {absences.map((absence, index) => (
          <List.Item
            key={index.toString()}
            title={format(absence.Istuntopäivä)}
            description={<Text>{absence["Poissaolon syy"]}</Text>}
          >
          </List.Item>
        ))}
      </List.Accordion>
    </View>

  )
}