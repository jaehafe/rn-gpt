import {StyleSheet, Text} from 'react-native';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';

import 'react-native-gesture-handler';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

export default function App() {
  return (
    <NavigationContainer>
      {/* <GestureHandlerRootView style={{flex: 1}}> */}
      <Text>App</Text>
      {/* </GestureHandlerRootView> */}
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({});
