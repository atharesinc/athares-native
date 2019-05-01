import React, { Component } from "react";
import ScreenWrapper from "../../../components/ScreenWrapper";
import { View, ScrollView, Text, StyleSheet } from "react-native";
import InviteUser from "../../../components/InviteUser";
import Chat from "../../../components/Chat";

import { pull } from "../../../redux/state/reducers";
import { connect } from "react-redux";
import { encrypt } from "../../../utils/crypto";
import SimpleCrypto from "simple-crypto-js";
import { GET_USER_BY_ID } from "../../../graphql/queries";
import {
  CREATE_CHANNEL,
  CREATE_KEY,
  CREATE_MESSAGE,
  ADD_USER_TO_CHANNEL
} from "../../../graphql/mutations";
import { graphql, compose } from "react-apollo";
import { uploadImage, uploadDocument } from "../../../utils/upload";
import { UIActivityIndicator } from "react-native-indicators";

class CreateDM extends Component {
  state = {
    isFocused: false,
    tags: [],
    cryptoEnabled: false,
    uploadInProgress: false
  };

  onFocusChange = isFocused => {
    this.setState({
      isFocused
    });
  };
  updateTags = tags => {
    this.setState({
      tags
    });
  };
  renderTags = tags => {
    return tags.map(t => (
      <View style={styles.tag} key={t.id}>
        <Text style={styles.tagText}>{t.name}</Text>
      </View>
    ));
  };
  submit = async (text = "", file = null) => {
    let response = null;
    let { tags } = this.state;
    let { data } = this.props;
    if (!data.User) {
      return false;
    }
    // We're going to allow users to have no recipients because they always get added to a channel on creation
    // This defaults to a "just you" channel but they can later add users if they like
    // if (selectedUsers.length === 0) {
    //   return false;
    // }
    // if the user addresses themselves, remove them because they'll get added anyway
    let userIndex = tags.findIndex(u => u.id === this.props.user);
    if (userIndex !== -1) {
      tags.splice(userIndex, 1);
    }
    if (text.trim().length === 0 && file === null) {
      return false;
    }
    await this.setState({
      uploadInProgress: true
    });
    let { User: user } = this.props.data;

    // create a symmetric key for the new channel
    var _secretKey = SimpleCrypto.generateRandom({ length: 256 });

    // var simpleCrypto = new SimpleCrypto(_secretKey);

    // add this user to the list of selectedUsers
    tags.push(user);

    const tempName = tags.map(u => u.firstName + " " + u.lastName).join(", ");

    const newChannel = {
      name: tempName,
      channelType: "dm",
      description: tempName
    };

    try {
      // create the channel as a DM channel
      let res = await this.props.createChannel({
        variables: {
          ...newChannel
        }
      });

      let { id } = res.data.createChannel;

      // give each user an encrypted copy of this keypair and store it in
      let promiseList = tags.map(async u => {
        const encryptedKey = await encrypt(_secretKey, u.pub);
        return this.props.createKey({
          variables: {
            key: encryptedKey,
            user: u.id,
            channel: id
          }
        });
      });

      // add each user to this channel
      let promiseList2 = tags.map(u =>
        this.props.addUserToChannel({
          variables: {
            channel: id,
            user: u.id
          }
        })
      );
      // store all the keys, add all the users
      await Promise.all(promiseList);
      await Promise.all(promiseList2);

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

      this.props.navigation.navigate(`DMChannel`);
    } catch (err) {
      console.error(new Error(err));
      Alert.alert(
        "Error",
        "We were unable to send your message, please try again later"
      );
    }
  };
  render() {
    const { tags, loading } = this.state;
    if (loading || uploadInProgress) {
      return (
        <ScreenWrapper
          styles={{ justifyContent: "center", alignItems: "center" }}
        >
          <UIActivityIndicator color={"#FFFFFF"} />
        </ScreenWrapper>
      );
    }
    return (
      <ScreenWrapper styles={[styles.wrapper]}>
        <View
          style={{
            flexDirection: "column",
            alignItems: "stretch",
            maxHeight: "20%"
          }}
        >
          {tags.length !== 0 && (
            <View
              style={{
                flexDirection: "row",
                alignItems: "center"
              }}
            >
              <Text style={styles.toText}>To:</Text>
              <ScrollView
                contentContainerStyle={styles.tagsList}
                horizontal={true}
              >
                {this.renderTags(tags)}
              </ScrollView>
            </View>
          )}
          <InviteUser
            tags={tags}
            updateTags={this.updateTags}
            onFocusChange={this.onFocusChange}
          />
        </View>
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
  }
}

const styles = StyleSheet.create({
  wrapper: {
    alignItems: "stretch",
    justifyContent: "flex-start",
    width: "100%",
    flex: 1
  },
  tagsWrapper: {
    backgroundColor: "#3a3e52",
    borderRadius: 9999,
    paddingVertical: 5,
    paddingHorizontal: 10
  },
  tagsList: {
    backgroundColor: "transparent",
    paddingVertical: 5,
    paddingHorizontal: 10
  },
  toText: {
    color: "#FFFFFF80",
    marginRight: 5,
    marginLeft: 15,
    fontSize: 15
  },
  tag: {
    borderColor: "#00DFFC",
    borderWidth: 1,
    borderRadius: 9999,
    paddingVertical: 3,
    paddingHorizontal: 10,
    marginRight: 5
  },
  tagText: {
    color: "#00DFFC",
    fontSize: 15
  }
});

function mapStateToProps(state) {
  return {
    user: pull(state, "user")
  };
}

export default connect(mapStateToProps)(
  compose(
    graphql(CREATE_MESSAGE, { name: "createMessage" }),
    graphql(ADD_USER_TO_CHANNEL, { name: "addUserToChannel" }),
    graphql(CREATE_CHANNEL, { name: "createChannel" }),
    graphql(CREATE_KEY, { name: "createKey" }),
    graphql(GET_USER_BY_ID, {
      options: ({ user }) => ({ variables: { id: user || "" } })
    })
  )(CreateDM)
);
