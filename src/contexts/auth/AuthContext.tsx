import AsyncStorage from '@react-native-async-storage/async-storage';
import {jwtDecode} from 'jwt-decode';
import * as React from 'react';

export interface DecodedToken {
  category: 'access' | 'refresh';
  email: string;
  role: 'ROLE_USER' | 'ROLE_ADMIN';
  iat: number;
  exp: number;
}

export interface AuthContextType {
  isLoggedInState: boolean | null;
  decodedToken: DecodedToken | null;
  setDecodedToken: (decodedToken: DecodedToken | null) => void;
  setAccessToken: (token: string) => Promise<void>;
  removeAccessToken: () => Promise<void>;
  setIsLoggedIn: (value: boolean) => Promise<void>;
  getIsLoggedIn: () => Promise<boolean | null>;
  decodeToken: () => Promise<void>;
}

export const AuthContext = React.createContext<AuthContextType | null>(null);

/** Admin Context Provider */
export default function AuthContextProvider({
  children,
}: React.PropsWithChildren) {
  const [isLoggedInState, setIsLoggedInState] = React.useState<boolean | null>(
    null,
  );

  const [decodedToken, setDecodedToken] = React.useState<DecodedToken | null>(
    null,
  );

  React.useEffect(() => {
    checkLoginStatus();
    decodeToken();
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

  const decodeToken = async () => {
    try {
      const token = await AsyncStorage.getItem('accessToken');
      if (token) {
        const decoded = jwtDecode<DecodedToken>(token);
        setDecodedToken(decoded);
      } else {
        setDecodedToken(null);
      }
    } catch (error) {
      console.error('Error decoding token:', error);
      setDecodedToken(null);
    }
  };

  React.useEffect(() => {
    decodeToken();
  }, [isLoggedInState]);

  const value: AuthContextType = {
    isLoggedInState,
    decodedToken,
    setDecodedToken,
    setAccessToken,
    removeAccessToken,
    setIsLoggedIn,
    getIsLoggedIn,
    decodeToken,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// const subscribe = (key: string, callback: (value: string | null) => void) => {
//   const checkValueChange = async () => {
//     try {
//       const value = await AsyncStorage.getItem(key);
//       callback(value);
//     } catch (error) {
//       console.error('Error in subscribe:', error);
//       callback(null);
//     }
//   };

//   checkValueChange();
//   const interval = setInterval(checkValueChange, 1000);

//   return () => clearInterval(interval);
// };
