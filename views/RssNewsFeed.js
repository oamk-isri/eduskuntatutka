import { useEffect, useRef, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { ActivityIndicator, Divider } from "react-native-paper";
import RssTags from "../components/RssTags";
import { RssFeeds } from "../constants/RssFeeds";
import { NewsCategoryContext } from "../contexts/Contexts";
import { GetRssFeed } from "../components/GetRssFeed";
import Heading from "../components/Heading";
import DateWithFinnishWeekday from "../components/DateParser";
import SwipeableList from "../components/SwipeableList";

import { FlatList, ScrollView } from "react-native-gesture-handler";

export default function RssNewsFeed({ navigation }) {
  const { getData, data, isLoading, error } = GetRssFeed();
  const [selectedCategory, setSelectedCategory] = useState(0);
  const flatListRef = useRef(null);
  const newsfeedHeightRef = useRef(null);
  const [measuredHeight, setMeasuredHeight] = useState(null);

  const onLayout = (event) => {
    const {
      layout: { height },
    } = event.nativeEvent;
    if (height > 100) {
      setMeasuredHeight(height);
    }
  };

  const onContentSizeChange = (contentWidth, contentHeight) => {
    setMeasuredHeight(contentHeight);
  };

  useEffect(() => {
    if (newsfeedHeightRef.current) {
      onLayout({
        nativeEvent: {
          layout: { height: newsfeedHeightRef.current.offsetHeight },
        },
      });
    }
  }, [selectedCategory]);

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

  const handlePress = (link) => {
    if (link) {
      navigation.navigate("WebViewUI", { uri: link });
    }
  };

  const NewsItem = ({ item }) => (
    <TouchableOpacity onPress={() => handlePress(item.link)}>
      <View style={styles.newsContainer}>
        <View style={{ flex: 0.2 }}>
          <DateWithFinnishWeekday dateString={item.pubDate} />
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

  const newsList = data
    .slice(0, 5)
    .map((item) => <NewsItem key={item.link} item={item} />);

  return (
    <NewsCategoryContext.Provider
      value={{ selectedCategory, setSelectedCategory }}
    >
      <ScrollView>
        <View>
          <Heading size="h3">Uutisvirta</Heading>
        </View>
        <View style={styles.tagContainer}>
          <FlatList
            ref={flatListRef}
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
              { categoryIndex: 9, categoryName: "Kansalaisinfo" },
              { categoryIndex: 10, categoryName: "Kirjaston tiedotteet" },
              { categoryIndex: 11, categoryName: "Kirjasto suosittelee" },
              { categoryIndex: 12, categoryName: "Lainsäädäntöhankkeet" },
              { categoryIndex: 13, categoryName: "Lausumat ja kannanotot" },
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
        <View ref={newsfeedHeightRef} onLayout={onLayout}>
          <View style={{ height: measuredHeight }}>
            {isLoading ? (
              <ActivityIndicator
                size="large"
                color="#114d9d"
                style={[
                  styles.centeredIndicator,
                  { top: measuredHeight / 2 - 12 },
                ]}
              />
            ) : (
              <ScrollView onContentSizeChange={onContentSizeChange}>
                <SwipeableList>
                  <View>{newsList}</View>
                </SwipeableList>
              </ScrollView>
            )}
          </View>
        </View>
      </ScrollView>
    </NewsCategoryContext.Provider>
  );
}

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
});
