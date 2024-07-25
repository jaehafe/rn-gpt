import Colors from '@/constants/Colors';
import {defaultStyles} from '@/constants/Styles';
import {chatNavigation} from '@/constants/navigations';
import {MainStackParamList} from '@/navigations/drawer/ChatDrawerNavigator';
import {keyStorage} from '@/utils/Storage';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Button,
} from 'react-native';
// import {useMMKVString} from 'react-native-mmkv';
import AsyncStorage from '@react-native-async-storage/async-storage';
import useAuthContext from '@/contexts/auth/useAuthContext';
import {useMutationLogOut} from '@/apis/hooks/useMutationLogOut';

type Navigation = StackNavigationProp<MainStackParamList>;

export default function Settings() {
  const {removeAccessToken, setIsLoggedIn} = useAuthContext();
  const {mutateAsync: logOut} = useMutationLogOut();

  const navigation = useNavigation<Navigation>();
  const [apiKey, setApiKey] = useState('');
  const [org, setOrg] = useState('');

  useEffect(() => {
    const loadSettings = async () => {
      const storedApiKey = await AsyncStorage.getItem('apikey');
      const storedOrg = await AsyncStorage.getItem('org');
      if (storedApiKey) setApiKey(storedApiKey);
      if (storedOrg) setOrg(storedOrg);
    };

    loadSettings();
  }, []);

  const saveApiKey = async () => {
    await AsyncStorage.setItem('apikey', apiKey);
    await AsyncStorage.setItem('org', org);
    navigation.navigate(chatNavigation.NEW);
  };

  const removeApiKey = async () => {
    await AsyncStorage.removeItem('apikey');
    await AsyncStorage.removeItem('org');
    setApiKey('');
    setOrg('');
  };

  const handleLogOut = async () => {
    await logOut({});
    await removeAccessToken();
    await setIsLoggedIn(false);
  };

  return (
    <View style={styles.container}>
      {apiKey && apiKey !== '' && (
        <>
          <Text style={styles.label}>You are all set!</Text>
          <TouchableOpacity
            style={[defaultStyles.btn, {backgroundColor: Colors.primary}]}
            onPress={removeApiKey}
          >
            <Text style={styles.buttonText}>Remove API Key</Text>
          </TouchableOpacity>
        </>
      )}

      {(!apiKey || apiKey === '') && (
        <>
          <Text style={styles.label}>API Key & Organization:</Text>
          <TextInput
            style={styles.input}
            value={apiKey}
            onChangeText={setApiKey}
            placeholder="Enter your API key"
            autoCorrect={false}
            autoCapitalize="none"
          />
          <TextInput
            style={styles.input}
            value={org}
            onChangeText={setOrg}
            placeholder="Your organization"
            autoCorrect={false}
            autoCapitalize="none"
          />

          <TouchableOpacity
            style={[defaultStyles.btn, {backgroundColor: Colors.primary}]}
            onPress={saveApiKey}
          >
            <Text style={styles.buttonText}>Save API Key</Text>
          </TouchableOpacity>
        </>
      )}
      <Button title="Sign Out" onPress={handleLogOut} color={Colors.grey} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  label: {
    fontSize: 18,
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: Colors.primary,
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 10,
    marginBottom: 20,
    backgroundColor: '#fff',
  },

  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 16,
  },
});
