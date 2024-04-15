import React, { useState } from "react"
import { Text, List } from "react-native-paper"
import { StyleSheet, View } from "react-native";

export default Details = (props) => {

  const [expanded, setExpanded] = useState();
  const handlePress = () => setExpanded(!expanded);

  return (
    <View>
      <List.Accordion
        title={"Tietoja"}
        left={props => <List.Icon {...props} icon="account-question" />}
        expanded={expanded}
        onPress={handlePress}>
          <List.Item
          title={
          <View>
            <Text style={styles.title}>Kokonimi:</Text>
            <Text style={styles.content}>{props.data.EtunimetNimi} {props.data.SukuNimi}</Text>
          </View>}
          />
          <List.Item
          title={
          <View>
            <Text style={styles.title}>Syntymävuosi:</Text>
            <Text style={styles.content}>{props.data.SyntymaPvm}</Text>
          </View>}
          />
          <List.Item
          title={
          <View>
            <Text style={styles.title}>Eduskuntaryhmä:</Text>
            <Text style={styles.content}>{props.longParty}</Text>
          </View>}
          />
          <List.Item
          title={
          <View>
            <Text style={styles.title}>Kunta:</Text>
            <Text style={styles.content}>{props.data.NykyinenKotikunta}</Text>
          </View>}
          />
          <List.Item
          title={
          <View>
            <Text style={styles.title}>Ammatti:</Text>
            <Text style={styles.content}>{props.data.Ammatti}</Text>
          </View>}
          />
          <List.Item
          title={
          <View>
            <Text style={styles.title}>Sähköposti:</Text>
            <Text style={styles.content}>{props.data.SahkoPosti}</Text>
          </View>}
          />
      </List.Accordion>
    </View>
  )
}

const styles = StyleSheet.create({
  title: {
    fontWeight: "bold",
    paddingBottom: 4
  },
  content: {
    fontSize: 16
  }
});