import {StyleSheet, TouchableOpacity, View} from 'react-native';
import React, {Dispatch, SetStateAction} from 'react';
import {
  NativeStackNavigationProp,
  createNativeStackNavigator,
} from '@react-navigation/native-stack';
import AnimatedIntro from '@/components/ui/AnimatedIntro';
import {authNavigation} from '@/constants/navigations';
import Login from '@/components/auth/Login';

import Ionicons from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
import VerifyCode from '@/components/auth/VerifyCode';
import GoogleLoginModal from '@/components/auth/GoogleLoginModal';

export type AuthStackParamList = {
  [authNavigation.AUTH_HOME]: undefined;
  Login: {type: 'login' | 'register'} | {email: string};
  [authNavigation.VERIFY_CODE]: {
    email: string;
  };
  [authNavigation.GOOGLE_LOGIN]: undefined;
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
        name={authNavigation.GOOGLE_LOGIN}
        component={GoogleLoginModal}
        options={{
          headerTitle: '구글 로그인',
          presentation: 'modal',
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
      <Stack.Screen
        name={authNavigation.VERIFY_CODE}
        component={VerifyCode}
        options={{
          headerTitle: '인증코드 입력',
          presentation: 'modal',
        }}
      />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({});
