import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { Divider } from "react-native-paper";
import { parse } from "fast-xml-parser";

export default function Landing() {
  const [newsData, setNewsData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://www.eduskunta.fi/_layouts/15/feed.aspx?xsl=1&web=/FI/rss-feeds&page=f9da32bd-3b14-433b-8205-71a52f570b09&wp=fdd65402-3b0a-4310-a0ba-ba310c157922&pageurl=/FI/rss-feeds/Sivut/default.aspx"
        )
          .then((response) => response.text())
          .then((textResponse) => {
            let result = parse(textResponse);
            setNewsData(result.rss.channel.item);
          });
      } catch (error) {
        console.error("Error fetching data:", error);
        // Handle UI error here (e.g., display an error message)
      }
    };

    fetchData();
  }, []);

  return (
    <View>
      {newsData.length > 0 ? (
        <FlatList
          data={newsData.slice(0, 5)}
          maxToRenderPerBatch={5}
          renderItem={({ item }) => (
            <View>
              <View style={styles.newsContainer}>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.date}>
                  {/* Uncomment and customize if you want to format the date */}
                  {/* {moment(item.pubDate).format("LLL")} */}
                </Text>
              </View>
              <Divider my={2} bg="#e0e0e0" />
            </View>
          )}
          keyExtractor={(item) => item.guid || item.link} // Use guid or link if available for unique key
        />
      ) : (
        <View>
          <Text>No news</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  newsContainer: {
    padding: 10,
  },
  title: {
    fontSize: 18,
    marginTop: 10,
    fontWeight: "600",
  },
  newsDescription: {
    fontSize: 16,
    marginTop: 10,
  },
  date: {
    fontSize: 14,
  },
  spinner: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: 400,
  },
});
