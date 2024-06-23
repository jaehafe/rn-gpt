import {StyleSheet} from 'react-native';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';

import 'react-native-gesture-handler';
// import {GestureHandlerRootView} from 'react-native-gesture-handler';
import AuthStackNavigator from '@/navigations/AuthStackNavigator';
import {SafeAreaProvider} from 'react-native-safe-area-context';

export default function App() {
  return (
    <NavigationContainer>
      <SafeAreaProvider>
        <AuthStackNavigator />
      </SafeAreaProvider>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({});

{
  /* <GestureHandlerRootView style={{flex: 1}}></GestureHandlerRootView> */
}
