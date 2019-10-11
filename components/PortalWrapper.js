import React from 'reactn';
import { StyleSheet, View } from "react-native";

export default function PortalWrapper(props) {
  return <View style={styles.wrapper}>{props.children}</View>;
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#282a3899",
    alignItems: "center"
  }
});
