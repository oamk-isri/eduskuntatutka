import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Pressable,
  ScrollView,
} from "react-native";
import { Divider } from "react-native-paper";
import { parse } from "fast-xml-parser";

export default function Landing() {
  const [newsData, setNewsData] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(
    "eduskunnan_tiedotteet"
  );

  const urls = {
    valtiopäiväasiat:
      "https://www.eduskunta.fi/_layouts/15/feed.aspx?xsl=1&web=/FI/rss-feeds&page=1464b969-e96f-41d8-b741-a26e49ea0fbc&wp=e7568274-be64-435c-9901-9d4aa9e3d7a3&pageurl=/FI/rss-feeds/Sivut/vireilletulleet-vpasiat.aspx",
    täysistuntojen_pöytäkirjat:
      "https://www.eduskunta.fi/_layouts/15/feed.aspx?xsl=1&web=/FI/rss-feeds&page=8192fae7-172f-46ba-8605-75c1e750007a&wp=3527e156-7a72-443c-8698-9b5596317471&pageurl=/FI/rss-feeds/Sivut/Taysistuntojen-poytakirjat-RSS.aspx",
    hallituksen_esitykset:
      "https://www.eduskunta.fi/_layouts/15/feed.aspx?xsl=1&web=/FI/rss-feeds&page=09a1389c-9905-432f-a68b-dad4d2992beb&wp=aae94984-39b7-459a-9912-7bf5d970b356&pageurl=/FI/rss-feeds/Sivut/HEt.aspx",
    valiokuntien_mietinnöt:
      "https://www.eduskunta.fi/_layouts/15/feed.aspx?xsl=1&web=/FI/rss-feeds&page=fe15ad98-fba4-48d8-a772-e8a8ee7c5b5a&wp=edd3f5a9-7395-4868-905d-62dbd6579f16&pageurl=/FI/rss-feeds/Sivut/Valiokuntien-mietinnöt-RSS.aspx",
    eduskunnan_vastaukset:
      "https://www.eduskunta.fi/_layouts/15/feed.aspx?xsl=1&web=/FI/rss-feeds&page=69b97f55-ed58-4b2e-aac6-0936374b842a&wp=c05021c0-702c-4ceb-a200-2d5a93e57156&pageurl=/FI/rss-feeds/Sivut/Eduskunnan-vastaukset-RSS.aspx",
    eduskunnan_kirjelmät:
      "https://www.eduskunta.fi/_layouts/15/feed.aspx?xsl=1&web=/FI/rss-feeds&page=ec8fa660-6762-47e3-87cd-00039b3e19c9&wp=84ce04a6-a119-48aa-b6ef-0f8be1f9d594&pageurl=/FI/rss-feeds/Sivut/Eduskunnan-kirjelmat-RSS.aspx",
    kirjalliset_kysymykset:
      "https://www.eduskunta.fi/_layouts/15/feed.aspx?xsl=1&web=/FI/rss-feeds&page=a4011b50-8132-4c08-906f-ad8089958fd5&wp=9971a60e-1c4e-4269-9c21-2ab800e34953&pageurl=/FI/rss-feeds/Sivut/kirjalliset-kysymykset.aspx",
    eduskunnan_tiedotteet:
      "https://www.eduskunta.fi/_layouts/15/feed.aspx?xsl=1&web=/FI/rss-feeds&page=f9da32bd-3b14-433b-8205-71a52f570b09&wp=fdd65402-3b0a-4310-a0ba-ba310c157922&pageurl=/FI/rss-feeds/Sivut/default.aspx",
    valiokuntien_pöytäkirjat:
      "https://www.eduskunta.fi/_layouts/15/feed.aspx?xsl=1&web=/FI/rss-feeds&page=8192fae7-172f-46ba-8605-75c1e750007a&wp=3527e156-7a72-443c-8698-9b5596317471&pageurl=/FI/rss-feeds/Sivut/Taysistuntojen-poytakirjat-RSS.aspx",
    kansalaisinfo:
      "https://www.eduskunta.fi/_layouts/15/feed.aspx?xsl=1&web=/FI/rss-feeds&page=1eb6349c-c04b-465c-a2d4-f76065cd4dee&wp=f8068861-8686-4d82-acdb-bb73a0de885c&pageurl=/FI/rss-feeds/Sivut/kansalaisinfon-tapahtumat.aspx",
    kirjaston_tiedotteet:
      "https://www.eduskunta.fi/_layouts/15/feed.aspx?xsl=1&web=/FI/rss-feeds&page=b8b34077-7bbc-4ddc-b55a-8f8cf62ac64d&wp=b97d9430-fd71-4563-9bf5-da9d3fad8794&pageurl=/FI/rss-feeds/Sivut/Kirjaston-tiedotteet.aspx",
    kirjasto_suosittelee:
      "https://www.eduskunta.fi/_layouts/15/feed.aspx?xsl=1&web=/FI/rss-feeds&page=9bce4eda-a516-4973-bbd3-be0fd6b88b83&wp=c56fcbee-491d-4316-8de0-11c3ac02f6aa&pageurl=/FI/rss-feeds/Sivut/Kirjaston-suositukset.aspx",
    lainsäädäntö_tietopaketit:
      "https://www.eduskunta.fi/_layouts/15/feed.aspx?xsl=1&web=/FI/rss-feeds&page=b6372ba3-1140-4648-9535-5d14be9f5814&wp=72e12b16-aaa6-4f1a-a6a2-4d83f6ae69ef&pageurl=/FI/rss-feeds/Sivut/tietopaketit.aspx",
  };

  const fetchData = async (cat) => {
    try {
      console.log("cat" + cat);
      const response = await fetch(urls[cat]);
      console.log("fetching");
      const textResponse = await response.text();
      let result = parse(textResponse);
      setNewsData(result.rss.channel.item);
    } catch (error) {
      console.error("Error fetching data:", error);
      // Handle UI error here (e.g., display an error message)
    }
  };

  // Call once when the component mounts
  useEffect(() => {
    fetchData(selectedCategory);
  }, []);

  const handleTagPress = (category) => {
    setSelectedCategory(category);
    fetchData(selectedCategory);
  };

  // const filteredNews = newsData.filter(
  //   (item) => item.category === selectedCategory || selectedCategory === ""
  // );

  return (
    <View>
      <View style={styles.tagContainer}>
        <ScrollView horizontal>
          {/* Replace with your actual categories and fetch from data if needed */}
          <Pressable
            style={[
              styles.tag,
              selectedCategory === "valtiopäiväasiat" && styles.activeTag,
            ]}
            onPress={() => handleTagPress("valtiopäiväasiat")}
          >
            <Text style={styles.tagText}>valtiopäiväasiat</Text>
          </Pressable>
          <Pressable
            style={[
              styles.tag,
              selectedCategory === "täysistuntojen_pöytäkirjat" &&
                styles.activeTag,
            ]}
            onPress={() => handleTagPress("täysistuntojen_pöytäkirjat")}
          >
            <Text style={styles.tagText}>täysistuntojen_pöytäkirjat</Text>
          </Pressable>
          <Pressable
            style={[
              styles.tag,
              selectedCategory === "hallituksen_esitykset" && styles.activeTag,
            ]}
            onPress={() => handleTagPress("hallituksen_esitykset")}
          >
            <Text style={styles.tagText}>hallituksen_esitykset</Text>
          </Pressable>
          <Pressable
            style={[
              styles.tag,
              selectedCategory === "valiokuntien_mietinnöt" && styles.activeTag,
            ]}
            onPress={() => handleTagPress("valiokuntien_mietinnöt")}
          >
            <Text style={styles.tagText}>valiokuntien_mietinnöt</Text>
          </Pressable>
          <Pressable
            style={[
              styles.tag,
              selectedCategory === "eduskunnan_kirjelmät" && styles.activeTag,
            ]}
            onPress={() => handleTagPress("eduskunnan_kirjelmät")}
          >
            <Text style={styles.tagText}>eduskunnan_kirjelmät</Text>
          </Pressable>
          <Pressable
            style={[
              styles.tag,
              selectedCategory === "kirjalliset_kysymykset" && styles.activeTag,
            ]}
            onPress={() => handleTagPress("kirjalliset_kysymykset")}
          >
            <Text style={styles.tagText}>kirjalliset_kysymykset</Text>
          </Pressable>
          <Pressable
            style={[
              styles.tag,
              selectedCategory === "eduskunnan_tiedotteet" && styles.activeTag,
            ]}
            onPress={() => handleTagPress("eduskunnan_tiedotteet")}
          >
            <Text style={styles.tagText}>eduskunnan_tiedotteet</Text>
          </Pressable>
          <Pressable
            style={[
              styles.tag,
              selectedCategory === "valiokuntien_pöytäkirjat" &&
                styles.activeTag,
            ]}
            onPress={() => handleTagPress("valiokuntien_pöytäkirjat")}
          >
            <Text style={styles.tagText}>valiokuntien_pöytäkirjat</Text>
          </Pressable>
          <Pressable
            style={[
              styles.tag,
              selectedCategory === "kansalaisinfo" && styles.activeTag,
            ]}
            onPress={() => handleTagPress("kansalaisinfo")}
          >
            <Text style={styles.tagText}>kansalaisinfo</Text>
          </Pressable>
          <Pressable
            style={[
              styles.tag,
              selectedCategory === "kirjaston_tiedotteet" && styles.activeTag,
            ]}
            onPress={() => handleTagPress("kirjaston_tiedotteet")}
          >
            <Text style={styles.tagText}>kirjaston_tiedotteet</Text>
          </Pressable>
          <Pressable
            style={[
              styles.tag,
              selectedCategory === "kirjasto_suosittelee" && styles.activeTag,
            ]}
            onPress={() => handleTagPress("kirjasto_suosittelee")}
          >
            <Text style={styles.tagText}>kirjasto_suosittelee</Text>
          </Pressable>
          <Pressable
            style={[
              styles.tag,
              selectedCategory === "lainsäädäntö_tietopaketit" &&
                styles.activeTag,
            ]}
            onPress={() => handleTagPress("lainsäädäntö_tietopaketit")}
          >
            <Text style={styles.tagText}>lainsäädäntö_tietopaketit</Text>
          </Pressable>
          {/* Add more tags as needed */}
        </ScrollView>
      </View>

      <FlatList
        data={newsData}
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
        keyExtractor={(item) => item.guid || item.link}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  // ... existing styles
  tagContainer: {
    padding: 15,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  tag: {
    backgroundColor: "#f2f2f2",
    padding: 10,
    marginHorizontal: 5,
    borderRadius: 5,
  },
  activeTag: {
    backgroundColor: "#e0e0e0",
  },
  tagText: {
    fontSize: 14,
    fontWeight: "500",
  },
});
