import { TouchableOpacity, Text, StyleSheet, View } from "react-native";
import React from "react";

const PortalButton = ({ style = {}, title = "", ...props }) => (
  <TouchableOpacity style={[styles.wrapper, style]} {...props}>
    <View style={[styles.wrapper]}>
      <Text style={styles.text}>{title.toUpperCase()}</Text>
    </View>
  </TouchableOpacity>
);

export default PortalButton;

const styles = StyleSheet.create({
  wrapper: {
    borderRadius: 9999,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
    width: "100%"
  },

  text: {
    fontSize: 15,
    color: "#222222",
    marginVertical: 10
  }
});
