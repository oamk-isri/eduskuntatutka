import { StyleSheet } from 'react-native';

export default styles = StyleSheet.create({

  // Loading 

  loadingView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  
  loadingText: {
    marginTop: 10,
    fontWeight: "bold",
    fontSize: 20
  },

  // Broadcasts page

  listNavCard: {
    margin: 5,
    backgroundColor: "lavender"
  },

  listNavView: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  listNavText: {
    fontSize: 18,
    fontWeight: "bold",
    padding: 10,
    margin: 5,
  },

  listNavIcon: {
    paddingEnd: 15
  },

  listEventCard: {
    margin: 5
  },

  listEventView: {
    flexDirection: "row",
    alignItems: "center",
    paddingBottom: 10
  },

  listLiveIcon: {
    marginRight: 5
  },

  listEventTitle: {
    fontSize: 18,
    fontWeight: "bold",
    paddingTop: 10
  },

  listPrevText: {
    paddingBottom: 10
  },

  // List's

  liveIcon: {
    paddingLeft: 10,
    paddingRight: 5
  },

  flatPad: {
    paddingBottom: 5
  },

  noLives: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    fontSize: 18,
    fontWeight: "bold",
  },

  cardItemView: {
    flexDirection: "row",
    alignItems: "center"
  },

  listView: {
    flex: 1
  },


  // Event's

  eventScroll: {
    flex: 1
  },

  eventView: {
    flex: 1
  },

  webView: {
    height: 220,
    width: "100%",
  },

  eventView2: {
    paddingHorizontal: 10
  },

  eventTitle: {
    fontSize: 18,
    fontWeight: "bold",
    paddingBottom: 10,
    paddingTop: 10
  },

  eventDetails: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 10
  },

  eventDescript: {
    fontSize: 16,
    marginTop: 5,
  },

  // Plenum events

  recordLink: {
    fontSize: 16,
    fontWeight: "bold",
    textDecorationLine: "underline",
  },

  plenumContent: {
    marginLeft: 10
  },

  speakersView: {
    marginTop: 10
  },

  speakersText: {
    fontSize: 16,
    fontWeight: "bold",
  },

  speakerView2: {
    flexDirection: "row",
    marginTop: 5
  },

  speakersName: {
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 10
  },

  // Search

  searchMainView: {
    flex: 1
  },

  searchOptView: {
    margin: 10
  },

  searchTitle: {
    fontWeight: "bold",
    paddingBottom: 10,
    fontSize: 18
  },

  searchView: {
    flexDirection: "column",
    flexWrap: "wrap",
    marginBottom: 10
  },

  searchCateg: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 8,
    borderBottomWidth: 1,
    borderBottomColor: "lightgrey"
  },

  searchView2: {
    flexDirection: "row",
    alignItems: "center"
  },

  searchView3: {
    height: 24,
    width: 24,
    borderRadius: 5,
    borderWidth: 1,
    marginRight: 5,
    justifyContent: "center",
    alignItems: "center",
  },

  checkboxView: {
    height: 24,
    width: 24,
    borderRadius: 5,
    borderWidth: 1,
    marginRight: 5,
    justifyContent: "center",
    alignItems: "center",
  },

  selected: {
    borderColor: "#000000",
  },

  unselected: {
    borderColor: "#CCCCCC",
  },

  dateView: {
    marginBottom: 10
  },

  dateView2: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 5
  },

  pickerTouch: {
    flex: 1
  },

  dateTextInput: {
    flex: 1,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginRight: 5,
    textAlign: "center",
    borderRadius: 10
  },

  searchArrow: {
    marginRight: 5
  },

  searchButton: {
    backgroundColor: "lavender",
    margin: 5,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    elevation: 3,
    flexDirection: "row",
  },

  searchButtonText: {
    fontSize: 18,
    fontWeight: "bold",
    padding: 5
  },

  searchButtonIcon: {
    paddingEnd: 15
  },

  hideButton: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "lavender",
    margin: 5,
    borderRadius: 10,
    elevation: 3,
    flexDirection: "row"
  },

  hideButtonText: {
    fontSize: 18,
    fontWeight: "bold",
    padding: 5
  },

  noResults: {
    textAlign: 'center',
    marginTop: 10,
    fontWeight: 'bold'
  },

  searchBottomView: {
    marginBottom: 80
  }

});