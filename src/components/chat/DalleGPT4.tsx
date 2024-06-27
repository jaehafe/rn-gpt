import {Platform, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {MenuView} from '@react-native-menu/menu';

export default function DalleGPT4() {
  return (
    <View style={styles.container}>
      <Text>DalleGPT4</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10,
  },
  buttonText: {
    fontSize: 20,
  },
});
