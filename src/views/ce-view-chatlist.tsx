import React from 'react';

import { ListItem, Text } from 'react-native-elements';
import { SafeAreaView, ScrollView } from 'react-native';

import ChatEngineProvider from '../models/ce-core-chatengineprovider';
import styles from '../styles/ce-theme-style';

import { NavigationInjectedProps } from 'react-navigation';

interface IOwnProps {
  defaultChannels: any;
}
type IProps = IOwnProps & NavigationInjectedProps;
interface IState {
  chatList: any;
}
class ChatList extends React.Component<IProps, IState> {
  // props: any;
  _sub: any;
  PUBLIC_CHANNEL_PREFIX = 'chat-engine#chat#public.#';

  constructor(props) {
    super(props);

    this.state = this.emptyState();
  }

  emptyState() {
    var channels = {};

    if (this.props && this.props.defaultChannels) {
      this.props.defaultChannels.split(',').forEach(x => {
        channels[x] = {};
      });
    }

    return {
      chatList: channels
    };
  }

  // refresh() {
  //   let ChatEngine = ChatEngineProvider.get();
  //   let state = this.emptyState();
  //   //FIXME: figure out error
  //   if (ChatEngine && ChatEngine.chats) {
  //     Object.keys(ChatEngine.chats).forEach(x => {
  //       if (x.indexOf(ChatList.PUBLIC_CHANNEL_PREFIX) === 0) {
  //         let friendly = x.substring(ChatList.PUBLIC_CHANNEL_PREFIX);
  //         state.channels[friendly] = {};
  //       }
  //     });
  //   }

  //   this.setState(() => {
  //     return state;
  //   });
  // }

  // componentDidMount() {
  //   var self = this;

  //   this._sub = this.props.navigation.addListener('didFocus', () => {
  //     self.refresh();
  //   });
  // }

  componentWillUnmount() {
    this._sub.remove();
  }

  gotoChat(channel) {
    var self = this;

    ChatEngineProvider.getChatRoomModel()
      .connect(channel)
      .then(
        () => {
          self.props.navigation.navigate('Application', {
            title: '#' + channel
          });
        },
        reject => {
          alert(reject);
        }
      );
  }

  renderChatList() {
    let chatList = this.state.chatList;

    return Object.keys(chatList).map(channelFriendly => (
      <ListItem
        key={channelFriendly}
        title={'#' + channelFriendly}
        subtitle='Public Room'
        leftIcon={{ name: 'lock-open' }}
        onPress={() => this.gotoChat(channelFriendly)}
      />
    ));
  }

  render() {
    return (
      <SafeAreaView>
        <ScrollView>
          <Text h4 style={{ paddingBottom: 10 }}>
            Select a Channel
          </Text>
          {this.renderChatList()}
        </ScrollView>
      </SafeAreaView>
    );
  }
}

export default ChatList;
