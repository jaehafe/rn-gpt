import RNCalendarEvents from 'react-native-calendar-events';
import {Alert, Linking, PermissionsAndroid, Platform} from 'react-native';
import {EventType} from './event-type';

const addToCalendar = async (event: EventType): Promise<boolean> => {
  try {
    const authStatus = await requestCalendarAccess();

    if (!authStatus) {
      return false;
    }

    const calendars = await loadCalendars();
    if (calendars.length === 0) {
      console.error('No primary calendar found');
      return false;
    }

    const primaryCalendarId = calendars[0];
    return await saveEventToCalendar(event, primaryCalendarId);
  } catch (error) {
    console.error('error>>>', error);
    return false;
  }
};

const saveEventToCalendar = async (
  event: EventType,
  calendarId: string,
): Promise<boolean> => {
  try {
    const result = await RNCalendarEvents.saveEvent(event.title, {
      calendarId: calendarId,
      location: event.location,
      startDate: event.startDate,
      endDate: event.endDate,
      description: event.description,
      url: event.url,
    });

    console.log('save result>>', result);
    return true;
  } catch (err) {
    console.error(err);
    return false;
  }
};

const promptSettings = async (): Promise<void> => {
  if (Platform.OS === 'ios') {
    Alert.alert(
      'Calendar Access Required',
      'We need access to your calendar to add events. Please enable it in Settings.',
      [
        {
          text: "Don't Allow",
          onPress: () => console.log('Calendar access denied'),
          style: 'cancel',
        },
        {text: 'Open Settings', onPress: () => Linking.openSettings()},
      ],
    );
  } else if (Platform.OS === 'android') {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_CALENDAR,
        {
          title: 'Calendar Access Required',
          message: 'We need access to your calendar to add events.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('Calendar permission granted');
      } else {
        console.log('Calendar permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  }
};

const requestCalendarAccess = async (): Promise<boolean> => {
  try {
    const status = await RNCalendarEvents.requestPermissions();
    return status === 'authorized';
  } catch (err) {
    console.error('Error requesting calendar access:', err);
    return false;
  }
};

const loadCalendars = async (): Promise<string[]> => {
  try {
    const calendars = await RNCalendarEvents.findCalendars();
    console.log('calendars>>', calendars);

    // iOS에서는 기본 캘린더를, Android에서는 주 캘린더를 선택합니다.
    const primaryCalendars = calendars.filter(c =>
      Platform.OS === 'ios'
        ? c.isPrimary
        : c.isPrimary && c.type === 'com.google',
    );

    return primaryCalendars.map(c => c.id);
  } catch (e) {
    console.error('Error loading calendars:', e);
    return [];
  }
};

export {addToCalendar, promptSettings, requestCalendarAccess, loadCalendars};
