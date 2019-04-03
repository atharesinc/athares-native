import React from "react";

import { Text, View, StyleSheet } from "react-native";
import { pull } from "../redux/state/reducers";
import { connect } from "react-redux";

const CircleHeader = props => {
  return (
    <View style={styles.header}>
      <Text style={styles.headerText} numberOfLines={1}>
        Athares Inc.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#282a38",
    height: "5%",
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 15
  },
  headerText: {
    color: "#FFF",
    fontSize: 15,
    letterSpacing: 2,
    backgroundColor: "#3a3e52",
    borderRadius: 9999,
    padding: 5,
    paddingHorizontal: 10
  }
});

function mapStateToProps(state) {
  return {
    activeCircle: pull(state, "activeCircle")
  };
}
export default connect(mapStateToProps)(CircleHeader);