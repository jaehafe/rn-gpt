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
import React from 'react';

import dayjs from 'dayjs';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import useCalendar from './hooks/useCalendar';

export default function UpdateCalendar() {
  const {
    events,
    //
    selectedEvent,
    setSelectedEvent,
    //
    datePickerState,
    startDateState,
    endDateState,
    //
    handleConfirmDate,
    handleConfirmStartTime,
    handleConfirmEndTime,
    handleUpdateEvent,
    removeEvent,
    selectEvent,
  } = useCalendar();

  return (
    <View style={styles.container}>
      <Button title="Select Date" onPress={datePickerState.open} />
      <TextInput
        style={styles.input}
        placeholder="Title"
        value={selectedEvent?.title}
        onChangeText={text => {
          console.log('text>>', text);
          setSelectedEvent(prev => (prev ? {...prev, title: text} : null));
        }}
      />
      <TextInput
        style={styles.input}
        placeholder="Description"
        value={selectedEvent?.description}
        onChangeText={text =>
          setSelectedEvent(prev => (prev ? {...prev, description: text} : null))
        }
      />
      <TextInput
        style={styles.input}
        placeholder="Location"
        value={selectedEvent?.location}
        // onChangeText={setLocation}
        onChangeText={text =>
          setSelectedEvent(prev => (prev ? {...prev, location: text} : null))
        }
      />
      <TextInput
        style={styles.input}
        placeholder="Link"
        value={selectedEvent?.url}
        // onChangeText={setLink}
        onChangeText={text =>
          setSelectedEvent(prev => {
            if (prev) {
              return {
                ...prev,
                links: [text],
              };
            }
            return null;
          })
        }
      />
      <TextInput
        style={styles.input}
        placeholder="Start Time"
        value={selectedEvent?.startDate ? selectedEvent?.startDate : ''}
        editable={false}
        onPressIn={startDateState.open}
      />
      <TextInput
        style={styles.input}
        placeholder="End Time"
        value={selectedEvent?.endDate ? selectedEvent?.endDate : ''}
        editable={false}
        onPressIn={endDateState.open}
      />
      <Button title="Update Event" onPress={handleUpdateEvent} />

      <DateTimePickerModal
        isVisible={datePickerState.isVisible}
        mode="date"
        onConfirm={handleConfirmDate}
        onCancel={datePickerState.close}
      />
      <DateTimePickerModal
        isVisible={startDateState.isVisible}
        mode="datetime"
        onConfirm={handleConfirmStartTime}
        onCancel={startDateState.close}
      />
      <DateTimePickerModal
        isVisible={endDateState.isVisible}
        mode="datetime"
        onConfirm={handleConfirmEndTime}
        onCancel={endDateState.close}
      />

      {events.length > 0 && (
        <FlatList
          data={events}
          keyExtractor={item => item.id}
          renderItem={({item}) => {
            return (
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
                  <Text>
                    {dayjs(item.startDate).format('YYYY-MM-DD HH:mm')}
                  </Text>
                </View>
              </TouchableOpacity>
            );
          }}
        />
      )}

      <View>
        <Text>selected date id</Text>
        <Text>{selectedEvent?.id}</Text>
      </View>
      <Button title="Remove Event" onPress={removeEvent} />
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
