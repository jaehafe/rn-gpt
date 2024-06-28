import {Platform, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {MenuView} from '@react-native-menu/menu';
import MessageInput from './MessageInput';

export default function ChatGPT3() {
  return (
    <View style={styles.container}>
      <MessageInput />
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
