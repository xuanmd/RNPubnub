import {
  Platform,
  StyleSheet,
  ActivityIndicator,
  Button,
  FlatList,
  Image,
  KeyboardAvoidingView,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import { Avatar, Header, Icon, Text } from 'react-native-elements';

import React from 'react';

import styles from '../styles/ce-theme-style';

import MessageList from './ce-view-messagelist';
import MessageEntry from './ce-view-messageentry';
import ChatEngineProvider from '../models/ce-core-chatengineprovider';
import { NavigationInjectedProps } from 'react-navigation';
type IProps = NavigationInjectedProps;

class ChatRoom extends React.Component<IProps, any> {
  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state;
    return {
      headerLeft: <Button title='Back' onPress={params.handleBack} />
    };
  };

  constructor(props) {
    super(props);
  }
  componentDidMount() {
    this.props.navigation.setParams({
      handleBack: this.handleBack.bind(this)
    });
  }
  handleBack() {
    this.props.navigation.goBack();
    // const self = this;
    // ChatEngineProvider.getChatRoomModel()
    //   .connect('Lobby', false, null)
    //   .then(() => {
    //     console.log('connect success');
    //     self.props.navigation.navigate('UserList');
    //   });
  }

  renderContents() {
    const chatRoomModel = ChatEngineProvider.getChatRoomModel();
    let self = this;

    return (
      <View>
        <MessageList
          //   ref='MessageList'
          navigation={self.props.navigation}
          now={chatRoomModel.state.now}
          chatRoomModel={chatRoomModel}
        />
        <MessageEntry
          chatRoomModel={chatRoomModel}
          typingIndicator
          keyboardVerticalOffset={80}
        />
      </View>
    );
  }

  render() {
    if (Platform.OS === 'ios') {
      return (
        <SafeAreaView style={styles.container}>
          <KeyboardAvoidingView behavior='padding' enabled>
            {this.renderContents()}
          </KeyboardAvoidingView>
        </SafeAreaView>
      );
    }

    return <View style={styles.container}>{this.renderContents()}</View>;
  }
}

export default ChatRoom;
