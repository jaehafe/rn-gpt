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
import React, {useState} from 'react';
import MessageInput from './MessageInput';
import {defaultStyles} from '@/constants/Styles';
import {FlashList} from '@shopify/flash-list';

import Haptics from 'react-native-haptic-feedback';
import {RefreshControl} from 'react-native-gesture-handler';
import {useQueryTodosAPI} from '@/apis/hooks';

export default function ChatGPT3() {
  const [height, setHeight] = useState(0);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleLayout = (event: LayoutChangeEvent) => {
    const {height} = event.nativeEvent.layout;
    setHeight(height / 2);
  };

  const handleRefresh = () => {
    setIsRefreshing(true);

    Haptics.trigger('impactLight', {
      enableVibrateFallback: true,
      ignoreAndroidSystemSettings: false,
    });

    setTimeout(() => {
      setIsRefreshing(false);
    }, 2000);
  };

  const {data, isPending, isError} = useQueryTodosAPI();
  console.log('data>>', data);

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

        <FlashList
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
            <RefreshControl
              refreshing={isRefreshing}
              onRefresh={handleRefresh}
            />
          }
          onRefresh={handleRefresh}
          refreshing={isRefreshing}
          scrollIndicatorInsets={{right: 1}}
          indicatorStyle="black"
        />
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
});
