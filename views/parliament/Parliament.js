import React from "react";
import { Image, Text, View, ScrollView } from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import styles from "../../styles/views/parliament"

const Tab = createMaterialTopTabNavigator();

const EduskuntaScreen = () => (
  <ScrollView>
    <View style={styles.container}>
      <Text style={styles.heading}>
        Suomen eduskunta
      </Text>
      <Image
        source={require("../../assets/images/EduskuntaTalo.jpg")}
        style={styles.imageParliament}
        resizeMode="stretch"
      />
      <Text style={styles.bodyText}>
        Suomen eduskunta on maamme lainsäädäntöelin, joka vastaa Suomen
        yhteiskunnan päätöksenteosta. Se koostuu 200 kansanedustajasta, jotka
        valitaan neljän vuoden välein vaaleilla.
      </Text>

      <Text style={styles.bodyText}>
        Eduskunta käsittelee lakeja ja säätää niitä, hyväksyy valtion budjetin
        ja valvoo hallituksen toimintaa.
      </Text>

      <Text style={styles.bodyText}>
        Eduskunta on keskeinen osa Suomen demokraattista järjestelmää, ja vastaa
        kansalaisten äänen kuulumisesta päätöksenteossa.
      </Text>
    </View>
  </ScrollView>
);

const ToimintaScreen = () => (
  <ScrollView>
    <View style={styles.container}>
      <Text style={styles.heading}>
        Toiminta
      </Text>
      <Image
        source={require("../../assets/images/Taysistunto.jpg")}
        style={styles.image}
        resizeMode="stretch"
      />
      <Text style={styles.bodyText}>
        Eduskunta kokoontuu täysistuntoihin, joissa käsitellään lakiesityksiä,
        tehdään päätöksiä ja keskustellaan ajankohtaisista aiheista.
      </Text>
      <Text style={styles.bodyText}>
        Eduskunta säätää uuden lain tai muuttaa vanhaa lakia hallituksen
        esityksestä tai kansanedustajan aloitteesta. Eduskunta on myös
        velvollinen ottamaan käsittelyyn kansalaisten tekemän
        lainsäädäntöaloitteen, mikäli vähintään 50 000 kansalaista kannattaa
        aloitetta.
      </Text>
      <Text style={styles.bodyText}>
        Lisäksi eduskunnassa toimii erilaisia valiokuntia, jotka valmistelevat
        lainsäädäntöä ja käsittelevät erityiskysymyksiä. Eduskunnan jäsenet
        osallistuvat myös erilaisiin kansainvälisiin tehtäviin ja vierailuihin.
      </Text>
      <Text style={styles.credits}>
        Kuva: Hanne Salonen / Eduskunta
      </Text>
    </View>
  </ScrollView>
);

const EduskuntaryhmatScreen = () => (
  <ScrollView>
    <View style={styles.container}>
      <Text style={styles.heading}>
        Eduskuntaryhmät
      </Text>
      <Image
        source={require("../../assets/images/EduskuntaRyhmat.jpg")}
        style={styles.image}
        resizeMode="stretch"
      />
      <Text style={styles.bodyText}>
        Eduskuntaryhmät ovat poliittisia ryhmiä, jotka koostuvat eduskunnan
        jäsenistä saman puolueen tai poliittisen liikkeen taustalta. Ne toimivat
        yhteistyössä ja edustavat yhteisiä poliittisia tavoitteita eduskunnassa.
      </Text>
      <Text style={styles.bodyText}>
        Eduskuntaryhmät vaikuttavat lainsäädäntötyöhön, tekevät yhteisiä
        päätöksiä ja valitsevat omat johtajansa. Niiden kautta edustajat voivat
        yhdessä ajaa omia näkemyksiään ja vaikuttaa päätöksentekoon.
      </Text>
      <Text style={styles.bodyText}>
        Eduskuntaryhmät jakautuvat hallituksessa ja oppositiossa oleviin ryhmiin.
        Hallitusryhmät tukevat hallituksen lakiesityksiä mutta esittävät niihin
        usein muutoksia valiokunnissa. Hallitus- ja oppositioryhmien
        kansanedustajat osallistuvat yhdessä valiokuntatyöhön.
      </Text>
      <Text style={styles.bodyText}>
        Oppositioryhmillä on tärkeä rooli demokratiassa: ne arvostelevat
        hallituksen toimintaa, esittävät vaihtoehtoja ja vaativat ministereitä
        perustelemaan hallituksen tekemiä ratkaisuja.
      </Text>
      <Text style={styles.credits}>
        Kuva: Hanne Salonen / Eduskunta
      </Text>
    </View>
  </ScrollView>
);

export default Parliament = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarLabelStyle: {
          fontSize: 14,
          fontWeight: "bold",
          textTransform: "none",
          width: 125,
        },
      }}
    >
      <Tab.Screen name="Eduskunta" component={EduskuntaScreen} />
      <Tab.Screen name="Toiminta" component={ToimintaScreen} />
      <Tab.Screen name="Eduskuntaryhmät" component={EduskuntaryhmatScreen} />
    </Tab.Navigator>
  );
};
