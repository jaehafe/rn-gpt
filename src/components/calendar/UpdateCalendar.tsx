import {
  Alert,
  Button,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  FlatList,
} from 'react-native';
import React, {useState} from 'react';

import Ionicons from 'react-native-vector-icons/Ionicons';
import {addToCalendar} from './helpers/calendar-method';
import dayjs, {Dayjs} from 'dayjs';
import DateTimePicker, {
  DateTimePickerEvent,
} from '@react-native-community/datetimepicker';
import {EventType} from './helpers/event-type';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import RNCalendarEvents from 'react-native-calendar-events';

export default function UpdateCalendar() {
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [location, setLocation] = useState<string>('');
  const [link, setLink] = useState<string>('');
  const [startTime, setStartTime] = useState<Dayjs | null>(null);
  const [endTime, setEndTime] = useState<Dayjs | null>(null);
  const [eventId, setEventId] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(null);
  const [events, setEvents] = useState<any[]>([]);

  const [isDatePickerVisible, setDatePickerVisible] = useState<boolean>(false);
  const [isStartPickerVisible, setStartPickerVisible] =
    useState<boolean>(false);
  const [isEndPickerVisible, setEndPickerVisible] = useState<boolean>(false);

  const handleConfirmDate = async (date: Date) => {
    setSelectedDate(dayjs(date));
    setDatePickerVisible(false);
    await fetchEvents(dayjs(date));
  };

  const handleConfirmStartTime = (date: Date) => {
    setStartTime(dayjs(date));
    setStartPickerVisible(false);
  };

  const handleConfirmEndTime = (date: Date) => {
    setEndTime(dayjs(date));
    setEndPickerVisible(false);
  };

  const fetchEvents = async (date: Dayjs) => {
    try {
      const startOfDay = date.startOf('day').toISOString();
      const endOfDay = date.endOf('day').toISOString();
      const fetchedEvents = await RNCalendarEvents.fetchAllEvents(
        startOfDay,
        endOfDay,
      );
      setEvents(fetchedEvents);
      if (fetchedEvents.length === 0) {
        Alert.alert('No Events', 'No events found for the selected date.');
      }
    } catch (error) {
      console.error('Failed to fetch events', error);
    }
  };

  const selectEvent = (event: any) => {
    setEventId(event.id);
    setTitle(event.title);
    setDescription(event.notes);
    setLocation(event.location);
    setLink(event.url);
    setStartTime(dayjs(event.startDate));
    setEndTime(dayjs(event.endDate));
  };

  const handleUpdateEvent = async () => {
    if (!startTime || !endTime) {
      Alert.alert('Error', 'Please select both start and end times.');
      return;
    }

    if (!eventId) {
      Alert.alert('Error', 'No event selected to update.');
      return;
    }

    const updatedEvent = {
      id: eventId, // 기존 이벤트 ID를 사용하여 업데이트
      title,
      startDate: startTime.toISOString(),
      endDate: endTime.toISOString(),
      notes: description,
      location,
      url: link,
    };

    try {
      await RNCalendarEvents.saveEvent(eventId, updatedEvent); // 기존 이벤트 ID로 업데이트
      Alert.alert('Success', 'Event has been updated successfully.');
    } catch (error) {
      Alert.alert('Error', 'Failed to update event.');
      console.error('Failed to update event', error);
    }
  };

  return (
    <View style={styles.container}>
      <Button title="Select Date" onPress={() => setDatePickerVisible(true)} />
      <TextInput
        style={styles.input}
        placeholder="Title"
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        style={styles.input}
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
      />
      <TextInput
        style={styles.input}
        placeholder="Location"
        value={location}
        onChangeText={setLocation}
      />
      <TextInput
        style={styles.input}
        placeholder="Link"
        value={link}
        onChangeText={setLink}
      />
      <TextInput
        style={styles.input}
        placeholder="Start Time"
        value={startTime ? startTime.format('YYYY-MM-DD HH:mm') : ''}
        editable={false}
        onPressIn={() => setStartPickerVisible(true)}
      />
      <TextInput
        style={styles.input}
        placeholder="End Time"
        value={endTime ? endTime.format('YYYY-MM-DD HH:mm') : ''}
        editable={false}
        onPressIn={() => setEndPickerVisible(true)}
      />
      <Button title="Update Event" onPress={handleUpdateEvent} />

      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirmDate}
        onCancel={() => setDatePickerVisible(false)}
      />
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

      {events.length > 0 && (
        <FlatList
          data={events}
          keyExtractor={item => item.id}
          renderItem={({item}) => (
            <TouchableOpacity onPress={() => selectEvent(item)}>
              <View style={styles.eventItem}>
                <Text>{item.title}</Text>
                <Text>{dayjs(item.startDate).format('YYYY-MM-DD HH:mm')}</Text>
              </View>
            </TouchableOpacity>
          )}
        />
      )}
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
  eventItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
  },
});
