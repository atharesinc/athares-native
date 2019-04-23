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

export default class CreateRevision extends Component {
  state = {
    title: "",
    text: ""
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
  submit = () => {
    console.log("Create Revision!");
    this.props.navigation.navigate("ViewRevision");
  };
  render() {
    const { title = "", text = "" } = this.state;

    return (
      <ScreenWrapper styles={[styles.wrapper]}>
        <ScrollView styles={[styles.wrapper]}>
          <KeyboardAvoidingView behavior="padding">
            <Text style={styles.header}>
              DRAFT A NEW PIECE OF LEGISLATION FOR this.props.Circle.name.
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
