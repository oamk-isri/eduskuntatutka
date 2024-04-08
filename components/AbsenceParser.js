import React, { useEffect, useState } from "react";
import { Text } from "react-native-paper";
import { usePapaParse } from "react-papaparse";

export default Absences = (props) => {

  const { readRemoteFile } = usePapaParse();
  const url = "https://datawrapper.dwcdn.net/cJbCO/260/dataset.csv"

  const [absences, setAbsences] = useState([]);
  const [firstname, setFirstname] = useState(props.first);
  const [lastname, setLastname] = useState(props.last);
  
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

  return (
    <Text>Poissaolokerrat: {absences.length}</Text>
  )
}