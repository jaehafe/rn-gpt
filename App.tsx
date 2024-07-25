import {StyleSheet} from 'react-native';
import {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';

import 'react-native-gesture-handler';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {BottomSheetModalProvider} from '@gorhom/bottom-sheet';

// import Config from 'react-native-config';
import RootNavigator from '@/navigations/root/RootNavigator';

import {
  notificationListener,
  requestUserPermission,
} from '@/components/push/notifications';
import {QueryClientProvider} from '@tanstack/react-query';
import queryClient from '@/apis/queryClient';
import SplashScreen from 'react-native-splash-screen';
import AuthContextProvider from '@/contexts/auth/AuthContext';

export default function App() {
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
        <BottomSheetModalProvider>
          <QueryClientProvider client={queryClient}>
            <SafeAreaProvider>
              <AuthContextProvider>
                <RootNavigator />
              </AuthContextProvider>
            </SafeAreaProvider>
          </QueryClientProvider>
        </BottomSheetModalProvider>
      </GestureHandlerRootView>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({});
