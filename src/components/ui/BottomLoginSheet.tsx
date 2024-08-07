import Colors from '@/constants/Colors';
import {defaultStyles} from '@/constants/Styles';

import Ionicons from 'react-native-vector-icons/Ionicons';

import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {AuthStackParamList} from '@/navigations/stack/AuthStackNavigator';
import {authNavigation} from '@/constants/navigations';
import AsyncStorage from '@react-native-async-storage/async-storage';

const BottomLoginSheet = () => {
  const {bottom} = useSafeAreaInsets();
  const {navigate} =
    useNavigation<NativeStackNavigationProp<AuthStackParamList>>();

  const handleAppleLogin = async () => {
    // 로그인 상태를 true로 설정하고 AsyncStorage에 저장
    try {
      await AsyncStorage.setItem('isLoggedIn', 'true');
    } catch (error) {
      console.error('Failed to save login state:', error);
    }
  };

  return (
    <View style={[styles.container, {paddingBottom: bottom}]}>
      {/* apple login */}
      <TouchableOpacity
        style={[defaultStyles.btn, styles.btnLight]}
        onPress={handleAppleLogin}
      >
        <Ionicons name="logo-apple" size={24} style={styles.btnIcon} />
        <Text style={styles.btnLightText}>Continue with Apple</Text>
      </TouchableOpacity>

      {/* google login */}
      <TouchableOpacity
        onPress={() => navigate(authNavigation.GOOGLE_LOGIN)}
        style={[defaultStyles.btn, styles.btnDark]}
      >
        <Ionicons
          name="logo-google"
          size={20}
          style={styles.btnIcon}
          color={'#fff'}
        />
        <Text style={styles.btnDarkText}>Continue with Google</Text>
      </TouchableOpacity>

      {/* sign up email */}
      <TouchableOpacity
        onPress={() => navigate(authNavigation.LOGIN, {type: 'register'})}
        style={[defaultStyles.btn, styles.btnDark]}
      >
        <Ionicons name="mail" size={20} style={styles.btnIcon} color={'#fff'} />
        <Text style={styles.btnDarkText}>Sign up with email</Text>
      </TouchableOpacity>

      {/* login */}
      <TouchableOpacity
        onPress={() => navigate(authNavigation.LOGIN, {type: 'login'})}
        style={[defaultStyles.btn, styles.btnOutline]}
      >
        <Text style={styles.btnDarkText}>Log in</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: '#000',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 26,
    gap: 14,
  },
  btnLight: {
    backgroundColor: '#fff',
  },
  btnLightText: {
    color: '#000',
    fontSize: 20,
  },
  btnDark: {
    backgroundColor: Colors.grey,
  },
  btnDarkText: {
    color: '#fff',
    fontSize: 20,
  },
  btnOutline: {
    borderWidth: 3,
    borderColor: Colors.grey,
  },
  btnIcon: {
    paddingRight: 6,
  },
});
export default BottomLoginSheet;
