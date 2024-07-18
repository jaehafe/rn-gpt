import {NativeModules, StyleSheet, ToastAndroid} from 'react-native';
import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';

import 'react-native-gesture-handler';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

import Config from 'react-native-config';
import RootNavigator from '@/navigations/root/RootNavigator';

import messaging from '@react-native-firebase/messaging';
import usePushNotification from '@/hooks/usePushNotification';
import {
  notificationListener,
  requestUserPermission,
} from '@/components/push/notifications';
import {QueryClientProvider} from '@tanstack/react-query';
import queryClient from '@/apis/queryClient';
import SplashScreen from 'react-native-splash-screen';

import SharedGroupPreferences from 'react-native-shared-group-preferences';
import Button from '@/components/ui/Button';
const group = 'group.rngpt';
const SharedStorage = NativeModules.SharedStorage;

export default function App() {
  const [text, setText] = useState('');
  const widgetData = {
    text,
  };

  const handleSubmit = async () => {
    try {
      // iOS
      await SharedGroupPreferences.setItem('widgetKey', widgetData, group);
    } catch (error) {
      console.log({error});
    }
    const value = `${text} days`;
    // Android
    SharedStorage.set(JSON.stringify({text: value}));
    ToastAndroid.show('Change value successfully!', ToastAndroid.SHORT);
  };

  useEffect(() => {
    requestUserPermission();
    notificationListener();
  }, []);

  // usePushNotification();

  // foreground
  // useEffect(() => {
  //   const unsubscribe = messaging().onMessage(async remoteMessage => {
  //     Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
  //   });

  //   return unsubscribe;
  // }, []);

  useEffect(() => {
    setTimeout(() => {
      SplashScreen.hide();
    }, 1000);
  }, []);

  return (
    <NavigationContainer>
      <GestureHandlerRootView style={{flex: 1}}>
        <QueryClientProvider client={queryClient}>
          <SafeAreaProvider>
            <RootNavigator />

            {/* <Button onPress={handleSubmit}>Submit</Button> */}
          </SafeAreaProvider>
        </QueryClientProvider>
      </GestureHandlerRootView>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({});
