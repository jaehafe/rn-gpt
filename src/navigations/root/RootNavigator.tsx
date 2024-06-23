import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import AuthStackNavigator from '@/navigations/stack/AuthStackNavigator';
import ChatDrawerNavigator from '../drawer/ChatDrawerNavigator';

export default function RootNavigator() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    setIsLoggedIn(true);
  }, [isLoggedIn]);

  return <>{isLoggedIn ? <ChatDrawerNavigator /> : <AuthStackNavigator />}</>;
}

const styles = StyleSheet.create({});
