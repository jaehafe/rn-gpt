import messaging, {
  FirebaseMessagingTypes,
} from '@react-native-firebase/messaging';
import {Alert, Linking, NativeModules, Platform} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import notifee from '@notifee/react-native';

export const handleSettings = () => {
  if (Platform.OS === 'ios') Linking.openURL('App-Prefs:root');
  // 안드로이드일 경우
  else {
    if (NativeModules.OpenExternalURLModule)
      NativeModules.OpenExternalURLModule.linkAndroidSettings();
  }
};

const requestUserPermission = async () => {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    console.log('Authorization status:', authStatus);
  } else {
    Alert.alert(
      'Permission Required',
      'Notifications are disabled. To enable, please go to Settings.',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Go to Settings',
          onPress: () => handleSettings(),
        },
      ],
    );
  }
};

const getFcmTokenFromLocalStorage = async () => {
  const fcmtoken = await AsyncStorage.getItem('fcmtoken');
  if (!fcmtoken) {
    try {
      const newFcmToken = await messaging().getToken();
      await AsyncStorage.setItem('fcmtoken', newFcmToken);
    } catch (error) {
      console.error(error);
    }
  } else {
    console.log('token found', fcmtoken);
  }
};

const getFcmToken = async () => {
  try {
    const newFcmToken = await messaging().getToken();
    return newFcmToken;
  } catch (error) {
    console.error(error);
    return null;
  }
};

async function onMessageReceived(
  message: FirebaseMessagingTypes.RemoteMessage,
) {
  await notifee.displayNotification({
    title: JSON.parse(JSON.stringify(message.notification?.title)),
    body: JSON.parse(JSON.stringify(message.notification?.body)),
  });
}

const notificationListener = () => {
  // background
  messaging().onNotificationOpenedApp(remoteMessage => {
    console.log(
      'Notification caused app to open from background state:',
      remoteMessage.notification,
    );
  });

  // quit
  messaging()
    .getInitialNotification()
    .then(remoteMessage => {
      if (remoteMessage) {
        console.log(
          'Notification caused app to open from quit state:',
          remoteMessage.notification,
        );
      }
    })
    .catch(error => console.log('failed', error));

  // foreground
  messaging().onMessage(async remoteMessage => {
    Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
  });
  messaging().onMessage(onMessageReceived);
  messaging().setBackgroundMessageHandler(onMessageReceived);
};

export {
  getFcmToken,
  getFcmTokenFromLocalStorage,
  requestUserPermission,
  notificationListener,
};
