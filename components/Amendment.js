import React from "react";
import { withNavigation } from "react-navigation";
import Icon from "@expo/vector-icons/Feather";
import { updateRevision, updateAmendment } from "../redux/state/actions";
import { connect } from "react-redux";

import { Text, View, TouchableOpacity, StyleSheet } from "react-native";

const Amendment = ({ amendment, ...props }) => {
  goToRevision = () => {
    props.dispatch(updateRevision(amendment.revision.id));
    props.navigation.navigate("ViewRevision");
  };
  editAmendment = () => {
    if (hasOutstandingRevision) {
      return false;
    }
    props.dispatch(updateAmendment(amendment.id));
    props.navigation.navigate("EditAmendment");
  };
  const hasOutstandingRevision =
    amendment.revision !== null && amendment.revision.passed === null;
  return (
    <View style={styles.amendmentWrapperOuter}>
      {hasOutstandingRevision === false && (
        <TouchableOpacity onPress={editAmendment} style={styles.moreButton}>
          <Icon name={"more-vertical"} size={25} color={"#FFFFFF"} />
        </TouchableOpacity>
      )}
      <View style={styles.amendmentWrapperInner}>
        <Text style={styles.header}>{amendment.title}</Text>
        <View style={styles.timeDataWrapper}>
          <Text style={styles.time}>
            Created - {new Date(amendment.createdAt).toLocaleDateString()}
          </Text>
          <Text style={styles.time}>
            Updated - {new Date(amendment.updatedAt).toLocaleDateString()}
          </Text>
        </View>
        <Text style={styles.amendmentText}>{amendment.text}</Text>
        {hasOutstandingRevision && (
          <TouchableOpacity
            style={styles.discreteButton}
            onPress={goToRevision}
          >
            <Text style={styles.disclaimer}>Current Revision</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

function mapStateToProps(state) {
  return {};
}
export default connect(mapStateToProps)(withNavigation(Amendment));

const styles = StyleSheet.create({
  amendmentWrapperOuter: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    width: "100%",
    marginBottom: 20
  },
  amendmentWrapperInner: {
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    marginLeft: 10,
    width: "100%"
  },
  moreButton: {
    width: 30,
    height: 30,
    justifyContent: "center",
    alignItems: "center"
  },
  header: {
    color: "#FFFFFF",
    fontSize: 20
  },
  timeDataWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    borderBottomColor: "#FFFFFFb7",
    borderBottomWidth: 1,
    marginBottom: 15
  },
  time: {
    flex: 1,
    color: "#FFFFFFb7",
    fontSize: 12,
    flex: 1
  },
  amendmentText: {
    color: "#FFFFFF",
    marginBottom: 15
  },
  disclaimer: {
    fontSize: 15,
    color: "#00dffc"
  },
  discreteButton: {
    borderWidth: 1,
    borderColor: "#00dffc",
    borderRadius: 9999,
    backgroundColor: "#282a38",
    padding: 5,
    paddingHorizontal: 10,
    marginBottom: 15
  }
});
