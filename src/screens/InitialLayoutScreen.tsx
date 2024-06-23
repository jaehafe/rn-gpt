import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import AuthStackNavigator from '@/navigations/AuthStackNavigator';

export default function InitialLayoutScreen() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    setIsLoggedIn(false);
  }, [isLoggedIn]);

  return (
    <>
      {isLoggedIn ? (
        <View>
          <Text>InitialLayoutScreen</Text>
        </View>
      ) : (
        <AuthStackNavigator />
      )}
    </>
  );
}

const styles = StyleSheet.create({});
