import { StyleSheet, KeyboardAvoidingView, View } from "react-native";
import React from 'reactn';

const PortalCard = ({ children }) => (
  <KeyboardAvoidingView style={styles.keyboard} behavior="position">
    <View style={styles.card}>{children}</View>
  </KeyboardAvoidingView>
);

export default PortalCard;

const styles = StyleSheet.create({
  keyboard: {
    width: "90%",
    maxHeight: "85%",
    paddingVertical: "10%",
    paddingHorizontal: "2%"
  },
  card: {
    width: "100%",
    height: "100%",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-start",
    backgroundColor: "transparent"
  }
});
