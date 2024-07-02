import {Alert, Button, StyleSheet, TextInput, View} from 'react-native';
import React, {useState} from 'react';

import Ionicons from 'react-native-vector-icons/Ionicons';
import {addToCalendar} from './helpers/calendar-method';
import dayjs, {Dayjs} from 'dayjs';
import DateTimePicker, {
  DateTimePickerEvent,
} from '@react-native-community/datetimepicker';
import {EventType} from './helpers/event-type';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

export default function AddCalendar() {
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [location, setLocation] = useState<string>('');
  const [link, setLink] = useState<string>('');
  const [startTime, setStartTime] = useState<Dayjs | null>(null);
  const [endTime, setEndTime] = useState<Dayjs | null>(null);

  const [isStartPickerVisible, setStartPickerVisible] =
    useState<boolean>(false);
  const [isEndPickerVisible, setEndPickerVisible] = useState<boolean>(false);

  const handleConfirmStartTime = (date: Date) => {
    setStartTime(dayjs(date));
    setStartPickerVisible(false);
  };

  const handleConfirmEndTime = (date: Date) => {
    setEndTime(dayjs(date));
    setEndPickerVisible(false);
  };

  const handleAddToCalendar = async () => {
    if (!startTime || !endTime) {
      Alert.alert('Please select both start and end times.');
      return;
    }

    const event: EventType = {
      title,
      description,
      location,
      startTime,
      endTime,
      isOngoing: false,
      links: [link],
      config: {
        startTime: true,
        endTime: true,
        subtitle: 'location',
      },
    };

    const result = await addToCalendar(event);

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
