import { StyleSheet } from 'react-native';

export default styles = StyleSheet.create({
  
  // News.js & NewsFeed.js
  
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
  newsLeft: {
    flex: 0.2,
    paddingTop: 10,
    paddingBottom: 10,
  },
  newsRight: {
    flex: 0.8,
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
    marginTop: 20,
  },
  buttonText: {
    fontWeight: "bold",
    fontSize: 15,
  },

  // NewsTags.js

  tag: {
    backgroundColor: "#f2f2f2",
    padding: 10,
    marginHorizontal: 5,
  },
  activeTag: {
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