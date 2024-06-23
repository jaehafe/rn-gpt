import {StyleSheet, Text} from 'react-native';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';

import 'react-native-gesture-handler';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import Button from '@/components/Button';
import AnimatedIntro from '@/components/AnimatedIntro';

export default function App() {
  return (
    <NavigationContainer>
      <AnimatedIntro />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({});

{
  /* <GestureHandlerRootView style={{flex: 1}}></GestureHandlerRootView> */
}
