import { ScrollView } from "react-native";
import Votes from "./Votes";
import NewsFeed from "../components/newsfeed/NewsFeed";
import Events from "../components/events/Events";

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
