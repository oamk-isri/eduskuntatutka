import { useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Divider } from "react-native-paper";
import { RssFeeds } from "../../constants/RssFeeds";
import { FlatList } from "react-native-gesture-handler";
import FinnishDate from "../parsers/FinnishDate";
import Xml from "../parsers/Xml";

export default News = ({ navigation, route }) => {
  const { getData, data } = Xml();
  const { title, catIndex } = route.params;

  useEffect(() => {
    navigation.setOptions({ title: title });
  }, [title]);

  useEffect(() => {
    async function fetchData() {
      await getData(RssFeeds[catIndex].url);
    }
    fetchData();
  }, [catIndex]);

  const handlePress = (link) => {
    if (link) {
      navigation.navigate("WebViewUI", { uri: link });
    }
  };

  const sortedData = [...data].sort(
    (a, b) => new Date(b.pubDate) - new Date(a.pubDate)
  );

  const NewsItem = ({ item }) => (
    <TouchableOpacity onPress={() => handlePress(item.link)}>
      <View style={styles.newsContainer}>
        <View style={{ flex: 0.2 }}>
          <FinnishDate dateString={item.pubDate} />
        </View>
        <View style={{ flex: 0.8 }}>
          {item.title.length > 40 || !item.description.length ? (
            <Text style={styles.title}>{item.title}</Text>
          ) : (
            <Text style={styles.title}>{item.description}</Text>
          )}
          <Divider />
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View>
      <FlatList
        data={sortedData}
        maxToRenderPerBatch={5}
        renderItem={({ item }) => <NewsItem item={item} />}
        keyExtractor={(item) => item.link}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  tagContainer: {
    padding: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    overflow: "scroll",
  },

  newsContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 10,
    marginRight: 10,
  },
  title: {
    flex: 0.7,
    fontSize: 14,
    paddingBottom: 20,
    paddingTop: 20,
  },
  headingContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  buttonRight: {
    marginLeft: "auto",
    marginRight: 30,
    marginTop: 10,
  },
  buttonText: {
    fontWeight: "bold",
    fontSize: 25,
  },
});
