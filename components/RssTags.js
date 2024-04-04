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
        <Text
          style={[
            styles.tagText,
            selectedCategory === categoryIndex && styles.activeTagText,
          ]}
        >
          {categoryName}
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  tag: {
    backgroundColor: "#f2f2f2",
    padding: 10,
    marginHorizontal: 5,
    // borderRadius: 5,
  },
  activeTag: {
    // backgroundColor: "#e0e0e0",
    borderBottomWidth: 3,
    borderColor: "#114d9d",
  },
  activeTagText: {
    color: "#114d9d",
    fontSize: 14,
    fontWeight: "500",
  },
  tagText: {
    fontSize: 14,
    fontWeight: "500",
  },
});
