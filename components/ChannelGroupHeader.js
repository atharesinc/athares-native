import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Icon from "@expo/vector-icons/Feather";

const ChannelGroupHeader = ({ displayPlus = false, title }) => (
  <View style={styles.row}>
    <Text style={styles.channelTitle}>{title}</Text>
    {displayPlus ? <Icon name="plus" size={25} color={"#FFFFFF"} /> : null}
  </View>
);

export default ChannelGroupHeader;

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 15,
    paddingVertical: 10,
    width: "100%",
    borderBottomWidth: 1,
    borderColor: "#FFFFFF"
  },
  channelTitle: {
    color: "#FFFFFF",
    fontSize: 15,
    textTransform: "uppercase",
    letterSpacing: 2
  }
});
