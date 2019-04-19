import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
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
    width: "80%",
    marginRight: 20
  },
  boardHeader: {
    fontSize: 20,
    paddingBottom: 10,
    color: "#FFFFFF"
  },
  revisionScroll: {
    width: "100%",
    flex: 1
  }
});
