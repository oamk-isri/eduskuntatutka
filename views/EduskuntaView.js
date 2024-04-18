import React from "react";
import { Image, Text, View, ScrollView } from "react-native";
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

const Tab = createMaterialTopTabNavigator();

const EduskuntaScreen = () => (
  <ScrollView>
    <View style={{ paddingHorizontal: 10 }}>
      <Text style={{ fontSize: 24, paddingVertical: 10, marginTop: 5 }}>Suomen eduskunta</Text>
      <Image 
        source={require('../images/eduskunta1.png')}
        style={{ width: '100%', height: 150, marginVertical: 10, marginTop: 5 }}
        resizeMode="stretch"
      /> 
      <Text style={{fontSize: 18}}>
        Suomen eduskunta on maamme lainsäädäntöelin, joka vastaa Suomen yhteiskunnan päätöksenteosta.
        Se koostuu 200 kansanedustajasta, jotka valitaan neljän vuoden välein vaaleilla.
      </Text> 

      <Text style={{fontSize: 18, marginVertical: 10}}> 
        Eduskunta käsittelee lakeja ja säätää niitä, hyväksyy valtion budjetin ja valvoo hallituksen toimintaa.
      </Text>

      <Text style={{fontSize: 18, marginVertical: 10}}> 
        Eduskunta on keskeinen osa Suomen demokraattista järjestelmää, ja vastaa kansalaisten äänen kuulumisesta päätöksenteossa.
      </Text> 
    </View>
  </ScrollView>
);

const ToimintaScreen = () => (
  <ScrollView>
    <View style={{ paddingHorizontal: 10 }}>
      <Text style={{ fontSize: 24, paddingVertical: 10 }}>Toiminta</Text>
      <Image 
        source={require('../images/täysistunto.jpg')}
        style={{ width: '100%', height: 200, marginVertical: 10, marginTop: 5 }} 
        resizeMode="stretch"
      /> 
      <Text style={{fontSize: 18}}>
        Eduskunta kokoontuu täysistuntoihin, joissa käsitellään lakiesityksiä, tehdään päätöksiä ja keskustellaan ajankohtaisista aiheista.
      </Text>
      <Text style={{fontSize: 18, marginVertical: 10}}>
        Eduskunta säätää uuden lain tai muuttaa vanhaa lakia hallituksen esityksestä tai kansanedustajan aloitteesta.
        Eduskunta on myös velvollinen ottamaan käsittelyyn kansalaisten tekemän lainsäädäntöaloitteen, mikäli vähintään 50 000
        kansalaista kannattaa aloitetta.
      </Text>
      <Text style={{fontSize: 18, marginVertical: 10, paddingBottom: 50}}>
        Lisäksi eduskunnassa toimii erilaisia valiokuntia, jotka valmistelevat lainsäädäntöä ja käsittelevät erityiskysymyksiä. 
        Eduskunnan jäsenet osallistuvat myös erilaisiin kansainvälisiin tehtäviin ja vierailuihin.
      </Text>
    </View>
  </ScrollView>
);

const EduskuntaryhmatScreen = () => (
  <ScrollView>
    <View style={{ paddingHorizontal: 10 }}>
      <Text style={{ fontSize: 24, paddingVertical: 10 }}>Eduskuntaryhmät</Text> 
      <Image 
        source={require('../images/eduskuntaryhmät.jpg')}
        style={{ width: '100%', height: 200, marginVertical: 10, marginTop: 5 }} 
        resizeMode="stretch"
      />
      <Text style={{fontSize: 18}}>
        Eduskuntaryhmät ovat poliittisia ryhmiä, jotka koostuvat eduskunnan jäsenistä saman puolueen tai poliittisen liikkeen taustalta.
        Ne toimivat yhteistyössä ja edustavat yhteisiä poliittisia tavoitteita eduskunnassa.
      </Text>
      <Text style={{fontSize: 18, marginVertical: 10}}>
        Eduskuntaryhmät vaikuttavat lainsäädäntötyöhön, tekevät yhteisiä päätöksiä ja valitset omat johtajansa. Niiden kautta edustajat
        voivat yhdessä ajaa omia näkemyksiään ja vaikuttaa päätöksentekoon.
      </Text> 
      <Text style={{fontSize: 18, marginVertical: 10}}>
        Eduskuntaryhmät hallituksessa ja oppositiossa oleviin ryhmiin. Hallitusryhmät tukevat hallituksen lakiesityksiä mutta esittävät niihin usein
        muutoksia valiokunnissa. Hallitus- ja oppositioryhmien kansanedustajat osallistuvat yhdessä valiokuntatyöhön.
      </Text> 
      <Text style={{fontSize: 18, marginVertical: 10, paddingBottom: 50}}>
        Oppositioryhmillä on tärkeä rooloi demokratiassa: ne arvostelevat hallituksen toimintaa, esittävät vaihtoehtoja ja vaativat ministereitä
        perustelemaan hallituksen tekemiä ratkaisuja.
      </Text> 
    </View>
  </ScrollView>
);

const Eduskunta = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarLabelStyle: { fontSize: 14, fontWeight: 'bold', textTransform: "none", width: 125 },
      }} 
    >
      <Tab.Screen name="Eduskunta" component={EduskuntaScreen} />
      <Tab.Screen name="Toiminta" component={ToimintaScreen} />
      <Tab.Screen name="Eduskuntaryhmät" component={EduskuntaryhmatScreen} />
    </Tab.Navigator>
  );
};

export default Eduskunta;
