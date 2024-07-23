import {Button, StyleSheet, Text, View} from 'react-native';
import React, {PropsWithChildren, useCallback, useMemo, useRef} from 'react';
import {CompositeScreenProps} from '@react-navigation/native';
import {StackScreenProps} from '@react-navigation/stack';
import {
  MainDrawerParamList,
  MainStackParamList,
} from '@/navigations/drawer/ChatDrawerNavigator';
import {DrawerScreenProps} from '@react-navigation/drawer';

import {BottomSheetBackdrop, BottomSheetModal} from '@gorhom/bottom-sheet';
import Colors from '@/constants/Colors';

import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {Gesture, GestureDetector} from 'react-native-gesture-handler';

export type ChatDetailScreenProps = CompositeScreenProps<
  StackScreenProps<MainStackParamList>,
  DrawerScreenProps<MainDrawerParamList>
>;

const AnimatedText = ({children}: PropsWithChildren) => {
  const scale = useSharedValue(1);
  const opacity = useSharedValue(1);

  const panGesture = Gesture.Pan()
    .onBegin(() => {
      scale.value = withTiming(0.95, {duration: 100});
      opacity.value = withTiming(0.7, {duration: 100});
    })
    .onFinalize(() => {
      scale.value = withTiming(1, {duration: 100});
      opacity.value = withTiming(1, {duration: 100});
    });

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{scale: scale.value}],
      opacity: opacity.value,
      padding: 8,
      borderWidth: 1,
      borderRadius: 16,
    };
  });

  return (
    <GestureDetector gesture={panGesture}>
      <Animated.Text style={[styles.text, animatedStyle]}>
        {children}
      </Animated.Text>
    </GestureDetector>
  );
};

export default function ChatDetail({route, navigation}: ChatDetailScreenProps) {
  console.log('route.params', route.params);
  const snapPoints = useMemo(() => ['1%', '50%'], []);
  const bottomSheetRef = useRef<BottomSheetModal>(null);

  // const handleOpenBottomSheet = useCallback(() => {
  //   console.log('open??');

  //   bottomSheetRef.current?.present();
  // }, []);
  const handleOpenBottomSheet = useCallback(() => {
    bottomSheetRef.current?.present();
  }, []);

  const handleSheetChanges = useCallback((index: number) => {
    console.log('index>>', index);
  }, []);

  const renderBackdrop = useCallback(
    (props: any) => (
      <BottomSheetBackdrop
        {...props}
        pressBehavior="close"
        appearsOnIndex={0}
        disappearsOnIndex={-1}
        onPress={() => {
          bottomSheetRef.current?.close();
        }}
      />
    ),
    [],
  );

  return (
    <View style={styles.container}>
      <Text>{route.params?.id}</Text>
      <Text>{route.params?.title}</Text>
      <Button title="Open bottom sheet" onPress={handleOpenBottomSheet} />

      <BottomSheetModal
        ref={bottomSheetRef}
        index={1}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}
        enablePanDownToClose={true}
        enableDismissOnClose={true}
        handleIndicatorStyle={{backgroundColor: Colors.grey}}
        style={styles.sheetContainer}
        backdropComponent={renderBackdrop}
      >
        <View style={styles.contentContainer}>
          <View style={styles.contentWrapper}>
            <AnimatedText>Click!!</AnimatedText>
            <AnimatedText>Click!!!!</AnimatedText>
            <AnimatedText>Click!!!!!</AnimatedText>
            <AnimatedText>Click!!!!!!!!</AnimatedText>
          </View>
        </View>
      </BottomSheetModal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    flexDirection: 'column',
    gap: 16,
  },
  sheetContainer: {
    backgroundColor: '#fff',
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 4,
    shadowOffset: {
      width: 1,
      height: 1,
    },
    borderRadius: 16,
    paddingHorizontal: 16,
  },
  contentWrapper: {
    flex: 1,
    paddingVertical: 16,

    gap: 16,
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});
