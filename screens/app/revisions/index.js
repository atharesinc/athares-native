import React, { Component } from "react";
import ScreenWrapper from "../../../components/ScreenWrapper";
import { ScrollView, Text, StyleSheet } from "react-native";
import RevisionBoard from "../../../components/RevisionBoard";

export default class Revisions extends Component {
  goToSettings = () => {
    console.log("go to settings");
  };
  render() {
    return (
      <ScreenWrapper styles={[styles.wrapper]}>
        <Text style={styles.disclaimer}>
          Review proposed legislation and changes to existing laws.
        </Text>
        <TouchableOpacity
          style={styles.discreteButton}
          onPress={this.goToSettings}
        >
          <Text style={styles.disclaimer}>Subscribe to Revisions</Text>
          <ScrollView horizontal={true} style={styles.boardsWrapper}>
            <RevisionBoard />
          </ScrollView>
        </TouchableOpacity>
      </ScreenWrapper>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
    alignItems: "stretch",
    justifyContent: "flex-start",
    width: "100%",
    flex: 1
  },
  disclaimer: {
    fontSize: 15,
    color: "#FFFFFFb7",
    marginBottom: 5
  },
  discreteButton: {
    borderWidth: 1,
    borderColor: "#FFFFFFb7",
    borderRadius: 9999,
    backgroundColor: "#2f3242",
    padding: 5
  },
  boardsWrapper: {
    width: "100%"
  }
});
