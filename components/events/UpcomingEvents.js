import { TouchableOpacity } from "react-native";
import { Text, Card } from "react-native-paper";
import Heading from "../elements/Heading";
import styles from "../../styles/components/events";

export default UpcomingEvents = ({ events, handlePressEvent }) => {
  return (
    <>
      <Heading size="h3" style={styles.heading}>
        Tulevat lähetykset
      </Heading>
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
                {event.title.split("|")[0].trim().toLowerCase()}
              </Text>
            </Card.Content>
          </Card>
        </TouchableOpacity>
      ))}
    </>
  );
};
