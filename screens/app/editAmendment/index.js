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

export default class EditAmendment extends Component {
  state = {
    text: "This text was here when I arrived!"
  };
  updateText = text => {
    this.setState({
      description: text
    });
  };
  repeal = () => {
    console.log("Getting rid of this Revision!");
    this.props.navigation.navigate("ViewRevision");
  };
  submit = () => {
    console.log("Updated Revision!");
    this.props.navigation.navigate("ViewRevision");
  };
  render() {
    const { text = "" } = this.state;

    return (
      <ScreenWrapper styles={[styles.wrapper]}>
        <ScrollView styles={[styles.wrapper]}>
          <KeyboardAvoidingView behavior="padding">
            <Text style={styles.header}>EDIT OR REPEAL THIS AMENDMENT</Text>
            <Input
              value={text}
              onChangeText={this.updateText}
              label={"Amendment Text"}
              description={
                "Here you can make changes to the existing amendment. If you'd instead like to remove the amendment altogether, select 'Repeal Amendment'."
              }
              multiline={true}
            />
            <Text style={styles.disclaimer}>
              Pressing "Update Amendment" will create a revision for this
              amendment. If the revision gains the minimum number of votes to be
              ratified and the majority of voters support these changes, then
              the existing Amendment will be replaced with these changes.
            </Text>
            <PortalButton title="Update Amendment" onPress={this.submit} />
            <PortalButton
              title="Repeal Amendment"
              style={styles.repealButton}
              onPress={this.repeal}
              textStyle={styles.repealText}
            />
          </KeyboardAvoidingView>
        </ScrollView>
      </ScreenWrapper>
    );
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
