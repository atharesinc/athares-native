import React from 'reactn';

import { Text, View, StyleSheet, Clipboard, Platform } from "react-native";

const LinkText = ({ text }) => {
  const setClipboardContent = () => {
    Clipboard.setString(text);
  };
  return (
    <View style={styles.wrapper}>
      <Text style={styles.text} selectable={true} onPress={setClipboardContent}>
        {text}
      </Text>
    </View>
  );
};

export default LinkText;

const styles = StyleSheet.create({
  wrapper: {
    borderWidth: 1,
    borderColor: "#FFFFFF",
    padding: 10
  },
  text: {
    color: "#FFFFFF",
    fontFamily: Platform.OS === "android" ? "monospace" : "Courier"
  }
});
