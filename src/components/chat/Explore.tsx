import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {useQueryTodosAPI} from '@/apis/hooks';

export default function Explore() {
  const {data} = useQueryTodosAPI();

  return (
    <View>
      <Text>{data}</Text>
    </View>
  );
}

const styles = StyleSheet.create({});
