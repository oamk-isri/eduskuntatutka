import React from "react";
import { Image, Text, View } from "react-native";
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

const Tab = createMaterialTopTabNavigator();

const EduskuntaScreen = () => (
  <View>
    <Text style={{ fontSize: 24, padding: 10 }}>Suomen eduskunta</Text>
    <Image 
      source={require('../images/eduskunta1.png')}
      style={{ width: '100%', height: 150 }}
      resizeMode="stretch"
    /> 
  </View>
);

const ToimintaScreen = () => (
  <View>
    <Text style={{ fontSize: 24, padding: 10 }}>Toiminta</Text>
  </View>
);

const EduskuntaryhmatScreen = () => (
  <View>
    <Text style={{ fontSize: 24, padding: 10 }}>Eduskuntaryhmät</Text> 
  </View>
);

const Eduskunta = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarLabelStyle: { fontSize: 14, fontWeight: 'bold',}, 
      }} 
    >
      <Tab.Screen name="Eduskunta" component={EduskuntaScreen} />
      <Tab.Screen name="Toiminta" component={ToimintaScreen} />
      <Tab.Screen name="Eduskuntaryhmät" component={EduskuntaryhmatScreen} />
    </Tab.Navigator>
  );
};

export default Eduskunta;
