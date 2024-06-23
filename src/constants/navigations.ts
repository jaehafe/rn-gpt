const authNavigation = {
  AUTH_HOME: 'AuthHome',
  LOGIN: 'Login',
} as const;

const chatNavigation = {
  NEW: 'New',
  DALLE: 'Dalle',
  EXPLORE: 'Explore',
  MAIN_HOME: 'MainHome',
} as const;

const mainNavigation = {
  DRAWER: 'Drawer',
  SETTINGS: 'Settings',
} as const;

export {authNavigation, chatNavigation, mainNavigation};
