import React from "react";
import { StyleSheet, TouchableOpacity, Text } from "react-native";

export default function PortalToggle(props) {
  return (
    <TouchableOpacity style={styles.toggle} onPress={props.onPress}>
      <Text style={{ color: "#FFF" }}>{props.text}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  toggle: {
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 15,
    borderWidth: 2,
    color: "#FFFFFF",
    borderRadius: 9999,
    borderColor: "#FFFFFF",
    paddingVertical: 5,
    paddingHorizontal: 10
  }
});
