import React, { Component, Fragment } from "react";
import { KeyboardAvoidingView, Platform, View, StyleSheet } from "react-native";
import Icon from "@expo/vector-icons/Feather";

import { GiftedChat, Composer, Send } from "react-native-gifted-chat";

import KeyboardSpacer from "react-native-keyboard-spacer";
import emojiUtils from "emoji-utils";
import Message from "./Message";

import CustomActions from "./CustomActions";

export default class Chat extends Component {
  state = {
    text: "",
    messages: [],
    loadEarlier: true,
    typingText: null,
    isLoadingEarlier: false,
    messages: [
      {
        _id: 1,
        text: "Hello developer",
        createdAt: new Date(),
        user: {
          _id: 2,
          name: "Brian",
          avatar: "https://placeimg.com/139/139/any"
        }
      },
      {
        _id: 2,
        text: "Hello developer",
        createdAt: new Date(),
        user: {
          _id: 1,
          name: "Dan",
          avatar: "https://placeimg.com/140/140/any"
        }
      }
    ]
  };
  onSend = (messages = []) => {
    // do createDMChannel stuff
    this.setState({
      messages: [...messages, ...(this.state.messages || [])]
    });
  };
  renderSend = props => {
    return (
      <Send {...props} containerStyle={styles.sendContainer}>
        <Icon name="send" size={25} color={"#FFFFFF"} />
      </Send>
    );
  };
  renderComposer = props => {
    return (
      <View style={styles.composerContainer}>
        <Composer
          {...props}
          textInputStyle={styles.composerInput}
          placeholder={"Enter Message"}
          multiline={true}
        />
      </View>
    );
  };
  renderMessage = props => {
    const {
      currentMessage: { text: currText }
    } = props;

    let messageTextStyle;

    // Make "pure emoji" messages much bigger than plain text.
    if (currText && emojiUtils.isPureEmojiString(currText)) {
      messageTextStyle = {
        fontSize: 28,
        // Emoji get clipped if lineHeight isn't increased; make it consistent across platforms.
        lineHeight: Platform.OS === "android" ? 34 : 30
      };
    }

    return (
      <Message
        key={props.currentMessage._id}
        {...props}
        messageTextStyle={messageTextStyle}
      />
    );
  };

  onSend = (messages = []) => {
    this.setState(previousState => {
      const sentMessages = [{ ...messages[0] }];
      return {
        messages: GiftedChat.append(previousState.messages, sentMessages)
      };
    });
  };

  onReceive = text => {
    this.setState(previousState => {
      return {
        messages: GiftedChat.append(previousState.messages, {
          _id: Math.round(Math.random() * 1000000),
          text,
          createdAt: new Date(),
          user: otherUser
        })
      };
    });
  };

  onSendFromUser = (messages = []) => {
    const createdAt = new Date();
    const messagesToUpload = messages.map(message => ({
      ...message,
      user,
      createdAt,
      _id: Math.round(Math.random() * 1000000)
    }));
    this.onSend(messagesToUpload);
  };

  renderCustomActions = props => {
    return <CustomActions {...props} onSend={this.onSendFromUser} />;
  };

  render() {
    return (
      <Fragment>
        <GiftedChat
          renderSend={this.renderSend}
          renderComposer={this.renderComposer}
          isAnimated={true}
          alignTop={true}
          messages={this.state.messages}
          onSend={this.onSend}
          //   keyboardShouldPersistTaps="never"
          //   loadEarlier={this.state.loadEarlier}
          //   onLoadEarlier={this.onLoadEarlier}
          //   isLoadingEarlier={this.state.isLoadingEarlier}
          //   parsePatterns={this.parsePatterns}
          user={{
            _id: 1
          }}
          //   renderAccessory={this.renderAccessory}
          renderMessage={this.renderMessage}
          renderActions={this.renderCustomActions}
          //   renderSystemMessage={this.renderSystemMessage}
          //   renderCustomView={this.renderCustomView}
          //   renderFooter={this.renderFooter}
        />
        {/* Both KeyboardAvoidingView and Keyboard Spacer appear to be required to make this work? */}
        <KeyboardAvoidingView behavior="padding" />
        {Platform.OS === "android" ? (
          <KeyboardSpacer topSpacing={-130} />
        ) : null}
      </Fragment>
    );
  }
}

const styles = StyleSheet.create({
  composerInput: {
    color: "#FFFFFF"
  },
  composerContainer: {
    backgroundColor: "#3a3e52",
    flex: 1
  },
  sendContainer: {
    width: 40,
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#3a3e52"
  }
});
