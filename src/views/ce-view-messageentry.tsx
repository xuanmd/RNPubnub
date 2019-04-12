import { TextInput, View } from 'react-native';

import React from 'react';
import NameTypingIndicator from './ce-view-nametypingindicator';
import styles from '../styles/ce-theme-style';
import ChatEngineProvider from '../models/ce-core-chatengineprovider';
interface IState {
  chatInput: string;
}
interface IProps {
  chatRoomModel?: any;
  typingIndicator?: any;
  keyboardVerticalOffset: any;
}
class MessageEntry extends React.Component<IProps, IState> {
  constructor(props) {
    super(props);

    this.state = {
      chatInput: ''
    };

    this.setChatInput = this.setChatInput.bind(this);
  }

  sendChat() {
    var self = this;

    if (self.state.chatInput) {
      var chat = self.props.chatRoomModel.state.chat;

      chat.emit('message', {
        text: self.state.chatInput,
        sentAt: new Date().toISOString(),
        from: {
          uuid: ChatEngineProvider._uuid,
          email: ChatEngineProvider._username,
          name: ChatEngineProvider._name
        }
      });

      this.setState({ chatInput: '' });
    }
  }

  setChatInput(value) {
    this.setState({ chatInput: value });

    if (this.props.typingIndicator) {
      var chat = this.props.chatRoomModel.state.chat;

      if (value !== '') {
        chat.typingIndicator.startTyping();
      } else {
        chat.typingIndicator.stopTyping();
      }
    }
  }

  onTypingIndicator() {
    return (
      <NameTypingIndicator
        chatRoomModel={ChatEngineProvider.getChatRoomModel()}
      />
    );
  }

  render() {
    return (
      <View>
        {this.onTypingIndicator()}
        <View style={styles.footer}>
          <TextInput
            value={this.state.chatInput}
            style={styles.messageentry}
            underlineColorAndroid='transparent'
            placeholder='Send Message'
            autoCapitalize='none'
            autoCorrect={false}
            onChangeText={this.setChatInput}
            onSubmitEditing={() => {
              this.sendChat();
            }}
          />
        </View>
      </View>
    );
  }
}

export default MessageEntry;
