import React, { Component } from "react";
import ScreenWrapper from "../../../components/ScreenWrapper";
import { View, ScrollView, Text, Button, StyleSheet } from "react-native";
import InviteUser from "../../../components/InviteUser";
import { GiftedChat } from "react-native-gifted-chat";

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
  render() {
    const { tags } = this.state;
    return (
      <ScreenWrapper styles={styles.wrapper}>
        <View
          style={{
            flexDirection: "column",
            alignItems: "stretch"
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
          user={{
            _id: 1
          }}
        />
      </ScreenWrapper>
    );
  }
}
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
