import {ISODateString} from 'react-native-calendar-events';

export type EventType = {
  readonly title: string;
  readonly description: string;
  readonly location: string;
  readonly url: string;
  readonly startDate: ISODateString;
  readonly endDate: ISODateString;
};
