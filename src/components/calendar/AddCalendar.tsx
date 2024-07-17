import {
  Alert,
  Button,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import RNCalendarEvents from 'react-native-calendar-events';

import DateTimePickerModal from 'react-native-modal-datetime-picker';

import {EventType} from './helpers/event-type';
import {addToCalendar} from './helpers/calendar-method';
import ReactNativeCalendarEvents from 'react-native-calendar-events';

export default function AddCalendar() {
  const [event, setEvent] = useState<EventType | null>({
    title: '',
    description: '',
    location: '',
    url: '',
    startDate: '',
    endDate: '',
  });
  console.log('event???', event);

  const [isStartPickerVisible, setStartPickerVisible] =
    useState<boolean>(false);
  const [isEndPickerVisible, setEndPickerVisible] = useState<boolean>(false);

  const handleConfirmStartTime = (date: Date) => {
    setEvent(prev => (prev ? {...prev, startDate: date.toISOString()} : null));
    setStartPickerVisible(false);
  };

  const handleConfirmEndTime = (date: Date) => {
    setEvent(prev => (prev ? {...prev, endDate: date.toISOString()} : null));
    setEndPickerVisible(false);
  };

  const handleAddToCalendar = async () => {
    if (!event?.startDate || !event?.endDate) {
      Alert.alert('Please select both start and end times.');
      return;
    }

    const a = await ReactNativeCalendarEvents.findCalendars();
    console.log('a>>', a);

    const result = await addToCalendar(event as EventType);

    if (result) {
      Alert.alert('저장 완료', '캘린더에 저장되었습니다.');
    } else {
      Alert.alert('저장 실패', '캘린더에 저장하는데 실패했습니다.');
    }
  };
  // const handleAddToCalendar = async () => {
  //   try {
  //     if (!event?.startDate || !event?.endDate || !event?.title) {
  //       Alert.alert(
  //         'Missing Information',
  //         'Please fill in all required fields (title, start time, and end time).',
  //       );
  //       return;
  //     }

  //     console.log('Calling addToCalendar with event:', event);
  //     const result = await addToCalendar(event as EventType);
  //     console.log('result>>', result);

  //     if (result) {
  //       Alert.alert('Success', 'Event has been added to your calendar.');
  //       setEvent({
  //         title: '',
  //         description: '',
  //         location: '',
  //         url: '',
  //         startDate: '',
  //         endDate: '',
  //       });
  //     } else {
  //       Alert.alert(
  //         'Failed',
  //         'Failed to add event to your calendar. Please try again.',
  //       );
  //     }
  //   } catch (error) {
  //     console.error('Error in handleAddToCalendar:', error);
  //     Alert.alert('Error', 'An unexpected error occurred. Please try again.');
  //   }
  // };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Title"
        value={event?.title}
        onChangeText={text => {
          setEvent(prev => (prev ? {...prev, title: text} : null));
        }}
      />
      <TextInput
        style={styles.input}
        placeholder="Description"
        value={event?.description}
        onChangeText={text => {
          setEvent(prev => (prev ? {...prev, description: text} : null));
        }}
      />
      <TextInput
        style={styles.input}
        placeholder="Location"
        value={event?.location}
        onChangeText={text => {
          setEvent(prev => (prev ? {...prev, location: text} : null));
        }}
      />
      <TextInput
        style={styles.input}
        placeholder="Link"
        value={event?.url}
        onChangeText={text => {
          setEvent(prev => (prev ? {...prev, url: text} : null));
        }}
      />
      {/* <TextInput
        style={styles.input}
        placeholder="Start Time"
        value={event?.startDate}
        editable={false}
        onPressIn={() => setStartPickerVisible(true)}
      />
      <TextInput
        style={styles.input}
        placeholder="End Time"
        value={event?.endDate}
        editable={false}
        onPressIn={() => setEndPickerVisible(true)}
      /> */}

      <TouchableOpacity onPress={() => setStartPickerVisible(true)}>
        <Text style={styles.datePickerText}>
          {event?.startDate || 'Select Start Time'}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => setEndPickerVisible(true)}>
        <Text style={styles.datePickerText}>
          {event?.endDate || 'Select End Time'}
        </Text>
      </TouchableOpacity>

      <Button title="Add to Calendar" onPress={handleAddToCalendar} />

      <DateTimePickerModal
        isVisible={isStartPickerVisible}
        mode="datetime"
        onConfirm={handleConfirmStartTime}
        onCancel={() => setStartPickerVisible(false)}
      />
      <DateTimePickerModal
        isVisible={isEndPickerVisible}
        mode="datetime"
        onConfirm={handleConfirmEndTime}
        onCancel={() => setEndPickerVisible(false)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
  },

  datePickerText: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 10,
  },
});
