import React, { useState } from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { Divider, Drawer } from "react-native-paper";
import { Image, StyleSheet, Text } from "react-native";
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
  TietoaEduskunnastaStack,
  InfoStack,
} from "./StackNavigators";
import Icon from "react-native-vector-icons/Ionicons";
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome6";

const MainDrawer = createDrawerNavigator();

const DrawerView = ({ navigation }) => {
  const [showVerkkolahetykset, setShowVerkkolahetykset] = useState(false);

  const toggleVerkkolahetykset = () => {
    setShowVerkkolahetykset(!showVerkkolahetykset);
  };

  return (
    <SafeAreaView>
      <>
        <Image
          source={require("../../assets/icon_dark.png")}
          style={styles.image}
        />
        <Text style={styles.title}>Eduskuntatutka</Text>
      </>
      <Drawer.Section />
      <Drawer.Section>
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
          icon={() => <Icon name="radio" size={20} />}
          label="Verkkolähetykset"
          onPress={() => navigation.navigate("VerkkolahetyksetStack")}
        />
        <Drawer.Item
          icon={() => <FontAwesomeIcon name="building-columns" size={20} />}
          label="Tietoa eduskunnasta"
          onPress={() => navigation.navigate("TietoaEduskunnastaStack")}
        />
        <Drawer.Item
          icon={() => <Icon name="information" size={20} />}
          label="Info"
          onPress={() => navigation.navigate("InfoStack")}
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
        drawerPosition: "right",
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
      <MainDrawer.Screen name="InfoStack" component={InfoStack} />
      <MainDrawer.Screen
        name="TietoaEduskunnastaStack"
        component={TietoaEduskunnastaStack}
      />
    </MainDrawer.Navigator>
  );
};

const styles = StyleSheet.create({
  image: {
    height: 100,
    width: 100,
    alignSelf: "center",
    marginTop: 15,
  },
  title: {
    fontSize: 25,
    alignSelf: "center",
    marginTop: 10,
    marginBottom: 15,
  },
});
