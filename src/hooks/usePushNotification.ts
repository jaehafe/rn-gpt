import {useCallback, useContext, useEffect, useState} from 'react';
import {Alert} from 'react-native';
import {requestNotifications, RESULTS} from 'react-native-permissions';
import messaging from '@react-native-firebase/messaging';
import {handleSettings} from '@/components/push/notifications';

const usePushNotification = () => {
  const [fcmToken, setFcmToken] = useState<string | null>(null);

  useEffect(() => {
    messaging()
      .getToken()
      .then(token => {
        setFcmToken(token);
      });
  }, []);

  useEffect(() => {
    const unsubscribe = messaging().onTokenRefresh(token => {
      setFcmToken(token);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  const requestPermission = useCallback(async () => {
    const {status} = await requestNotifications([]);
    const enabled = status === RESULTS.GRANTED;
    console.log('enabled', enabled);

    if (!enabled) {
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
  }, []);

  useEffect(() => {
    requestPermission();
  }, [requestPermission]);
};

export default usePushNotification;
