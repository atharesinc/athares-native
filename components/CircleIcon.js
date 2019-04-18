import React from "react";

import { Text, TouchableOpacity, StyleSheet, Image } from "react-native";

const CircleIcon = ({ selected = false, circle = {}, ...props }) => {
  const selectCircle = () => {
    // props.selectCircle(props.circle.id)
  };
  return (
    <TouchableOpacity style={styles.circleWrapper} onPress={selectCircle}>
      <Image
        source={require("../assets/Athares-owl-logo-large-white.png")}
        style={[styles.circle, selected ? styles.selected : {}]}
      />
      <Text numberOfLines={1} style={styles.circleLabel}>
        Athares
      </Text>
    </TouchableOpacity>
  );
};

export default CircleIcon;

const styles = StyleSheet.create({
  circleWrapper: {
    width: 60,
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    marginRight: 15
  },
  circle: {
    width: 60,
    height: 60,
    borderRadius: 9999,
    marginBottom: 5
  },
  circleLabel: {
    fontSize: 13,
    color: "#ffffffb7"
  },
  selected: {
    borderWidth: 4,
    borderColor: "#00dffc"
  }
});
