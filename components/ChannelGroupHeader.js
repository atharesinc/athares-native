import React from 'reactn';
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Icon from "@expo/vector-icons/Feather";
import { withNavigation } from "react-navigation";

const ChannelGroupHeader = ({ displayPlus = false, title, ...props }) => {
  const nav = () => {
    if (title === "DIRECT MESSAGES") {
      props.navigation.navigate("CreateDM");
    } else if (title === "CHANNELS") {
      props.navigation.navigate("CreateChannel");
    }
  };
  return (
    <View style={styles.row}>
      <Text style={styles.channelTitle}>{title}</Text>
      {displayPlus ? (
        <TouchableOpacity onPress={nav}>
          <Icon name="plus" size={25} color={"#FFFFFF"} />
        </TouchableOpacity>
      ) : null}
    </View>
  );
};

export default withNavigation(ChannelGroupHeader);

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
