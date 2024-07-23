import {Easing, StyleSheet, Text, View} from 'react-native';
import React, {
  PropsWithChildren,
  useCallback,
  useMemo,
  useRef,
  useState,
} from 'react';
import {CompositeScreenProps} from '@react-navigation/native';
import {StackScreenProps} from '@react-navigation/stack';
import {
  MainDrawerParamList,
  MainStackParamList,
} from '@/navigations/drawer/ChatDrawerNavigator';
import {DrawerScreenProps} from '@react-navigation/drawer';
import Button from '../ui/Button';

import BottomSheet from '@gorhom/bottom-sheet';
import Colors from '@/constants/Colors';

import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
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
  const bottomSheetRef = useRef<BottomSheet>(null);
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenBottomSheet = useCallback(() => {
    bottomSheetRef.current?.expand();
    setIsOpen(true);
  }, []);

  const handleSheetChanges = useCallback((index: number) => {
    if (index === -1) {
      setIsOpen(false);
    }
  }, []);

  return (
    <View style={styles.container}>
      <Text>{route.params?.id}</Text>
      <Text>{route.params?.title}</Text>
      <Button onPress={handleOpenBottomSheet}>bottom sheet</Button>

      <BottomSheet
        ref={bottomSheetRef}
        index={isOpen ? 1 : -1}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}
        enablePanDownToClose={true}
        handleIndicatorStyle={{backgroundColor: Colors.grey}}
        style={styles.sheetContainer}
      >
        <View style={styles.contentContainer}>
          <AnimatedText>123asdasd</AnimatedText>
          <AnimatedText>12asdasd3</AnimatedText>
          <AnimatedText>12asdasd3</AnimatedText>
        </View>
      </BottomSheet>
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
    borderWidth: 2,
    paddingHorizontal: 16,
  },

  text: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});
