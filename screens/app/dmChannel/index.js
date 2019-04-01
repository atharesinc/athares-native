import React, { Component } from "react";
import { createDrawerNavigator } from "react-navigation";

import { View, Text, Button } from "react-native";
import Menu from "../dmSettings";

class DMChannelWithoutDrawer extends Component {
  render() {
    return (
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        <Button
          onPress={() => this.props.navigation.openDrawer()}
          title="Open Drawer"
        />
        <Text>DM Channel</Text>
        <Button title="Back" onPress={() => this.props.navigation.goBack()} />
      </View>
    );
  }
}
const DMChannel = createDrawerNavigator(
  {
    DMChannel: {
      screen: DMChannelWithoutDrawer
    }
  },
  {
    contentComponent: Menu,
    drawerPosition: "right"
    // drawerWidth: 300
  }
);
export default DMChannel;
