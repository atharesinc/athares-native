import { TouchableOpacity, Text, StyleSheet } from "react-native";
import React from "react";

const PortalButton = ({ style = {}, title = "", ...props }) => (
  <TouchableOpacity style={styles.wrapper} {...props}>
    <Text style={styles.text}>{title.toUpperCase()}</Text>
  </TouchableOpacity>
);

export default PortalButton;

const styles = StyleSheet.create({
  wrapper: {
    borderRadius: 9999,
    // borderWidth: 2,
    // borderColor: "#FFFFFF",
    // height: 30,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    padding: "2%"
    // paddingBottom: "3%"
  },
  text: {
    fontSize: 15,
    color: "#222222"
  }
});
