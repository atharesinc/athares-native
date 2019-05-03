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
import {
  GET_REVISIONS_FROM_CIRCLE_ID,
  IS_USER_IN_CIRCLE
} from "../../../graphql/queries";
import { Query, graphql } from "react-apollo";
import {
  updateChannel
} from "../../../redux/state/actions";
import { pull } from "../../../redux/state/reducers";
import { connect } from "react-redux";
import { UIActivityIndicator } from "react-native-indicators";

export default class Revisions extends Component {
  componentDidMount() {
    this.props.dispatch(updateChannel(null));
  }
  goToSettings = () => {
    this.props.navigation.navigate("CircleSettings");
  };
  render() {
    let { activeCircle, user, isUserInCircle } = this.props;
    let circle = null;
    let allRevisions = [];
    let belongsToCircle = false;
    return (
      <Query
        query={GET_REVISIONS_FROM_CIRCLE_ID}
        variables={{ id: this.props.activeCircle || "" }}
        pollInterval={10000}
      >
        {({ data }) => {
          if (data.Circle) {
            circle = data.Circle;
            allRevisions = data.Circle.revisions;
          }
          if (!circle) {
            return (
              <ScreenWrapper
                styles={{ justifyContent: "center", alignItems: "center" }}
              >
                <UIActivityIndicator color={"#FFFFFF"} />
              </ScreenWrapper>
            );
          }
          if (
            isUserInCircle.allCircles &&
            isUserInCircle.allCircles.length !== 0 &&
            isUserInCircle.allCircles[0].id === activeCircle
          ) {
            belongsToCircle = true;
          }
          allRevisions = allRevisions.map(r => {
            return {
              votes: r.votes.filter(v => v.revision === r.id),
              ...r
            };
          });
          let now = moment().valueOf();

          // all non-expired revisions
          let newRevisions = allRevisions.filter(
            r => r.passed === null && now < moment(r.expires).valueOf()
          );
          // passed in the last week
          let recentlyPassed = allRevisions.filter(
            r =>
              r.passed === true &&
              now - moment(r.expires).valueOf() <= 604800000
          );
          // rejected in the last week
          let recentlyRejected = allRevisions.filter(
            r =>
              r.passed === false &&
              now - moment(r.expires).valueOf() <= 604800000
          );
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
                <RevisionBoard
                  boardName="New Revisions"
                  revisions={newRevisions}
                  circleID={activeCircle}
                  user={user}
                  belongsToCircle={belongsToCircle}
                />
                <RevisionBoard
                  boardName="Recently Passed"
                  revisions={recentlyPassed}
                  circleID={activeCircle}
                  user={user}
                  belongsToCircle={belongsToCircle}
                />
                <RevisionBoard
                  boardName="Recently Rejected"
                  revisions={recentlyRejected}
                  circleID={activeCircle}
                  user={user}
                  belongsToCircle={belongsToCircle}
                />
              </ScrollView>
            </ScreenWrapper>
          );
        }}
      </Query>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: pull(state, "user"),
    activeCircle: pull(state, "activeCircle")
  };
}

export default connect(mapStateToProps)(
    graphql(IS_USER_IN_CIRCLE, {
      name: "isUserInCircle",
      options: ({ activeCircle, user }) => ({
        variables: { circle: activeCircle || "", user: user || "" }
      })
    })(RevisionBoard));

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
