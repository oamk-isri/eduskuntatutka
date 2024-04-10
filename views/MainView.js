import MainViewLive from "./MainViewLive";
import RssNewsFeed from "./RssNewsFeed";

const MainView = ({ navigation }) => {
  return (
    <>
      <RssNewsFeed navigation={navigation} />
      <MainViewLive navigation={navigation} />
    </>
  );
};

export default MainView;
