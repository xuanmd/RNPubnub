import { Platform, Dimensions } from 'react-native';
import {
  createBottomTabNavigator,
  createStackNavigator
} from 'react-navigation';

import ChatRoomScreen from './ex-screen-chat-chatroom';
import UserListScreen from './ex-screen-chat-userlist';
import SettingsScreen from './ex-screen-settings';

export const TabNavigator = createBottomTabNavigator(
  {
    ChatRoom: { screen: ChatRoomScreen },
    UserList: { screen: UserListScreen },
    Settings: { screen: SettingsScreen }
  },
  {
    initialRouteName: 'ChatRoom'
  }
);
