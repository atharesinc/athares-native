import React, { Component } from "react";

import {
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  Platform
} from "react-native";
import ScreenWrapper from "../../../components/ScreenWrapper";
import Chat from "../../../components/Chat";
import ChatInput from "../../../components/ChatInput";
import { pull } from "../../../redux/state/reducers";
import { removeUnreadChannel } from "../../../redux/state/actions";
import { connect } from "react-redux";
import { CREATE_MESSAGE } from "../../../graphql/mutations";
import { SUB_TO_MESSAGES_BY_CHANNEL_ID } from "../../../graphql/subscriptions";
import { GET_MESSAGES_FROM_CHANNEL_ID } from "../../../graphql/queries";
import { compose, graphql, Query } from "react-apollo";
import { uploadImage, uploadDocument } from "../../../utils/upload";
import KeyboardSpacer from "react-native-keyboard-spacer";
import defaultUserImage from "../../../components/defaultUserImage";
import { UIActivityIndicator } from "react-native-indicators";

class Channel extends Component {
  state = {
    uploadInProgress: false
  };
  componentDidMount() {
    if (this.props.activeChannel) {
      this.props.dispatch(removeUnreadChannel(this.props.activeChannel));
    }
  }
  componentDidUpdate(prevProps) {
    if (
      this.props.activeChannel &&
      this.props.activeChannel !== prevProps.activeChannel
    ) {
      this.props.dispatch(removeUnreadChannel(this.props.activeChannel));
    }
  }
  submit = async (text = "", file = null) => {
    let response = null;
    try {
      if (file) {
        this.setState({
          uploadInProgress: true
        });
        const imgs = ["gif", "png", "jpg", "jpeg", "bmp"];
        let extension = file.name.match(/\.(.{1,4})$/i);

        if (imgs.indexOf(extension[1].toLowerCase()) !== -1) {
          response = await uploadImage(file);
        } else {
          response = await uploadDocument(file);
        }
      }
      if (response) {
        if (response.error) {
          console.log(new Error(response.error));
          return false;
        }
      }
      if (text.trim() === "" && !response.url) {
        return false;
      }
      let newMessage = {
        text: text.trim(),
        channel: this.props.activeChannel,
        user: this.props.user,
        file: response ? response.url : null,
        fileName: response ? response.name : null
      };
      console.log(newMessage);
      await this.props.createMessage({
        variables: {
          ...newMessage
        }
      });

      this.setState({
        uploadInProgress: false
      });
    } catch (err) {
      this.setState({
        uploadInProgress: false
      });
      console.error(new Error(err));
      Alert.alert(
        "Error",
        "We were unable to send your message, please try again later"
      );
    }
  };
  _subToMore = subscribeToMore => {
    subscribeToMore({
      document: SUB_TO_MESSAGES_BY_CHANNEL_ID,
      variables: { id: this.props.activeChannel || "" },
      updateQuery: (prev, { subscriptionData }) => {
        let newMsg = subscriptionData.data.Message.node;
        // merge new messages into prev.messages
        if (prev) {
          prev.Channel.messages = [...prev.Channel.messages, newMsg];
        }
        return prev;
      }
    });
  };
  render() {
    let channel = null;
    let messages = [];
    let { user = null } = this.props;
    return (
      <Query
        query={GET_MESSAGES_FROM_CHANNEL_ID}
        variables={{ id: this.props.activeChannel || "" }}
      >
        {({ data, subscribeToMore }) => {
          if (data.Channel) {
            this._subToMore(subscribeToMore);
            channel = data.Channel;
            messages = data.Channel.messages;
          }

          if (data.Channel) {
            return (
              <ScreenWrapper styles={[styles.wrapper]}>
                <Chat user={user} messages={messages} />
                <ChatInput
                  onSend={this.submit}
                  uploadInProgress={this.state.uploadInProgress}
                />
                <KeyboardAvoidingView behavior="padding" />
                {Platform.OS === "android" ? (
                  <KeyboardSpacer topSpacing={-130} />
                ) : null}
              </ScreenWrapper>
            );
          } else {
            return (
              <ScreenWrapper
                styles={{ justifyContent: "center", alignItems: "center" }}
              >
                <UIActivityIndicator color={"#FFFFFF"} />
              </ScreenWrapper>
            );
          }
        }}
      </Query>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
    alignItems: "stretch",
    justifyContent: "flex-start",
    width: "100%",
    flex: 1
  }
});

function mapStateToProps(state) {
  return {
    user: pull(state, "user"),
    activeChannel: pull(state, "activeChannel"),
    activeCircle: pull(state, "activeCircle")
  };
}

export default compose(graphql(CREATE_MESSAGE, { name: "createMessage" }))(
  connect(mapStateToProps)(Channel)
);
