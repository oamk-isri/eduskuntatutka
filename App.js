import 'react-native-gesture-handler';
import React, { useEffect } from 'react';
import { StyleSheet, Appearance } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { PaperProvider } from 'react-native-paper';
import RootNavigator from './components/RootNavigator';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import DataOriginPopup from './components/PopUp';


export default function App() {

  // Force light mode
  useEffect(() => {
    Appearance.setColorScheme('light')
  }, []);  

  return (
    <SafeAreaProvider>
      <PaperProvider>
        <DataOriginPopup />
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
