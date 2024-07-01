import {StyleSheet} from 'react-native';
import React, {useEffect, useState} from 'react';
import AuthStackNavigator from '@/navigations/stack/AuthStackNavigator';
import MainStackNavigator from '../stack/MainStackNavigator';

import AsyncStorage from '@react-native-async-storage/async-storage';

// export const storage = new MMKV({
//   id: 'user',
//   encryptionKey: 'encrypt',
// });

export const subscribe = (key: string, callback: (value: any) => void) => {
  const checkValueChange = async () => {
    const value = await AsyncStorage.getItem(key);
    callback(value === 'true');
  };

  checkValueChange();
  const interval = setInterval(checkValueChange, 1000);

  return () => clearInterval(interval);
};

export default function RootNavigator() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    AsyncStorage.setItem('isLoggedIn', 'false');
  }, []);

  useEffect(() => {
    const checkLoginStatus = async () => {
      const loggedInStatus = await AsyncStorage.getItem('isLoggedIn');
      setIsLoggedIn(loggedInStatus === 'true');
    };

    checkLoginStatus();
    const unsubscribe = subscribe('isLoggedIn', setIsLoggedIn);

    return unsubscribe;
  }, []);

  return <>{isLoggedIn ? <MainStackNavigator /> : <AuthStackNavigator />}</>;
}

const styles = StyleSheet.create({});
