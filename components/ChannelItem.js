import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Icon from "@expo/vector-icons/Feather";

const ChannelItem = ({
  channel = { name: "" },
  lastMessage,
  showUnread = false
}) => (
  <TouchableOpacity style={styles.row}>
    <View styleName="vertical">
      <Text style={[styles.channelTitle, showUnread ? styles.unread : {}]}>
        {channel.name || "General"}
      </Text>
      <Text
        style={[styles.channelText, showUnread ? styles.unread : {}]}
        numberOfLines={1}
      >
        www.example.com/deal/link/that-is-really-long-sdoifs-sdfvsdf-sbd-fbsdfbs
      </Text>
    </View>
    {showUnread && (
      <Icon
        styleName="disclosure"
        name="alert-circle"
        size={25}
        color={"#00dffc"}
      />
    )}
  </TouchableOpacity>
);

export default ChannelItem;

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
