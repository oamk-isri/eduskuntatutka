import { createStackNavigator } from "@react-navigation/stack";
import Header from "./Header";
import representatives from "../../views/representatives";
import representative from "../../views/representative";
import plenumList from "../../views/plenumList";
import PlenumDetails from "../../views/plenum";
import valiokunta from "../../views/valiokunta";
import valiokuntaList from "../../views/valiokuntaList";
import seminaari from "../../views/seminaari";
import seminaaritList from "../../views/seminaaritList";
import tiedotus from "../../views/tiedotus";
import tiedotusList from "../../views/tiedotusList";
import esittely from "../../views/esittely";
import esittelyList from "../../views/esittelyList";
import eduryhmat from "../../views/eduryhmat";
import eduryhmatList from "../../views/eduryhmatList";
import live from "../../views/live";
import liveList from "../../views/liveList";
import verkkolahetykset from "../../views/verkkolahetykset";
import WebViewUI from "../../views/WebViewUI";
import MainView from "../../views/MainView";
import MainViewLive from "../../views/MainViewLive";
import lahetysHaku from "../../views/lahetysHaku";
import NewsFeed from "../newsfeed/NewsFeed";
import News from "../newsfeed/News";

const Stack = createStackNavigator();

const PlenumsStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Täysistunnot"
        component={plenumList}
        options={{
          header: ({ navigation }) => (
            <Header navigation={navigation} title="Täysistunnot" />
          ),
        }}
      />
      <Stack.Screen
        name="PlenumDetails"
        component={PlenumDetails}
        options={{
          header: ({ navigation }) => (
            <Header navigation={navigation} title="Täysistunto" />
          ),
        }}
      />
    </Stack.Navigator>
  );
};

const RepresentativesStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Kansanedustajat"
        component={representatives}
        options={{
          header: ({ navigation }) => (
            <Header navigation={navigation} title="Kansanedustajat" />
          ),
        }}
      />
      <Stack.Screen
        name="Kansanedustaja"
        component={representative}
        options={{
          header: ({ navigation }) => (
            <Header navigation={navigation} title="Kansanedustaja" />
          ),
        }}
      />
    </Stack.Navigator>
  );
};

const ValiokuntaStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Valiokuntien julkiset kuulemiset ja avoimet kokoukset"
        component={valiokuntaList}
        options={{
          header: ({ navigation }) => (
            <Header navigation={navigation} title="Valiokuntien kuulemiset" />
          ),
        }}
      />
      <Stack.Screen
        name="Valiokunta"
        component={valiokunta}
        options={{
          header: ({ navigation }) => (
            <Header navigation={navigation} title="Valiokunta" />
          ),
        }}
      />
    </Stack.Navigator>
  );
};

const SeminaariStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Seminaarit"
        component={seminaaritList}
        options={{
          header: ({ navigation }) => (
            <Header navigation={navigation} title="Seminaarit" />
          ),
        }}
      />
      <Stack.Screen
        name="Seminaari"
        component={seminaari}
        options={{
          header: ({ navigation }) => (
            <Header navigation={navigation} title="Seminaari" />
          ),
        }}
      />
    </Stack.Navigator>
  );
};

const TiedotusStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Tiedotustilaisuudet"
        component={tiedotusList}
        options={{
          header: ({ navigation }) => (
            <Header navigation={navigation} title="Tiedotustilaisuudet" />
          ),
        }}
      />
      <Stack.Screen
        name="Tiedotustilaisuus"
        component={tiedotus}
        options={{
          header: ({ navigation }) => (
            <Header navigation={navigation} title="Tiedotustilaisuus" />
          ),
        }}
      />
    </Stack.Navigator>
  );
};

const EsittelyStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Esittelyvideot"
        component={esittelyList}
        options={{
          header: ({ navigation }) => (
            <Header navigation={navigation} title="Esittelyvideot" />
          ),
        }}
      />
      <Stack.Screen
        name="Esittelyvideo"
        component={esittely}
        options={{
          header: ({ navigation }) => (
            <Header navigation={navigation} title="Esittelyvideo" />
          ),
        }}
      />
    </Stack.Navigator>
  );
};

const EduRyhmatStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Eduskuntaryhmät"
        component={eduryhmatList}
        options={{
          header: ({ navigation }) => (
            <Header navigation={navigation} title="Eduskuntaryhmät" />
          ),
        }}
      />
      <Stack.Screen
        name="Eduskuntaryhmä"
        component={eduryhmat}
        options={{
          header: ({ navigation }) => (
            <Header navigation={navigation} title="Eduskuntaryhmä" />
          ),
        }}
      />
    </Stack.Navigator>
  );
};

const LiveStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Suorat lähetykset"
        component={liveList}
        options={{
          header: ({ navigation }) => (
            <Header navigation={navigation} title="Suorat lähetykset" />
          ),
        }}
      />
      <Stack.Screen
        name="Suora lähetys"
        component={live}
        options={{
          header: ({ navigation }) => (
            <Header navigation={navigation} title="Suora lähetys" />
          ),
        }}
      />
    </Stack.Navigator>
  );
};

const NewsStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="MainView"
        component={MainView}
        options={{
          header: ({ navigation }) => (
            <Header
              navigation={navigation}
              title="Eduskuntatutka"
              isBack={false}
            />
          ),
        }}
      />
      <Stack.Screen
        name="NewsFeed"
        component={NewsFeed}
        options={{
          header: ({ navigation }) => (
            <Header navigation={navigation} title="Syötteet" />
          ),
        }}
      />
      <Stack.Screen
        name="News"
        component={News}
        options={({ route }) => ({
          header: ({ navigation }) => (
            <Header navigation={navigation} title={route.params.title} />
          ),
        })}
      />
      <Stack.Screen
        name="WebViewUI"
        component={WebViewUI}
        options={{
          header: ({ navigation }) => (
            <Header navigation={navigation} title="Verkkonäkymä" />
          ),
        }}
      />
      <Stack.Screen name="MainViewLive" component={MainViewLive} />
      <Stack.Screen
        name="PlenumDetails"
        component={PlenumDetails}
        options={{
          header: ({ navigation }) => (
            <Header navigation={navigation} title="Täysistunto" />
          ),
        }}
      />
      <Stack.Screen
        name="Suora lähetys"
        component={live}
        options={{
          header: ({ navigation }) => (
            <Header navigation={navigation} title="Suora lähetys" />
          ),
        }}
      />
    </Stack.Navigator>
  );
};

const VerkkolahetyksetStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Verkkolähetykset"
        component={verkkolahetykset}
        options={{
          header: ({ navigation }) => (
            <Header navigation={navigation} title="Verkkolähetykset" />
          ),
        }}
      />
      <Stack.Screen
        name="Verkkolähetysten haku"
        component={lahetysHaku}
        options={{
          header: ({ navigation }) => (
            <Header navigation={navigation} title="Verkkolähetysten haku" />
          ),
        }}
      />
      <Stack.Screen
        name="Suorat lähetykset"
        component={liveList}
        options={{
          header: ({ navigation }) => (
            <Header navigation={navigation} title="Suorat lähetykset" />
          ),
        }}
      />
      <Stack.Screen
        name="Suora lähetys"
        component={live}
        options={{
          header: ({ navigation }) => (
            <Header navigation={navigation} title="Suora lähetys" />
          ),
        }}
      />

      <Stack.Screen
        name="Täysistunnot"
        component={plenumList}
        options={{
          header: ({ navigation }) => (
            <Header navigation={navigation} title="Täysistunnot" />
          ),
        }}
      />
      <Stack.Screen
        name="PlenumDetails"
        component={PlenumDetails}
        options={{
          header: ({ navigation }) => (
            <Header navigation={navigation} title="Täysistunto" />
          ),
        }}
      />

      <Stack.Screen
        name="Valiokuntien julkiset kuulemiset ja avoimet kokoukset"
        component={valiokuntaList}
        options={{
          header: ({ navigation }) => (
            <Header navigation={navigation} title="Valiokunnan kuulemiset" />
          ),
        }}
      />
      <Stack.Screen
        name="Valiokunta"
        component={valiokunta}
        options={{
          header: ({ navigation }) => (
            <Header navigation={navigation} title="Valiokunta" />
          ),
        }}
      />
      <Stack.Screen
        name="Eduskuntaryhmät"
        component={eduryhmatList}
        options={{
          header: ({ navigation }) => (
            <Header navigation={navigation} title="Eduskuntaryhmät" />
          ),
        }}
      />
      <Stack.Screen
        name="Eduskuntaryhmä"
        component={eduryhmat}
        options={{
          header: ({ navigation }) => (
            <Header navigation={navigation} title="Eduskuntaryhmä" />
          ),
        }}
      />

      <Stack.Screen
        name="Seminaarit"
        component={seminaaritList}
        options={{
          header: ({ navigation }) => (
            <Header navigation={navigation} title="Seminaarit" />
          ),
        }}
      />
      <Stack.Screen
        name="Seminaari"
        component={seminaari}
        options={{
          header: ({ navigation }) => (
            <Header navigation={navigation} title="Seminaari" />
          ),
        }}
      />
      <Stack.Screen
        name="Tiedotustilaisuudet"
        component={tiedotusList}
        options={{
          header: ({ navigation }) => (
            <Header navigation={navigation} title="Tiedotustilaisuudet" />
          ),
        }}
      />
      <Stack.Screen
        name="Tiedotustilaisuus"
        component={tiedotus}
        options={{
          header: ({ navigation }) => (
            <Header navigation={navigation} title="Tiedotustilaisuus" />
          ),
        }}
      />
      <Stack.Screen
        name="Esittelyvideot"
        component={esittelyList}
        options={{
          header: ({ navigation }) => (
            <Header navigation={navigation} title="Esittelyvideot" />
          ),
        }}
      />
      <Stack.Screen
        name="Esittelyvideo"
        component={esittely}
        options={{
          header: ({ navigation }) => (
            <Header navigation={navigation} title="Esittelyvideo" />
          ),
        }}
      />
    </Stack.Navigator>
  );
};

export {
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
};
