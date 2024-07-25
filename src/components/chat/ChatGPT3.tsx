import {
  Button,
  Image,
  KeyboardAvoidingView,
  LayoutChangeEvent,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import MessageInput from './MessageInput';
import {defaultStyles} from '@/constants/Styles';
import {FlashList} from '@shopify/flash-list';

import Haptics from 'react-native-haptic-feedback';
import {RefreshControl} from 'react-native-gesture-handler';
import {useQueryTodosAPI} from '@/apis/hooks';

import AsyncStorage from '@react-native-async-storage/async-storage';
import {jwtDecode} from 'jwt-decode';
import {useMutationLogOut} from '@/apis/hooks/useMutationLogOut';
import axiosInstance from '@/apis/axios';
import useAuthContext from '@/contexts/auth/useAuthContext';

export default function ChatGPT3() {
  const {removeAccessToken, setIsLoggedIn} = useAuthContext();
  const [height, setHeight] = useState(0);
  const [decodedToken, setDecodedToken] = useState<string>('');
  const {mutateAsync: logOut} = useMutationLogOut();
  const [testResult, setTestResult] = useState<string>('');

  useEffect(() => {
    const decodeToken = async () => {
      try {
        const token = await AsyncStorage.getItem('accessToken');
        if (token) {
          const decoded = jwtDecode(token);
          setDecodedToken(JSON.stringify(decoded, null, 2));
        }
      } catch (error) {
        console.error('Error decoding token:', error);
      }
    };

    decodeToken();
  }, []);

  const handleLayout = (event: LayoutChangeEvent) => {
    const {height} = event.nativeEvent.layout;
    setHeight(height / 2);
  };

  const handleRefresh = async () => {
    Haptics.trigger('impactLight', {
      enableVibrateFallback: true,
      ignoreAndroidSystemSettings: false,
    });
  };

  const handleLogOut = async () => {
    Haptics.trigger('impactLight', {
      enableVibrateFallback: true,
      ignoreAndroidSystemSettings: false,
    });

    try {
      await logOut({});
      await removeAccessToken();
      await setIsLoggedIn(false);
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  const handleTestRequest = async () => {
    try {
      const response = await axiosInstance.get('/test-controller');
      setTestResult(JSON.stringify(response.data, null, 2));
    } catch (error) {
      console.error('Error in test request:', error);
      setTestResult('Error: ' + JSON.stringify(error, null, 2));
    }
  };

  return (
    <View style={defaultStyles.pageContainer}>
      <View style={styles.page} onLayout={handleLayout}>
        <View style={[styles.logoContainer, {marginTop: height / 2 - 100}]}>
          <Pressable onPress={handleLogOut}>
            <Image
              source={require('@/assets/images/logo-white.png')}
              style={styles.image}
            />
          </Pressable>
        </View>

        <View style={styles.tokenContainer}>
          <Text style={styles.tokenTitle}>Decoded Access Token:</Text>
          <Text style={styles.tokenText}>{decodedToken}</Text>
        </View>

        <Button title="Test Request" onPress={handleTestRequest} />

        <ScrollView style={styles.tokenContainer}>
          <Text style={styles.tokenTitle}>Test Result:</Text>
          <Text style={styles.tokenText}>{testResult}</Text>
        </ScrollView>

        {/* <FlashList
          data={data}
          keyExtractor={item => String(item.id)}
          renderItem={({item}) => (
            <Text style={{borderWidth: 1}}>{item.title}</Text>
          )}
          estimatedItemSize={400}
          contentContainerStyle={{
            paddingTop: 30,
            paddingBottom: 150,
          }}
          keyboardDismissMode="on-drag"
          onEndReachedThreshold={0.8}
          refreshControl={
            <RefreshControl refreshing={isPending} onRefresh={handleRefresh} />
          }
          onRefresh={handleRefresh}
          refreshing={isPending}
          scrollIndicatorInsets={{right: 1}}
          indicatorStyle="black"
        /> */}
      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={70}
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          width: '100%',
        }}
      >
        {/* {messages.length === 0 && <MessageIdeas onSelectCard={getCompletion} />} */}
        <MessageInput />
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  logoContainer: {
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    width: 50,
    height: 50,
    backgroundColor: '#000',
    borderRadius: 50,
  },
  image: {
    width: 30,
    height: 30,
    resizeMode: 'cover',
  },
  page: {
    flex: 1,
  },

  tokenContainer: {
    padding: 20,
    backgroundColor: '#f0f0f0',
    margin: 10,
    borderRadius: 10,
  },
  tokenTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  tokenText: {
    fontSize: 14,
  },
});
