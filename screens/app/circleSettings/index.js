import React, { Component } from "react";

import ScreenWrapper from "../../../components/ScreenWrapper";
import PortalButton from "../../../components/PortalButton";
import LinkText from "../../../components/LinkText";
import CirclePrefs from "./CirclePrefs";

import {
  Text,
  View,
  ScrollView,
  StyleSheet,
  KeyboardAvoidingView
} from "react-native";
import { UIActivityIndicator } from "react-native-indicators";

import { connect } from "react-redux";
import { pull } from "../../../redux/state/reducers";

class CircleSettings extends Component {
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

  leaveCircle = e => {
    e.preventDefault();
    let { activeCircle, user } = this.props;

    swal("Are you sure you'd like to leave this Circle?", {
      buttons: {
        cancel: "Not yet",
        confirm: true
      }
    }).then(async value => {
      if (value === true) {
        this.props.deleteUserFomCircle({
          variables: {
            user,
            circle: activeCircle
          }
        });
        swal(
          "Removed From Circle",
          `You have left this Circle. You will have to be re-invited to participate at a later time.`,
          "warning"
        );
        this.props.dispatch(updateCircle(null));
        this.props.history.push(`/app`);
      }
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
            <CirclePrefs user={user} activeCircle={activeCircle} />
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

function mapStateToProps(state) {
  return {
    user: pull(state, "user"),
    activeCircle: pull(state, "activeCircle")
  };
}

export default connect(mapStateToProps)(CircleSettings);
