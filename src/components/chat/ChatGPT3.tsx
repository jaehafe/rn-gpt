import {
  Image,
  KeyboardAvoidingView,
  LayoutChangeEvent,
  Platform,
  Pressable,
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

export default function ChatGPT3() {
  const [height, setHeight] = useState(0);
  const [decodedToken, setDecodedToken] = useState<string>('');

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

  return (
    <View style={defaultStyles.pageContainer}>
      <View style={styles.page} onLayout={handleLayout}>
        {/* {messages.length == 0 && (
          <View style={[styles.logoContainer, { marginTop: height / 2 - 100 }]}>
            <Image source={require('@/assets/images/logo-white.png')} style={styles.image} />
          </View>
        )} */}
        <View style={[styles.logoContainer, {marginTop: height / 2 - 100}]}>
          <Pressable
            onPress={() =>
              Haptics.trigger('impactLight', {
                enableVibrateFallback: true,
                ignoreAndroidSystemSettings: false,
              })
            }
          >
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
