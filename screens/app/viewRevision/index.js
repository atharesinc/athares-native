import React, { Component } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";

class ViewRevision extends Component {
  renderCategory = () => {
    const { repeal = false, amendment = null } = this.props;
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

  render() {
    return (
      <ScreenWrapper styles={styles.wrapper}>
        <ScrollView style={styles.wrapper}>
          <View style={styles.cardWrapper}>
            <Text style={style.cardHeader}>First Amendment</Text>
            <View style={styles.cardBody}>
              <View style={styles.cardStats}>
                {renderCategory()}
                <View style={styles.cardVotesWrapper}>
                  <Text style={styles.cardVotesSupport}>+1</Text>
                  <Text style={styles.slash}>/</Text>
                  <Text style={styles.cardVotesReject}>-0</Text>
                </View>
                <Text style={styles.revisionText}>owowowowowo</Text>
                <View style={styles.wrapSection}>
                  <Statistic header="Circles" text={1} />
                  <Statistic header="Revisions Proposed" text={2} />
                  <Statistic header="Revisions Accepted" text={2} />
                  <Statistic header="Times Voted" text={2} />
                  <Statistic
                    header="User Since"
                    text={new Date(
                      "2019-04-19T00:05:18.223Z"
                    ).toLocaleDateString()}
                  />
                </View>
                <Text style={styles.disclaimer}>Backer</Text>
                <View style={styles.backerWrapper}>
                  <Image style={styles.backerImg} source={{ uri: "" }} />
                  <Text style={styles.proposedDate}>04/18/19 11:30am</Text>
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
      </ScreenWrapper>
    );
  }
}

export default ViewRevision;

const styles = StyleSheet.create({
  wrapper: {
    alignItems: "stretch",
    justifyContent: "flex-start",
    width: "100%",
    flex: 1
  },
  cardWrapper: {
    width: "100%",
    flex: 1
  },
  cardHeader: {
    backgroundColor: "#3a3e52",
    width: "100%",
    padding: 10
  },
  cardBody: {
    width: "100%",
    padding: 10
  },
  cardStats: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start"
  },
  cardCategory: {
    borderRadius: 9999,
    borderWidth: 2,
    padding: 2,
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
    color: "#FFFFFF"
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
  },
  disclaimer: {
    fontSize: 15,
    color: "#FFFFFFb7",
    marginBottom: 5
  },
  wrapSection: {
    flexDirection: "row",
    flexWrap: "wrap"
  }
});
