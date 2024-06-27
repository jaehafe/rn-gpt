import {Platform, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Colors from '@/constants/Colors';

import {MenuView} from '@react-native-menu/menu';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {ModelType} from '@/navigations/drawer/ChatDrawerNavigator';

type Item = {
  key: string;
  title: ModelType;
  icon?: string;
};

export interface HeaderDropdownProps {
  title: string;
  // items: Item[];
  selected: ModelType;
  onSelect: (model: ModelType) => void;
}

export default function HeaderDropdown({
  title,
  selected,
  onSelect,
}: HeaderDropdownProps) {
  return (
    <MenuView
      onPressAction={({nativeEvent}) => {
        console.warn(JSON.stringify(nativeEvent));
        const newModel = nativeEvent.event.includes('3.5') ? '3.5' : '4';
        if (newModel !== selected) {
          onSelect(newModel);
        }
      }}
      actions={[
        {
          id: 'gpt-3.5',
          title: 'GPT-3.5',
          titleColor: '#2367A2',
          image: Platform.select({
            ios: 'plus',
            android: 'ic_menu_add',
          }),
          imageColor: '#2367A2',
          state: selected === '3.5' ? 'on' : 'off',
        },
        {
          id: 'gpt-4',
          title: 'GPT-4',
          titleColor: '#2367A2',
          image: Platform.select({
            ios: 'plus',
            android: 'ic_menu_add',
          }),
          imageColor: '#2367A2',
          state: selected === '4' ? 'on' : 'off',
        },
      ]}
      shouldOpenOnLongPress={false}
    >
      <TouchableOpacity style={{flexDirection: 'row', alignItems: 'center'}}>
        <Text style={{fontWeight: '500', fontSize: 16}}>GPT</Text>
        <Text
          style={{
            marginLeft: 10,
            fontSize: 16,
            fontWeight: '500',
            color: Colors.greyLight,
          }}
        >
          {title} &gt;
        </Text>
      </TouchableOpacity>
    </MenuView>
  );
}

const styles = StyleSheet.create({});
