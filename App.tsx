import React from 'react';
import {
  createAppContainer,
  createStackNavigator,
  createSwitchNavigator
} from 'react-navigation';
import { StyleSheet, Text, View } from 'react-native';
import LoginScreen from './src/screen/ex-screen-login';
import ChatListScreen from './src/screen/ex-screen-chatlist';
import { TabNavigator } from './src/screen/ex-screen-application';
import AppLoadingScreen from './src/screen/ex-screen-apploading';
const MainNavigator = createSwitchNavigator({
  AppLoading: AppLoadingScreen,
  Login: LoginScreen,
  ChatList: ChatListScreen,
  Application: TabNavigator
});
const Navigator = createAppContainer(MainNavigator);
export default class App extends React.Component {
  render() {
    return (
      <View style={{ flex: 1 }}>
        <Navigator />
      </View>
    );
  }
}
