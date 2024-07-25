import AsyncStorage from '@react-native-async-storage/async-storage';
import * as React from 'react';

export interface AuthContextType {
  isLoggedIn: boolean | null;
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

  const [isLoggedIn, setIsLoggedIn] = React.useState<boolean | null>(null);

  React.useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const value = await AsyncStorage.getItem('isLoggedIn');
        setIsLoggedIn(value === 'true');
      } catch (error) {
        console.error('Error checking login status:', error);
        setIsLoggedIn(false);
      }
    };

    checkLoginStatus();

    // AsyncStorage의 'isLoggedIn' 값 변경을 감지하는 리스너
    const unsubscribe = subscribe('isLoggedIn', value => {
      setIsLoggedIn(value === 'true');
    });

    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, []);

  const value = {isLoggedIn};

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
