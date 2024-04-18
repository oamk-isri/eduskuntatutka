import { Appbar } from "react-native-paper";
import LogoDark from "../../assets/logo/LogoDark.svg";

export default Header = ({ navigation, title, isBack = true }) => {
  return (
    <Appbar.Header style={{ height: 75 }}>
      <Appbar.Action icon="menu" onPress={() => navigation.toggleDrawer()} />
      {isBack ? (
        <Appbar.Action icon="arrow-left" onPress={() => navigation.goBack()} />
      ) : (
        <></>
      )}

      <Appbar.Content title={title} />
      <LogoDark width={60} height={60} />
    </Appbar.Header>
  );
};
