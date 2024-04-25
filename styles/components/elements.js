import { StyleSheet } from 'react-native';

export default styles = StyleSheet.create({
  
  // DataOriginPopup.js

  modalBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  popupBackground: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    margin: 20,
    alignItems: 'center'
  },
  popupOriginContainer: {
    alignSelf: "flex-start",
  },
  popupOriginText: {
    textDecorationLine: "underline",
    marginTop: 10,
    fontWeight: "bold",
    fontSize: 18
  },
  popupButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 5,
  },
  pButton: {
    backgroundColor: "lavender",
    margin: 5,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    elevation: 3,
    flexDirection: "row",
    width: 100
  },

  buttonText: {
    fontSize: 18,
    fontWeight: "bold",
    padding: 5
  },
  infoText:{
    fontSize: 18
  },

  // Heading.js

  /* Component creates a style dynamically based
   * on input parameter, decoupling it to a
   * separate file doesn't make a lot of sense.
   */

  // Votes.js

  votesContainer: {
    paddingRight: 15,
    paddingLeft: 15,
  },
  heading: {
    paddingBottom: 20
  },
  votesBackground: {
    backgroundColor: "rgba(255, 525, 255, 0.8)",
    marginBottom: 15,
    padding: 10,
    shadowColor: "transparent",
  },
  votesTextContainer: {
    paddingTop: 5,
    flexDirection: "row",
  },
  votesTextLeft: {
    flex: 0.7,
    justifyContent: "center",
    alignItems: "flex-start",
  },
  votesTopic: {
    fontSize: 15,
    fontWeight: "600",
    paddingBottom: 5,
    marginRight: 10,
  },
  votesDateContainer: {
    flexDirection: "row",
  },
  votesDate: {
    fontSize: 14,
  },
  votesTextRight: {
    flex: 0.3,
    alignItems: "flex-end",
    justifyContent: "center",
  },
  
});