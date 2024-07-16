import React, {useEffect, useState} from 'react';
import AuthStackNavigator from '@/navigations/stack/AuthStackNavigator';
import MainStackNavigator from '../stack/MainStackNavigator';

import AsyncStorage from '@react-native-async-storage/async-storage';
import {ActivityIndicator, View} from 'react-native';

const subscribe = (key: string, callback: (value: string | null) => void) => {
  const checkValueChange = async () => {
    try {
      const value = await AsyncStorage.getItem(key);
      callback(value);
    } catch (error) {
      console.error('Error in subscribe:', error);
      callback(null);
    }
  };

  checkValueChange();
  const interval = setInterval(checkValueChange, 1000);

  return () => clearInterval(interval);
};

export default function RootNavigator() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const value = await AsyncStorage.getItem('isLoggedIn');
        setIsLoggedIn(value === 'true');
      } catch (error) {
        console.error('Error checking login status:', error);
        setIsLoggedIn(false);
      }
    };

    checkLoginStatus();

    // AsyncStorage의 'isLoggedIn' 값 변경을 감지하는 리스너
    const unsubscribe = subscribe('isLoggedIn', value => {
      setIsLoggedIn(value === 'true');
    });

    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, []);

  // useEffect(() => {
  //   checkLoginStatus();
  // }, [isLoggedIn]);

  // const checkLoginStatus = async () => {
  //   try {
  //     const value = await AsyncStorage.getItem('isLoggedIn');
  //     setIsLoggedIn(value === 'true');
  //   } catch (error) {
  //     console.error('Error checking login status:', error);
  //     setIsLoggedIn(false);
  //   }
  // };

  if (isLoggedIn === null) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return isLoggedIn ? <MainStackNavigator /> : <AuthStackNavigator />;
}
