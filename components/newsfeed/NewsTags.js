import { useContext } from "react";
import { View, Text, Pressable } from "react-native";
import { NewsCategoryContext } from "../../contexts/Contexts";
import styles from "../../styles/components/newsfeed"

export default NewsTags = ({ categoryIndex, categoryName }) => {
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
};