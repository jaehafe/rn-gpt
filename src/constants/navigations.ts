const authNavigation = {
  AUTH_HOME: 'AuthHome',
  LOGIN: 'Login',
} as const;

const chatNavigation = {
  NEW: 'New',
  DALLE: 'Dalle',
  EXPLORE: 'Explore',
  MAIN_HOME: 'MainHome',
  DETAIL: 'Detail',
  PUSH: 'Push',
  CALENDAR: 'Calendar',
  SWIPEABLE_ROWS: 'SwipeableRows',
} as const;

const mainNavigation = {
  DRAWER: 'Drawer',
  SETTINGS: 'Settings',
} as const;

export {authNavigation, chatNavigation, mainNavigation};
