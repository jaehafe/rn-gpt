import {useEffect} from 'react';
import {useMutationFCMToken} from '@/apis/hooks/useMutationFCMToken';
import messaging from '@react-native-firebase/messaging';

export default function useFCMTokenManager() {
  const {mutate: sendFCMToken} = useMutationFCMToken();

  useEffect(() => {
    const setupFCM = async () => {
      // FCM 권한 요청
      const authStatus = await messaging().requestPermission();
      const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;

      if (enabled) {
        // FCM 토큰 얻기
        const token = await messaging().getToken();

        // 기기 정보 얻기

        // 서버로 토큰과 기기 정보 전송
        sendFCMToken(
          {token},
          {
            onSuccess: () =>
              console.log('FCM token sent to server successfully'),
            onError: error =>
              console.error('Error sending FCM token to server:', error),
          },
        );
      }
    };

    setupFCM();

    // 토큰 리프레시 리스너
    const unsubscribe = messaging().onTokenRefresh(token => {
      sendFCMToken({token});
    });

    return unsubscribe;
  }, [sendFCMToken]);
}
