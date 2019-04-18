import React, { Component } from "react";

import { StyleSheet } from "react-native";
import ScreenWrapper from "../../../components/ScreenWrapper";
import Chat from "../../../components/Chat";

export default class Channel extends Component {
  render() {
    return (
      <ScreenWrapper styles={[styles.wrapper]}>
        <Chat />
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
  }
});
