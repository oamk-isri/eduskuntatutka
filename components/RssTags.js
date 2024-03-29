import { useContext } from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { NewsCategoryContext } from "../contexts/Contexts";

export default function RssTags({ categoryIndex, categoryName }) {
  const { selectedCategory, setSelectedCategory } =
    useContext(NewsCategoryContext);

  return (
    <View>
      <Pressable
        style={[
          styles.tag,
          selectedCategory === categoryIndex && styles.activeTag,
        ]}
        onPress={() => setSelectedCategory(categoryIndex)}
      >
        <Text style={styles.tagText}>{categoryName}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
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
