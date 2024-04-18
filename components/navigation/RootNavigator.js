import React, { useState } from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { Drawer } from "react-native-paper";
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
  VerkkolahetyksetStack,
} from "./StackNavigators";
import Icon from "react-native-vector-icons/Ionicons";
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome6";
import Info from "../../views/info/Info";
import Parliament from "../../views/parliament/Parliament";

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
          icon={() => <Icon name="home" size={20} />}
          label="Koti"
          onPress={() => navigation.navigate("NewsStack")}
        />
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
        <Drawer.Item
          icon={() => <FontAwesomeIcon name="building-columns" size={20} />}
          label="Tietoa eduskunnasta"
          onPress={() => navigation.navigate("EduskuntaNav")}
        />
      </Drawer.Section>
    </SafeAreaView>
  );
};

export default RootNavigator = () => {
  return (
    <MainDrawer.Navigator
      drawerContent={({ navigation }) => <DrawerView navigation={navigation} />}
      screenOptions={{
        headerShown: false,
      }}
    >
      <MainDrawer.Screen name="NewsStack" component={NewsStack} />
      <MainDrawer.Screen
        name="VerkkolahetyksetStack"
        component={VerkkolahetyksetStack}
      />
      <MainDrawer.Screen name="LiveStack" component={LiveStack} />
      <MainDrawer.Screen name="PlenumsStack" component={PlenumsStack} />
      <MainDrawer.Screen name="ValiokuntaStack" component={ValiokuntaStack} />
      <MainDrawer.Screen name="SeminaariStack" component={SeminaariStack} />
      <MainDrawer.Screen name="TiedotusStack" component={TiedotusStack} />
      <MainDrawer.Screen name="EsittelyStack" component={EsittelyStack} />
      <MainDrawer.Screen name="EduRyhmatStack" component={EduRyhmatStack} />
      <MainDrawer.Screen
        name="RepresentativesStack"
        component={RepresentativesStack}
      />
      <MainDrawer.Screen name="Info" component={Info} />
      <MainDrawer.Screen name="EduskuntaNav" component={Parliament} />
    </MainDrawer.Navigator>
  );
};
