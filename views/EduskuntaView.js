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
    <Text style={{fontSize: 18, margin: 10}}> 
      Suomen eduskunta on maamme lainsäädäntöelin, joka vastaa Suomen yhteiskunnan päätöksenteosta.
      Se koostuu 200 kansanedustajasta, jotka valitaan neljän vuoden välein vaaleilla.
    </Text> 

    <Text style={{fontSize: 18, margin: 10}}> 
      Eduskunta käsittelee lakeja ja säätää niitä, hyväksyy valtion budjetin ja valvoo hallituksen toimintaa.
    </Text>

    <Text style={{fontSize: 18, margin: 10}}> 
      Eduskunta on keskeinen osa Suomen demokraattista järjestelmää, ja vastaa kansalaisten äänen kuulumisesta päätöksenteossa.
    </Text> 
      
  </View>
);

const ToimintaScreen = () => (
  <View>
    <Text style={{ fontSize: 24, padding: 10 }}>Toiminta</Text>
    <Image 
      source={require('../images/eduskunta1.png')} // toinen kuva tähän
      style={{ width: '100%', height: 150 }} 
      resizeMode="stretch"
    /> 
    <Text style={{fontSize: 18, margin: 10}}>
      Eduskunta kokoontuu täysistuntoihin, joissa käsitellään lakiesityksiä, tehdään päätöksiä ja keskustellaan ajankohtaisista aiheista.
    </Text>
    <Text style={{fontSize: 18, margin: 10}}>
      Lisäksi eduskunnassa toimii erilaisia valiokuntia, jotka valmistelevat lainsäädäntöä ja käsittelevät erityiskysymyksiä. 
      Eduskunnan jäsenet osallistuvat myös erilaisiin kansainvälisiin tehtäviin ja vierailuihin
    </Text>
  </View>
);

const EduskuntaryhmatScreen = () => (
  <View>
    <Text style={{ fontSize: 24, padding: 10 }}>Eduskuntaryhmät</Text> 
    <Image 
      source={require('../images/eduskunta1.png')} // toinen kuva tähän
      style={{ width: '100%', height: 150 }} 
      resizeMode="stretch"
    />
    <Text style={{fontSize: 18, margin: 10}}>
      Eduskuntaryhmät ovat poliittisia ryhmiä, jotka koostuvat eduskunnan jäsenistä saman puolueen tai poliittisen liikkeen taustalta.
      Ne toimivat yhteistyössä ja edustavat yhteisiä poliittisia tavoitteita eduskunnassa.
    </Text>
    <Text style={{fontSize: 18, margin: 10}}>
      Eduskuntaryhmät vaikuttavat lainsäädäntötyöhön, tekevät yhteisiä päätöksiä ja valitset omat johtajansa. Niiden kautta edustajat
      voivat yhdessä ajaa omia näkemyksiään ja vaikuttaa päätöksentekoon.
    </Text> 
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
