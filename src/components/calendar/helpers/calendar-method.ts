import RNCalendarEvents, {
  CalendarEventWritable,
  Options,
} from 'react-native-calendar-events';
import {Alert, Linking, PermissionsAndroid, Platform} from 'react-native';
import {EventType} from './event-type';

const addToCalendar = async (event: EventType): Promise<boolean> => {
  try {
    const authCode = await RNCalendarEvents.checkPermissions(false);

    const authStatus =
      authCode === 'authorized' ? true : await requestCalendarAccess();

    if (!authStatus) {
      return false;
    }

    return await saveEventToCalendar(event);
  } catch (error) {
    // Sentry.captureException(error)
    console.error('error>>>', error);
    return false;
  }
};

// const is_Calender_Permission_Granted = await PermissionsAndroid.check(
//   'android.permission.WRITE_CALENDAR',
// );
// if (!is_Calender_Permission_Granted) {
//   const granted = await PermissionsAndroid.request(
//     PermissionsAndroid.PERMISSIONS.WRITE_CALENDAR,
//     {
//       title: 'ClashHub Needs Calender Permission',
//       message: 'So We can Notify you before the Match',
//       buttonNegative: 'Cancel',
//       buttonPositive: 'OK',
//     },
//   );
// }

const saveEventToCalendar = async (event: EventType): Promise<boolean> => {
  try {
    const result = await RNCalendarEvents.saveEvent(event.title, {
      location: event.location,
      startDate: event.startDate,
      endDate: event.endDate,
      description: event.description,
    });

    console.log('save result>>', result);

    return true;
  } catch (err) {
    // Sentry.captureException(err)
    console.error(err);
    return false;
  }
};

const promptSettings = async (): Promise<void> => {
  if (Platform.OS === 'ios') {
    Alert.alert(
      '"All About Olaf" Would Like to Access Your Calendar',
      `We use your calendar to add events to your calendar so that you remember
       what you wanted to attend.`,
      [
        {
          text: "Don't Allow",
          onPress: () => console.log('cancel pressed'),
          style: 'cancel',
        },
        {text: 'Settings', onPress: () => Linking.openURL('app-settings:')},
      ],
    );
  } else if (Platform.OS === 'android') {
    console.log('123');

    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_CALENDAR,
        {
          title: '"All About Olaf" Calendar Access',
          message:
            'We use your calendar to add events to your calendar so that you remember what you wanted to attend.',
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
  let status = null;
  try {
    status = await RNCalendarEvents.requestPermissions(false);
  } catch (err) {
    return false;
  }

  if (status !== 'authorized') {
    return promptSettings() === undefined;
  }

  return true;
};

export {addToCalendar, promptSettings, requestCalendarAccess};
