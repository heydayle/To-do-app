import {createContext} from 'react';

export const ErrContext = createContext(null);
// export const ScheduleContext = createContext(null);
export const CalendarContext = createContext({
  stateProvider: {},
  calendarProvider: {},
});

export const SelectMonthContext = createContext({});

export const PinnedContext = createContext({});
