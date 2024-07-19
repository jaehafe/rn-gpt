import {
  Button,
  StyleSheet,
  Text,
  TextInput,
  View,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import React from 'react';

import DateTimePickerModal from 'react-native-modal-datetime-picker';
import useCalendar from './hooks/useCalendar';
import ListItem from './ListItem';
import dayjs from 'dayjs';

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
        onChangeText={text =>
          setSelectedEvent(prev => (prev ? {...prev, title: text} : null))
        }
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
        onChangeText={text =>
          setSelectedEvent(prev => (prev ? {...prev, location: text} : null))
        }
      />
      <TextInput
        style={styles.input}
        placeholder="Link"
        value={selectedEvent?.url}
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
      <TouchableOpacity onPress={startDateState.open}>
        <Text style={styles.datePickerText}>
          {selectedEvent?.startDate
            ? dayjs(selectedEvent.startDate).format('YYYY-MM-DD HH:mm')
            : ''}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={endDateState.open}>
        <Text style={styles.datePickerText}>
          {selectedEvent?.endDate
            ? dayjs(selectedEvent.endDate).format('YYYY-MM-DD HH:mm')
            : ''}
        </Text>
      </TouchableOpacity>

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
              <ListItem
                item={item}
                events={events}
                selectedEvent={selectedEvent}
                setSelectedEvent={setSelectedEvent}
                selectEvent={selectEvent}
                removeEvent={removeEvent}
              />
            );
          }}
        />
      )}

      {/* <View>
        <Text>selected date id</Text>
        <Text>{selectedEvent?.id}</Text>
      </View>
      <Button title="Remove Event" onPress={removeEvent(selectEvent.id)} /> */}
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
