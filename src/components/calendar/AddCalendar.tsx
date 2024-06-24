import {StyleSheet, View} from 'react-native';
import React from 'react';

import Ionicons from 'react-native-vector-icons/Ionicons';
import {addToCalendar} from './helpers/calendar-method';
import dayjs from 'dayjs';
import {EventType} from './helpers/event-type';

export default function AddCalendar() {
  return (
    <View>
      <Ionicons
        name={'calendar-outline'}
        //  color={AppTheme.colors.primary}
        size={24}
        onPress={() => {
          const shareUrl = 'url string for video stream here';

          const event: EventType = {
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
          };

          addToCalendar(event);
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({});
