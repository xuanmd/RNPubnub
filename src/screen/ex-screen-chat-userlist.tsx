import React, { Component } from 'react';
import { SafeAreaView } from 'react-native';
import UserList from '../views/ce-view-userlist';
import ChatEngineProvider from '../models/ce-core-chatengineprovider';
import styles from '../styles/ce-theme-style';
import { Avatar, Header, Icon, Text } from 'react-native-elements';

import { ActivityIndicator, FlatList, Platform, View } from 'react-native';

import { NavigationInjectedProps } from 'react-navigation';
type IProps = NavigationInjectedProps;
class UserListScreen extends React.Component<IProps, any> {
  static navigationOptions = {
    tabBarLabel: 'Users',
    tabBarIcon: () => <Icon name='people' size={26} color='white' />
  };

  render() {
    const chatRoomModel = ChatEngineProvider.getChatRoomModel();
    let self = this;
    return (
      <SafeAreaView style={[styles.container, { flex: 1 }]}>
        {!chatRoomModel ||
        !chatRoomModel.state ||
        !chatRoomModel.state.ready ? (
          <Text> Loading... </Text>
        ) : (
          <View style={{ flex: 1 }}>
            <UserList
              ref='UserList'
              navigation={self.props.navigation}
              chatRoomModel={ChatEngineProvider.getChatRoomModel()}
              channelFriendly={
                ChatEngineProvider.getChatRoomModel().state.channelFriendly
              }
            />
          </View>
        )}
      </SafeAreaView>
    );
  }
}

export default UserListScreen;
