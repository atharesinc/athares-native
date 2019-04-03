import React, { Component } from "react";
import ScreenWrapper from "../../../components/ScreenWrapper";
import { View, Text, Button, StyleSheet } from "react-native";
import InviteUser from "../../../components/InviteUser";

export default class CreateDM extends Component {
  state = {
    isFocused: false
  };
  onFocusChange = isFocused => {
    this.setState({
      isFocused
    });
  };
  render() {
    return (
      <ScreenWrapper styles={styles.wrapper}>
        <View>
          <Text>To:</Text>
          <InviteUser
            suggestions={suggestions}
            onFocusChange={this.onFocusChange}
          />
        </View>
        <Text>Create DM</Text>
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
  }
});
