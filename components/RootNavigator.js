import React from "react";
import { Image } from "react-native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { Appbar, Drawer } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { PlenumsStack, RepresentativesStack } from "./StackNavigators";
import Info from "../views/info";
import RssNewsFeed from "../views/RssNewsFeed";

const MainDrawer = createDrawerNavigator();

const DrawerView = ({ navigation }) => {
  return (
    <SafeAreaView>
      <Drawer.Section title="Some title">
        <Drawer.Item
          label="Plenum List"
          onPress={() => navigation.navigate("PlenumsStack")}
        />
        <Drawer.Item
          label="Representatives"
          onPress={() => navigation.navigate("RepresentativesStack")}
        />
        <Drawer.Item label="Info" onPress={() => navigation.navigate("Info")} />
      </Drawer.Section>
    </SafeAreaView>
  );
};

const MainHeader = ({ navigation }) => {
  return (
    <Appbar.Header style={{ height: 75 }}>
      <Appbar.Action icon="menu" onPress={() => navigation.toggleDrawer()} />
      <Appbar.Content title="Eduskuntatutka" />
      <Image
        source={require("../images/tutkalogo.png")}
        style={{ width: 70, height: 70, marginEnd: 10 }}
      />
    </Appbar.Header>
  );
};

export default RootNavigator = () => {
  return (
    <MainDrawer.Navigator
      drawerContent={({ navigation }) => <DrawerView navigation={navigation} />}
    >
      <MainDrawer.Screen
        name="MainView"
        component={RssNewsFeed}
        options={{
          header: ({ navigation }) => <MainHeader navigation={navigation} />,
        }}
      />
      <MainDrawer.Screen
        name="PlenumsStack"
        component={PlenumsStack}
        options={{
          header: ({ navigation }) => <MainHeader navigation={navigation} />,
        }}
      />
      <MainDrawer.Screen
        name="RepresentativesStack"
        component={RepresentativesStack}
        options={{
          header: ({ navigation }) => <MainHeader navigation={navigation} />,
        }}
      />
      <MainDrawer.Screen
        name="Info"
        component={Info}
        options={{
          header: ({ navigation }) => <MainHeader navigation={navigation} />,
        }}
      />
    </MainDrawer.Navigator>
  );
};
