import React from 'react';
import { Image } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Appbar, Drawer } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import PlenumList from '../views/plenumList'; // Import the PlenumList component
import Representatives from '../views/representatives'; // Import the Representatives component
// import PlenumStack from './PlenumStack';
// import RepStack from './RepStack';
import { PlenumsStack, RepresentativesStack } from './StackNavigators';
import Info from '../views/info';

const MainDrawer = createDrawerNavigator();

function DrawerView({ navigation }) {
  return (
    <SafeAreaView>
      <Drawer.Section title="Some title">
        <Drawer.Item
          label="Plenum List"
          onPress={() => navigation.navigate('PlenumsStack')}
        />
        <Drawer.Item
          label="Representatives"
          onPress={() => navigation.navigate('RepresentativesStack')}
        />
        <Drawer.Item
          label="Info"
          onPress={() => navigation.navigate('Info')}
        />
      </Drawer.Section>
    </SafeAreaView>
  );
}

export default RootNavigator = () => {
  return (
    <MainDrawer.Navigator
      drawerContent={({ navigation }) => <DrawerView navigation={navigation} />}
    >
      <MainDrawer.Screen
        name="MainView"
        component={RepresentativesStack}
        options={{
          header: ({ navigation }) => (
            <Appbar.Header style={{ height: 75 }}>
              <Appbar.Action icon="menu" onPress={() => navigation.toggleDrawer()} />
              <Appbar.Content title="Eduskuntatutka" />
              <Image source={require('../images/tutkalogo.png')} style={{ width: 70, height: 70, marginEnd: 10 }} />
            </Appbar.Header>
          )
        }}
      />
      <MainDrawer.Screen
        name="PlenumsStack"
        component={PlenumsStack}
        options={{drawerLabel: "Plenum List"}}
      />
      <MainDrawer.Screen
        name="RepresentativesStack"
        component={RepresentativesStack}
        options={{drawerLabel: "Representatives"}}
      />
      <MainDrawer.Screen
        name="Info"
        component={Info}
        options={{ drawerLabel: 'Info'}}
      />
    </MainDrawer.Navigator>
  );
};