import React, { Component } from "react";
import ScreenWrapper from "../../../components/ScreenWrapper";
import Input from "../../../components/Input";

import {
  Text,
  ScrollView,
  StyleSheet,
  KeyboardAvoidingView
} from "react-native";
import PortalButton from "../../../components/PortalButton";

import { sha } from "../../../utils/crypto";
import { compose, graphql } from "react-apollo";
import { CREATE_REVISION, CREATE_VOTE } from "../../../graphql/mutations";
import { GET_AMENDMENTS_FROM_CIRCLE_ID } from "../../../graphql/queries";
import { connect } from "react-redux";
import { pull } from "../../../redux/state/reducers";
import { updateRevision } from "../../../redux/state/actions";

import { UIActivityIndicator } from "react-native-indicators";

class CreateRevision extends Component {
  state = {
    title: "",
    text: "",
    loading: false
  };
  // the longest a revision must persist before votes are counted is 7 days ( many users), the shortest is about 30 seconds (1 user)
  // add this number of seconds to the createdAt time to determine when a revision should expire, where x is the number of users
  customSigm = x => {
    return 604800 / (1 + Math.pow(Math.E, -1 * (x - 10))) / 2;
  };
  // a minimum number of users in a circle must have voted on a revision to ratify it
  // this prevents someone from sneaking in a revision where only one person votes to support and no one rejects it
  ratifiedThreshold = n => {
    return 0.4 / (1 + Math.pow(Math.E, -1 * n * 0.2));
  };
  updateTitle = text => {
    this.setState({
      name: text
    });
  };
  updateText = text => {
    this.setState({
      description: text
    });
  };
  submit = async e => {
    // validate & trim fields
    // ???
    await this.setState({ loading: true });
    let {
      data: { Circle: circle }
    } = this.props;

    let numUsers = circle.users.length;
    try {
      let newRevision = {
        circle: this.props.activeCircle,
        user: this.props.user,
        title: this.state.name,
        newText: this.state.amendment.trim(),
        expires: new Date(
          new Date().getTime() + Math.max(customSigm(numUsers), 61) * 1000
        ).toJSON(),
        voterThreshold: Math.round(numUsers * this.ratifiedThreshold(numUsers)),
        repeal: false
      };
      let hash = await sha(
        JSON.stringify({
          title: newRevision.title,
          text: newRevision.newText,
          circle: newRevision.circle,
          expires: newRevision.expires,
          voterThreshold: newRevision.voterThreshold
        })
      );
      let newRevisionRes = await this.props.createRevision({
        variables: {
          ...newRevision,
          hash
        }
      });

      newRevision.id = newRevisionRes.data.createRevision.id;

      const newVote = {
        revision: newRevision.id,
        user: this.props.user,
        support: true
      };

      await this.props.createVote({
        variables: {
          ...newVote
        }
      });

      this.props.dispatch(updateRevision(newRevision.id));

      this.props.navigation.navigate("ViewRevision");
    } catch (err) {
      if (
        !err.message.includes("unique constraint would be violated") ||
        !err.message.includes("hash")
      ) {
        await this.setState({ loading: false });

        console.error(err);
        Alert.alert(
          "Error",
          "There was an error connecting to the Athares network. Please try again later."
        );
      }
    }
  };
  render() {
    const { title = "", text = "", loading } = this.state;
    let { activeCircle, data } = this.props;

    if (loading !== true && activeCircle && data.Circle) {
      return (
        <ScreenWrapper styles={[styles.wrapper]}>
          <ScrollView styles={[styles.wrapper]}>
            <KeyboardAvoidingView behavior="padding">
              <Text style={styles.header}>
                DRAFT A NEW PIECE OF LEGISLATION FOR {data.Circle.name}
              </Text>
              <Input
                placeholder={"Amendment Name"}
                label={"Amendment Name"}
                description={"Provide a name for your new amendment."}
                onChangeText={this.updateTitle}
                value={title}
              />
              <Input
                value={text}
                onChangeText={this.updateText}
                label={"Amendment Text"}
                description={
                  "Draft your amendment. What do you want to add to this organization?"
                }
                multiline={true}
              />
              <Text style={styles.disclaimer}>
                Pressing "Draft Amendment" will create a new revision for this
                amendment. Drafts must first be ratified by a minimum electorate
                of Circle members, and then must be approved with a majority of
                votes. Amendment drafts are publicly accessible.
              </Text>
              <PortalButton title="Create Amendment" onPress={this.submit} />
            </KeyboardAvoidingView>
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

const styles = StyleSheet.create({
  header: {
    textTransform: "uppercase",
    letterSpacing: 2,
    fontSize: 13,
    color: "#FFFFFFb7",
    marginBottom: 25
  },
  wrapper: {
    alignItems: "stretch",
    justifyContent: "flex-start",
    width: "100%",
    flex: 1,
    padding: 13
  },
  disclaimer: {
    fontSize: 15,
    color: "#FFFFFFb7",
    marginBottom: 20
  },
  label: {
    fontSize: 18,
    marginBottom: 10,
    color: "#FFF"
  }
});

function mapStateToProps(state) {
  return {
    user: pull(state, "user"),
    activeCircle: pull(state, "activeCircle"),
    activeRevision: pull(state, "activeRevision")
  };
}
export default connect(mapStateToProps)(
  compose(
    graphql(CREATE_REVISION, { name: "createRevision" }),
    graphql(CREATE_VOTE, { name: "createVote" }),
    graphql(GET_AMENDMENTS_FROM_CIRCLE_ID, {
      options: ({ activeCircle }) => ({
        variables: {
          id: activeCircle
        }
      })
    })
  )(CreateRevision)
);
