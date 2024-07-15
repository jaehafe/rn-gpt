import {StyleSheet} from 'react-native';
import React, {useEffect, useState} from 'react';
import AuthStackNavigator from '@/navigations/stack/AuthStackNavigator';
import MainStackNavigator from '../stack/MainStackNavigator';

import AsyncStorage from '@react-native-async-storage/async-storage';

// export const storage = new MMKV({
//   id: 'user',
//   encryptionKey: 'encrypt',
// });

// export const subscribe = (key: string, callback: (value: any) => void) => {
//   const checkValueChange = async () => {
//     const value = await AsyncStorage.getItem(key);
//     callback(value === 'true');
//   };

//   checkValueChange();
//   const interval = setInterval(checkValueChange, 1000);

//   return () => clearInterval(interval);
// };

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
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // useEffect(() => {
  //   const checkLoginStatus = async () => {
  //     const loggedInStatus = await AsyncStorage.getItem('isLoggedIn');
  //     setIsLoggedIn(loggedInStatus === 'true');
  //   };

  //   checkLoginStatus();
  //   const unsubscribe = subscribe('isLoggedIn', setIsLoggedIn);

  //   return unsubscribe;
  // }, []);

  console.log('isLoggedIn>>', isLoggedIn);

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const accessToken = await AsyncStorage.getItem('accessToken');
        setIsLoggedIn(!!accessToken);
      } catch (error) {
        console.error('Error checking login status:', error);
        setIsLoggedIn(false);
      }
    };

    checkLoginStatus();

    // 로그인 상태 변화를 감지하는 리스너
    const unsubscribe = subscribe('accessToken', token => {
      setIsLoggedIn(!!token);
    });

    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, [isLoggedIn]);

  return <>{isLoggedIn ? <MainStackNavigator /> : <AuthStackNavigator />}</>;
}

const styles = StyleSheet.create({});
