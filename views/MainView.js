import { ScrollView } from "react-native";
import NewsFeed from "../components/newsfeed/NewsFeed";
import Events from "../components/events/Events";
import Votes from "../components/elements/Votes";

const MainView = ({ navigation }) => {
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

export default MainView;
