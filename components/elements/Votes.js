import { useState, useEffect } from "react";
import { View } from "react-native";
import axios from "axios";
import { ActivityIndicator, Card, Text } from "react-native-paper";
import Heading from "./Heading";
import styles from "../../styles/components/elements"

export default function Votes() {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [oldestDate, setOldestDate] = useState(null);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "https://avoindata.eduskunta.fi/api/v1/tables/SaliDBAanestys/rows?&page=0&columnName=IstuntoVPVuosi&columnValue=2024"
      );
      // Find the oldest date in the response data
      const allDates = response.data.rowData.map((row) => new Date(row[4]));
      const oldestDateFound = Math.min(...allDates); // Use Math.min to find the smallest date

      setOldestDate(oldestDateFound);

      // Filter by kieliId and date
      const filteredData = response.data.rowData
        .filter(
          (row) =>
            row[1] === "1" && new Date(row[4]) > new Date(oldestDateFound)
        )
        .sort((a, b) => new Date(b[5]) - new Date(a[5])); // Sort by IstuntoPvm (date) descending

      // Remove duplicates by keeping the newest for each KohtaOtsikko
      const finalData = [...new Set(filteredData.map((row) => row[21]))] // Get unique KohtaOtsikko values
        .slice(0, 5) // Take only the first 5 unique KohtaOtsikko values
        .map((kohtaOtsikko) =>
          filteredData.find((row) => row[21] === kohtaOtsikko)
        ); // Find the newest entry for each unique KohtaOtsikko

      setData(finalData);
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (isLoading) {
    return <ActivityIndicator size="large" color="blue" />;
  }

  if (error) {
    return <Text>Error fetching data: {error.message}</Text>;
  }

  if (!data) {
    return <Text>No data found.</Text>;
  }

  return (
<>
    <Card style={styles.listNavCard}>
    <View style={styles.cardItemView}>
      <Text style={styles.listNavText}>
        Viimeisimmät äänestystulokset
      </Text>
      </View>
      </Card>
      <View style={styles.votesContainer}>
      {data.map((item) => (
        <Card
          key={item[0]}
          style={styles.votesBackground}
        >
          <View style={styles.votesTextContainer}>
            <View style={styles.votesTextLeft}>
              <Text style={styles.votesTopic}>
                {item[21]}
              </Text>
              <View style={styles.votesDateContainer}>
                <Text style={styles.votesDate}>
                  {formatDate(item[5])}
                </Text>
              </View>
            </View>
            <View style={styles.votesTextRight}>
              <Text>Jaa: {item[23]}</Text>
              <Text>Ei: {item[24]}</Text>
              <Text>Tyhjiä: {item[25]}</Text>
              <Text>Poissa: {item[26]}</Text>
              <Text>Yhteensä: {item[27]}</Text>
            </View>
          </View>
        </Card>
      ))}
    </View>
    </>
  );
}

function formatDate(dateString) {
  // Parse the date string
  const date = new Date(dateString);

  // Get day, month, and year components
  const day = date.getDate();
  const month = date.getMonth() + 1; // Months are zero-indexed

  // Format the date
  return `${day}.${month}.${date.getFullYear()}`;
}
