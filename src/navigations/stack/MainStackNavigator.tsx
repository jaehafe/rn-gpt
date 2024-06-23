import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {mainNavigation} from '@/constants/navigations';
import Settings from '@/components/settings/Settings';
import ChatDrawerNavigator from '../drawer/ChatDrawerNavigator';
import Colors from '@/constants/Colors';
import {useNavigation} from '@react-navigation/native';

import Ionicons from 'react-native-vector-icons/Ionicons';

export type MainStackParamList = {
  [mainNavigation.DRAWER]: undefined;
  [mainNavigation.SETTINGS]: undefined;
};

const Stack = createStackNavigator<MainStackParamList>();

export default function MainStackNavigator() {
  const navigation = useNavigation();

  return (
    <Stack.Navigator>
      <Stack.Screen
        name={mainNavigation.DRAWER}
        component={ChatDrawerNavigator}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={mainNavigation.SETTINGS}
        component={Settings}
        options={{
          headerTitle: 'Settings',
          presentation: 'modal',
          headerShadowVisible: false,
          headerStyle: {backgroundColor: Colors.selected},
          headerRight: () => (
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={{
                backgroundColor: Colors.greyLight,
                borderRadius: 20,
                padding: 4,
              }}
            >
              <Ionicons name="close-outline" size={16} color={Colors.grey} />
            </TouchableOpacity>
          ),
        }}
      />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({});
