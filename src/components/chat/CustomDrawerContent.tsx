import Colors from '@/constants/Colors';
import {chatNavigation} from '@/constants/navigations';
import {MainStackParamList as MainStackParamList2} from '@/navigations/drawer/ChatDrawerNavigator';
import {MainStackParamList} from '@/navigations/stack/MainStackNavigator';

import {Chat} from '@/utils/interface';
import {
  DrawerContentScrollView,
  DrawerItemList,
  useDrawerStatus,
} from '@react-navigation/drawer';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {useEffect, useState} from 'react';
import {
  Alert,
  Image,
  Keyboard,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';

// import * as ContextMenu from 'zeego/context-menu';

interface CustomDrawerContentProps {}

type Navigation = StackNavigationProp<MainStackParamList>;
type Navigation2 = StackNavigationProp<MainStackParamList2>;

export const CustomDrawerContent = (props: any) => {
  const navigation = useNavigation<Navigation>();
  const navigation2 = useNavigation<Navigation2>();
  const {bottom, top} = useSafeAreaInsets();
  // const db = useSQLiteContext();
  const isDrawerOpen = useDrawerStatus() === 'open';
  const [history, setHistory] = useState<Chat[]>([]);
  // const router = useRouter();

  useEffect(() => {
    loadChats();
    Keyboard.dismiss();
  }, [isDrawerOpen]);

  const loadChats = async () => {
    // const result = (await getChats(db)) as Chat[];
    // setHistory(result);
  };

  const onDeleteChat = (chatId: number) => {
    Alert.alert('Delete Chat', 'Are you sure you want to delete this chat?', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'Delete',
        onPress: async () => {
          // Delete the chat
          // await db.runAsync('DELETE FROM chats WHERE id = ?', chatId);
          loadChats();
        },
      },
    ]);
  };

  const onRenameChat = (chatId: number) => {
    Alert.prompt(
      'Rename Chat',
      'Enter a new name for the chat',
      async newName => {
        if (newName) {
          // Rename the chat
          // await renameChat(db, chatId, newName);
          loadChats();
        }
      },
    );
  };

  return (
    <View style={{flex: 1, marginTop: top}}>
      <View style={{backgroundColor: '#fff', paddingBottom: 10}}>
        <View style={styles.searchSection}>
          <Ionicons
            style={styles.searchIcon}
            name="search"
            size={20}
            color={Colors.greyLight}
          />
          <TextInput
            style={styles.input}
            placeholder="Search"
            underlineColorAndroid="transparent"
          />
        </View>
      </View>

      <DrawerContentScrollView
        {...props}
        contentContainerStyle={{backgroundColor: '#fff', paddingTop: 0}}
      >
        <DrawerItemList {...props} />

        <View style={{borderWidth: 1, marginHorizontal: 20}}>
          <Pressable
            onPress={() =>
              navigation2.navigate(chatNavigation.DETAIL, {
                id: '123',
                title: '123',
              })
            }
          >
            <Text>123</Text>
          </Pressable>
        </View>
        {/* {history.map(chat => (
          <ContextMenu.Root key={chat.id}>
            <ContextMenu.Trigger>
              <DrawerItem
                label={chat.title}
                onPress={() =>
                  // router.push(`/(auth)/(drawer)/(chat)/${chat.id}`)
                  {}
                }
                inactiveTintColor="#000"
              />
            </ContextMenu.Trigger>
            <ContextMenu.Content>
              <ContextMenu.Preview>
                {() => (
                  <View
                    style={{
                      padding: 16,
                      height: 200,
                      backgroundColor: '#fff',
                    }}
                  >
                    <Text>{chat.title}</Text>
                  </View>
                )}
              </ContextMenu.Preview>

              <ContextMenu.Item
                key={'rename'}
                onSelect={() => onRenameChat(chat.id)}
              >
                <ContextMenu.ItemTitle>Rename</ContextMenu.ItemTitle>
                <ContextMenu.ItemIcon
                  ios={{
                    name: 'pencil',
                    pointSize: 18,
                  }}
                />
              </ContextMenu.Item>
              <ContextMenu.Item
                key={'delete'}
                onSelect={() => onDeleteChat(chat.id)}
                destructive
              >
                <ContextMenu.ItemTitle>Delete</ContextMenu.ItemTitle>
                <ContextMenu.ItemIcon
                  ios={{
                    name: 'trash',
                    pointSize: 18,
                  }}
                />
              </ContextMenu.Item>
            </ContextMenu.Content>
          </ContextMenu.Root>
        ))} */}
      </DrawerContentScrollView>

      {/* Settings */}
      <View
        style={{
          padding: 16,
          paddingBottom: 10 + bottom,
          backgroundColor: Colors.light,
        }}
      >
        {/* <Link href="/(auth)/(modal)/settings" asChild> */}
        <TouchableOpacity
          onPress={() => navigation.navigate('Settings')}
          style={styles.footer}
        >
          <Image
            source={{uri: 'https://galaxies.dev/img/meerkat_2.jpg'}}
            style={styles.avatar}
          />
          <Text style={styles.userName}>Mika Meerkat</Text>
          <Ionicons
            name="ellipsis-horizontal"
            size={24}
            color={Colors.greyLight}
          />
        </TouchableOpacity>
        {/* </Link> */}
      </View>
    </View>
  );
};

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
