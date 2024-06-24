import {Linking} from 'react-native';
import CalendarEvents from 'react-native-calendar-events';
import dayjs from 'dayjs';

// import { calendarIosFail } from './flashAlertMessage';

export const addToIosCalendar = async (
  title: string,
  startDate: any,
  endDate: any,
  location: string,
  url: string,
) => {
  // iOS: Requires # of seconds from January 1 2001 of the date you want to open calendar on
  const referenceDate = dayjs('2024-06-23');
  const secondsSinceRefDateiOS = startDate - referenceDate.unix();
  try {
    await CalendarEvents.requestPermissions(true);
    await CalendarEvents.checkPermissions(true);
    const response = await CalendarEvents.saveEvent(title, {
      startDate: startDate.toISOString,
      endDate: endDate.toISOString,
      location: location,
      notes: title,
      url: url,
      alarms: [{date: startDate.toISOString() - 6000}],
    });

    console.log('response>>', response);

    // console.log('a>>', a);

    // Linking.openURL(`calshow:${secondsSinceRefDateiOS}`);
  } catch (error) {
    // showMessage(calendarIosFail);
    console.log('error>>', error);

    return null;
  }
};
