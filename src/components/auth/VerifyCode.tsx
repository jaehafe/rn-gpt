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
import {useMutationVerifyCode} from '@/apis/hooks/useMutationVerifyCode';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {AuthStackParamList} from '@/navigations/stack/AuthStackNavigator';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

type VerifyCodeScreenRouteProp = RouteProp<AuthStackParamList, 'VerifyCode'>;

type VerifyCodeProps = {
  route: VerifyCodeScreenRouteProp;
};

export default function VerifyCode({route}: VerifyCodeProps) {
  const navigation =
    useNavigation<NativeStackNavigationProp<AuthStackParamList>>();
  const {email} = route.params;
  const [code, setCode] = useState('');
  const {mutateAsync, isPending} = useMutationVerifyCode();

  // 인증코드 확인, 회원가입
  const handleVerifyCode = async () => {
    await mutateAsync(
      {
        email,
        code,
      },
      {
        onSuccess: () => {
          Alert.alert('Success', 'Account created', [
            {
              text: 'OK',
              onPress: () => navigation.navigate('Login', {type: 'login'}),
            },
          ]);
        },
        onError: () => {
          Alert.alert('Error', 'Failed to verify code');
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
      <Image
        source={require('../../assets/images/logo-dark.png')}
        style={styles.logo}
      />

      <Text style={styles.title}>Verify Email</Text>
      <View style={{marginBottom: 30}}>
        <TextInput
          autoCapitalize="none"
          placeholder="john@apple.com"
          value={code}
          onChangeText={(code: string) => setCode(code)}
          style={styles.inputField}
        />
      </View>

      <TouchableOpacity
        style={[defaultStyles.btn, styles.btnPrimary]}
        onPress={handleVerifyCode}
      >
        {/* // TODO: isPending */}
        <Text style={styles.btnPrimaryText}>Create account</Text>
      </TouchableOpacity>
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
