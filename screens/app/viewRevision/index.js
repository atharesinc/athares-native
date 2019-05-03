import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Alert
} from "react-native";
import ScreenWrapper from "../../../components/ScreenWrapper";
import Statistic from "../../../components/Statistic";
import DiffSection from "../../../components/DiffSection";
import { updateChannel, updateActiveUser } from "../../../redux/state/actions";
import moment from "moment";
import { pull } from "../../../redux/state/reducers";
import { connect } from "react-redux";
import { graphql, compose } from "react-apollo";

import { CREATE_VOTE, UPDATE_VOTE } from "../../../graphql/mutations";

import {
  GET_REVISION_BY_ID,
  IS_USER_IN_CIRCLE
} from "../../../graphql/queries";
import { UIActivityIndicator } from "react-native-indicators";

class ViewRevision extends Component {
  componentDidMount() {
    this.props.dispatch(updateChannel(null));
  }
  checkIfPass = () => {
    this.forceUpdate();
  };
  goToUser = id => {
    this.props.dispatch(updateActiveUser(id));
    this.props.navigation.navigate("ViewOtherUser");
  };
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
  vote = async support => {
    let { activeRevision, data, isUserInCircle, activeCircle } = this.props;

    // make sure the user belongs to this circle
    if (
      !isUserInCircle ||
      !isUserInCircle.allCircles ||
      isUserInCircle.allCircles[0].id !== activeCircle
    ) {
      return false;
    }
    if (data.Revision) {
      const { votes, ...revision } = data.Revision;
      // If the user attempts to vote after the revision expires, stop and return;
      if (moment().valueOf() >= moment(revision.expires).valueOf()) {
        return false;
      }

      const hasVoted = votes.find(({ user: { id } }) => id === this.props.user);
      try {
        if (hasVoted) {
          // update this user's existing vote
          await this.props.updateVote({
            variables: {
              vote: hasVoted.id,
              support
            }
          });
        } else {
          // create a new vote, this user hasn't voted yet
          this.props.createVote({
            variables: {
              revision: activeRevision,
              user: this.props.user,
              support
            }
          });
        }
      } catch (err) {
        console.error(new Error(err));
        Alert.alert("Error", "Unable to cast vote. Please try again later");
      }
    }
  };
  render() {
    let revision = null;
    let belongsToCircle = false;
    const { data, isUserInCircle, activeCircle } = this.props;

    if (data.Revision && isUserInCircle) {
      if (
        isUserInCircle.allCircles &&
        isUserInCircle.allCircles.length !== 0 &&
        isUserInCircle.allCircles[0].id === activeCircle
      ) {
        belongsToCircle = true;
      }
      revision = data.Revision;
      const { votes } = revision;

      const support = votes.filter(({ support }) => support).length;
      const hasVoted = votes.find(({ user: { id } }) => id === this.props.user);
      const hasExpired =
        moment().valueOf() >= moment(revision.expires).valueOf();
      /* Represents a change to existing legislation; Show diff panels   */
      return (
        <ScreenWrapper styles={styles.wrapper}>
          <ScrollView>
            <Text style={styles.disclaimer}>Review the proposed draft</Text>
            {myVote && this.renderHasVoted(hasVoted)}
            <View style={styles.cardWrapper}>
              <Text style={styles.cardHeader}>{revision.title}</Text>
              <View style={styles.cardBody}>
                <View style={styles.cardStats}>
                  {this.renderCategory(revision)}
                  <View style={styles.cardVotesWrapper}>
                    <Text style={styles.cardVotesSupport}>+{support}</Text>
                    <Text style={styles.slash}>/</Text>
                    <Text style={styles.cardVotesReject}>
                      -{votes.length - support}
                    </Text>
                  </View>
                </View>
                {revision.amendment ? (
                  <DiffSection {...revision} />
                ) : (
                  <View style={styles.revisionTextWrapper}>
                    <Text style={styles.disclaimer}>Proposed text:</Text>

                    <Text style={styles.revisionText}>{revision.newText}</Text>
                  </View>
                )}
                <View style={styles.wrapSection}>
                  <Statistic
                    header="Date Proposed"
                    text={new Date(revision.createdAt).toLocaleDateString()}
                  />
                  <Statistic
                    header="Expires"
                    text={new Date(revision.expires).toLocaleDateString()}
                  />
                  <Statistic header="Votes to Support" text={23} />
                  <Statistic header="Votes to Reject" text={15} />
                  {hasExpired && <Statistic header="Passed" text={false} />}
                </View>
                <Text style={styles.disclaimer}>Backer</Text>
                <TouchableOpacity
                  style={styles.backerWrapper}
                  onPress={() => {
                    this.goToUser(revision.backer.id);
                  }}
                >
                  <Image
                    style={styles.backerImg}
                    source={{ uri: revision.backer.icon }}
                  />
                  <Text style={styles.proposedDate}>
                    {revision.backer.firstName + " " + revision.backer.lastName}
                  </Text>
                </TouchableOpacity>
                {canVote && hasExpired === false && (
                  <View style={styles.voteSectionWrapper}>
                    <TouchableOpacity
                      style={[styles.voteButton, styles.greenBorder]}
                      onPress={() => {
                        this.vote(true);
                      }}
                    >
                      <Text style={[styles.voteText, styles.greenText]}>
                        SUPPORT
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[styles.voteButton, styles.redBorder]}
                      onPress={() => {
                        this.vote(false);
                      }}
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
    } else {
      return (
        <ScreenWrapper
          styles={{ justifyContent: "center", alignItems: "center" }}
        >
          <UIActivityIndicator color={"#FFFFFF"} />
        </ScreenWrapper>
      );
    }
  }
}

function mapStateToProps(state) {
  return {
    user: pull(state, "user"),
    activeCircle: pull(state, "activeCircle"),
    activeRevision: pull(state, "activeRevision")
  };
}

export default connect(mapStateToProps)(
  compose(
    graphql(CREATE_VOTE, { name: "createVote" }),
    graphql(UPDATE_VOTE, { name: "updateVote" }),
    graphql(IS_USER_IN_CIRCLE, {
      name: "isUserInCircle",
      options: ({ activeCircle, user }) => ({
        variables: { circle: activeCircle || "", user: user || "" }
      })
    }),
    graphql(GET_REVISION_BY_ID, {
      options: ({ activeRevision }) => ({
        variables: { id: activeRevision || "" },
        pollInterval: 5000
      })
    })
  )(withNavigation(ViewRevision))
);
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
