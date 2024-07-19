import React, {useState} from 'react';
import {useBooleanState} from '@/hooks/useBooleanState';
import {Alert} from 'react-native';

import RNCalendarEvents, {
  CalendarEventReadable,
} from 'react-native-calendar-events';
import dayjs, {Dayjs} from 'dayjs';

interface UseCalendarProps {}

export default function useCalendar() {
  const [events, setEvents] = useState<CalendarEventReadable[]>([]);
  const [selectedEvent, setSelectedEvent] =
    useState<CalendarEventReadable | null>(null);

  const datePickerState = useBooleanState();
  const startDateState = useBooleanState();
  const endDateState = useBooleanState();

  const handleConfirmDate = async (date: Date) => {
    datePickerState.close();

    await fetchEvents(dayjs(date));
  };

  const handleConfirmStartTime = (date: Date) => {
    setSelectedEvent(
      selectedEvent
        ? {
            ...selectedEvent,
            startDate: date.toISOString(),
          }
        : null,
    );

    startDateState.close();
  };

  const handleConfirmEndTime = (date: Date) => {
    setSelectedEvent(
      selectedEvent
        ? {
            ...selectedEvent,
            endDate: date.toISOString(),
          }
        : null,
    );

    endDateState.close();
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
      startDate: event.startDate,
      endDate: event.endDate,
    });
  };

  const removeEvent = async (id: string) => {
    if (!id) {
      Alert.alert('Error', 'No event selected to remove.');
      return;
    }

    try {
      await RNCalendarEvents.removeEvent(id);
      Alert.alert('Success', 'Event has been removed successfully.');
      setEvents(events.filter(event => event.id !== id));
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

  return {
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
    selectEvent,
    removeEvent,
    handleUpdateEvent,
  };
}
