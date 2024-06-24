import {Dayjs} from 'dayjs';

export type EventType = {
  readonly title: string;
  readonly description: string;
  readonly location: string;
  readonly startTime: Dayjs;
  readonly endTime: Dayjs;
  readonly isOngoing: boolean;
  readonly links: Array<string>;
  readonly config: {
    readonly startTime: boolean;
    readonly endTime: boolean;
    readonly subtitle: 'location' | 'description';
  };
};
