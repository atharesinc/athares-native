import React, { Component } from "react";
import ScreenWrapper from "../../../components/ScreenWrapper";
import Amendment from "../../../components/Amendment";

import { Text, ScrollView, StyleSheet } from "react-native";

import { connect } from "react-redux";
import { pull } from "../../../redux/state/reducers";
import {
  updateCircle,
  updateChannel,
  updateRevision
} from "../../../redux/state/actions";
import { GET_AMENDMENTS_FROM_CIRCLE_ID } from "../../../graphql/queries";
import { Query } from "react-apollo";
import { SUB_TO_CIRCLES_AMENDMENTS } from "../../../graphql/subscriptions";
import { UIActivityIndicator } from "react-native-indicators";

class Constitution extends Component {
  _subToMore = subscribeToMore => {
    subscribeToMore({
      document: SUB_TO_CIRCLES_AMENDMENTS,
      variables: { id: this.props.activeCircle || "" },
      updateQuery: (prev, { subscriptionData }) => {
        let {
          previousValues,
          mutation,
          node: amendment
        } = subscriptionData.data.Amendment;
        switch (mutation) {
          case "CREATED":
            let ind = prev.Circle.amendments.findIndex(
              a => a.id === amendment.id
            );
            // if the new node isn't in the data set
            if (ind === -1) {
              prev.Circle.amendments = [...prev.Circle.amendments, amendment];
            }
            break;
          case "UPDATED":
            let index = prev.Circle.amendments.findIndex(
              a => a.id === amendment.id
            );
            prev.Circle.amendments[index] = amendment;
            break;
          case "DELETED":
            let i = prev.Circle.amendments.findIndex(
              a => a.id === previousValues.id
            );
            prev.Circle.amendments.splice(i, 1);
            break;
          default:
            break;
        }
        return prev;
      }
    });
  };
  render() {
    let { user, activeCircle } = this.props;
    let circle = null;
    let amendments = [];

    return (
      <Query
        query={GET_AMENDMENTS_FROM_CIRCLE_ID}
        variables={{ id: activeCircle || "" }}
        fetchPolicy={"cache-and-network"}
      >
        {({ data, subscribeToMore }) => {
          if (data.Circle) {
            circle = data.Circle;
            amendments = data.Circle.amendments;
            this._subToMore(subscribeToMore);
          }
          if (circle) {
            return (
              <ScreenWrapper styles={[styles.wrapper]}>
                <Text style={styles.preamble}>{circle.preamble}</Text>
                <ScrollView styles={[styles.wrapper]}>
                  {amendments.map((amendment, i) => (
                    <Amendment key={i} user={user} amendment={amendment} />
                  ))}
                </ScrollView>
              </ScreenWrapper>
            );
          } else {
            return (
              <ScreenWrapper
                styles={{ justifyContent: "center", alignItems: "center" }}
              >
                <UIActivityIndicator color={"#FFFFFF"} style={{ flex: 0 }} />
                <Text style={styles.loadingText}>Loading Constitution</Text>
              </ScreenWrapper>
            );
          }
        }}
      </Query>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
    alignItems: "stretch",
    justifyContent: "flex-start",
    width: "100%",
    flex: 1,
    padding: 13
  },
  preamble: {
    color: "#FFFFFF",
    fontSize: 15,
    marginBottom: 20
  },
  loadingText: {
    fontSize: 20,
    color: "#FFFFFF",
    marginTop: 15,
    width: "100%",
    textAlign: "center"
  }
});

function mapStateToProps(state) {
  return {
    user: pull(state, "user"),
    activeCircle: pull(state, "activeCircle")
  };
}

export default connect(mapStateToProps)(Constitution);
