import { createStackNavigator } from "@react-navigation/stack";
import Header from "./Header";
import NewsFeed from "../newsfeed/NewsFeed";
import News from "../newsfeed/News";
import Events from "../events/Events";
import Plenum from "../../views/broadcasts/Plenum";
import PlenumList from "../../views/broadcasts/PlenumList";
import CommitteeList from "../../views/broadcasts/CommitteeList";
import Committee from "../../views/broadcasts/Committee";
import SeminarList from "../../views/broadcasts/SeminarList";
import Seminar from "../../views/broadcasts/Seminar";
import BriefingList from "../../views/broadcasts/BriefingList";
import Briefing from "../../views/broadcasts/Briefing";
import IntroList from "../../views/broadcasts/IntroList";
import Intro from "../../views/broadcasts/Intro";
import RepGroupList from "../../views/broadcasts/RepGroupList";
import RepGroup from "../../views/broadcasts/RepGroup";
import LiveList from "../../views/broadcasts/live/LiveList";
import Live from "../../views/broadcasts/live/Live";
import Broadcasts from "../../views/broadcasts/Broadcasts";
import Search from "../../views/broadcasts/search/Search";
import Main from "../../views/frontpage/Main";
import Browser from "../../views/frontpage/Browser";
import RepresentativesList from "../../views/rep/RepresentativesList";
import Representative from "../../views/rep/Representative";
import Parliament from "../../views/parliament/Parliament";
import Info from "../../views/details/Info";

const Stack = createStackNavigator();

const PlenumsStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Täysistunnot"
        component={PlenumList}
        options={{
          header: ({ navigation }) => (
            <Header navigation={navigation} title="Täysistunnot" />
          ),
        }}
      />
      <Stack.Screen
        name="Täysistunto"
        component={Plenum}
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
        component={RepresentativesList}
        options={{
          header: ({ navigation }) => (
            <Header navigation={navigation} title="Kansanedustajat" />
          ),
        }}
      />
      <Stack.Screen
        name="Kansanedustaja"
        component={Representative}
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
        component={CommitteeList}
        options={{
          header: ({ navigation }) => (
            <Header navigation={navigation} title="Valiokuntien kuulemiset" />
          ),
        }}
      />
      <Stack.Screen
        name="Valiokunta"
        component={Committee}
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
        component={SeminarList}
        options={{
          header: ({ navigation }) => (
            <Header navigation={navigation} title="Seminaarit" />
          ),
        }}
      />
      <Stack.Screen
        name="Seminaari"
        component={Seminar}
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
        component={BriefingList}
        options={{
          header: ({ navigation }) => (
            <Header navigation={navigation} title="Tiedotustilaisuudet" />
          ),
        }}
      />
      <Stack.Screen
        name="Tiedotustilaisuus"
        component={Briefing}
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
        component={IntroList}
        options={{
          header: ({ navigation }) => (
            <Header navigation={navigation} title="Esittelyvideot" />
          ),
        }}
      />
      <Stack.Screen
        name="Esittelyvideo"
        component={Intro}
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
        component={RepGroupList}
        options={{
          header: ({ navigation }) => (
            <Header navigation={navigation} title="Eduskuntaryhmät" />
          ),
        }}
      />
      <Stack.Screen
        name="Eduskuntaryhmä"
        component={RepGroup}
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
        component={LiveList}
        options={{
          header: ({ navigation }) => (
            <Header navigation={navigation} title="Suorat lähetykset" />
          ),
        }}
      />
      <Stack.Screen
        name="Suora lähetys"
        component={Live}
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
        name="Main"
        component={Main}
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
        name="Browser"
        component={Browser}
        options={{
          header: ({ navigation }) => (
            <Header navigation={navigation} title="Verkkonäkymä" />
          ),
        }}
      />
      <Stack.Screen
        name="Täysistunto"
        component={Plenum}
        options={({ route }) => ({
          header: ({ navigation }) => (
            <Header navigation={navigation} title={route.params.title} />
          ),
        })}
      />

      <Stack.Screen
        name="Valiokunta"
        component={Committee}
        options={{
          header: ({ navigation }) => (
            <Header navigation={navigation} title="Valiokunta" />
          ),
        }}
      />
      <Stack.Screen
        name="Eduskuntaryhmä"
        component={RepGroup}
        options={{
          header: ({ navigation }) => (
            <Header navigation={navigation} title="Eduskuntaryhmä" />
          ),
        }}
      />
      <Stack.Screen
        name="Seminaari"
        component={Seminar}
        options={{
          header: ({ navigation }) => (
            <Header navigation={navigation} title="Seminaari" />
          ),
        }}
      />
      <Stack.Screen
        name="Tiedotustilaisuus"
        component={Briefing}
        options={{
          header: ({ navigation }) => (
            <Header navigation={navigation} title="Tiedotustilaisuus" />
          ),
        }}
      />
      <Stack.Screen
        name="Esittelyvideo"
        component={Intro}
        options={{
          header: ({ navigation }) => (
            <Header navigation={navigation} title="Esittelyvideo" />
          ),
        }}
      />
      <Stack.Screen
        name="Suora lähetys"
        component={Live}
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
        component={Broadcasts}
        options={{
          header: ({ navigation }) => (
            <Header navigation={navigation} title="Verkkolähetykset" />
          ),
        }}
      />
      <Stack.Screen
        name="Verkkolähetysten haku"
        component={Search}
        options={{
          header: ({ navigation }) => (
            <Header navigation={navigation} title="Verkkolähetysten haku" />
          ),
        }}
      />
      <Stack.Screen
        name="Suorat lähetykset"
        component={LiveList}
        options={{
          header: ({ navigation }) => (
            <Header navigation={navigation} title="Suorat lähetykset" />
          ),
        }}
      />
      <Stack.Screen
        name="Suora lähetys"
        component={Live}
        options={{
          header: ({ navigation }) => (
            <Header navigation={navigation} title="Suora lähetys" />
          ),
        }}
      />

      <Stack.Screen
        name="Täysistunnot"
        component={PlenumList}
        options={{
          header: ({ navigation }) => (
            <Header navigation={navigation} title="Täysistunnot" />
          ),
        }}
      />
      <Stack.Screen
        name="Täysistunto"
        component={Plenum}
        options={{
          header: ({ navigation }) => (
            <Header navigation={navigation} title="Täysistunto" />
          ),
        }}
      />
      <Stack.Screen
        name="Browser"
        component={Browser}
        options={{
          header: ({ navigation }) => (
            <Header navigation={navigation} title="Verkkonäkymä" />
          ),
        }}
      />

      <Stack.Screen
        name="Valiokuntien julkiset kuulemiset ja avoimet kokoukset"
        component={CommitteeList}
        options={{
          header: ({ navigation }) => (
            <Header navigation={navigation} title="Valiokunnan kuulemiset" />
          ),
        }}
      />
      <Stack.Screen
        name="Valiokunta"
        component={Committee}
        options={{
          header: ({ navigation }) => (
            <Header navigation={navigation} title="Valiokunta" />
          ),
        }}
      />
      <Stack.Screen
        name="Eduskuntaryhmät"
        component={RepGroupList}
        options={{
          header: ({ navigation }) => (
            <Header navigation={navigation} title="Eduskuntaryhmät" />
          ),
        }}
      />
      <Stack.Screen
        name="Eduskuntaryhmä"
        component={RepGroup}
        options={{
          header: ({ navigation }) => (
            <Header navigation={navigation} title="Eduskuntaryhmä" />
          ),
        }}
      />

      <Stack.Screen
        name="Seminaarit"
        component={SeminarList}
        options={{
          header: ({ navigation }) => (
            <Header navigation={navigation} title="Seminaarit" />
          ),
        }}
      />
      <Stack.Screen
        name="Seminaari"
        component={Seminar}
        options={{
          header: ({ navigation }) => (
            <Header navigation={navigation} title="Seminaari" />
          ),
        }}
      />
      <Stack.Screen
        name="Tiedotustilaisuudet"
        component={BriefingList}
        options={{
          header: ({ navigation }) => (
            <Header navigation={navigation} title="Tiedotustilaisuudet" />
          ),
        }}
      />
      <Stack.Screen
        name="Tiedotustilaisuus"
        component={Briefing}
        options={{
          header: ({ navigation }) => (
            <Header navigation={navigation} title="Tiedotustilaisuus" />
          ),
        }}
      />
      <Stack.Screen
        name="Esittelyvideot"
        component={IntroList}
        options={{
          header: ({ navigation }) => (
            <Header navigation={navigation} title="Esittelyvideot" />
          ),
        }}
      />
      <Stack.Screen
        name="Esittelyvideo"
        component={Intro}
        options={{
          header: ({ navigation }) => (
            <Header navigation={navigation} title="Esittelyvideo" />
          ),
        }}
      />
    </Stack.Navigator>
  );
};

const TietoaEduskunnastaStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Tietoa eduskunnasta"
        component={Parliament}
        options={{
          header: ({ navigation }) => (
            <Header navigation={navigation} title="Tietoa eduskunnasta" />
          ),
        }}
      />
    </Stack.Navigator>
  );
};

const InfoStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Info"
        component={Info}
        options={{
          header: ({ navigation }) => (
            <Header navigation={navigation} title="Info" />
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
  TietoaEduskunnastaStack,
  InfoStack,
};
