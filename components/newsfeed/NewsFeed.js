import { useEffect, useRef, useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { ActivityIndicator, Divider, Card } from "react-native-paper";
import { FlatList, ScrollView } from "react-native-gesture-handler";
import FinnishDate from "../parsers/FinnishDate";
import Xml from "../parsers/Xml";
import Heading from "../elements/Heading";
import SwipeableList from "../elements/SwipeableList";
import NewsTags from "./NewsTags";
import { RssFeeds } from "../../constants/RssFeeds";
import { NewsCategoryContext } from "../../contexts/Contexts";
import styles from "../../styles/components/newsfeed";

export default NewsFeed = ({ navigation }) => {
  const { getData, data, isLoading, error } = Xml();
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
    if (link && link !== "no-new-items") {
      navigation.navigate("Browser", { uri: link });
    }
  };

  const handleShowAll = (catIndex, title) => {
    navigation.navigate("News", { catIndex, title });
  };

  const NewsItem = ({ item }) => (
    <TouchableOpacity onPress={() => handlePress(item?.link)}>
      <View style={styles.newsContainer}>
        <View style={styles.newsLeft}>
          <FinnishDate dateString={item?.pubDate} />
        </View>
        <View style={styles.newsRight}>
          {item?.title.length > 40 || !item?.description.length ? (
            <Text style={styles.title}>{item?.title}</Text>
          ) : (
            <Text style={styles.title}>{item?.description}</Text>
          )}
          <Divider />
        </View>
      </View>
    </TouchableOpacity>
  );

  const sortedData = data?.sort(
    (a, b) => new Date(b.pubDate) - new Date(a.pubDate)
  );

  const newsList = sortedData
    .slice(0, 5)
    .map((item) => <NewsItem key={item?.link} item={item} />);

  return (
    <NewsCategoryContext.Provider
      value={{ selectedCategory, setSelectedCategory }}
    >
      <ScrollView>
      <Card style={styles.listNavCard}>
        <View style={styles.headingContainer}>
        <Text style={styles.listNavText}>Uutisvirta</Text>
          <TouchableOpacity
            onPress={() =>
              handleShowAll(
                selectedCategory,
                RssFeeds[selectedCategory].categoryName
              )
            }
            hitSlop={{ top: 25, bottom: 25, left: 15, right: 15 }}
            style={styles.buttonRight}
          >
            <Text style={styles.buttonText}>Näytä kaikki {">"}</Text>
          </TouchableOpacity>
        </View>
        </Card>

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
              <NewsTags
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
            ) : data?.length > 0 ? (
              <ScrollView onContentSizeChange={onContentSizeChange}>
                <SwipeableList>
                  <View>{newsList}</View>
                </SwipeableList>
              </ScrollView>
            ) : (
              <Text>No data</Text>
            )}
          </View>
        </View>
      </ScrollView>
    </NewsCategoryContext.Provider>
  );
};
