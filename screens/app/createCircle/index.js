import React, { Component } from "react";
import ScreenWrapper from "../../../components/ScreenWrapper";
import Input from "../../../components/Input";

import {
  Text,
  ScrollView,
  StyleSheet,
  KeyboardAvoidingView
} from "react-native";
import AvatarPicker from "../../../components/AvatarPicker";
import PortalButton from "../../../components/PortalButton";

export default class CreateCircle extends Component {
  state = {
    name: "",
    preamble: "",
    uri: null
  };
  updateURI = uri => {
    this.setState({
      uri
    });
  };
  updateName = text => {
    this.setState({
      name: text
    });
  };
  updatePreamble = text => {
    this.setState({
      preamble: text
    });
  };
  submit = () => {
    console.log("Create Circle!");
    this.props.navigation.goBack(null);
  };
  render() {
    const { name, preamble } = this.state;

    return (
      <ScreenWrapper styles={[styles.wrapper]}>
        <ScrollView styles={[styles.wrapper]}>
          <KeyboardAvoidingView behavior="padding">
            <Text style={styles.header}>
              CIRCLES ARE COLLABORATIVE, VOTING-CENTRIC ORGANIZATIONS.
            </Text>
            <Text style={styles.label}>Edit Icon</Text>
            <AvatarPicker onImageChange={this.updateURI} />
            <Input
              placeholder={"Circle Name"}
              label={"Circle Name"}
              onChangeText={this.updateName}
              value={name}
            />
            <Input
              value={preamble}
              onChangeText={this.updatePreamble}
              label={"Preamble"}
              description={
                "Describe your Circle in a few sentences. This will be visible at the top of the Constitution and outlines the vision of this organization."
              }
              placeholder={
                "Athares is committed to enabling democracy for everyone."
              }
              multiline={true}
            />
            <Text style={styles.disclaimer}>
              By pressing "Create Circle" you will create a new government with
              a the above name, preamble, and the selected image.
            </Text>
            <PortalButton title="Create Circle" onPress={this.submit} />
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
