import React, { Component } from "react";

import { View, Text, Button } from "react-native";

export default class Revisions extends Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>Revisions</Text>
        <Button title="Back" onPress={() => this.props.navigation.goBack()} />
      </View>
    );
  }
}
