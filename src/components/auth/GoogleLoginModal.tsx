import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {
  WebView,
  WebViewMessageEvent,
  WebViewNavigation,
} from 'react-native-webview';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface MessageResponse {
  message: string;
  accessToken: string;
}

export default function GoogleLoginModal() {
  const navigation = useNavigation();

  const handleNavigationStateChange = async (navState: WebViewNavigation) => {
    if (
      navState.url.startsWith('http://localhost:8080/login/oauth2/code/google')
    ) {
      // 백엔드에서 처리 후 리다이렉트된 URL
      console.log('Redirected to:', navState.url);
    }
  };

  const handleMessage = async (event: WebViewMessageEvent) => {
    try {
      const data = event.nativeEvent.data;
      console.log('handleMessage>>>', data);

      const response = JSON.parse(
        event.nativeEvent.data,
      ) as unknown as MessageResponse;

      if (response.message === 'Login success') {
        await AsyncStorage.setItem('accessToken', response.accessToken);
        await AsyncStorage.setItem('isLoggedIn', 'true');

        navigation.goBack();
      }
    } catch (error) {
      console.error('Error parsing message:', error);
    }
  };

  const injectedJavaScript = `
    window.ReactNativeWebView.postMessage(document.body.innerText);
  `;

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.closeButton}
        onPress={() => navigation.goBack()}
      >
        <Text>Close</Text>
      </TouchableOpacity>
      <WebView
        source={{uri: 'http://localhost:8080/oauth2/authorization/google'}}
        onNavigationStateChange={handleNavigationStateChange}
        onMessage={handleMessage}
        injectedJavaScript={injectedJavaScript}
        javaScriptEnabled={true}
        style={styles.webview}
        userAgent={'customUserAgent'}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  closeButton: {
    padding: 10,
    alignSelf: 'flex-end',
  },
  webview: {
    flex: 1,
  },
});
