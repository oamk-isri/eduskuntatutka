import MainViewLive from "./MainViewLive";
import RssNewsFeed from "./RssNewsFeed";

const MainView = () => {
  return (
    <>
      <RssNewsFeed />
      <MainViewLive />
    </>
  );
};

export default MainView;
