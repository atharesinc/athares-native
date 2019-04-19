import React from "react";
import { View, StyleSheet, Text } from "react-native";
import Switch from "react-native-switch-pro";

const SwitchLine = ({ label, onPress = console.log, ...props }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <Switch
        onSyncPress={onPress}
        backgroundActive={"#00DFFC"}
        backgroundInactive={"#3a3e52"}
      />
    </View>
  );
};

export default SwitchLine;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  label: {
    color: "#FFFFFFb7",
    fontSize: 16
  }
});
