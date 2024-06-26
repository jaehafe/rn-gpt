import {Alert, StyleSheet, Text, View} from 'react-native';
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
import {QueryClientProvider} from '@tanstack/react-query';
import queryClient from '@/apis/queryClient';
import SplashScreen from 'react-native-splash-screen';

export default function App() {
  useEffect(() => {
    requestUserPermission();
  }, []);

  // foreground
  useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
    });

    return unsubscribe;
  }, []);

  useEffect(() => {
    setTimeout(() => {
      SplashScreen.hide();
    }, 1000);
  }, []);

  usePushNotification();
  notificationListener();

  return (
    <NavigationContainer>
      <GestureHandlerRootView style={{flex: 1}}>
        <QueryClientProvider client={queryClient}>
          <SafeAreaProvider>
            <RootNavigator />
          </SafeAreaProvider>
        </QueryClientProvider>
      </GestureHandlerRootView>
    </NavigationContainer>
    // <View>
    //   <Text>123</Text>
    // </View>
  );
}

const styles = StyleSheet.create({});
