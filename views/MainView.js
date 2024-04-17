import { ScrollView } from "react-native";
import MainViewLive from "./MainViewLive";
import RssNewsFeed from "./RssNewsFeed";
import LiveList from "./liveList";
import Votes from "./Votes";

const MainView = ({ navigation }) => {
  return (
    <>
      <ScrollView>
        <RssNewsFeed navigation={navigation} />
        <MainViewLive navigation={navigation} />
        <Votes />
      </ScrollView>
    </>
  );
};

export default MainView;
