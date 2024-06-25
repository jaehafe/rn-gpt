import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import AuthStackNavigator from '@/navigations/stack/AuthStackNavigator';
import ChatDrawerNavigator from '../drawer/ChatDrawerNavigator';
import MainStackNavigator from '../stack/MainStackNavigator';

export default function RootNavigator() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    setIsLoggedIn(false);
  }, [isLoggedIn]);

  // return <>{isLoggedIn ? <MainStackNavigator /> : <AuthStackNavigator />}</>;
  return <MainStackNavigator />;
}

const styles = StyleSheet.create({});
