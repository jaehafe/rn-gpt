import {StyleSheet, View} from 'react-native';
import React from 'react';

import Ionicons from 'react-native-vector-icons/Ionicons';
import {addToCalendar} from './helpers/calendar-method';
import dayjs from 'dayjs';

export default function AddCalendar() {
  return (
    <View>
      <Ionicons
        name={'calendar-outline'}
        size={24}
        onPress={() => {
          const shareUrl = 'url string for video stream here';

          addToCalendar({
            title: 'add calendar',
            description: 'description',
            location: 'location',
            startTime: dayjs('2024-06-23T10:00:00.000Z'),
            endTime: dayjs('2024-06-23T11:00:00.000Z'),
            isOngoing: false,
            links: [shareUrl],
            config: {
              startTime: true,
              endTime: true,
              subtitle: 'location',
            },
          });
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({});
