import { Appbar } from "react-native-paper";
import LogoDark from "../../assets/logo/LogoDark.svg";

export default Header = ({ navigation, title, isBack = true }) => {
  return (
    <Appbar.Header style={{ height: 75 }}>
      {isBack ? (
        <Appbar.Action icon="arrow-left" onPress={() => navigation.goBack()} />
      ) : (
        <LogoDark style={{height: 50, width: 35, margin: 8}}/>
      )}

      <Appbar.Content title={title} />
      <Appbar.Action icon="menu" onPress={() => navigation.toggleDrawer()} />
    </Appbar.Header>
  );
};
