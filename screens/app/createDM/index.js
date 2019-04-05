import React, { Component } from "react";
import ScreenWrapper from "../../../components/ScreenWrapper";
import {
  View,
  ScrollView,
  Text,
  Button,
  StyleSheet,
  KeyboardAvoidingView,
  Platform
} from "react-native";
import InviteUser from "../../../components/InviteUser";
import { GiftedChat } from "react-native-gifted-chat";
import KeyboardSpacer from "react-native-keyboard-spacer";

export default class CreateDM extends Component {
  state = {
    isFocused: false,
    tags: [],
    messages: []
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
  onSend(messages = []) {
    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, messages)
    }));
  }
  handleBottomOffset = () => {
    if (Platform.OS === "ios") {
      const tabHeight = Header.HEIGHT; //HEADER is imported from react-navigation

      if (DeviceInfo.hasNotch()) return tabHeight + 20; // "20" is the value of the height of the pill in iphone x, iphone xs .. etc.

      return 50; // "50" was the value that worked on iphone devices REGARDLESS of the actual value of the tabHeight. this was tested on all sizings including SE.
    }
    return 0;
  };
  render() {
    const { tags } = this.state;

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
            suggestions={suggestions}
            tags={tags}
            updateTags={this.updateTags}
            onFocusChange={this.onFocusChange}
          />
        </View>
        <GiftedChat
          messages={this.state.messages}
          onSend={messages => this.onSend(messages)}
          isAnimated={true}
          alignTop={true}
          user={{
            _id: 1
          }}
        />
        <KeyboardAvoidingView behavior="padding" />
        {Platform.OS === "android" ? <KeyboardSpacer /> : null}
      </ScreenWrapper>
    );
  }
}
//           {Platform.OS === "android" ? <KeyboardSpacer /> : null}
var suggestions = [
  { name: "Jim", id: "123123" },
  { name: "Dan", id: "!2315" },
  { name: "Brian", id: "9182763" },
  { name: "Kyle", id: "48739201" }
];

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
