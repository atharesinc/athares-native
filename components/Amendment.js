import React from "react";
import { withNavigation } from "react-navigation";
import Icon from "@expo/vector-icons/Feather";

import { Text, View, TouchableOpacity, StyleSheet } from "react-native";

const Amendment = props => {
  goToRevision = () => {
    props.navigation.navigate("ViewRevision");
  };
  editAmendment = () => {
    props.navigation.navigate("EditAmendment");
  };
  return (
    <View style={styles.amendmentWrapperOuter}>
      <TouchableOpacity onPress={editAmendment} style={styles.moreButton}>
        <Icon name={"more-vertical"} size={25} color={"#FFFFFF"} />
      </TouchableOpacity>
      <View style={styles.amendmentWrapperInner}>
        <Text style={styles.header}>First Amendment</Text>
        <View style={styles.timeDataWrapper}>
          <Text style={styles.time}>
            Created -{" "}
            {new Date("2019-04-23T04:24:21.772Z").toLocaleDateString()}
          </Text>
          <Text style={styles.time}>
            Updated -{" "}
            {new Date("2019-04-23T05:24:21.772Z").toLocaleDateString()}
          </Text>
        </View>
        <Text style={styles.amendmentText}>
          {`Let me tel ya somethin about the government
            They're fukcing up 
            the environment
            taking all the beautiful animals
            and making them fuckin extinct!`}
        </Text>
        <TouchableOpacity style={styles.discreteButton} onPress={goToRevision}>
          <Text style={styles.disclaimer}>Current Revision</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default withNavigation(Amendment);

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
