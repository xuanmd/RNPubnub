import { Platform, View, ImageSourcePropType } from 'react-native';

import { Avatar, Header, Icon, Text } from 'react-native-elements';
import React from 'react';
import { Image, PixelRatio } from 'react-native';
// import HTMLView from 'react-native-htmlview';
import styles from '../styles/ce-theme-style';
import moment from 'moment';
import ChatEngineProvider from '../models/ce-core-chatengineprovider';
// import gravatar from 'gravatar';

interface IProps {
  now: any;
  message: any;
  //   url: string;
}

class Message extends React.PureComponent<IProps, any> {
  constructor(props) {
    super(props);
  }

  friendlyTime(timeString) {
    if (!timeString || !this.props.now) {
      return 'a while ago';
    }

    let maybeVal = moment(timeString).from(this.props.now);

    if (maybeVal === 'in a few seconds') {
      return 'just now';
    }

    return maybeVal;
  }

  renderNode(node, index, siblings, parent, defaultRenderer) {
    if (node.name == 'img') {
      const { src, height } = node.attribs;
      const newSrc = src.replace(/^http:/, 'https:');

      var width = 50;
      //   var height = 50;

      return (
        <Image
          key={index}
          style={{ width: width, height: height }}
          source={{ uri: newSrc }}
        />
      );
    }
  }

  render() {
    let sender = this.props.message.data.from || this.props.message.sender;

    if (sender.name === 'Me' || sender.name === ChatEngineProvider._name) {
      return (
        <View style={styles.myMessageContainer}>
          <View style={styles.myMessages}>
            {/* <HTMLView
              value={`<p> ${this.props.message.data.text} </p>`}
              stylesheet={styles}
              renderNode={this.renderNode}
            /> */}
            <Text>{this.props.message.data.text}</Text>
            <Text style={styles.messageUID}>
              {this.friendlyTime(this.props.message.data.sentAt)}{' '}
            </Text>
          </View>
        </View>
      );
    }

    return (
      <View style={styles.messageContainer}>
        <View style={styles.avatar}>
          {/* FIXME: change avatar url */}
          {/* <Avatar
            // small
            rounded
            source={{
              // uri: gravatar.url(
              //   this.props.message.data.from.email,
              //   { s: '100', r: 'x', d: 'retro' },
              //   true
              // )
              uri: this.props.url
            }}
            activeOpacity={0.7}
          /> */}
        </View>
        <View style={{ flexDirection: 'column' }}>
          <Text style={styles.messageUID}>{sender.name}</Text>
          <View style={styles.receivedMessages}>
            {/* <HTMLView  //FIXME: use HTML view to see image
              value={this.props.message.data.text}
              stylesheet={styles}
              renderNode={this.renderNode}
            /> */}
            {/* use Text instead to render message*/}
            <Text>{this.props.message.data.text}</Text>
            <Text style={styles.friendlyTime}>
              {this.friendlyTime(this.props.message.data.sentAt)}{' '}
            </Text>
          </View>
        </View>
      </View>
    );
  }
}

export default Message;
