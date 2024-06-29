import {Alert, StyleSheet} from 'react-native';
import React, {useEffect} from 'react';
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

export default function App() {
  // useEffect(() => {
  //   requestUserPermission();
  // }, []);

  // foreground
  // useEffect(() => {
  //   const unsubscribe = messaging().onMessage(async remoteMessage => {
  //     Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
  //   });

  //   return unsubscribe;
  // }, []);

  usePushNotification();
  notificationListener();

  return (
    <NavigationContainer>
      <GestureHandlerRootView style={{flex: 1}}>
        <SafeAreaProvider>
          <RootNavigator />
        </SafeAreaProvider>
      </GestureHandlerRootView>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({});
