import React, { Component } from "react";

import { View, Text, Button } from "react-native";

export default class ViewOtherUser extends Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>ViewOtherUser</Text>
        <Button title="Back" onPress={() => this.props.navigation.goBack()} />
      </View>
    );
  }
}
