import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image
} from "react-native";
import ScreenWrapper from "../../../components/ScreenWrapper";
import Statistic from "../../../components/Statistic";
import DiffSection from "../../../components/DiffSection";
class ViewRevision extends Component {
  renderCategory = ({ repeal = false, amendment = null }) => {
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
  renderHasVoted = ({ updatedAt = new Date(), support = true }) => {
    if (support) {
      <Text style={[styles.disclaimer, styles.greenText]}>
        You voted to support this on {new Date(updatedAt).toLocaleDateString()}
      </Text>;
    }
    return (
      <Text style={[styles.disclaimer, styles.redText]}>
        You voted to reject this on {new Date(updatedAt).toLocaleDateString()}
      </Text>
    );
  };
  render() {
    const { expired = false, canVote = true } = this.props;
    let id = "cjukp7glr1kky0186tort945f";
    const myVote = revision.votes.find(vote => vote.id === id);

    return (
      <ScreenWrapper styles={styles.wrapper}>
        <ScrollView>
          <Text style={styles.disclaimer}>Review the proposed draft</Text>
          {myVote && this.renderHasVoted(myVote)}
          <View style={styles.cardWrapper}>
            <Text style={styles.cardHeader}>First Amendment</Text>
            <View style={styles.cardBody}>
              <View style={styles.cardStats}>
                {this.renderCategory(revision)}
                <View style={styles.cardVotesWrapper}>
                  <Text style={styles.cardVotesSupport}>+1</Text>
                  <Text style={styles.slash}>/</Text>
                  <Text style={styles.cardVotesReject}>-0</Text>
                </View>
              </View>
              {revision.amendment ? (
                <DiffSection {...revision} />
              ) : (
                <View style={styles.revisionTextWrapper}>
                  <Text style={styles.disclaimer}>Proposed text:</Text>

                  <Text style={styles.revisionText}>owowowowowo</Text>
                </View>
              )}
              <View style={styles.wrapSection}>
                <Statistic
                  header="Date Proposed"
                  text={new Date(
                    "2019-04-19T00:05:18.223Z"
                  ).toLocaleDateString()}
                />
                <Statistic
                  header="Expires"
                  text={new Date(
                    "2019-04-20T00:05:18.223Z"
                  ).toLocaleDateString()}
                />
                <Statistic header="Votes to Support" text={23} />
                <Statistic header="Votes to Reject" text={15} />
                {expired && <Statistic header="Passed" text={false} />}
              </View>
              <Text style={styles.disclaimer}>Backer</Text>
              <TouchableOpacity style={styles.backerWrapper}>
                <Image
                  style={styles.backerImg}
                  source={require("../../../assets/user-default.png")}
                />
                <Text style={styles.proposedDate}>04/18/19 11:30am</Text>
              </TouchableOpacity>
              {canVote && expired === false && (
                <View style={styles.voteSectionWrapper}>
                  <TouchableOpacity
                    style={[styles.voteButton, styles.greenBorder]}
                  >
                    <Text style={[styles.voteText, styles.greenText]}>
                      SUPPORT
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.voteButton, styles.redBorder]}
                  >
                    <Text style={[styles.voteText, styles.redText]}>
                      REJECT
                    </Text>
                  </TouchableOpacity>
                </View>
              )}
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
    flex: 1,
    padding: 15
  },
  cardWrapper: {
    width: "100%",
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
    color: "#00DFFC",
    marginHorizontal: 5
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
    color: "#FFFFFF",
    marginHorizontal: 5
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
    alignItems: "center",
    marginBottom: 20
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
    marginBottom: 10
  },
  wrapSection: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 15
  },
  voteSectionWrapper: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  voteButton: {
    width: "48%",
    borderWidth: 2,
    borderRadius: 9999,
    padding: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  },
  voteText: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    textTransform: "uppercase",
    fontSize: 18
  }
});

const revision = {
  expires: "2019-04-22T19:25:43.000Z",
  votes: [],
  circle: {
    id: "cjuljpyyu0klx0148af342ivx"
  },
  oldText: "a0sd8f0a9s8d0f9a8s0df98",
  passed: false,
  amendment: {
    id: "cjuskswxj14p90102l1bbjyzn"
  },
  id: "cjusr1yzp0y230135bl16a0lo",
  createdAt: "2019-04-22T19:24:42.000Z",
  voterThreshold: 0,
  repeal: false,
  title: "Bobobobobo",
  newText: "a0sd8f0a9s8dklsldfkvdf0f9a8s0df98\n\nBut also this new line",
  backer: {
    id: "cjukp7glr1kky0186tort945f",
    icon:
      "data:image/png;base64,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",
    firstName: "Dan",
    lastName: "Kral"
  }
};
