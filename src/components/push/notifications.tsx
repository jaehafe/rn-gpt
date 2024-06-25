import messaging, {
  FirebaseMessagingTypes,
} from '@react-native-firebase/messaging';
import {MMKV} from 'react-native-mmkv';
import {Alert, Linking, NativeModules, Platform} from 'react-native';
import notifee from '@notifee/react-native';

export const localStorage = new MMKV();

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
  const fcmtoken = localStorage.getString('fcmtoken');
  if (!fcmtoken) {
    try {
      const newFcmToken = await messaging().getToken();
      localStorage.set('fcmtoken', newFcmToken);
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

function onMessageReceived(message: FirebaseMessagingTypes.RemoteMessage) {
  notifee.displayNotification({
    body: message.notification?.body,
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
  messaging().setBackgroundMessageHandler(onMessageReceived as any);
};

export {
  getFcmToken,
  getFcmTokenFromLocalStorage,
  requestUserPermission,
  notificationListener,
};
