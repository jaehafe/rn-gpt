import {
  Image,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useState} from 'react';
import MessageInput from './MessageInput';
import {defaultStyles} from '@/constants/Styles';
import {FlashList} from '@shopify/flash-list';

export default function ChatGPT3() {
  const [height, setHeight] = useState(0);

  const handleLayout = (event: any) => {
    const {height} = event.nativeEvent.layout;
    setHeight(height / 2);
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
          <Image
            source={require('@/assets/images/logo-white.png')}
            style={styles.image}
          />
        </View>

        <FlashList
          data={[]}
          renderItem={({item}) => {}}
          estimatedItemSize={400}
          contentContainerStyle={{paddingTop: 30, paddingBottom: 150}}
          keyboardDismissMode="on-drag"
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
