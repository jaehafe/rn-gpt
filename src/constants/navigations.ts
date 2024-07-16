const authNavigation = {
  AUTH_HOME: 'AuthHome',
  LOGIN: 'Login',
  VERIFY_CODE: 'VerifyCode',
  GOOGLE_LOGIN: 'GoogleLogin',
} as const;

const chatNavigation = {
  NEW: 'New',
  DALLE: 'Dalle',
  EXPLORE: 'Explore',
  MAIN_HOME: 'MainHome',
  DETAIL: 'Detail',
  PUSH: 'Push',
  CALENDAR: 'Calendar',
  UPDATE_CALENDAR: 'UpdateCalendar',
  SWIPEABLE_ROWS: 'SwipeableRows',
  CAROUSEL: 'Carousel',
} as const;

const mainNavigation = {
  DRAWER: 'Drawer',
  SETTINGS: 'Settings',
} as const;

export {authNavigation, chatNavigation, mainNavigation};
