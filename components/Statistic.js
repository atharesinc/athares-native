import React from 'reactn';
import { View, Text, StyleSheet } from "react-native";

export default function Statistic({ header, text, style = {}, ...props }) {
  return (
    <View style={[styles.wrapper, style]} {...props}>
      <Text style={styles.header}>{header}</Text>
      <Text style={styles.text}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    marginRight: 20,
    marginBottom: 10
  },
  header: {
    fontSize: 16,
    color: "#FFFFFFb7"
  },
  text: {
    fontSize: 22,
    color: "#FFFFFF"
  }
});
