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

export default class CreateChannel extends Component {
  state = {
    name: "",
    description: ""
  };

  updateName = text => {
    this.setState({
      name: text
    });
  };
  updateDesc = text => {
    this.setState({
      description: text
    });
  };
  submit = () => {
    console.log("Create Channel!");
    this.props.navigation.navigate("Channel");
  };
  render() {
    const { name, preamble } = this.state;

    return (
      <ScreenWrapper styles={[styles.wrapper]}>
        <ScrollView styles={[styles.wrapper]}>
          <KeyboardAvoidingView behavior="padding">
            <Text style={styles.header}>
              CREATE A NEW CHANNEL WITHIN this.props.Circle.name.
            </Text>
            <Input
              placeholder={"Channel Name"}
              label={"Channel Name"}
              onChangeText={this.updateName}
              value={name}
            />
            <Input
              value={preamble}
              onChangeText={this.updateDesc}
              label={"Description"}
              description={"Describe this channel"}
              multiline={true}
            />
            <Text style={styles.disclaimer}>
              By pressing "Create Channel" you will create a new channel within
              this.props.Circle.name.
            </Text>
            <PortalButton title="Create Channel" onPress={this.submit} />
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
