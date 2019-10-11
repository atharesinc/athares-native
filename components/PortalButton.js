import { TouchableOpacity, Text, StyleSheet, View } from "react-native";
import React from 'reactn';

const PortalButton = ({ style = {}, textStyle = {}, title = "", ...props }) => (
  <TouchableOpacity style={[styles.wrapper, style]} {...props}>
    <View style={[styles.wrapperInner]}>
      <Text style={[styles.text, textStyle]}>{title.toUpperCase()}</Text>
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
  wrapperInner: {
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
