import React, { Component, Fragment } from "react";
import { KeyboardAvoidingView, Platform, View, StyleSheet } from "react-native";
import Icon from "@expo/vector-icons/Feather";

import { GiftedChat, Composer, Send } from "react-native-gifted-chat";

import KeyboardSpacer from "react-native-keyboard-spacer";
import emojiUtils from "emoji-utils";
import Message from "./Message";

import CustomActions from "./CustomActions";

export default class Chat extends Component {
  constructor(props) {
    super(props);

    this.state = {
      text: "",
      messages: this.props.messages,
      loadEarlier: true,
      typingText: null,
      isLoadingEarlier: false
    };
  }
  onSend = (messages = []) => {
    this.props.sendMessages(messages);
    const step = this.state.step + 1;
    this.setState(previousState => {
      let newMessage = {
        _id: new Date().getTime() + "-" + (Math.random() * 100000).toString(16),
        ...messages[0],
        user: {
          _id: this.props.user
        }
      };
      const sentMessages = [newMessage];
      return {
        messages: GiftedChat.append(previousState.messages, sentMessages),
        step
      };
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

  onReceive = text => {
    console.log(text);
    this.setState(previousState => {
      return {
        messages: GiftedChat.append(previousState.messages, {
          _id: Math.round(Math.random() * 1000000),
          text,
          createdAt: new Date(),
          user: { _id: "1" }
        })
      };
    });
  };

  // onSendFromUser = (messages = []) => {
  //   // const createdAt = new Date();
  //   // const messagesToUpload = messages.map(message => ({
  //   //   ...message,
  //   //   user,
  //   //   createdAt,
  //   //   _id: Math.round(Math.random() * 1000000)
  //   // }));
  //   this.onSend(messages);
  // };

  renderCustomActions = props => {
    return <CustomActions {...props} onSend={this.onSend} />;
  };

  render() {
    console.log(this.state.messages.length);
    return (
      <Fragment>
        <GiftedChat
          renderSend={this.renderSend}
          renderComposer={this.renderComposer}
          isAnimated={true}
          alignTop={true}
          messages={this.state.messages}
          onSend={this.onSend}
          inverted={false}
          //   keyboardShouldPersistTaps="never"
          //   loadEarlier={this.state.loadEarlier}
          //   onLoadEarlier={this.onLoadEarlier}
          //   isLoadingEarlier={this.state.isLoadingEarlier}
          //   parsePatterns={this.parsePatterns}
          user={{ _id: this.props.user || null }}
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
