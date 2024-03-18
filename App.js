import 'react-native-gesture-handler';
import React from 'react';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { PaperProvider } from 'react-native-paper';
import RootNavigator from './components/RootNavigator';
import { SafeAreaProvider } from 'react-native-safe-area-context';


export default function App() {

  return (
    <SafeAreaProvider>
      <PaperProvider>
        <NavigationContainer>

          <RootNavigator />

        </NavigationContainer>
      </PaperProvider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
