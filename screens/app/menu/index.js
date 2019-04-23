import React, { Component } from "react";
import { NavigationActions } from "react-navigation";
import { ScrollView, StyleSheet } from "react-native";
import UserLink from "../../../components/UserLink";
import MenuLink from "../../../components/MenuLink";
import ScreenWrapper from "../../../components/ScreenWrapper";

class SideMenu extends Component {
  navigateToScreen = route => () => {
    const navigateAction = NavigationActions.navigate({
      routeName: route
    });
    this.props.navigation.dispatch(navigateAction);
  };
  goToProfile = () => {
    const navigateAction = NavigationActions.navigate({
      routeName: "ViewUser"
    });
    this.props.navigation.dispatch(navigateAction);
  };
  render() {
    return (
      <ScreenWrapper styles={[styles.wrapper]}>
        {/* User */}
        <UserLink onPress={this.goToProfile} />
        <ScrollView>
          {/* Links */}
          <MenuLink icon="help-circle" label="About" details="FAQs and Us" />
          <MenuLink
            icon="info"
            label="Privacy"
            details="Privacy Policy and Terms of Use"
          />
          <MenuLink icon="log-out" label="Log out" />
        </ScrollView>
      </ScreenWrapper>
    );
  }
}

export default SideMenu;

const styles = StyleSheet.create({
  wrapper: {
    alignItems: "stretch",
    justifyContent: "flex-start",
    width: "100%",
    flex: 1,
    padding: 15,
    backgroundColor: "#2f3242"
  },
  userLink: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    padding: 5
  },
  image: {
    height: 40,
    width: 40,
    borderRadius: 9999
  },
  header: {
    fontSize: 18,
    color: "#FFFFFF"
  },
  disclaimer: {
    fontSize: 14,
    color: "#FFFFFFb7"
  }
});
