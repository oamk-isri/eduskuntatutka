import { useEffect } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Divider } from "react-native-paper";
import { RssFeeds } from "../../constants/RssFeeds";
import { FlatList } from "react-native-gesture-handler";
import FinnishDate from "../parsers/FinnishDate";
import Xml from "../parsers/Xml";
import styles from "../../styles/components/newsfeed"

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
      navigation.navigate("Browser", { uri: link });
    }
  };

  const sortedData = [...data].sort(
    (a, b) => new Date(b.pubDate) - new Date(a.pubDate)
  );

  const NewsItem = ({ item }) => (
    <TouchableOpacity onPress={() => handlePress(item.link)}>
      <View style={styles.newsContainer}>
        <View style={styles.newsLeft}>
          <FinnishDate dateString={item.pubDate} />
        </View>
        <View style={styles.newsRight}>
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