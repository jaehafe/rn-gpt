import {StyleSheet, Text} from 'react-native';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';

import 'react-native-gesture-handler';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import Button from '@/components/Button';

export default function App() {
  return (
    <NavigationContainer>
      {/* <GestureHandlerRootView style={{flex: 1}}> */}
      <Text>
        <Button>asdasdasdasdasd</Button>
        <Button>asdasdasdasdasd</Button>
        <Button>asdasdasdasdasd</Button>
        <Button>asdasdasdasdasd</Button>
      </Text>
      {/* </GestureHandlerRootView> */}
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({});
