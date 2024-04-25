import { Appbar } from "react-native-paper";
import LogoDark from "../../assets/logo/LogoDark.svg";
import styles from "../../styles/components/navigation";

export default Header = ({ navigation, title, isBack = true }) => {
  return (
    <Appbar.Header style={styles.header}>
      {isBack ? (
        <Appbar.Action icon="arrow-left" onPress={() => navigation.goBack()} />
      ) : (
        <LogoDark style={styles.logo} />
      )}

      <Appbar.Content title={title} titleStyle={styles.titleStyle} />
      <Appbar.Action icon="menu" onPress={() => navigation.toggleDrawer()} />
    </Appbar.Header>
  );
};
