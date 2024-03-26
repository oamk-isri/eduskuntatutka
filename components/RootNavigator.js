import React from 'react';
import { Image } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Appbar, Drawer } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import PlenumList from '../views/plenumList'; // Import the PlenumList component
import Representatives from '../views/representatives'; // Import the Representatives component
import PlenumStack from './PlenumStack';
import RepStack from './RepStack';

const MainDrawer = createDrawerNavigator();

function DrawerView({ navigation }) {
  return (
    <SafeAreaView>
      <Drawer.Section title="Some title">
        <Drawer.Item
          label="Plenum List"
          onPress={() => navigation.navigate('PlenumList')}
        />
        <Drawer.Item
          label="Representatives"
          onPress={() => navigation.navigate('Representatives')}
        />
      </Drawer.Section>
    </SafeAreaView>
  );
}

function MainView() {
  return (
    <PlenumStack/>
  );
}

export default RootNavigator = () => {
  return (
    <MainDrawer.Navigator
      drawerContent={({ navigation }) => <DrawerView navigation={navigation} />}
    >
      <MainDrawer.Screen
        name="MainView"
        component={MainView}
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
        name="PlenumList"
        component={PlenumList}
        options={{ drawerLabel: 'Plenum List' }}
      />
      <MainDrawer.Screen
        name="Representatives"
        component={Representatives}
        options={{ drawerLabel: 'Representatives' }}
      />
      
    </MainDrawer.Navigator>
  );
};