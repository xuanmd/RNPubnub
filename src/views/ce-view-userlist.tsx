import React, { Component } from 'react';
import { Text, ListItem } from 'react-native-elements';
import { View, ScrollView } from 'react-native';
import styles from '../styles/ce-theme-style';
import ChatEngineProvider from '../models/ce-core-chatengineprovider';

//redux

import { NavigationInjectedProps } from 'react-navigation';
interface IOwnProps {
  chatRoomModel: any;
  channelFriendly: any;
}
interface IState {
  userList: any;
}
type IProps = IOwnProps & NavigationInjectedProps;
class UserList extends React.Component<IProps, IState> {
  _sub: any;
  constructor(props) {
    super(props);

    this.state = {
      userList: {}
    };
  }

  componentDidMount() {
    this.props.chatRoomModel.addUserListListener(this);
    let self = this;
    this._sub = this.props.navigation.addListener('didFocus', () => {
      ChatEngineProvider.getChatRoomModel().requestUserListRefresh(self);
    });
  }

  componentWillUnmount() {
    this.props.chatRoomModel.removeUserListListener(this);
    this._sub.remove();
  }

  gotoPrivateChat(channel, uuid) {
    var self = this;
    ChatEngineProvider.getChatRoomModel()
      .connect(channel, true, uuid)
      .then(
        () => {
          self.props.navigation.navigate('ChatRoom', {
            title: '#' + channel
          });
        },
        reject => {
          alert(reject);
        }
      );
  }
  renderOnlineList() {
    let userList = this.state.userList;
    return Object.keys(userList).map(uuid => {
      return (
        <ListItem
          key={uuid}
          leftAvatar={{ source: { uri: userList[uuid].avatar_url } }}
          title={userList[uuid].name}
          subtitle={userList[uuid].email}
          onPress={() => this.gotoPrivateChat(uuid, uuid)}
        />
      );
    });
  }

  render() {
    return (
      <View>
        <View style={styles.header}>
          <Text h4> {'#' + this.props.channelFriendly + ' Users'} </Text>
        </View>
        <ScrollView>{this.renderOnlineList()}</ScrollView>
      </View>
    );
  }
}

export default UserList;
