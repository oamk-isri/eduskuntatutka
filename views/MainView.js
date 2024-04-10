import { ScrollView } from "react-native";
import MainViewLive from "./MainViewLive";
import RssNewsFeed from "./RssNewsFeed";
import LiveList from "./liveList";

const MainView = ({ navigation }) => {
  return (
    <>
      <ScrollView>
        <RssNewsFeed navigation={navigation} />
        <MainViewLive navigation={navigation} />
      </ScrollView>
    </>
  );
};

export default MainView;
