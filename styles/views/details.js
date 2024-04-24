import { StyleSheet } from 'react-native';

export default styles = StyleSheet.create({

  // Info.js

  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
  },
  title: {
    flex: 1,
    fontSize: 24,
    fontWeight: "bold",
  },
  dropdownIcon: {
    fontSize: 20,
  },
  infoContainer: {
    marginHorizontal: 20,
  },
  text: {
    fontSize: 18,
    paddingVertical: 15,
  },
  author: {
    fontSize: 18,
    padding: 15,
  },
  channelItem: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    marginTop: 8,
    marginLeft: 10,
  },
  channelText: {
    fontSize: 16,
    margin: 5,
  },
});