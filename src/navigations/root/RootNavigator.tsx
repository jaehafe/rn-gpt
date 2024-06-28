import {StyleSheet} from 'react-native';
import React, {useEffect, useState} from 'react';
import AuthStackNavigator from '@/navigations/stack/AuthStackNavigator';
import MainStackNavigator from '../stack/MainStackNavigator';

import {MMKV} from 'react-native-mmkv';

export const storage = new MMKV();

export const subscribe = (key: string, callback: (value: any) => void) => {
  storage.addOnValueChangedListener(changedKey => {
    if (changedKey === key) {
      callback(storage.getBoolean(key));
    }
  });
};

export default function RootNavigator() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    storage.set('isLoggedIn', false);
  }, []);

  useEffect(() => {
    const loggedInStatus = storage.getBoolean('isLoggedIn');
    if (loggedInStatus !== undefined) {
      setIsLoggedIn(loggedInStatus);
    }

    // 상태 변경 구독
    const unsubscribe = subscribe('isLoggedIn', setIsLoggedIn);

    return unsubscribe;
  }, []);

  return <>{isLoggedIn ? <MainStackNavigator /> : <AuthStackNavigator />}</>;
}

const styles = StyleSheet.create({});
