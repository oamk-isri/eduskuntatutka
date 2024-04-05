import { createStackNavigator } from "@react-navigation/stack";
import representatives from "../views/representatives";
import representative from "../views/representative";
import plenumList from "../views/plenumList";
import PlenumDetails from "../views/plenum";
import valiokunta from "../views/valiokunta";
import valiokuntaList from "../views/valiokuntaList";
import seminaari from "../views/seminaari";
import seminaaritList from "../views/seminaaritList";
import tiedotus from "../views/tiedotus";
import tiedotusList from "../views/tiedotusList";
import esittely from "../views/esittely";
import esittelyList from "../views/esittelyList";
import eduryhmat from "../views/eduryhmat";
import eduryhmatList from "../views/eduryhmatList";
import live from "../views/live";
import liveList from "../views/liveList";
import RssNewsFeed from "../views/RssNewsFeed";
import WebViewUI from "../views/WebViewUI";

const Stack = createStackNavigator();

const PlenumsStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Täysistunnot" component={plenumList} />
      <Stack.Screen name="PlenumDetails" component={PlenumDetails} />
    </Stack.Navigator>
  );
};

const RepresentativesStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Kansanedustajat" component={representatives} />
      <Stack.Screen name="Kansanedustaja" component={representative} />
    </Stack.Navigator>
  );
};

const ValiokuntaStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Valiokuntien julkiset kuulemiset ja avoimet kokoukset"
        component={valiokuntaList}
      />
      <Stack.Screen name="Valiokunta" component={valiokunta} />
    </Stack.Navigator>
  );
};

const SeminaariStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Seminaarit" component={seminaaritList} />
      <Stack.Screen name="Seminaari" component={seminaari} />
    </Stack.Navigator>
  );
};

const TiedotusStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Tiedotustilaisuudet" component={tiedotusList} />
      <Stack.Screen name="Tiedotustilaisuus" component={tiedotus} />
    </Stack.Navigator>
  );
};

const EsittelyStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Esittelyvideot" component={esittelyList} />
      <Stack.Screen name="Esittelyvideo" component={esittely} />
    </Stack.Navigator>
  );
};

const EduRyhmatStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Eduskuntaryhmät" component={eduryhmatList} />
      <Stack.Screen name="Eduskuntaryhmä" component={eduryhmat} />
    </Stack.Navigator>
  );
};

const LiveStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Suorat lähetykset" component={liveList} />
      <Stack.Screen name="Suora lähetys" component={live} />
    </Stack.Navigator>
  );
};

const NewsStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="RssNewsFeed" component={RssNewsFeed} />
      <Stack.Screen name="WebViewUI" component={WebViewUI} />
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
};
