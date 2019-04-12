import { FlatList, ScrollView } from 'react-native';

import React from 'react';
import Message from './ce-view-message';
import styles from '../styles/ce-theme-style';
import ChatEngineProvider from '../models/ce-core-chatengineprovider';

import { NavigationInjectedProps, withNavigation } from 'react-navigation';

interface IOwnProps {
  chatRoomModel: any;
}
type IProps = IOwnProps & NavigationInjectedProps;

class MessageList extends React.PureComponent<IProps, any> {
  private scrollViewRef = React.createRef<ScrollView>();
  _sub: any;
  constructor(props) {
    super(props);

    this.props.chatRoomModel.addMessageListListener(this);

    this.state = {
      messages: [],
      loading: true,
      now: new Date().toISOString()
    };
  }

  _keyExtractor = (item, index) => index.toString();

  componentDidMount() {
    let self = this;
    this._sub = this.props.navigation.addListener('didFocus', () => {
      ChatEngineProvider.getChatRoomModel().requestMessageListRefresh(self);
    });
  }

  componentWillUnmount() {
    this.props.chatRoomModel.removeMessageListListener(this);
    this._sub.remove();
  }

  render() {
    return (
      <ScrollView
        ref={this.scrollViewRef}
        onContentSizeChange={(contentWidth, contentHeight) => {
          this.scrollViewRef.current.scrollToEnd({ animated: true });
        }}
      >
        <FlatList
          style={{ flex: 1 }}
          data={this.state.messages}
          keyExtractor={this._keyExtractor}
          renderItem={({ item }) => (
            <Message message={item} now={this.state.now} />
          )}
        />
      </ScrollView>
    );
  }
}

export default withNavigation(MessageList);
