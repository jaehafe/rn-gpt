import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {CompositeScreenProps} from '@react-navigation/native';
import {StackScreenProps} from '@react-navigation/stack';
import {
  MainDrawerParamList,
  MainStackParamList,
} from '@/navigations/drawer/ChatDrawerNavigator';
import {DrawerScreenProps} from '@react-navigation/drawer';

export type ChatDetailScreenProps = CompositeScreenProps<
  StackScreenProps<MainStackParamList>,
  DrawerScreenProps<MainDrawerParamList>
>;

export default function ChatDetail({route, navigation}: ChatDetailScreenProps) {
  console.log('route.params', route.params);

  return (
    <View>
      <Text>{route.params?.id}</Text>
      <Text>{route.params?.title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({});
