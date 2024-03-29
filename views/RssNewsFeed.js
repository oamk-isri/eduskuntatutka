import { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList, ScrollView } from "react-native";
import { ActivityIndicator, Divider } from "react-native-paper";
import RssTags from "../components/RssTags";
import { RssFeeds } from "../constants/RssFeeds";
import { NewsCategoryContext } from "../contexts/Contexts";
import { GetRssFeed } from "../components/GetRssFeed";

export default function RssNewsFeed() {
  const { getData, data, isLoading, error } = GetRssFeed();
  const [selectedCategory, setSelectedCategory] = useState(0);

  useEffect(() => {
    async function fetchData() {
      await getData(RssFeeds[selectedCategory].url);
    }
    fetchData();
  }, [selectedCategory]);

  return (
    <NewsCategoryContext.Provider
      value={{ selectedCategory, setSelectedCategory }}
    >
      <View>
        <View style={styles.tagContainer}>
          <ScrollView horizontal>
            <RssTags categoryIndex={0} categoryName="Valtiopäiväasiat" />
            <RssTags categoryIndex={1} categoryName="Täysistunnot" />
            <RssTags categoryIndex={2} categoryName="Hallituksen esitykset" />
            <RssTags categoryIndex={3} categoryName="Mietinnöt" />
            <RssTags categoryIndex={4} categoryName="Vastaukset" />
            <RssTags categoryIndex={5} categoryName="Kirjelmät" />
            <RssTags categoryIndex={6} categoryName="Kysymykset" />
            <RssTags categoryIndex={7} categoryName="Eduskunnan tiedotteet" />
            <RssTags categoryIndex={8} categoryName="Valiokuntien tiedotteet" />
            <RssTags categoryIndex={9} categoryName="Kansalaisinfo" />
            <RssTags categoryIndex={10} categoryName="Kirjaston tiedotteet" />
            <RssTags categoryIndex={11} categoryName="Kirjasto suosittelee" />
            <RssTags categoryIndex={12} categoryName="Lainssädäntöhankkeet" />
          </ScrollView>
        </View>
        <View>
          {isLoading ? (
            <ActivityIndicator color="red" />
          ) : (
            <FlatList
              data={data.slice(0, 5)}
              maxToRenderPerBatch={5}
              renderItem={({ item }) => (
                <View>
                  <View style={styles.newsContainer}>
                    <Text style={styles.title}>{item.title}</Text>
                    <Text style={styles.date}>{item.pubDate}</Text>
                    <Text style={styles.date}>{item.description}</Text>
                  </View>
                  <Divider my={2} bg="#e0e0e0" />
                </View>
              )}
              keyExtractor={(item) => item.link}
            />
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
});
