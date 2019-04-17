import { Platform, Dimensions } from 'react-native';
import {
  createBottomTabNavigator,
  createStackNavigator
} from 'react-navigation';

import ChatRoom from '../views/ce-view-chatroom';
import UserListScreen from './ex-screen-chat-userlist';
import SettingsScreen from './ex-screen-settings';
import SupportListScreen from './ex-screen-supportList';

export const UserListNavigator = createBottomTabNavigator(
  {
    // ChatRoom: { screen: ChatRoomScreen },
    UserList: { screen: UserListScreen },
    Support: { screen: SupportListScreen },
    Settings: { screen: SettingsScreen }
  },
  {
    initialRouteName: 'UserList'
  }
);

export const TabNavigator = createStackNavigator(
  {
    UserList: { screen: UserListNavigator },
    ChatRoom: { screen: ChatRoom }
  },
  { initialRouteName: 'UserList' }
);
