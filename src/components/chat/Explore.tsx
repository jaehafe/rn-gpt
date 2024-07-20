import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';

import {RngptSharedDefaults} from '@/native-modules/widget';

export default function Explore() {
  const rngptModules = new RngptSharedDefaults();

  const todo = 'data 동적 추가 reloadAllTimelines';

  useEffect(() => {
    const updateWidget = async () => {
      try {
        const widgetData = {rngptWidgetData: JSON.stringify({todo: todo})};
        await rngptModules.set(widgetData);

        console.log('Widget data updated:', widgetData);
      } catch (error) {
        console.error('Failed to update widget:', error);
      }
    };

    if (todo) {
      updateWidget();
    }
  }, [todo]);

  return (
    <View>
      <Text>{'data'}</Text>
    </View>
  );
}

const styles = StyleSheet.create({});
