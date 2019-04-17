import React from 'react';

import ChatEngineCore from 'chat-engine';
import ChatRoomModel from './ce-model-chat-chatroom';
import pnSettings from '../../ex-config-pnsettings';

import sha1 from 'sha1';
import { AsyncStorage } from 'react-native';

/**
 * The central point for obtaining the ChatEngine instance from around the application.
 * We maintain a single chat room model consistent with a simple one-chat-at-a-time application.
 */
class ChatEngineProvider {
  static ASYNC_STORAGE_USERDATA_KEY =
    '@ChatEngineReactNativeSample:_userdata_json';

  static _username = null;
  static _uuid = null;
  static _name = null;
  static _supportRoom = [];
  static _chatRoomModel = new ChatRoomModel();
  // static _supportChatRoomModel = new ChatRoomModel();
  static _connected = false;
  static _chatEngine = ChatEngineProvider.__createChatEngine();

  static __createChatEngine() {
    return ChatEngineCore.create({
      publishKey: pnSettings.publishKey,
      subscribeKey: pnSettings.subscribeKey
    });
  }

  static get() {
    return ChatEngineProvider._chatEngine;
  }

  static connect(username, name, image_url, objectId) {
    if (ChatEngineProvider._connected) {
      ChatEngineProvider.logout();
    }

    ChatEngineProvider._username = username;
    ChatEngineProvider._name = name || username;
    ChatEngineProvider._uuid = objectId; //use user objectId to create uuid

    ChatEngineProvider._chatEngine = ChatEngineProvider.__createChatEngine();

    ChatEngineProvider._chatEngine.connect(ChatEngineProvider._uuid, {
      name: ChatEngineProvider._name,
      email: ChatEngineProvider._username,
      avatar_url: image_url, //image_url of user
      signedOnTime: new Date().getTime()
    });

    var engineReady = new Promise(resolve => {
      ChatEngineProvider._chatEngine.once('$.ready', data => {
        const me = data.me;
        me.direct.on('$.invite', payload => {
          //listen the invite from user need support
          const isExist = ChatEngineProvider._supportRoom.includes(
            payload.data.channel
          );
          if (isExist) {
            //ignore if channel existed
          } else {
            ChatEngineProvider._supportRoom = ChatEngineProvider._supportRoom.concat(
              [payload.data.channel as string]
            );
          }
        });

        ChatEngineProvider._connected = true;
        resolve(true);
      });
    });

    return engineReady;
  }

  static logout() {
    return AsyncStorage.removeItem(
      ChatEngineProvider.ASYNC_STORAGE_USERDATA_KEY
    ).then(() => {
      ChatEngineProvider._chatRoomModel.disconnect();
      // ChatEngineProvider._supportChatRoomModel.disconnect();

      //
      // FIXME - this isn't implemented but it should be?
      // https://www.pubnub.com/docs/chat-engine/reference/chatengine#disconnect
      //
      ChatEngineProvider._chatEngine.disconnect();

      ChatEngineProvider._chatEngine = ChatEngineProvider.__createChatEngine();

      ChatEngineProvider._username = null;
      ChatEngineProvider._name = null;
      ChatEngineProvider._uuid = null;
      ChatEngineProvider._supportRoom = [];
      ChatEngineProvider._chatRoomModel = new ChatRoomModel();
      // ChatEngineProvider._supportChatRoomModel = new ChatRoomModel();
      ChatEngineProvider._connected = false;
      ChatEngineProvider._chatEngine = null;
    });
  }
  static getSupportChatRoomModel() {
    // return this._supportChatRoomModel;
  }
  static getChatRoomModel() {
    return this._chatRoomModel;
  }
}

export default ChatEngineProvider;
