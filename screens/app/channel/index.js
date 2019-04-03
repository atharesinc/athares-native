import React, { Component } from "react";

import { View, Text, Button } from "react-native";

export default class Channel extends Component {
  render() {
    return (
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "transparent"
        }}
      >
        <Text>Channel</Text>
        <Button title="Back" onPress={() => this.props.navigation.goBack()} />
      </View>
    );
  }
}
