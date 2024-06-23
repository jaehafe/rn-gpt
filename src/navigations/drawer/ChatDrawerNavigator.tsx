import {
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from 'react-native';
import React from 'react';
import {chatNavigation} from '@/constants/navigations';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {
  DrawerActions,
  NavigatorScreenParams,
  useNavigation,
} from '@react-navigation/native';
import {CustomDrawerContent} from '@/components/chat/CustomDrawerContent';
import Colors from '@/constants/Colors';

import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import New from '@/components/chat/New';

import Ionicons from 'react-native-vector-icons/Ionicons';
import {StackNavigationProp} from '@react-navigation/stack';

export type MainStackParamList = {
  [chatNavigation.NEW]: undefined;
};

export type MainDrawerParamList = {
  [chatNavigation.NEW]: NavigatorScreenParams<MainStackParamList>;
};

const Drawer = createDrawerNavigator<MainDrawerParamList>();

export default function ChatDrawerNavigator() {
  const navigation = useNavigation<StackNavigationProp<MainStackParamList>>();
  const dimensions = useWindowDimensions();

  return (
    <Drawer.Navigator
      drawerContent={CustomDrawerContent}
      screenOptions={{
        headerLeft: () => (
          <TouchableOpacity
            onPress={() => navigation.dispatch(DrawerActions.toggleDrawer)}
            style={{marginLeft: 16}}
          >
            <FontAwesome6 name="grip-lines" size={20} color={Colors.grey} />
          </TouchableOpacity>
        ),
        headerStyle: {
          backgroundColor: Colors.light,
        },
        headerShadowVisible: false,
        drawerActiveBackgroundColor: Colors.selected,
        drawerActiveTintColor: '#000',
        drawerInactiveTintColor: '#000',
        overlayColor: 'rgba(0, 0, 0, 0.2)',
        drawerItemStyle: {borderRadius: 12},
        drawerLabelStyle: {marginLeft: -20},
        drawerStyle: {width: dimensions.width * 0.86},
      }}
    >
      <Drawer.Screen
        name={chatNavigation.NEW}
        component={New}
        getId={() => Math.random().toString()}
        // options={{headerShown: false}}
        options={{
          title: 'ChatGPT',
          drawerIcon: () => (
            <View style={[styles.item, {backgroundColor: '#000'}]}>
              <Image
                source={require('@/assets/images/logo-white.png')}
                style={styles.btnImage}
              />
            </View>
          ),
          headerRight: () => (
            <TouchableOpacity
              onPress={() => navigation.navigate(chatNavigation.NEW)}
            >
              <Ionicons
                name="create-outline"
                size={24}
                color={Colors.grey}
                style={{marginRight: 16}}
              />
            </TouchableOpacity>
          ),
        }}
      />
    </Drawer.Navigator>
  );
}

const styles = StyleSheet.create({
  searchSection: {
    marginHorizontal: 16,
    borderRadius: 10,
    height: 34,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.input,
  },
  searchIcon: {
    padding: 6,
  },
  input: {
    flex: 1,
    paddingTop: 8,
    paddingRight: 8,
    paddingBottom: 8,
    paddingLeft: 0,
    alignItems: 'center',
    color: '#424242',
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  roundImage: {
    width: 30,
    height: 30,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 10,
  },
  userName: {
    fontSize: 16,
    fontWeight: '600',
    flex: 1,
  },
  item: {
    borderRadius: 15,
    overflow: 'hidden',
  },
  btnImage: {
    margin: 6,
    width: 16,
    height: 16,
  },
  dallEImage: {
    width: 28,
    height: 28,
    resizeMode: 'cover',
  },
});
