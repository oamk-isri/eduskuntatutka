import { ScrollView } from "react-native";
import MainViewLive from "./MainViewLive";
import Votes from "./Votes";
import NewsFeed from "../components/newsfeed/NewsFeed";

const MainView = ({ navigation }) => {
  return (
    <>
      <ScrollView>
        <NewsFeed navigation={navigation} />
        <MainViewLive navigation={navigation} />
        <Votes />
      </ScrollView>
    </>
  );
};

export default MainView;
