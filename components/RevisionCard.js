import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { connect } from "react-redux";
import { updateRevision } from "../redux/state/actions";

const RevisionCard = (
  {
    amendment = null,
    newText,
    createdAt,
    backer,
    votes,
    title,
    id,
    repeal = false
  },
  ...props
) => {
  const renderCategory = () => {
    if (repeal) {
      return (
        <View style={[styles.cardCategory, styles.redBorder]}>
          <Text style={[styles.cardCategoryText, styles.redText]}>REPEAL</Text>
        </View>
      );
    }
    if (amendment !== null) {
      return (
        <View style={styles.cardCategory}>
          <Text style={styles.cardCategoryText}>REVISION</Text>
        </View>
      );
    }

    return (
      <View style={[styles.cardCategory, styles.greenBorder]}>
        <Text style={[styles.cardCategoryText, styles.greenText]}>NEW</Text>
      </View>
    );
  };
  const goToRevision = () => {
    props.dispatch(updateRevision(id));
    props.navigation.navigate("ViewRevision");
  };
  const support = votes.filter(({ support }) => support).length;

  return (
    <TouchableOpacity style={styles.cardWrapper} onPress={goToRevision}>
      <Text style={styles.cardHeader}>{title}</Text>
      <View style={styles.cardBody}>
        <View style={styles.cardStats}>
          {renderCategory()}
          <View style={styles.cardVotesWrapper}>
            <Text style={styles.cardVotesSupport}>+{support}</Text>
            <Text style={styles.slash}>/</Text>
            <Text style={styles.cardVotesReject}>
              -{votes.length - support}
            </Text>
          </View>
        </View>
        <Text
          style={styles.revisionText}
          ellipsizeMode={"tail"}
          numberOfLines={3}
        >
          {newText}
        </Text>
        <View style={styles.backerWrapper}>
          <Image style={styles.backerImg} source={{ uri: backer.icon }} />
          <Text style={styles.proposedDate}>
            {new Date(createdAt).toLocaleString()}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

function mapStateToProps(state) {
  return {};
}

export default connect(mapStateToProps)(RevisionCard);

const styles = StyleSheet.create({
  cardWrapper: {
    width: 300,
    marginBottom: 15
  },
  cardHeader: {
    backgroundColor: "#3a3e52",
    // width: "100%",
    padding: 10,
    color: "#FFFFFF"
  },
  cardBody: {
    width: "100%",
    padding: 10,
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    backgroundColor: "#282a38"
  },
  cardStats: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    marginBottom: 15
  },
  cardCategory: {
    borderRadius: 9999,
    borderWidth: 2,
    paddingVertical: 2,
    paddingHorizontal: 5,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#00DFFC"
  },
  cardCategoryText: {
    textTransform: "uppercase",
    color: "#00DFFC"
  },
  cardVotesWrapper: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center"
  },
  cardVotesSupport: {
    fontSize: 12,
    color: "#9eebcf"
  },
  slash: {
    fontSize: 12,
    color: "#FFFFFF"
  },
  cardVotesReject: {
    fontSize: 12,
    color: "#ff725c"
  },
  revisionText: {
    fontSize: 15,
    color: "#FFFFFF",
    marginBottom: 15
  },
  backerWrapper: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center"
  },
  backerImg: {
    height: 40,
    width: 40,
    borderRadius: 9999,
    marginRight: 20
  },
  proposedDate: {
    fontSize: 15,
    color: "#FFFFFFb7"
  },
  greenText: {
    color: "#9eebcf"
  },
  redText: {
    color: "#ff725c"
  },
  greenBorder: {
    borderColor: "#9eebcf"
  },
  redBorder: {
    borderColor: "#ff725c"
  }
});
