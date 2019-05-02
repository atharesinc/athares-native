import React, { Component } from "react";
import { NavigationActions } from "react-navigation";
import { ScrollView, StyleSheet } from "react-native";
import UserLink from "../../../components/UserLink";
import MenuLink from "../../../components/MenuLink";
import ScreenWrapper from "../../../components/ScreenWrapper";
import { Linking } from "expo";

import { connect } from "react-redux";
import { logout } from "../../../redux/state/actions";
import { pull } from "../../../redux/state/reducers";
import { Query } from "react-apollo";
import { GET_USER_BY_ID } from "../../../graphql/queries";

class SideMenu extends Component {
  navigateToScreen = route => () => {
    const navigateAction = NavigationActions.navigate({
      routeName: route
    });
    this.props.navigation.dispatch(navigateAction);
  };
  logoutUser = async () => {
    this.props.dispatch(logout());
    this.props.navigation.navigate("Login");
  };
  goToLogin = () => {
    this.props.navigation.navigate("Login");
  };
  goToProfile = () => {
    const navigateAction = NavigationActions.navigate({
      routeName: "ViewUser"
    });
    this.props.navigation.dispatch(navigateAction);
  };
  goToAbout = () => {
    Linking.openURL("https://www.athares.us/about");
  };
  goToPolicy = () => {
    Linking.openURL("https://www.athares.us/policy");
  };
  render() {
    return (
      <Query
        query={GET_USER_BY_ID}
        variables={{ id: this.props.userId || "" }}
        pollInterval={30000}
      >
        {({ data }) => {
          let user = null;
          if (data.User) {
            user = data.User;
          }
          return (
            <ScreenWrapper styles={[styles.wrapper]}>
              {/* User */}
              {user ? (
                <UserLink onPress={this.goToProfile} user={user} />
              ) : (
                <MenuLink
                  icon="log-in"
                  label="Login"
                  onPress={this.goToLogin}
                />
              )}
              <ScrollView>
                {/* Links */}
                <MenuLink
                  icon="help-circle"
                  label="About"
                  details="FAQs and Us"
                  onPress={this.goToAbout}
                />
                <MenuLink
                  icon="info"
                  label="Privacy"
                  details="Privacy Policy and Terms of Use"
                  onPress={this.goToPolicy}
                />
                {user && (
                  <MenuLink
                    icon="log-out"
                    label="Log out"
                    onPress={this.logoutUser}
                  />
                )}
              </ScrollView>
            </ScreenWrapper>
          );
        }}
      </Query>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
    alignItems: "stretch",
    justifyContent: "flex-start",
    width: "100%",
    flex: 1,
    paddingTop: 15,
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

function mapStateToProps(state) {
  return {
    userId: pull(state, "user")
  };
}
export default connect(mapStateToProps)(SideMenu);
