import AsyncStorage from '@react-native-async-storage/async-storage';
import * as React from 'react';

export interface AuthContextType {
  isLoggedInState: boolean | null;
  setAccessToken: (token: string) => Promise<void>;
  removeAccessToken: () => Promise<void>;
  setIsLoggedIn: (value: boolean) => Promise<void>;
  getIsLoggedIn: () => Promise<boolean | null>;
}

export const AuthContext = React.createContext<AuthContextType | null>(null);

/** Admin Context Provider */
export default function AuthContextProvider({
  children,
}: React.PropsWithChildren) {
  const subscribe = (key: string, callback: (value: string | null) => void) => {
    const checkValueChange = async () => {
      try {
        const value = await AsyncStorage.getItem(key);
        callback(value);
      } catch (error) {
        console.error('Error in subscribe:', error);
        callback(null);
      }
    };

    checkValueChange();
    const interval = setInterval(checkValueChange, 1000);

    return () => clearInterval(interval);
  };

  const [isLoggedInState, setIsLoggedInState] = React.useState<boolean | null>(
    null,
  );

  React.useEffect(() => {
    checkLoginStatus();
  }, []);

  const checkLoginStatus = async () => {
    try {
      const value = await getIsLoggedIn();
      setIsLoggedInState(value);
    } catch (error) {
      console.error('Error checking login status:', error);
      setIsLoggedInState(false);
    }
  };

  const setAccessToken = async (token: string) => {
    try {
      await AsyncStorage.setItem('accessToken', token);
    } catch (error) {
      console.error('Error setting access token:', error);
      throw error;
    }
  };

  const removeAccessToken = async () => {
    try {
      await AsyncStorage.removeItem('accessToken');
    } catch (error) {
      console.error('Error removing access token:', error);
      throw error;
    }
  };

  const setIsLoggedIn = async (value: boolean) => {
    try {
      await AsyncStorage.setItem('isLoggedIn', value.toString());
      setIsLoggedInState(value);
    } catch (error) {
      console.error('Error setting isLoggedIn:', error);
      throw error;
    }
  };

  const getIsLoggedIn = async (): Promise<boolean | null> => {
    try {
      const value = await AsyncStorage.getItem('isLoggedIn');
      return value === 'true' ? true : value === 'false' ? false : null;
    } catch (error) {
      console.error('Error getting isLoggedIn:', error);
      return null;
    }
  };

  const value: AuthContextType = {
    isLoggedInState,
    setAccessToken,
    removeAccessToken,
    setIsLoggedIn,
    getIsLoggedIn,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
