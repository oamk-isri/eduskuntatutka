import { ScrollView } from "react-native";
import NewsFeed from "../../components/newsfeed/NewsFeed";
import Events from "../../components/events/Events";
import Votes from "../../components/elements/Votes";

export default Main = ({ navigation }) => {
  return (
    <>
      <ScrollView>
        <NewsFeed navigation={navigation} />
        <Events navigation={navigation} />
        <Votes />
      </ScrollView>
    </>
  );
};
