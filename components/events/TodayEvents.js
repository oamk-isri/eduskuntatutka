import { TouchableOpacity, View } from "react-native";
import { Text, Card } from "react-native-paper";
import Heading from "../elements/Heading";
import styles from "../../styles/components/events";

export default TodayEvents = ({ events, handlePressEvent }) => {
  return (
    <>
    <Card style={styles.listNavCard}>
    <View style={styles.cardItemView}>
      <Text style={styles.listNavText}>
        Lähetykset tänään
      </Text>
      </View>
      </Card>
      {events.map((event) => (
        <TouchableOpacity
          key={event._id}
          onPress={() => handlePressEvent(event)}
        >
          <Card style={styles.preview}>
            <Card.Cover
              source={{
                uri: `https://eduskunta.videosync.fi${event.previewImg}`,
              }}
            />
            <Card.Content>
              <Text
                style={styles.previewTitle}
              >
                {event.title.split("|")[0].trim()}
              </Text>
            </Card.Content>
          </Card>
        </TouchableOpacity>
      ))}
    </>
  );
};
