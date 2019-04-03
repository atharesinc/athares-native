import React, { Component } from "react";

import { Text, TouchableOpacity, StyleSheet, View, Image } from "react-native";
import { withNavigation } from "react-navigation";
import Icon from "@expo/vector-icons/Feather";
import { connect } from "react-redux";
import { toggleSearch } from "../redux/ui/actions";
import { pull } from "../redux/state/reducers";
import { toggleDMSettings } from "../redux/ui/actions";
const pullUI = require("../redux/ui/reducers").pull;

class Header extends Component {
  toggleDrawer = () => {
    this.props.navigation.toggleDrawer();
  };
  toggleSearch = () => {
    this.props.dispatch(toggleSearch());
  };
  back = () => {
    // this.props.navigation.navigate("Dashboard");
    this.props.navigation.goBack(null);
  };
  more = () => {
    let {
      navigation: {
        state: { routes }
      }
    } = this.props;
    let { routeName } = routes[routes.length - 1];
    if (routeName === "DMChannel") {
      this.props.dispatch(toggleDMSettings());
    }
  };
  render() {
    let {
      loggedIn = false,
      belongsToCircle = false,
      searchOpen = false,
      navigation: {
        state: { routes }
      }
    } = this.props;

    const { routeName } = routes[routes.length - 1];
    const routeTitleIndex = /[A-Z]/.exec("createChannel").index;

    const simpleChannelsArr = [
      "CreateCircle",
      "CircleSettings",
      "Constitution",
      "CreateChannel",
      "AddUser",
      "Revisions",
      "CreateDM"
    ];

    const simpleChannelsObj = {
      CreateCircle: "Create Circle",
      CircleSettings: "Circle Settings",
      Constitution: "Constitution",
      CreateChannel: "Create Channel",
      AddUser: "Add User",
      Revisions: "Revisions",
      CreateDM: "New Message"
    };

    // render screen name and back
    if (simpleChannelsArr.indexOf(routeName) !== -1) {
      return (
        <View style={[styles.header, styles.headerThemeDark]}>
          <TouchableOpacity onPress={this.back}>
            <Icon name="chevron-left" size={25} color={"#FFFFFF"} />
          </TouchableOpacity>
          <Text style={styles.headerText} numberOfLines={1}>
            {simpleChannelsObj[routeName]}
          </Text>
          <Icon name="more-vertical" size={25} color={"transparent"} />
        </View>
      );
    }
    // render channelName and back
    if (["Channel", "DMChannel"].indexOf(routeName) !== -1) {
      return (
        <View style={[styles.header, styles.headerThemeDark]}>
          <TouchableOpacity onPress={this.back}>
            <Icon name="chevron-left" size={25} color={"#FFFFFF"} />
          </TouchableOpacity>
          <Text style={styles.headerText} numberOfLines={1}>
            this.props.channel.name
          </Text>
          {routeName === "DMChannel" ? (
            <TouchableOpacity onPress={this.more}>
              <Icon name="more-vertical" size={25} color={"#FFFFFF"} />
            </TouchableOpacity>
          ) : (
            <Icon name="more-vertical" size={25} color={"transparent"} />
          )}
        </View>
      );
    }
    // render username and back
    if (routeName === "ViewOtherUser") {
      return (
        <View style={[styles.header, styles.headerThemeDark]}>
          <TouchableOpacity onPress={this.back}>
            <Icon name="chevron-left" size={25} color={"#FFFFFF"} />
          </TouchableOpacity>
          <Text style={styles.headerText} numberOfLines={1}>
            this.props.user.firstname
          </Text>
          <Icon name="more-vertical" size={25} color={"transparent"} />
        </View>
      );
    }
    // render dashboard with user drawer
    return (
      <View style={styles.header}>
        <TouchableOpacity onPress={this.toggleDrawer}>
          <Image
            source={require("../assets/user-default.png")}
            style={styles.userIcon}
          />
        </TouchableOpacity>
        {!searchOpen ? (
          <TouchableOpacity onPress={this.toggleSearch}>
            <Icon name="search" size={25} color={"#FFFFFF"} />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={this.toggleSearch}>
            <Icon name="x" size={25} color={"#FFFFFF"} numberOfLines={1} />
          </TouchableOpacity>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#282a38",
    height: 60,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 15,
    width: "100%",
    zIndex: 0
  },
  headerThemeDark: {
    backgroundColor: "#282a3899"
  },
  headerTheme: {
    backgroundColor: "#2f324299"
  },
  headerThemeLighter: {
    backgroundColor: "#3a3e5299"
  },
  headerText: {
    color: "#FFFFFF",
    fontSize: 15
  },
  userIcon: {
    height: 40,
    width: 40,
    borderRadius: 9999,
    borderColor: "#FFFFFF",
    borderWidth: 3
  }
});

function mapStateToProps(state) {
  return {
    activeChannel: pull(state, "activeChannel"),
    activeUser: pull(state, "activeUser"),
    activeRevision: pull(state, "activeRevision"),
    dmSettings: pullUI(state, "dmSettings")
  };
}
export default connect(mapStateToProps)(withNavigation(Header));
