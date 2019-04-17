import React from 'react';

import {
  AsyncStorage,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
  Dimensions
} from 'react-native';

import { Icon, Text } from 'react-native-elements';
import ChatEngineProvider from '../models/ce-core-chatengineprovider';
import ThemeStyle from '../styles/ce-theme-style';
import ThemeColors from '../styles/ce-theme-colors';

import { NavigationInjectedProps } from 'react-navigation';
type IProps = NavigationInjectedProps;
/**
 * Basic login screen functionality.
 */
class LoginScreen extends React.Component<IProps, any> {
  _username: string;
  _name: string;
  _password: string;
  _url: string;
  _objectId: string;
  constructor(props) {
    super(props);

    this._username = '';
    this._name = '';
    this._password = '';
    this._url =
      'https://images.pexels.com/photos/414612/pexels-photo-414612.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260';
    this._objectId = '';
  }
  _onButtonPress = () => {
    var self = this;

    if (!self._username || !self._name) {
      return;
    }

    ChatEngineProvider.connect(
      self._username,
      self._name,
      self._url,
      self._objectId
    ).then(async () => {
      try {
        await AsyncStorage.setItem(
          ChatEngineProvider.ASYNC_STORAGE_USERDATA_KEY,
          JSON.stringify({
            username: self._username,
            name: self._name,
            url: self._url,
            objectId: self._objectId
          })
        );
      } catch (error) {
        // ignore error, this save is just for convenience
      }
      //ignore ChatList Screen, connect directly to Lobby room
      // this.props.navigation.navigate('ChatList', {});
      ChatEngineProvider.getChatRoomModel()
        .connect('Lobby', false, null)
        .then(
          () => {
            self.props.navigation.navigate('Application', {
              title: '#Lobby'
            });
          },
          reject => {
            alert(reject);
          }
        );
    });
  };

  renderContents() {
    return (
      <ImageBackground
        style={LoginStyles.login_wallpaper}
        source={require('../images/login_gradient.png')}
      >
        <Icon
          // style={LoginStyles.login_logo}
          name='chat'
          size={220}
          color={ThemeColors.foreground_bright}
        />
        <TextInput
          style={LoginStyles.login_input}
          autoCapitalize='none'
          onChangeText={text => {
            this._objectId = text;
          }}
          autoCorrect={false}
          returnKeyType='next'
          placeholder='ObjectId'
          placeholderTextColor={ThemeColors.input_dark_placeholder_textcolor}
        />
        <TextInput
          style={LoginStyles.login_input}
          autoCapitalize='none'
          onChangeText={text => {
            this._username = text;
          }}
          autoCorrect={false}
          keyboardType='email-address'
          returnKeyType='next'
          placeholder='Email or Username'
          placeholderTextColor={ThemeColors.input_dark_placeholder_textcolor}
        />

        <TextInput
          style={LoginStyles.login_input}
          autoCapitalize='none'
          onChangeText={text => {
            this._name = text;
          }}
          autoCorrect={false}
          keyboardType='default'
          returnKeyType='next'
          placeholder='Display Name'
          placeholderTextColor={ThemeColors.input_dark_placeholder_textcolor}
        />

        <TextInput
          style={LoginStyles.login_input}
          returnKeyType='go'
          // ref={input => (this.passwordInput = input)}
          onChangeText={text => {
            this._password = text;
          }}
          placeholder='Password'
          placeholderTextColor={ThemeColors.input_dark_placeholder_textcolor}
          secureTextEntry
        />

        <TouchableOpacity
          style={LoginStyles.login_button}
          onPress={this._onButtonPress}
        >
          <Text style={LoginStyles.login_buttonText}>LOGIN</Text>
        </TouchableOpacity>
      </ImageBackground>
    );
  }

  render() {
    if (Platform.OS === 'ios') {
      return (
        <KeyboardAvoidingView
          style={LoginStyles.login_container}
          behavior='padding'
          enabled
        >
          {this.renderContents()}
        </KeyboardAvoidingView>
      );
    }

    return (
      <View style={LoginStyles.login_container}>{this.renderContents()}</View>
    );
  }
}

const { width, height } = Dimensions.get('window');
const LoginStyles = StyleSheet.create({
  login_container: {
    flex: 1,
    flexDirection: 'column',
    padding: 0
  },
  login_wallpaper: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-end',
    width,
    height,
    paddingTop: 20,
    paddingBottom: 20,
    paddingLeft: 20,
    paddingRight: 20
  },
  login_logo: {
    width: width - 40
    // alignItems: 'center'
  },
  login_input: {
    width: width - 40,
    color: ThemeColors.input_dark_textcolor,
    borderRadius: 20,
    paddingHorizontal: 20,
    fontSize: 18,
    height: 40,
    backgroundColor: ThemeColors.input_bg,
    marginBottom: 10,
    padding: 10
  },
  login_button: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: ThemeColors.button_background,
    paddingVertical: 15,
    borderRadius: 20
  },
  login_buttonText: {
    color: ThemeColors.button_text,
    textAlign: 'center',
    fontWeight: '700'
  }
});

export default LoginScreen;
