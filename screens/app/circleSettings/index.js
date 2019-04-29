import React, { Component } from "react";

import ScreenWrapper from "../../../components/ScreenWrapper";
import PortalButton from "../../../components/PortalButton";
import CirclePrefs from "./CirclePrefs";
import ShareCircle from "./ShareCircle";

import {
  Text,
  View,
  ScrollView,
  StyleSheet,
  KeyboardAvoidingView,
  Alert
} from "react-native";

import { updateCircle } from "../../../redux/state/actions";

import { connect } from "react-redux";
import { pull } from "../../../redux/state/reducers";

class CircleSettings extends Component {
  leaveCircle = () => {
    let { activeCircle, user } = this.props;
    this.props.deleteUserFomCircle({
      variables: {
        user,
        circle: activeCircle
      }
    });
    this.props.dispatch(updateCircle(null));

    this.props.navigation.navigate(`Dashboard`);
    Alert.alert(
      "Removed From Circle",
      `You have left this Circle. You will have to be re-invited to participate at a later time.`,
      "warning"
    );
  };
  // Double-check the user wants to leave
  leaveCirclePrompt = e => {
    Alert.alert(
      "Leave Circle",
      "Are you sure you'd like to leave this Circle?",
      [
        { text: "Yes", onPress: this.leaveCircle },
        {
          text: "Not Yet",
          style: "cancel"
        }
      ]
    );
  };
  render() {
    const { activeCircle, user } = this.props;
    return (
      <ScreenWrapper styles={[styles.wrapper]}>
        <KeyboardAvoidingView behavior="position">
          <ScrollView styles={[styles.wrapper]}>
            <ShareCircle activeCircle={activeCircle} />
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
              <PortalButton
                title={"Leave Circle"}
                style={styles.repealButton}
                textStyle={styles.repealText}
              />
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
  },
  repealButton: {
    marginTop: 20,
    borderColor: "#ff725c",
    borderWidth: 2,
    backgroundColor: "#282a38"
  },
  repealText: {
    color: "#ff725c"
  }
});

function mapStateToProps(state) {
  return {
    user: pull(state, "user"),
    activeCircle: pull(state, "activeCircle")
  };
}

export default connect(mapStateToProps)(CircleSettings);
