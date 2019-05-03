import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import RevisionCard from "./RevisionCard";
import Icon from "@expo/vector-icons/Feather";
import { withNavigation } from "react-navigation";
const RevisionBoard = ({
  boardName = "",
  revisions = [],
  circleID,
  user,
  belongsToCircle = false,
  ...props
}) => {
  const goToCreateRevision = () => {
    this.props.navigation.navigate("CreateRevision");
  };
  return (
    <View style={styles.revisionBoard}>
      <Text style={styles.boardHeader}>{boardName}</Text>
      {boardName === "New Revisions" && user && belongsToCircle && (
        <TouchableOpacity
          style={styles.buttonWrapper}
          onPress={goToCreateRevision}
        >
          <Icon name="plus" size={20} color={"#FFFFFF"} />
          <Text style={styles.buttonText}>Create Revision</Text>
        </TouchableOpacity>
      )}
      <ScrollView style={styles.revisionScroll}>
        {revisions.map(r => (
          <RevisionCard key={r.id} revision={r} />
        ))}
      </ScrollView>
    </View>
  );
};

export default withNavigation(RevisionBoard);

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
  buttonWrapper: {
    borderRadius: 9999,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderWidth: 2,
    borderColor: "#FFFFFF",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    marginBottom: 15
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 15,
    marginRight: 15
  },
  revisionScroll: {
    width: "100%",
    flex: 1
  }
});
