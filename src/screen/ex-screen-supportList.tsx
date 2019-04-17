import React, { Component } from 'react';
import { SafeAreaView, FlatList, TouchableOpacity } from 'react-native';
import UserList from '../views/ce-view-userlist';
import ChatEngineProvider from '../models/ce-core-chatengineprovider';
import styles from '../styles/ce-theme-style';
import { Avatar, Header, Icon, Text } from 'react-native-elements';

import { NavigationInjectedProps } from 'react-navigation';
type IProps = NavigationInjectedProps;

interface IState {
  supportList: string[];
}
class SupportListScreen extends React.Component<IProps, IState> {
  static navigationOptions = {
    tabBarLabel: 'Support',
    tabBarIcon: () => <Icon name='people' size={26} color='red' />
  };
  constructor(props) {
    super(props);
    this.state = {
      supportList: ChatEngineProvider._supportRoom
    };
  }
  shouldComponentUpdate(nextProps, nextState: IState) {
    return true;
  }
  renderItem = ({ item }) => (
    <TouchableOpacity
      style={{
        height: 44,
        width: '100%',
        borderRadius: 5,
        backgroundColor: 'rgba(0,0,0,0.7)',
        justifyContent: 'center'
      }}
      onPress={() => this.gotoChat(item)}
    >
      <Text>{`Channel ${item}`}</Text>
    </TouchableOpacity>
  );
  gotoChat = channel => {
    // ChatEngineProvider.getSupportChatRoomModel()
    // .connectPrivateChatRoom(channel, null)
    ChatEngineProvider.getChatRoomModel()
      .connect(channel, false, null)
      .then(
        () =>
          this.props.navigation.navigate('ChatRoom', {
            title: '#' + channel
          }),
        reject => {
          alert(reject);
        }
      );
  };
  render() {
    const chatRoomModel = ChatEngineProvider._supportRoom;
    return (
      <SafeAreaView style={[styles.container, { flex: 1 }]}>
        {chatRoomModel.length > 0 ? (
          <FlatList
            data={chatRoomModel}
            renderItem={this.renderItem}
            keyExtractor={(_, index) => index.toString()}
          />
        ) : (
          <Text>No customer needs support</Text>
        )}
      </SafeAreaView>
    );
  }
}

export default SupportListScreen;
