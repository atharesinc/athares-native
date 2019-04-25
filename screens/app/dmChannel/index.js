import React, { Component } from "react";
import { createDrawerNavigator } from "react-navigation";

import { StyleSheet } from "react-native";
import Menu from "../dmSettings";
import { connect } from "react-redux";
import ScreenWrapper from "../../../components/ScreenWrapper";
import Chat from "../../../components/Chat";

const pullUI = require("../../../redux/ui/reducers").pull;

class DMChannelWithoutDrawer extends Component {
  componentDidUpdate(prevProps) {
    if (prevProps.dmSettings !== this.props.dmSettings) {
      this.props.navigation.toggleDrawer();
    }
  }
  render() {
    return (
      <ScreenWrapper styles={[styles.wrapper]}>
        <Chat />
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
    drawerPosition: "right",
    drawerWidth: 350
  }
);
export default DMChannel;

const styles = StyleSheet.create({
  wrapper: {
    alignItems: "stretch",
    justifyContent: "flex-start",
    width: "100%",
    flex: 1
  }
});
