import React, { Component } from "react";

import { Text, TouchableOpacity, StyleSheet } from "react-native";
import { withNavigation } from "react-navigation";
import Icon from "@expo/vector-icons/Feather";

class Header extends Component {
  render() {
    let {
      loggedIn = true,
      belongsToCircle = true,
      searchOpen = false,
      ...props
    } = this.props;
    // render screen name and back

    // render channelName and back

    // render dashboard with user drawer
    return (
      <View style={styles.header}>
        <TouchableOpacity onPress={props.navigation.openDrawer}>
          <Image source={require("../assets/user-default.png")} />
        </TouchableOpacity>
        {searchOpen ? (
          <Icon name="search" size={25} color={"#FFFFFF"} />
        ) : (
          <Icon name="close" size={25} color={"#FFFFFF"} />
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#282a38",
    height: "10%"
    // flexDirection: "row",
    // justifyContent: "space-between",
    // alignItems: "center",
    // paddingHorizontal: 15
  }
});

export default Header;
