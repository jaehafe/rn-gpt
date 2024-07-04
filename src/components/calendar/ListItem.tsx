import {StyleSheet, Text, View} from 'react-native';
import React, {Dispatch, SetStateAction} from 'react';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {CalendarEventReadable} from 'react-native-calendar-events';
import dayjs from 'dayjs';
import SwipeableRow from './SwipeableRow';

interface ListItemProps {
  item: CalendarEventReadable;
  selectedEvent: CalendarEventReadable | null;
  setSelectedEvent: Dispatch<SetStateAction<CalendarEventReadable | null>>;
  selectEvent: (event: CalendarEventReadable) => void;
  removeEvent: (id: string) => Promise<void>;
}

export default function ListItem({
  item,
  selectedEvent,
  setSelectedEvent,
  selectEvent,
  removeEvent,
}: ListItemProps) {
  return (
    <SwipeableRow selectedId={item.id} removeEvent={() => removeEvent(item.id)}>
      <TouchableOpacity
        onPress={() => {
          if (item.id === selectedEvent?.id) {
            setSelectedEvent(null);
          } else {
            selectEvent(item);
          }
        }}
      >
        <View style={styles.eventItem}>
          <Text>{item.title}</Text>
          <Text>{dayjs(item.startDate).format('YYYY-MM-DD HH:mm')}</Text>
        </View>
      </TouchableOpacity>
    </SwipeableRow>
  );
}

const styles = StyleSheet.create({
  eventItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
  },
});
