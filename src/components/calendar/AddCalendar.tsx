import {Alert, Button, StyleSheet, TextInput, View} from 'react-native';
import React, {useState} from 'react';

import {addToCalendar} from './helpers/calendar-method';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

import {EventType} from './helpers/event-type';

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

    const result = await addToCalendar(event as EventType);

    if (result) {
      Alert.alert('저장 완료', '캘린더에 저장되었습니다.');
    } else {
      Alert.alert('저장 실패', '캘린더에 저장하는데 실패했습니다.');
    }
  };

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
      <TextInput
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
      />
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
});
