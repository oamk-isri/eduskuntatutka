import React, { useState } from 'react';
import { Text } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Appbar, Drawer } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import Representatives from '../views/representatives';

const MainDrawer = createDrawerNavigator();

function DrawerView() {

  const [active, setActive] = useState("");

  return (
    <SafeAreaView>
      <Drawer.Section title="Some title">
      <Drawer.Item
        label="First Item"
        active={active === 'first'}
        onPress={() => setActive('first')}
      />
      <Drawer.Item
        label="Second Item"
        active={active === 'second'}
        onPress={() => setActive('second')}
      />
    </Drawer.Section>
    </SafeAreaView>
  )
}

function MainView() {
  return (
    <Representatives/>
  )
}

export default RootNavigator = () => {
  return (
    <MainDrawer.Navigator
      drawerContent={() => <DrawerView />}>
      <MainDrawer.Screen
        name="what"
        component={MainView}
        options={{
          header: ({navigation}) => (
            <Appbar.Header>
              <Appbar.Action icon="menu" onPress={() => navigation.toggleDrawer()} />
              <Appbar.Content title="Eduskuntatutka" />
            </Appbar.Header>
          )
        }}
        />
    </MainDrawer.Navigator>
  );
};