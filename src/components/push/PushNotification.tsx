import {Button, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';

// import messaging from '@react-native-firebase/messaging';
import notifee, {EventType} from '@notifee/react-native';
import {
  getFcmToken,
  getFcmTokenFromLocalStorage,
  notificationListener,
  requestUserPermission,
} from './notifications';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import {AndroidColor} from '@notifee/react-native';

async function onDisplayNotification() {
  // // Request permissions (required for iOS)
  // await notifee.requestPermission();

  // // Create a channel (required for Android)
  // const channelId = await notifee.createChannel({
  //   id: 'default',
  //   name: 'Default Channel',
  // });

  // // Display a notification
  // await notifee.displayNotification({
  //   title: 'Notification Title',
  //   body: 'Main body content of the notification',
  //   android: {
  //     channelId,
  //     smallIcon: 'name-of-a-small-icon', // optional, defaults to 'ic_launcher'.
  //     // pressAction is needed if you want the notification to open the app when pressed
  //     pressAction: {
  //       id: 'default',
  //     },
  //   },
  // });
  const channelId = await notifee.createChannel({
    id: 'default',
    name: 'Default Channel',
  });

  // Required for iOS
  // See https://notifee.app/react-native/docs/ios/permissions
  await notifee.requestPermission();

  const notificationId = await notifee.displayNotification({
    id: '123',
    title: 'Notification Title',
    body: 'Main body content of the notification',
    android: {
      channelId,
    },
  });

  console.log('notificationId>>', notificationId);

  // Sometime later...
  await notifee.displayNotification({
    id: '123',
    title: 'Updated Notification Title',
    body: 'Updated main body content of the notification',
    android: {
      channelId,
    },
  });
}

export default async function PushNotification() {
  // useEffect(() => {
  //   return notifee.onForegroundEvent(({type, detail}) => {
  //     switch (type) {
  //       case EventType.DISMISSED:
  //         console.log('User dismissed notification', detail.notification);
  //         break;
  //       case EventType.PRESS:
  //         console.log('User pressed notification', detail.notification);
  //         break;
  //     }
  //   });
  // }, []);
  const fcmToken = await AsyncStorage.getItem('fcmtoken');
  const [generatedToken, setGeneratedToken] = useState<string>('');

  // useEffect(() => {
  //   console.log('storage', fcmToken, 'newly generated', generatedToken);
  // }, [fcmToken, generatedToken]);

  // useEffect(() => {
  //   const fetchToken = async () => {
  //     const token = await getFcmToken();
  //     if (token) {
  //       setGeneratedToken(token);
  //     }
  //   };
  //   const fetchTokenByLocal = async () => {
  //     await getFcmTokenFromLocalStorage();
  //   };
  //   void fetchToken();
  //   void fetchTokenByLocal();
  //   void requestUserPermission();
  //   void notificationListener();
  // }, []);

  return (
    <View>
      <Button
        title="Display Notification"
        onPress={() => onDisplayNotification()}
      />
    </View>
  );
}

const styles = StyleSheet.create({});
