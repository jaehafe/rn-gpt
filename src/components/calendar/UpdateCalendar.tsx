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

import dayjs, {Dayjs} from 'dayjs';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import RNCalendarEvents, {
  CalendarEventReadable,
} from 'react-native-calendar-events';

export default function UpdateCalendar() {
  const [events, setEvents] = useState<CalendarEventReadable[]>([]);

  const [selectedEvent, setSelectedEvent] =
    useState<CalendarEventReadable | null>(null);

  const [isDatePickerVisible, setDatePickerVisible] = useState<boolean>(false);
  const [isStartPickerVisible, setStartPickerVisible] =
    useState<boolean>(false);
  const [isEndPickerVisible, setEndPickerVisible] = useState<boolean>(false);

  const handleConfirmDate = async (date: Date) => {
    setDatePickerVisible(false);
    await fetchEvents(dayjs(date));
  };

  const handleConfirmStartTime = (date: Date) => {
    setSelectedEvent(
      selectedEvent
        ? {
            ...selectedEvent,
            startDate: dayjs(date) as unknown as string,
          }
        : null,
    );
    setStartPickerVisible(false);
  };

  const handleConfirmEndTime = (date: Date) => {
    setSelectedEvent(
      selectedEvent
        ? {
            ...selectedEvent,
            endDate: dayjs(date) as unknown as string,
          }
        : null,
    );
    setEndPickerVisible(false);
  };

  const fetchEvents = async (date: Dayjs) => {
    try {
      const startDate = date.startOf('day').toISOString();
      const endDate = date.endOf('day').toISOString();
      const fetchedEvents = await RNCalendarEvents.fetchAllEvents(
        startDate,
        endDate,
      );
      setEvents(fetchedEvents);
      if (fetchedEvents.length === 0) {
        Alert.alert('No Events', 'No events found for the selected date.');
      }
    } catch (error) {
      console.error('Failed to fetch events', error);
    }
  };

  const selectEvent = (event: CalendarEventReadable) => {
    setSelectedEvent({
      ...event,
      id: event.id,
      startDate: dayjs(event.startDate) as unknown as string,
      endDate: dayjs(event.endDate) as unknown as string,
    });
  };

  const removeEvent = async () => {
    if (!selectedEvent?.id) {
      Alert.alert('Error', 'No event selected to remove.');
      return;
    }

    try {
      await RNCalendarEvents.removeEvent(selectedEvent.id);
      Alert.alert('Success', 'Event has been removed successfully.');
      setSelectedEvent(null);
    } catch (error) {
      Alert.alert('Error', 'Failed to remove event.');
      console.error('Failed to remove event', error);
    }
  };

  const handleUpdateEvent = async () => {
    if (!selectedEvent?.startDate || !selectedEvent.endDate) {
      Alert.alert('Error', 'Please select both start and end times.');
      return;
    }

    if (!selectedEvent.id) {
      Alert.alert('Error', 'No event selected to update.');
      return;
    }

    const updatedEvent: CalendarEventReadable = {
      id: selectedEvent.id,
      title: selectedEvent.title,
      startDate: selectedEvent.startDate,
      endDate: selectedEvent.endDate,
      notes: selectedEvent.description,
      location: selectedEvent.location,
      url: selectedEvent.url,
    };

    try {
      await RNCalendarEvents.saveEvent(updatedEvent.title, {
        ...updatedEvent,
        id: updatedEvent.id,
      });
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
        onPressIn={() => setStartPickerVisible(true)}
      />
      <TextInput
        style={styles.input}
        placeholder="End Time"
        value={selectedEvent?.endDate ? selectedEvent?.endDate : ''}
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
