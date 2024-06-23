import {Pressable, PressableProps, StyleSheet, Text, View} from 'react-native';
import React from 'react';

interface ButtonProps extends PressableProps {
  text?: string | React.ReactNode;
  children: React.ReactNode;
}

export default function Button({text, children, ...props}: ButtonProps) {
  return (
    <Pressable {...props}>
      <Text>{children}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({});
