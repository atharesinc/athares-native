import React, { Component } from "react";

import { Text, TouchableOpacity, StyleSheet, View, Image } from "react-native";
import { withNavigation } from "react-navigation";
import Icon from "@expo/vector-icons/Feather";

class Header extends Component {
  toggleDrawer = () => {
    this.props.navigation.toggleDrawer();
  };
  render() {
    let {
      loggedIn = true,
      belongsToCircle = true,
      searchOpen = false
    } = this.props;

    // render screen name and back

    // render channelName and back

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
          <Icon name="search" size={25} color={"#FFFFFF"} />
        ) : (
          <Icon name="x" size={25} color={"#FFFFFF"} />
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
  userIcon: {
    height: 40,
    width: 40,
    borderRadius: 9999,
    borderColor: "#FFFFFF",
    borderWidth: 3
  }
});

export default withNavigation(Header);
