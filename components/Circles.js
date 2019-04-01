import React from "react";

import {
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  View,
  Image
} from "react-native";
import { withNavigation } from "react-navigation";
import Icon from "@expo/vector-icons/Feather";
import CircleIcon from "./CircleIcon";

const Circles = ({ loggedIn = false, ...props }) => {
  const selectCircle = () => {
    console.log("Selected a circle");
  };

  return (
    <View style={styles.wrapper}>
      <TouchableOpacity style={styles.addCircleWrapper}>
        <View style={styles.iconWrapper}>
          <Icon
            name="plus"
            color={loggedIn ? "#FFFFFF" : "#282a38"}
            size={30}
          />
        </View>
        <Text numberOfLines={1} style={styles.circleLabel}>
          New
        </Text>
      </TouchableOpacity>
      <ScrollView horizontal={true} contentContainerStyle={styles.circlesList}>
        <CircleIcon selected={true} />
        <CircleIcon />
        <CircleIcon />
        <CircleIcon />
        <CircleIcon />
        <CircleIcon />
        <CircleIcon />
        <CircleIcon />
        <CircleIcon />
        <CircleIcon />
        <CircleIcon />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  addCircleWrapper: {
    width: 60,
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    marginRight: 25
  },
  iconWrapper: {
    width: 60,
    height: 60,
    borderRadius: 9999,
    backgroundColor: "#2f3242",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 5
  },
  circlesList: {
    justifyContent: "flex-start",
    alignItems: "center"
  },
  wrapper: {
    backgroundColor: "#282a38",
    paddingHorizontal: 15,
    paddingVertical: 10,
    height: "15%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start"
  },
  circleLabel: {
    fontSize: 13,
    color: "#ffffff80"
  }
});

export default withNavigation(Circles);
