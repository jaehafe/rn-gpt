import {StyleSheet, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {
  NativeStackNavigationProp,
  createNativeStackNavigator,
} from '@react-navigation/native-stack';
import AnimatedIntro from '@/components/AnimatedIntro';
import {authNavigation} from '@/constants/navigations';
import Login from '@/components/Login';

import Ionicons from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';

export type AuthStackParamList = {
  [authNavigation.AUTH_HOME]: undefined;
  [authNavigation.LOGIN]: {
    type: 'login' | 'register';
  };
};

const Stack = createNativeStackNavigator<AuthStackParamList>();

export default function AuthStackNavigator() {
  const {navigate} =
    useNavigation<NativeStackNavigationProp<AuthStackParamList>>();

  return (
    <Stack.Navigator>
      <Stack.Screen
        name={authNavigation.AUTH_HOME}
        component={AnimatedIntro}
        options={{
          headerTitle: '',
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={authNavigation.LOGIN}
        component={Login}
        options={{
          headerTitle: '',
          presentation: 'modal',
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigate('AuthHome')}>
              <Ionicons name="close-outline" size={28} />
            </TouchableOpacity>
          ),
        }}
      />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({});
