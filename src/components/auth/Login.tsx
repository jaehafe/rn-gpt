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
import {useMutationSignUp} from '@/apis/hooks/useMutationSignUp';
import {useMutationSignIn} from '@/apis/hooks/useMutationSignIn';

import useAuthContext from '@/contexts/auth/useAuthContext';

type LoginScreenProps = StackScreenProps<AuthStackParamList>;

type Navigation = CompositeNavigationProp<
  StackNavigationProp<AuthStackParamList>,
  DrawerNavigationProp<MainDrawerParamList>
>;

export default function Login({route}: LoginScreenProps) {
  const navigation = useNavigation<Navigation>();
  const {setAccessToken, setIsLoggedIn} = useAuthContext();
  const {mutateAsync: signUpMutate, isPending: isSigningUp} =
    useMutationSignUp();
  const {mutateAsync: signInMutate, isPending: isSigningIn} =
    useMutationSignIn();

  const [loading, setLoading] = useState(false);
  const [signUp, setSignUp] = useState({
    email: '',
    password: '',
  });

  const isLoginParams = (
    params: any,
  ): params is {type: 'login' | 'register'} => {
    return 'type' in params;
  };

  const handleSignIn = async () => {
    await signInMutate(
      {
        email: signUp.email,
        password: signUp.password,
      },
      {
        onSuccess: async data => {
          console.log('login response data>>', data);

          const accessToken = data.accessToken;

          if (accessToken) {
            await setAccessToken(accessToken);
            await setIsLoggedIn(true);
            // TODO 메인 화면으로 이동
          } else {
            Alert.alert('Error', 'No access token received');
          }
        },
        onError: error => {
          console.log('error signin>>', error);

          Alert.alert('Error', 'Failed to login');
        },
      },
    );
  };

  // 회원가입
  const handleSignUp = async () => {
    await signUpMutate(
      {
        email: signUp.email,
        password: signUp.password,
      },
      {
        onSuccess: () => {
          navigation.navigate('VerifyCode', {
            email: signUp.email,
          });
        },
        onError: err => {
          console.log('sign up error', err);

          Alert.alert('Error', 'Failed to create account');
        },
      },
    );
  };

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
        source={require('../../assets/images/logo-dark.png')}
        style={styles.logo}
      />

      <Text style={styles.title}>
        {isLoginParams(route.params) && route.params.type === 'login'
          ? 'Welcome back'
          : 'Create your account'}
      </Text>
      <View style={{marginBottom: 30}}>
        <TextInput
          autoCapitalize="none"
          placeholder="john@apple.com"
          value={signUp.email}
          onChangeText={(email: string) =>
            setSignUp({
              ...signUp,
              email,
            })
          }
          style={styles.inputField}
        />
        <TextInput
          placeholder="password"
          value={signUp.password}
          onChangeText={(password: string) =>
            setSignUp({
              ...signUp,
              password,
            })
          }
          secureTextEntry
          style={styles.inputField}
        />
      </View>

      {isLoginParams(route.params) && route.params.type === 'login' ? (
        <TouchableOpacity
          style={[defaultStyles.btn, styles.btnPrimary]}
          onPress={handleSignIn}
        >
          <Text style={styles.btnPrimaryText}>Login</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          style={[defaultStyles.btn, styles.btnPrimary]}
          onPress={handleSignUp}
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
