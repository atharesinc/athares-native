import React, { Component } from "react";
import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Alert
} from "react-native";
import Icon from "@expo/vector-icons/Feather";
import ScreenWrapper from "../../../components/ScreenWrapper";
import InviteUser from "../../../components/InviteUser";
import Chat from "../../../components/Chat";
import ChatInput from "../../../components/ChatInput";
import { encrypt } from "../../../utils/crypto";
import { uploadImage, uploadDocument } from "../../../utils/upload";
import KeyboardSpacer from "react-native-keyboard-spacer";
import { UIActivityIndicator } from "react-native-indicators";

import { pull } from "../../../redux/state/reducers";
import { connect } from "react-redux";
import SimpleCrypto from "simple-crypto-js";

import { GET_USER_BY_ID } from "../../../graphql/queries";
import {
  CREATE_CHANNEL,
  CREATE_KEY,
  CREATE_MESSAGE,
  ADD_USER_TO_CHANNEL
} from "../../../graphql/mutations";
import { graphql, compose } from "react-apollo";

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
  handleDelete = index => {
    let tagsSelected = this.state.tags;
    tagsSelected.splice(index, 1);
    this.updateTags(tagsSelected);
  };
  renderTags = tags => {
    return tags.map((t, i) => (
      <View style={styles.tag} key={t.id}>
        <Text style={styles.tagText}>{t.name}</Text>
        <TouchableOpacity
          style={{ justifyContent: "center", alignItems: "center" }}
          onPress={() => {
            this.handleDelete(i);
          }}
        >
          <Icon name="x" size={20} color={styles.tagText.color} />
        </TouchableOpacity>
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
    await this.setState({
      uploadInProgress: true
    });
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
    let { User: user } = data;

    // create a symmetric key for the new channel
    var _secretKey = SimpleCrypto.generateRandom({ length: 256 });

    var simpleCrypto = new SimpleCrypto(_secretKey);

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
        let encryptedKey = encrypt(_secretKey, u.pub);
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

      // get to sending the first message for the newly created DMChannel
      if (file) {
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
          console.error(new Error(response.error));
          return false;
        }
      }
      if (text.trim() === "" && !response.url) {
        return false;
      }

      // encrypt the relevant parts of the message
      let newMessage = {
        text: simpleCrypto.encrypt(text.trim()),
        channel: id,
        user: this.props.user,
        file: response ? simpleCrypto.encrypt(response.url) : null,
        fileName: response ? response.name : null
      };

      await this.props.createMessage({
        variables: {
          ...newMessage
        }
      });

      this.props.navigation.navigate(`DMChannel`);
    } catch (err) {
      await this.setState({
        uploadInProgress: true
      });
      console.error(new Error(err));
      Alert.alert(
        "Error",
        "We were unable to create this Channel, please try again later"
      );
    }
  };
  render() {
    const { tags, uploadInProgress } = this.state;
    const { user } = this.props;
    if (uploadInProgress) {
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
        <Chat user={user} messages={[]} />
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
    marginRight: 5,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  tagText: {
    color: "#00DFFC",
    fontSize: 15,
    marginRight: 15
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
