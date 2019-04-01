import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Icon from "@expo/vector-icons/Feather";
import { withNavigation } from "react-navigation";

const GovernanceChannelItem = ({ link, title, ...props }) => {
  const nav = () => {
    props.navigation.navigate(link);
  };
  return (
    <TouchableOpacity style={styles.row} onPress={nav}>
      <View styleName="vertical">
        <Text style={styles.channelTitle}>{title}</Text>
        {/* <Text
          style={[styles.channelText, showUnread ? styles.unread : {}]}
          numberOfLines={1}
        >
          www.example.com/deal/link/that-is-really-long-sdoifs-sdfvsdf-sbd-fbsdfbs
        </Text> */}
      </View>
    </TouchableOpacity>
  );
};

export default withNavigation(GovernanceChannelItem);

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 15,
    width: "100%",
    paddingVertical: 15
  },
  channelTitle: {
    color: "#FFFFFF80",
    fontSize: 25
  },
  channelText: {
    color: "#FFFFFF80",
    fontSize: 15,
    maxWidth: "90%"
  },
  unread: {
    color: "#FFF"
  }
});
