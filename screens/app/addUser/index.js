import React, { Component } from "react";
import ScreenWrapper from "../../../components/ScreenWrapper";
import Input from "../../../components/Input";
import InviteUser from "../../../components/InviteUser";

import {
  Text,
  View,
  ScrollView,
  StyleSheet,
  KeyboardAvoidingView
} from "react-native";

import PortalButton from "../../../components/PortalButton";

export default class Me extends Component {
  state = {
    isFocused: false,
    tags: []
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
  submit = () => {
    console.log("Create Circle!");
    this.props.navigation.goBack(null);
  };
  render() {
    const { tags } = this.state;

    return (
      <ScreenWrapper styles={[styles.wrapper]}>
        <ScrollView styles={[styles.wrapper]}>
          <KeyboardAvoidingView behavior="padding">
            <Text style={styles.header}>
              ADD EXISTING USERS TO PARTICIPATE IN THIS CIRCLE
            </Text>
            <Text style={styles.label}>Invite Users</Text>
            <View style={styles.picker}>
              {tags.length !== 0 && (
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center"
                  }}
                >
                  <Text style={styles.toText}>Invite:</Text>
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

            <Text style={styles.disclaimer}>
              After pressing "Invite Users", the recipient(s) will be added
              automatically to this circle.
            </Text>
            <Text style={styles.disclaimer}>
              Invitations aren't subject to democratic process.
            </Text>
            <PortalButton
              title="Invite Users"
              style={styles.marginTop}
              onPress={this.submit}
            />
          </KeyboardAvoidingView>
        </ScrollView>
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
  header: {
    textTransform: "uppercase",
    letterSpacing: 2,
    fontSize: 13,
    color: "#FFFFFFb7",
    marginBottom: 25
  },
  wrapper: {
    alignItems: "stretch",
    justifyContent: "flex-start",
    width: "100%",
    flex: 1,
    padding: 13
  },
  disclaimer: {
    fontSize: 15,
    color: "#FFFFFFb7",
    marginBottom: 5
  },
  label: {
    fontSize: 18,
    marginBottom: 10,
    color: "#FFF"
  },
  picker: {
    flexDirection: "column",
    alignItems: "stretch",
    marginBottom: 20
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
  },
  marginTop: {
    marginTop: 15
  }
});
