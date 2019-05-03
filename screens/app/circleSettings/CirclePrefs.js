import React, { Component, Fragment } from "react";
import SwitchLine from "../../../components/SwitchLine";

import { Text, View, StyleSheet } from "react-native";

import {
  UPDATE_AMENDEMENT_PERMISSION_FOR_CIRCLE,
  UPDATE_REVISION_PERMISSION_FOR_CIRCLE,
  UPDATE_EMAIL_PERMISSION_FOR_CIRCLE,
  UPDATE_PUSH_PERMISSION_FOR_CIRCLE,
  UPDATE_SMS_PERMISSION_FOR_CIRCLE
} from "../../../graphql/mutations";
import { GET_CIRCLE_PREFS_FOR_USER } from "../../../graphql/queries";
import { compose, graphql } from "react-apollo";
import { UIActivityIndicator } from "react-native-indicators";
import ScreenWrapper from "../../../components/ScreenWrapper";

class CirclePrefs extends Component {
  updateEmail = async value => {
    let { id } = this.props.data.User.circlePermissions[0];
    await this.props.updateEmailPref({
      variables: {
        id,
        flag: value
      }
    });
  };
  updateNewRevisions = async value => {
    let { id } = this.props.data.User.circlePermissions[0];

    await this.props.updateRevisionPref({
      variables: {
        id,
        flag: value
      }
    });
  };
  updateNewAmendments = async value => {
    let { id } = this.props.data.User.circlePermissions[0];

    await this.props.updateAmendmentPref({
      variables: {
        id,
        flag: value
      }
    });
  };
  render() {
    let {
      loading,
      data: { User: user }
    } = this.props;

    if (loading || !user) {
      return (
        <ScreenWrapper
          styles={{ justifyContent: "center", alignItems: "center" }}
        >
          <UIActivityIndicator color={"#FFFFFF"} />
        </ScreenWrapper>
      );
    }
    let perm = user.circlePermissions[0];
    return (
      <View style={styles.section}>
        <Text style={styles.sectionHeading}>Notification Preferences</Text>
        <Text style={styles.disclaimer}>
          Set your communication preferences for this Circle. By default you
          will receive an email notification when a new revision is created, and
          when a revision has passed or been rejected.
        </Text>

        <SwitchLine
          value={perm.useEmail}
          onPress={this.updateEmail}
          label={"Allow Email Notifications"}
        />
        {perm.useEmail && (
          <Fragment>
            <SwitchLine
              value={perm.revisions}
              onPress={this.updateNewRevisions}
              label={"New Revisions"}
            />
            <SwitchLine
              value={perm.amendments}
              onPress={this.updateNewAmendments}
              label={"New Amendments"}
            />
          </Fragment>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  section: {
    marginTop: 20,
    marginHorizontal: 15,
    marginBottom: 10,
    borderBottomWidth: 1,
    borderColor: "#FFFFFF",
    paddingBottom: 20
  },
  sectionHeading: {
    fontSize: 20,
    color: "#FFFFFF",
    marginBottom: 10
  },
  disclaimer: {
    fontSize: 15,
    color: "#FFFFFFb7",
    marginBottom: 20
  }
});

function Uh() {
  return (
    <View>
      <Text>lsdkflskdmf</Text>
    </View>
  );
}
export default compose(
  graphql(UPDATE_AMENDEMENT_PERMISSION_FOR_CIRCLE, {
    name: "updateAmendmentPref"
  }),
  graphql(UPDATE_REVISION_PERMISSION_FOR_CIRCLE, {
    name: "updateRevisionPref"
  }),
  graphql(UPDATE_EMAIL_PERMISSION_FOR_CIRCLE, { name: "updateEmailPref" }),
  graphql(UPDATE_PUSH_PERMISSION_FOR_CIRCLE, { name: "updatePushPref" }),
  graphql(UPDATE_SMS_PERMISSION_FOR_CIRCLE, { name: "updateSMSPref" }),
  graphql(GET_CIRCLE_PREFS_FOR_USER, {
    options: ({ user, activeCircle }) => ({
      variables: { user: user || "", circle: activeCircle || "" }
    })
  })
)(CirclePrefs);
