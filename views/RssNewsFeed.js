import { useEffect, useRef, useState } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { ActivityIndicator, Divider } from "react-native-paper";
import RssTags from "../components/RssTags";
import { RssFeeds } from "../constants/RssFeeds";
import { NewsCategoryContext } from "../contexts/Contexts";
import { GetRssFeed } from "../components/GetRssFeed";
import Heading from "../components/Heading";
import DateWithFinnishWeekday from "../components/DateParser";
import SwipeableList from "../components/SwipeableList";

export default function RssNewsFeed() {
  const { getData, data, isLoading, error } = GetRssFeed();
  const [selectedCategory, setSelectedCategory] = useState(0);
  const flatListRef = useRef(null);

  useEffect(() => {
    scrollToSelectedTag();
  }, [selectedCategory, flatListRef]);

  const scrollToSelectedTag = () => {
    if (flatListRef.current) {
      flatListRef.current.scrollToIndex({
        animated: true,
        index: selectedCategory,
      });
    } else {
      console.warn("FlatList ref not yet available. Can't scroll.");
    }
  };

  useEffect(() => {
    async function fetchData() {
      await getData(RssFeeds[selectedCategory].url);
    }
    fetchData();
  }, [selectedCategory]);

  const NewsItem = ({ item }) => {
    return (
      <View style={styles.newsContainer}>
        <View style={{ flex: 0.2 }}>
          <DateWithFinnishWeekday dateString={item.pubDate} />
        </View>
        <View style={{ flex: 0.8 }}>
          {item.title.length > 20 ? (
            <Text style={styles.title}>{item.title}</Text>
          ) : (
            <Text style={styles.title}>{item.description}</Text>
          )}
          <Divider />
        </View>
      </View>
    );
  };

  return (
    <NewsCategoryContext.Provider
      value={{ selectedCategory, setSelectedCategory }}
    >
      <View>
        <View>
          <Heading size="h3">Uutisvirta</Heading>
        </View>
        <View style={styles.tagContainer}>
          <FlatList
            ref={flatListRef}
            // initialScrollIndex={5}
            showsHorizontalScrollIndicator={false}
            horizontal
            data={[
              { categoryIndex: 0, categoryName: "Valtiopäiväasiat" },
              { categoryIndex: 1, categoryName: "Täysistunnot" },
              { categoryIndex: 2, categoryName: "Hallituksen esitykset" },
              { categoryIndex: 3, categoryName: "Mietinnöt" },
              { categoryIndex: 4, categoryName: "Vastaukset" },
              { categoryIndex: 5, categoryName: "Kirjelmät" },
              { categoryIndex: 6, categoryName: "Kysymykset" },
              { categoryIndex: 7, categoryName: "Eduskunnan tiedotteet" },
              { categoryIndex: 8, categoryName: "Valiokuntien tiedotteet" },
              // { categoryIndex: 9, categoryName: "Kansalaisinfo" },
              { categoryIndex: 9, categoryName: "Kirjaston tiedotteet" },
              { categoryIndex: 10, categoryName: "Kirjasto suosittelee" },
              { categoryIndex: 11, categoryName: "Lainssädäntöhankkeet" },
            ]}
            renderItem={({ item }) => (
              <RssTags
                categoryIndex={item.categoryIndex}
                categoryName={item.categoryName}
              />
            )}
            keyExtractor={(item) => item.categoryIndex}
          />
        </View>
        <View>
          {isLoading ? (
            <ActivityIndicator color="red" />
          ) : (
            <SwipeableList>
              <FlatList
                data={data.slice(0, 5)}
                maxToRenderPerBatch={5}
                renderItem={({ item }) => <NewsItem item={item} />}
                keyExtractor={(item) => item.link}
              />
            </SwipeableList>
          )}
        </View>
      </View>
    </NewsCategoryContext.Provider>
  );
}

const styles = StyleSheet.create({
  tagContainer: {
    padding: 15,
    flexDirection: "row",
    justifyContent: "space-between",
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
});
