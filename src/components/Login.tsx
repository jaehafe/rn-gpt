import {
  ActivityIndicator,
  Alert,
  Image,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import Colors from '@/constants/Colors';
import {defaultStyles} from '@/constants/Styles';
import {AuthStackParamList} from '@/navigations/stack/AuthStackNavigator';
import {StackNavigationProp, StackScreenProps} from '@react-navigation/stack';
import {CompositeNavigationProp, useNavigation} from '@react-navigation/native';
import {MainDrawerParamList} from '@/navigations/drawer/ChatDrawerNavigator';
import {DrawerNavigationProp} from '@react-navigation/drawer';

type LoginScreenProps = StackScreenProps<AuthStackParamList>;

type Navigation = CompositeNavigationProp<
  StackNavigationProp<AuthStackParamList>,
  DrawerNavigationProp<MainDrawerParamList>
>;

export default function Login({route}: LoginScreenProps) {
  const navigation = useNavigation<Navigation>();
  const [emailAddress, setEmailAddress] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const onSignInPress = async () => {
    navigation.goBack();
  };

  const onSignUpPress = async () => {};

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={70}
      style={styles.container}
    >
      {loading && (
        <View style={defaultStyles.loadingOverlay}>
          <ActivityIndicator size="large" color="#fff" />
        </View>
      )}

      <Image
        source={require('../assets/images/logo-dark.png')}
        style={styles.logo}
      />

      <Text style={styles.title}>
        {route.params?.type === 'login'
          ? 'Welcome back'
          : 'Create your account'}
      </Text>
      <View style={{marginBottom: 30}}>
        <TextInput
          autoCapitalize="none"
          placeholder="john@apple.com"
          value={emailAddress}
          onChangeText={setEmailAddress}
          style={styles.inputField}
        />
        <TextInput
          placeholder="password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          style={styles.inputField}
        />
      </View>

      {route.params?.type === 'login' ? (
        <TouchableOpacity
          style={[defaultStyles.btn, styles.btnPrimary]}
          onPress={onSignInPress}
        >
          <Text style={styles.btnPrimaryText}>Login</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          style={[defaultStyles.btn, styles.btnPrimary]}
          onPress={onSignUpPress}
        >
          <Text style={styles.btnPrimaryText}>Create account</Text>
        </TouchableOpacity>
      )}
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    padding: 20,
  },
  logo: {
    width: 60,
    height: 60,
    alignSelf: 'center',
    marginVertical: 80,
  },
  title: {
    fontSize: 30,
    marginBottom: 20,
    fontWeight: 'bold',
    alignSelf: 'center',
  },
  inputField: {
    marginVertical: 4,
    height: 50,
    borderWidth: 1,
    borderColor: Colors.primary,
    borderRadius: 12,
    padding: 10,
    backgroundColor: '#fff',
  },
  btnPrimary: {
    backgroundColor: Colors.primary,
    marginVertical: 4,
  },
  btnPrimaryText: {
    color: '#fff',
    fontSize: 16,
  },
});
