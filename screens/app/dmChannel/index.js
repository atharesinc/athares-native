import React, { Component } from "react";
import { createDrawerNavigator } from "react-navigation";

import { View, Text, Button } from "react-native";
import Menu from "../dmSettings";
import { connect } from "react-redux";
import ScreenWrapper from "../../../components/ScreenWrapper";
const pullUI = require("../../../redux/ui/reducers").pull;

class DMChannelWithoutDrawer extends Component {
  componentDidUpdate(prevProps) {
    if (prevProps.dmSettings !== this.props.dmSettings) {
      this.props.navigation.toggleDrawer();
    }
  }
  render() {
    return (
      <ScreenWrapper>
        <Button
          onPress={() => this.props.navigation.openDrawer()}
          title="Open Drawer"
        />
        <Text>DM Channel</Text>
        <Button title="Back" onPress={() => this.props.navigation.goBack()} />
      </ScreenWrapper>
    );
  }
}
function mapStateToProps(state) {
  return {
    dmSettings: pullUI(state, "dmSettings")
  };
}
const DMChannel = createDrawerNavigator(
  {
    DMChannel: {
      screen: connect(mapStateToProps)(DMChannelWithoutDrawer)
    }
  },
  {
    contentComponent: Menu,
    drawerPosition: "right"
    // drawerWidth: 300
  }
);
export default DMChannel;
