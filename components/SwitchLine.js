import React from 'reactn';
import { View, StyleSheet, Text } from "react-native";
import Switch from "react-native-switch-pro";

const SwitchLine = ({
  label,
  value = false,
  onPress = console.log,
  ...props
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <Switch
        onSyncPress={onPress}
        backgroundActive={"#00DFFC"}
        backgroundInactive={"#3a3e52"}
        value={value}
      />
    </View>
  );
};

export default SwitchLine;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20
  },
  label: {
    color: "#FFFFFF",
    fontSize: 16
  }
});
