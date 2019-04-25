import React, { Component } from "react";
import ScreenWrapper from "../../../components/ScreenWrapper";
import Input from "../../../components/Input";

import {
  Text,
  ScrollView,
  StyleSheet,
  KeyboardAvoidingView,
  Alert
} from "react-native";
import { FileSystem, ImageManipulator} from "expo"
import AvatarPicker from "../../../components/AvatarPicker";
import PortalButton from "../../../components/PortalButton";
import { CREATE_CIRCLE, ADD_USER_TO_CIRCLE } from "../../../graphql/mutations";
import { compose, graphql } from "react-apollo";

import { connect } from "react-redux";
import { pull } from "../../../redux/state/reducers";
import { updateCircle } from "../../../redux/state/actions";
import defaultCircleImage from "../../../components/defaultCircleImage";

class CreateCircle extends Component {
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
//   convertURIToBase64 = (uri) => {
//     try {
//       const content = await FileSystem.readAsStringAsync(uri)
//       return base64.fromByteArray(stringToUint8Array(content))
//     } catch (e) {
//       console.warn('fileToBase64()', e.message)
//       return ''
//     }
//   }
//   stringToUint8Array(str) {
//   const length = str.length
//   const array = new Uint8Array(new ArrayBuffer(length))
//   for (let i = 0; i < length; i++) array[i] = str.charCodeAt(i)
//   return array
// }
  submit = () => {
    let { name, preamble, uri } = this.state;
    
    
    if(uri){
    
      uri = await ImageManipulator.manipulateAsync(
        uri,
        [{resize: {width: 250, height: 250}}],
        { format: 'png', compress: 0.8, base64: true }
      );
        console.log(uri)
    } else {
      uri = defaultCircleImage
    }
    return;
    preamble = preamble.trim();
    name = name.trim();
    
    // replace with Validate.js
    if (preamble === "" || name === "") {
      Alert.alert("Sorry", "Circles must have a name and preamble.", "error");
      return false;
    }
    await this.setState({ loading: true });

    // create circle
    let newCircle = {
      name: name,
      preamble: preamble,
      icon: base64Small
    };

    let newCircleRes = await this.props.createCircle({
      variables: {
        ...newCircle
      }
    });

    newCircle.id = newCircleRes.data.createCircle.id;

    await this.props.addCircleToUser({
      variables: {
        user: this.props.user,
        circle: newCircle.id
      }
    });
    // set activeCircle as this one
    this.props.dispatch(updateCircle(newCircle.id));

    await this.setState({ loading: false });
    swal("Circle Created", `${name} has been created successfully.`, "success");

    this.props.history.push("/app/circle/" + newCircle.id + "/constitution");    this.props.navigation.goBack(null);
  };
  render() {
    const { name, preamble, loading } = this.state;

    if(loading){
      return (
        <ScreenWrapper styles={[styles.wrapper]}>
        <UIActivityIndicator color={"#FFFFFF"}/>
        </ScreenWrapper>
      )
    }
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


function mapStateToProps(state) {
  return {
    user: pull(state, "user"),
    pub: pull(state, "pub")
  };
}

export default compose(
  graphql(CREATE_CIRCLE, { name: "createCircle" }),
  graphql(ADD_USER_TO_CIRCLE, { name: "addCircleToUser" })
)(connect(mapStateToProps)(CreateCircle));