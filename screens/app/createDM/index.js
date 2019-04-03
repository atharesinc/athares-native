import React, { Component } from "react";
import ScreenWrapper from "../../../components/ScreenWrapper";
import { View, Text, Button } from "react-native";
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
      <ScreenWrapper>
        <InviteUser
          suggestions={suggestions}
          onFocusChange={this.onFocusChange}
        />
        <Text>Create DM</Text>
      </ScreenWrapper>
    );
  }
}
