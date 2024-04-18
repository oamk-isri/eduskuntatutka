import { TouchableOpacity } from "react-native";
import { Text, Card } from "react-native-paper";
import Heading from "../elements/Heading";

export default UpcomingEvents = ({ events, handlePressEvent }) => {
  return (
    <>
      <Heading size="h3" style={{ paddingBottom: 20 }}>
        Tulevat lähetykset
      </Heading>
      {events.map((event) => (
        <TouchableOpacity
          key={event._id}
          onPress={() => handlePressEvent(event)}
        >
          <Card style={{ margin: 5 }}>
            <Card.Cover
              source={{
                uri: `https://eduskunta.videosync.fi${event.previewImg}`,
              }}
            />
            <Card.Content>
              <Text
                style={{ fontSize: 18, fontWeight: "bold", paddingTop: 10 }}
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
