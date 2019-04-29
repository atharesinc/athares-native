import React, { Component } from "react";

import { Text, TouchableOpacity, StyleSheet, View, Image } from "react-native";
import { withNavigation } from "react-navigation";
import Icon from "@expo/vector-icons/Feather";
import { connect } from "react-redux";
import { toggleSearch } from "../redux/ui/actions";
import { pull } from "../redux/state/reducers";
import { toggleDMSettings } from "../redux/ui/actions";
import { Query } from "react-apollo";
import {
  GET_USER_BY_ID,
  GET_MESSAGES_FROM_CHANNEL_ID,
  GET_REVISION_BY_ID
} from "../graphql/queries";

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
  createRevision = () => {
    this.props.navigation.navigate("CreateRevision");
  };
  render() {
    let {
      loggedIn = false,
      belongsToCircle = false,
      searchOpen = false,
      navigation: {
        state: { routes }
      },
      user = null,
      activeChannel,
      activeRevision,
      activeUser
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
      "CreateDM",
      "CreateRevision",
      "EditAmendment"
    ];

    const simpleChannelsObj = {
      CreateCircle: "Create Circle",
      CircleSettings: "Circle Settings",
      Constitution: "Constitution",
      CreateChannel: "Create Channel",
      AddUser: "Add User",
      Revisions: "Revisions",
      CreateDM: "New Message",
      CreateRevision: "Create Revision",
      EditAmendment: "Edit Amendment"
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
          {routeName === "Constitution" ? (
            <TouchableOpacity onPress={this.createRevision}>
              <Icon name="plus" size={25} color={"#FFFFFF"} />
            </TouchableOpacity>
          ) : (
            <Icon name="more-vertical" size={25} color={"transparent"} />
          )}
        </View>
      );
    }
    // render channelName and back
    if (["Channel", "DMChannel"].indexOf(routeName) !== -1) {
      return (
        <Query
          query={GET_MESSAGES_FROM_CHANNEL_ID}
          variables={{ id: activeChannel || "" }}
        >
          {({ data }) => {
            return (
              <View style={[styles.header, styles.headerThemeDark]}>
                <TouchableOpacity onPress={this.back}>
                  <Icon name="chevron-left" size={25} color={"#FFFFFF"} />
                </TouchableOpacity>
                {data.Channel && (
                  <Text style={styles.headerText} numberOfLines={1}>
                    {data.Channel.name}
                  </Text>
                )}
                {routeName === "DMChannel" ? (
                  <TouchableOpacity onPress={this.more}>
                    <Icon name="more-vertical" size={25} color={"#FFFFFF"} />
                  </TouchableOpacity>
                ) : (
                  <Icon name="more-vertical" size={25} color={"transparent"} />
                )}
              </View>
            );
          }}
        </Query>
      );
    }
    // render revision name and back
    if (routeName === "ViewRevision") {
      return (
        <Query query={GET_REVISION_BY_ID} variables={{ id: activeRevision }}>
          {({ data }) => {
            return (
              <View style={[styles.header, styles.headerThemeDark]}>
                <TouchableOpacity onPress={this.back}>
                  <Icon name="chevron-left" size={25} color={"#FFFFFF"} />
                </TouchableOpacity>
                {data.Revision && (
                  <Text style={styles.headerText} numberOfLines={1}>
                    {data.Revision.title}
                  </Text>
                )}
                <Icon name="more-vertical" size={25} color={"transparent"} />
              </View>
            );
          }}
        </Query>
      );
    }
    // render username and back
    if (["ViewUser", "ViewOtherUser"].indexOf(routeName) !== -1) {
      return (
        <Query
          query={GET_USER_BY_ID}
          variables={{ id: activeUser || user || "" }}
        >
          {({ data }) => {
            return (
              <View style={[styles.header, styles.headerThemeDark]}>
                <TouchableOpacity onPress={this.back}>
                  <Icon name="chevron-left" size={25} color={"#FFFFFF"} />
                </TouchableOpacity>
                {data.User && (
                  <Text style={styles.headerText} numberOfLines={1}>
                    {data.User.firstName + " " + data.User.lastName}
                  </Text>
                )}
                <Icon name="more-vertical" size={25} color={"transparent"} />
              </View>
            );
          }}
        </Query>
      );
    }
    // render dashboard with user drawer
    return (
      <Query
        query={GET_USER_BY_ID}
        variables={{ id: user || "" }}
        pollInterval={2000}
      >
        {({ loading, err, data }) => {
          if (data.User) {
            user = data.User;
          }
          return (
            <View style={styles.header}>
              <TouchableOpacity onPress={this.toggleDrawer}>
                <Image
                  source={
                    user
                      ? { uri: user.icon }
                      : require("../assets/user-default.png")
                  }
                  style={styles.userIcon}
                />
              </TouchableOpacity>
              {!searchOpen ? (
                <TouchableOpacity onPress={this.toggleSearch}>
                  <Icon name="search" size={25} color={"#FFFFFF"} />
                </TouchableOpacity>
              ) : (
                <TouchableOpacity onPress={this.toggleSearch}>
                  <Icon
                    name="x"
                    size={25}
                    color={"#FFFFFF"}
                    numberOfLines={1}
                  />
                </TouchableOpacity>
              )}
            </View>
          );
        }}
      </Query>
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
    user: pull(state, "user"),
    activeChannel: pull(state, "activeChannel"),
    activeUser: pull(state, "activeUser"),
    activeRevision: pull(state, "activeRevision"),
    dmSettings: pullUI(state, "dmSettings")
  };
}
export default connect(mapStateToProps)(withNavigation(Header));
