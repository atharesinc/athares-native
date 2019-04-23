import React, { Component, Fragment } from "react";

import ScreenWrapper from "../../../components/ScreenWrapper";
import PortalButton from "../../../components/PortalButton";
import SwitchLine from "../../../components/SwitchLine";
import LinkText from "../../../components/LinkText";
import {
  Text,
  View,
  ScrollView,
  StyleSheet,
  KeyboardAvoidingView
} from "react-native";
import { UIActivityIndicator } from "react-native-indicators";

export default class CircleSettings extends Component {
  state = {
    showLink: false,
    link: "",
    loading: false,
    email: false,
    newRevisions: false,
    newAmendments: false
  };
  generateLink = async () => {
    await this.setState({
      loading: true
    });
    this.setState({
      showLink: true,
      link:
        "https://athares.us/invite/" +
        (Math.random() * 100000000 + "").toString(16).replace(".", "")
    });
    await this.setState({
      loading: false
    });
  };
  updateEmail = value => {
    this.setState({
      email: value
    });
  };
  updateNewRevisions = value => {
    this.setState({
      newRevisions: value
    });
  };
  updateNewAmendments = value => {
    this.setState({
      newAmendments: value
    });
  };
  render() {
    const {
      loading,
      showLink,
      email,
      newRevisions,
      newAmendments
    } = this.state;
    return (
      <ScreenWrapper styles={[styles.wrapper]}>
        <KeyboardAvoidingView behavior="position">
          <ScrollView styles={[styles.wrapper]}>
            <View style={styles.section}>
              <Text style={styles.sectionHeading}>Share Circle</Text>
              <Text style={styles.disclaimer}>
                Invite someone to Athares Inc with a single-use link.
                Prospective users will have the option to sign up if they don't
                have an Athares account.
              </Text>
              {loading ? (
                <UIActivityIndicator color="#FFFFFF" />
              ) : (
                <PortalButton
                  title={"Generate Link"}
                  onPress={this.generateLink}
                  style={{ marginBottom: 15 }}
                />
              )}
              {showLink && <LinkText text={this.state.link} />}
            </View>
            <View style={styles.section}>
              <Text style={styles.sectionHeading}>
                Notification Preferences
              </Text>
              <Text style={styles.disclaimer}>
                Set your communication preferences for this Circle. By default
                you will receive an email notification when a new revision is
                created, and when a revision has passed or been rejected.
              </Text>

              <SwitchLine
                value={email}
                onPress={this.updateEmail}
                label={"Allow Email Notifications"}
              />
              {email && (
                <Fragment>
                  <SwitchLine
                    value={newRevisions}
                    onPress={this.updateNewRevisions}
                    label={"New Revisions"}
                  />
                  <SwitchLine
                    value={newAmendments}
                    onPress={this.updateNewAmendments}
                    label={"New Amendments"}
                  />
                </Fragment>
              )}
            </View>
            <View style={styles.section}>
              <Text style={styles.sectionHeading}>Leave Circle</Text>
              <Text style={styles.disclaimer}>
                By pressing "Leave Circle" you will be removed from all circle
                communication. You will not be able to use it's channels, or
                vote in revision polls. If you would like to return to this
                Circle at a later date, you will need to be re-invited by
                someone inside the Circle.
              </Text>
              <PortalButton title={"Leave Circle"} />
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </ScreenWrapper>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
    alignItems: "stretch",
    justifyContent: "flex-start",
    width: "100%",
    flex: 1
  },
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
