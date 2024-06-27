import {Platform, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {MenuView} from '@react-native-menu/menu';

export default function Dalle() {
  return (
    <View style={styles.container}>
      <MenuView
        title="Menu Title"
        onPressAction={({nativeEvent}) => {
          console.warn(JSON.stringify(nativeEvent));
        }}
        actions={[
          {
            id: 'add',
            title: 'Add',
            titleColor: '#2367A2',
            image: Platform.select({
              ios: 'plus',
              android: 'ic_menu_add',
            }),
            imageColor: '#2367A2',
            subactions: [
              {
                id: 'nested1',
                title: 'Nested action',
                titleColor: 'rgba(250,180,100,0.5)',
                subtitle: 'State is mixed',
                image: Platform.select({
                  ios: 'heart.fill',
                  android: 'ic_menu_today',
                }),
                imageColor: 'rgba(100,200,250,0.3)',
                state: 'mixed',
              },
              {
                id: 'nestedDestructive',
                title: 'Destructive Action',
                attributes: {
                  destructive: true,
                },
                image: Platform.select({
                  ios: 'trash',
                  android: 'ic_menu_delete',
                }),
              },
            ],
          },
          {
            id: 'share',
            title: 'Share Action',
            titleColor: '#46F289',
            subtitle: 'Share action on SNS',
            image: Platform.select({
              ios: 'square.and.arrow.up',
              android: 'ic_menu_share',
            }),
            imageColor: '#46F289',
            state: 'on',
          },
          {
            id: 'destructive',
            title: 'Destructive Action',
            attributes: {
              destructive: true,
            },
            image: Platform.select({
              ios: 'trash',
              android: 'ic_menu_delete',
            }),
          },
        ]}
        shouldOpenOnLongPress={false}
      >
        <View style={styles.button}>
          <Text style={styles.buttonText}>Test</Text>
        </View>
      </MenuView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10,
  },
  buttonText: {
    fontSize: 20,
  },
});
