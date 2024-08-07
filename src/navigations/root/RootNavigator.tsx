import AuthStackNavigator from '@/navigations/stack/AuthStackNavigator';

import {ActivityIndicator, View} from 'react-native';

import useAuthContext from '@/contexts/auth/useAuthContext';
import MainStackNavigator from '../stack/MainStackNavigator';

export default function RootNavigator() {
  const {isLoggedInState} = useAuthContext();

  if (isLoggedInState === null) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return isLoggedInState ? <MainStackNavigator /> : <AuthStackNavigator />;
}
