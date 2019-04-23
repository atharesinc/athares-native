import React, { Component } from "react";
import ScreenWrapper from "../../../components/ScreenWrapper";
import Amendment from "../../../components/Amendment";

import { Text, ScrollView, StyleSheet } from "react-native";

export default class Constitution extends Component {
  state = {
    edit: false
  };

  toggleEdit = () => {
    this.setState({
      edit: !this.state.edit
    });
  };

  render() {
    const { edit } = this.state;

    return (
      <ScreenWrapper styles={[styles.wrapper]}>
        <Text style={styles.preamble}>
          Athares is dedicated to providing democratic functionality to groups
          and organizations everywhere.
        </Text>
        <ScrollView styles={[styles.wrapper]}>
          <Amendment />
          <Amendment />
          <Amendment />
          <Amendment />
          <Amendment />
          <Amendment />
          <Amendment />
          <Amendment />
          <Amendment />
          <Amendment />
          <Amendment />
        </ScrollView>
      </ScreenWrapper>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
    alignItems: "stretch",
    justifyContent: "flex-start",
    width: "100%",
    flex: 1,
    padding: 13
  },
  preamble: {
    color: "#FFFFFF",
    fontSize: 15,
    marginBottom: 20
  }
});
