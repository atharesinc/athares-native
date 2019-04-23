import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import RevisionCard from "./RevisionCard";

const RevisionBoard = ({ boardName = "", ...props }) => {
  return (
    <View style={styles.revisionBoard}>
      <Text style={styles.boardHeader}>{boardName}</Text>
      <ScrollView style={styles.revisionScroll}>
        <RevisionCard />
      </ScrollView>
    </View>
  );
};

export default RevisionBoard;

const styles = StyleSheet.create({
  revisionBoard: {
    width: 300,
    marginRight: 20
  },
  boardHeader: {
    fontSize: 20,
    paddingBottom: 10,
    color: "#FFFFFF",
    borderBottomWidth: 1,
    borderBottomColor: "#FFFFFF",
    marginBottom: 15
  },
  revisionScroll: {
    width: "100%",
    flex: 1
  }
});
