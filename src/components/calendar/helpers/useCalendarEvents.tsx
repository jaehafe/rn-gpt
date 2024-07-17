import {useCallback, useEffect, useState} from 'react';
import {Platform} from 'react-native';
import RNCalendarEvents, {
  CalendarEventReadable,
  CalendarEventWritable,
  Options,
} from 'react-native-calendar-events';
// import {formatRFC3339, addMonths} from 'date-fns';

const NOW = new Date();
// const IN_ONE_MONTH = addMonths(NOW, 1);

type UseCalendarEventsProps = {
  phoneCalendars: string[];
  loadEvents: (
    startDate: Date,
    endDate: Date,
  ) => Promise<CalendarEventReadable[]>;
  saveEventToCalendar: (
    title: string,
    details: CalendarEventWritable,
    options?: Options,
  ) => Promise<void>;
  transformDate: (date: Date) => string | undefined;
  loadError?: Error;
  saveError?: Error;
};

// results is undefined on the iOS sim.
// use a device to test calendar access
async function requestCalendarAccess(): Promise<boolean> {
  try {
    await RNCalendarEvents.checkPermissions(false);
    const res = await RNCalendarEvents.requestPermissions(false);
    return res === 'authorized';
  } catch (error) {
    return false;
  }
}

/*
 * This function will return ALL of the calendars saved in your phone
 * The idea is to return only YOUR calendar, exclusing birthdays, holidays
 * and subscribed calendars.
 * */

export const loadCalendars = async () => {
  try {
    await requestCalendarAccess();
    const calendars = await RNCalendarEvents.findCalendars();
    return calendars?.filter(c => c?.isPrimary)?.map(c => c?.id);
  } catch (e) {
    return [];
  }
};

export function useCalendarEvents(): UseCalendarEventsProps {
  const [saveError, setSaveError] = useState<Error>();
  const [loadError, setLoadError] = useState<Error>();
  const [permissionGranted, setGranted] = useState<boolean>(false);
  const [phoneCalendars, setCalendars] = useState<string[]>([]);

  useEffect(() => {
    requestCalendarAccess().then(granted => setGranted(granted));
  }, []);

  useEffect(() => {
    loadCalendars()
      .then((results: string[]) => {
        setCalendars(results);
      })
      .catch(e => setLoadError(e));
  }, []);

  const transformDate = useCallback((date: Date) => {
    return Platform.select({
      // ios: formatRFC3339(date, {fractionDigits: 3}),
      android: date.toISOString(),
    });
  }, []);

  const loadEvents = useCallback(
    async (startDate: Date = NOW, endDate: Date) => {
      const pg = await requestCalendarAccess();
      if (!pg) {
        return [];
      }

      const sd = transformDate(startDate);
      const ed = transformDate(endDate);

      if (sd && ed) {
        return RNCalendarEvents.fetchAllEvents(sd, ed, phoneCalendars);
      } else {
        return [];
      }
    },
    [transformDate, phoneCalendars],
  );

  const saveEventToCalendar = useCallback(
    async (
      title: string,
      details: CalendarEventWritable,
      options?: Options,
    ) => {
      try {
        if (permissionGranted) {
          // you need the calendar ID so the event is actually saved+displayed.
          const calendarId = phoneCalendars[0];
          await RNCalendarEvents.saveEvent(
            title,
            {...details, calendarId},
            {
              ...options,
            },
          );
        }
      } catch (error) {
        setSaveError(error as Error);
      }
    },
    [permissionGranted, phoneCalendars],
  );

  return {
    phoneCalendars,
    loadEvents,
    saveEventToCalendar,
    transformDate,
    loadError,
    saveError,
  };
}
