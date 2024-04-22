import { Appbar } from "react-native-paper";
import { Image } from "react-native";

export default Header = ({ navigation, title, isBack = true }) => {
  return (
    <Appbar.Header style={{ height: 75 }}>
      {isBack ? (
        <Appbar.Action icon="arrow-left" onPress={() => navigation.goBack()} />
      ) : (
        <Image
          source={require("../../assets/icon_dark.png")}
          style={{ width: 50, height: 50, marginEnd: 10 }}
        />
      )}

      <Appbar.Content title={title} />
      <Appbar.Action icon="menu" onPress={() => navigation.toggleDrawer()} />
    </Appbar.Header>
  );
};
