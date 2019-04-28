import React, { Component } from "react";

import { StyleSheet, Alert } from "react-native";
import ScreenWrapper from "../../../components/ScreenWrapper";
import Chat from "../../../components/Chat";

import { pull } from "../../../store/state/reducers";
import { removeUnreadChannel } from "../../../store/state/actions";
import { connect } from "react-redux";
import { CREATE_MESSAGE } from "../../../graphql/mutations";
import { SUB_TO_MESSAGES_BY_CHANNEL_ID } from "../../../graphql/subscriptions";
import { GET_MESSAGES_FROM_CHANNEL_ID } from "../../../graphql/queries";
import { compose, graphql, Query } from "react-apollo";
import uploadToIPFS from "../../../utils/ipfs";

import { UIActivityIndicator } from "react-native-indicators";

class Channel extends Component {
  componentDidMount() {
    if (this.props.activeChannel) {
      this.props.dispatch(removeUnreadChannel(this.props.match.params.id));
    }
  }
  componentDidUpdate(prevProps) {
    if (
      this.props.activeChannel &&
      this.props.activeChannel !== prevProps.activeChannel
    ) {
      this.props.dispatch(removeUnreadChannel(this.props.match.params.id));
    }
  }
  updateProgress = (prog, length) => {
    // console.log(prog / length);
  };
  submit = async messages => {
    messages.forEach(async message => {
      let { text, image: file } = message;

      if (file) {
        await this.setState({
          uploadInProgress: true
        });
      }

      try {
        let url =
          file === null ? null : await uploadToIPFS(file, this.updateProgress);
        if (file) {
          fetch(url);
        }
        let newMessage = {
          text: text.trim(),
          channel: this.props.activeChannel,
          user: this.props.user,
          file: url,
          fileName: file !== null ? file.name : null
        };

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
    });
  };
  _subToMore = subscribeToMore => {
    subscribeToMore({
      document: SUB_TO_MESSAGES_BY_CHANNEL_ID,
      variables: { id: this.props.activeChannel || "" },
      updateQuery: (prev, { subscriptionData }) => {
        // this.props.getChannelMessages.refetch({
        //   id: activeChannel
        // });
        let newMsg = subscriptionData.data.Message.node;
        if (!prev.Channel.messages.find(m => m.id === newMsg.id)) {
          // merge new messages into prev.messages
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
            messages = data.Channel.messages.map(m => ({ ...m, _id: m.id }));
          }

          if (channel) {
            return (
              <ScreenWrapper styles={[styles.wrapper]}>
                <Chat
                  user={user}
                  messages={messages}
                  sendMessages={this.submit}
                />
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
