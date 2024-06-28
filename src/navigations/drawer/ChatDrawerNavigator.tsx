import {
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from 'react-native';
import React, {useState} from 'react';
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

import Ionicons from 'react-native-vector-icons/Ionicons';
import {StackNavigationProp} from '@react-navigation/stack';
import Dalle from '@/components/chat/Dalle';
import Explore from '@/components/chat/Explore';
import ChatDetail from '@/components/chat/ChatDetail';
import PushNotification from '@/components/push/PushNotification';
import HeaderDropdown from '@/components/chat/HeaderDropdown';
import DalleGPT4 from '@/components/chat/DalleGPT4';
import CalendarScreen from '@/screens/CalendarScreen';
// import NewScreen from '@/screens/NewScreen';
import ChatGPT3 from '@/components/chat/ChatGPT3';
import ChatGPT4 from '@/components/chat/ChatGPT4';

export type MainStackParamList = {
  [chatNavigation.NEW]: undefined;
  [chatNavigation.DALLE]: undefined;
  [chatNavigation.EXPLORE]: undefined;
  [chatNavigation.MAIN_HOME]: undefined;
  [chatNavigation.DETAIL]: {id: string; title: string};
  [chatNavigation.PUSH]: undefined;
  [chatNavigation.CALENDAR]: undefined;
};

export type MainDrawerParamList = {
  [chatNavigation.NEW]: NavigatorScreenParams<MainStackParamList>;
  [chatNavigation.DALLE]: NavigatorScreenParams<MainStackParamList>;
  [chatNavigation.EXPLORE]: NavigatorScreenParams<MainStackParamList>;
  [chatNavigation.MAIN_HOME]: NavigatorScreenParams<MainStackParamList>;
  [chatNavigation.DETAIL]: NavigatorScreenParams<MainStackParamList>;
  [chatNavigation.PUSH]: NavigatorScreenParams<MainStackParamList>;
  [chatNavigation.CALENDAR]: NavigatorScreenParams<MainStackParamList>;
};

const Drawer = createDrawerNavigator<MainDrawerParamList>();

export type ModelType = '3.5' | '4';

export default function ChatDrawerNavigator() {
  const navigation = useNavigation<StackNavigationProp<MainStackParamList>>();
  const dimensions = useWindowDimensions();

  const [model, setModel] = useState<ModelType>('3.5');

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
        component={model === '3.5' ? ChatGPT3 : ChatGPT4}
        getId={() => Math.random().toString()}
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
          headerTitle: () => (
            <HeaderDropdown
              title={model}
              selected={model}
              onSelect={newModel => setModel(newModel)}
            />
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
      <Drawer.Screen
        name={chatNavigation.DALLE}
        component={model === '3.5' ? Dalle : DalleGPT4}
        options={({navigation}) => ({
          headerTitle: () => (
            <HeaderDropdown
              title={model}
              selected={model}
              onSelect={newModel => setModel(newModel)}
            />
          ),
          title: 'Dall·E',
          drawerIcon: () => (
            <View style={[styles.item, {backgroundColor: '#000'}]}>
              <Image
                source={require('@/assets/images/dalle.png')}
                style={styles.dallEImage}
              />
            </View>
          ),
        })}
        listeners={{
          drawerItemPress: e => {
            e.preventDefault();
            navigation.navigate(chatNavigation.DALLE);
          },
        }}
      />
      <Drawer.Screen
        name={chatNavigation.EXPLORE}
        component={Explore}
        options={{
          title: 'Explore GPTs',
          drawerIcon: () => (
            <View
              style={[
                styles.item,
                {
                  backgroundColor: '#fff',
                  width: 28,
                  height: 28,
                  alignItems: 'center',
                  justifyContent: 'center',
                },
              ]}
            >
              <Ionicons name="apps-outline" size={18} color="#000" />
            </View>
          ),
        }}
      />
      <Drawer.Screen
        name={chatNavigation.DETAIL}
        component={ChatDetail}
        options={{
          title: 'Chat Detail',
          drawerIcon: () => (
            <View
              style={[
                styles.item,
                {
                  backgroundColor: '#fff',
                  width: 28,
                  height: 28,
                  alignItems: 'center',
                  justifyContent: 'center',
                },
              ]}
            >
              <Ionicons name="apps-outline" size={18} color="#000" />
            </View>
          ),
        }}
      />
      <Drawer.Screen
        name={chatNavigation.PUSH}
        component={PushNotification}
        options={{
          title: 'Push Notification',
          drawerIcon: () => (
            <View
              style={[
                styles.item,
                {
                  backgroundColor: '#fff',
                  width: 28,
                  height: 28,
                  alignItems: 'center',
                  justifyContent: 'center',
                },
              ]}
            >
              <Ionicons name="apps-outline" size={18} color="#000" />
            </View>
          ),
        }}
      />
      {/* add calendar */}
      <Drawer.Screen
        name={chatNavigation.CALENDAR}
        component={CalendarScreen}
        options={{
          title: 'Calendar',
          drawerIcon: () => (
            <View
              style={[
                styles.item,
                {
                  backgroundColor: '#fff',
                  width: 28,
                  height: 28,
                  alignItems: 'center',
                  justifyContent: 'center',
                },
              ]}
            >
              <Ionicons name="apps-outline" size={18} color="#000" />
            </View>
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
