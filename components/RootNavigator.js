import React, { useState } from "react";
import { Image, View } from "react-native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { Appbar, Drawer } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  PlenumsStack,
  RepresentativesStack,
  ValiokuntaStack,
  SeminaariStack,
  TiedotusStack,
  EsittelyStack,
  EduRyhmatStack,
  LiveStack,
  NewsStack,
  VerkkolahetyksetStack
} from "./StackNavigators";
import Info from "../views/info";
import RssNewsFeed from "../views/RssNewsFeed";
import LogoDark from "../assets/logo/LogoDark.svg";
import Icon from "react-native-vector-icons/Ionicons";

const MainDrawer = createDrawerNavigator();

const DrawerView = ({ navigation }) => {
  const [showVerkkolahetykset, setShowVerkkolahetykset] = useState(false);

  const toggleVerkkolahetykset = () => {
    setShowVerkkolahetykset(!showVerkkolahetykset);
  };

  return (
    <SafeAreaView>
      <Drawer.Section title="Eduskuntatutka">
        <Drawer.Item
          icon={() => <Icon name="people" size={20} />}
          label="Kansanedustajat"
          onPress={() => navigation.navigate("RepresentativesStack")}
        />
        <Drawer.Item
          icon={() => <Icon name="information" size={20} />}
          label="Info"
          onPress={() => navigation.navigate("Info")}
        />
        <Drawer.Item
          icon={() => <Icon name="radio" size={20} />}
          label="Verkkolähetykset"
          onPress={() => navigation.navigate("VerkkolahetyksetStack")}
        />

      </Drawer.Section>


    </SafeAreaView>
  );
};

const MainHeader = ({ navigation }) => {
  return (
    <Appbar.Header style={{ height: 75 }}>
      <Appbar.Action icon="menu" onPress={() => navigation.toggleDrawer()} />
      <Appbar.Content title="Eduskuntatutka" />
      <LogoDark width={60} height={60} />
    </Appbar.Header>
  );
};

export default RootNavigator = () => {
  return (
    <MainDrawer.Navigator
      drawerContent={({ navigation }) => <DrawerView navigation={navigation} />}
    >
      <MainDrawer.Screen
        name="NewsStack"
        component={NewsStack}
        options={{
          header: ({ navigation }) => <MainHeader navigation={navigation} />,
        }}
      />
      <MainDrawer.Screen
        name="VerkkolahetyksetStack"
        component={VerkkolahetyksetStack}
        options={{
          header: ({ navigation }) => <MainHeader navigation={navigation} />,
        }}
      />
      <MainDrawer.Screen
        name="LiveStack"
        component={LiveStack}
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
        name="ValiokuntaStack"
        component={ValiokuntaStack}
        options={{
          header: ({ navigation }) => <MainHeader navigation={navigation} />,
        }}
      />
      <MainDrawer.Screen
        name="SeminaariStack"
        component={SeminaariStack}
        options={{
          header: ({ navigation }) => <MainHeader navigation={navigation} />,
        }}
      />
      <MainDrawer.Screen
        name="TiedotusStack"
        component={TiedotusStack}
        options={{
          header: ({ navigation }) => <MainHeader navigation={navigation} />,
        }}
      />
      <MainDrawer.Screen
        name="EsittelyStack"
        component={EsittelyStack}
        options={{
          header: ({ navigation }) => <MainHeader navigation={navigation} />,
        }}
      />
      <MainDrawer.Screen
        name="EduRyhmatStack"
        component={EduRyhmatStack}
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
