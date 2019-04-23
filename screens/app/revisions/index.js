import React, { Component } from "react";
import ScreenWrapper from "../../../components/ScreenWrapper";
import {
  ScrollView,
  Text,
  StyleSheet,
  TouchableOpacity,
  View
} from "react-native";
import RevisionBoard from "../../../components/RevisionBoard";

export default class Revisions extends Component {
  goToSettings = () => {
    console.log("go to settings");
  };
  render() {
    return (
      <ScreenWrapper styles={[styles.wrapper]}>
        <View style={{ margin: 15, alignItems: "flex-start" }}>
          <Text style={[styles.disclaimer, { marginBottom: 15 }]}>
            Review proposed legislation and changes to existing laws.
          </Text>
          <TouchableOpacity
            style={styles.discreteButton}
            onPress={this.goToSettings}
          >
            <Text style={styles.disclaimer}>Subscribe to Revisions</Text>
          </TouchableOpacity>
        </View>
        <ScrollView horizontal={true} style={styles.boardsWrapper}>
          <RevisionBoard boardName="New Revisions" />
          <RevisionBoard boardName="Recently Passed" />
          <RevisionBoard boardName="Recently Rejected" />
        </ScrollView>
      </ScreenWrapper>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
    alignItems: "flex-start",
    justifyContent: "flex-start",
    width: "100%",
    flex: 1,
    paddingTop: 15
  },
  disclaimer: {
    fontSize: 15,
    color: "#FFFFFFb7"
  },
  discreteButton: {
    borderWidth: 1,
    borderColor: "#FFFFFFb7",
    borderRadius: 9999,
    backgroundColor: "#2f3242",
    padding: 5,
    paddingHorizontal: 10,
    marginBottom: 15
  },
  boardsWrapper: {
    width: "100%",
    marginHorizontal: 15
  }
});
