import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Icon from "@expo/vector-icons/Feather";
import { withNavigation } from "react-navigation";
import { updateChannel } from "../redux/state/actions";
import { connect } from "react-redux";

const ChannelItem = ({
  channel = { name: "", channelType: "group" },
  lastMessage = null,
  showUnread = false,
  dispatch,
  ...props
}) => {
  const nav = () => {
    console.log(channel.id);
    if (channel.channelType === "dm") {
      dispatch(updateChannel(channel.id));
      props.navigation.navigate("DMChannel");
    } else if (channel.channelType === "group") {
      dispatch(updateChannel(channel.id));
      props.navigation.navigate("Channel");
    }
  };
  return (
    <TouchableOpacity style={styles.row} onPress={nav}>
      <View styleName="vertical">
        <Text style={[styles.channelTitle, showUnread ? styles.unread : {}]}>
          {channel.name || "General"}
        </Text>
        {lastMessage && (
          <Text
            style={[styles.channelText, showUnread ? styles.unread : {}]}
            numberOfLines={1}
          >
            {lastMessage.user.firstName + ": " + lastMessage.text}
          </Text>
        )}
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
};

function mapStateToProps(state) {
  return {};
}
export default connect(mapStateToProps)(withNavigation(ChannelItem));

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
    fontSize: 20
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
