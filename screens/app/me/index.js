import React, { Component } from "react";
import ScreenWrapper from "../../../components/ScreenWrapper";
import AvatarPicker from "../../../components/AvatarPicker";
import InfoLine from "../../../components/InfoLine";
import Statistic from "../../../components/Statistic";
import SwitchLine from "../../../components/SwitchLine";
import {
  Text,
  View,
  ScrollView,
  StyleSheet,
  KeyboardAvoidingView,
  ImageBackground
} from "react-native";

export default class Me extends Component {
  state = {
    phone: "",
    email: "",
    uname: "",
    uri: null
  };
  updateURI = uri => {
    this.setState({
      uri
    });
  };

  updatePhone = text => {
    this.setState({
      phone: text
    });
  };
  updateEmail = text => {
    this.setState({
      email: text
    });
  };
  updateName = text => {
    this.setState({
      uname: text
    });
  };
  render() {
    const { uri, phone, email, uname } = this.state;

    return (
      <ScreenWrapper styles={[styles.wrapper]}>
        <KeyboardAvoidingView behavior="position">
          <ScrollView styles={[styles.wrapper]}>
            <ImageBackground
              source={require("../../../assets/nasa-earth.jpg")}
              style={styles.backgroundImage}
            >
              <View style={styles.userAndImageWrapper}>
                <Text style={styles.userNameText}>this.props.user.name</Text>
                <AvatarPicker
                  uri={uri}
                  onImageChange={this.updateURI}
                  rounded={true}
                />
              </View>
            </ImageBackground>
            {/* Info */}
            <View style={styles.section}>
              <Text style={styles.sectionHeading}>Info</Text>
              <InfoLine
                icon={"phone"}
                label="Phone"
                value={phone}
                onChangeText={this.updatePhone}
              />
              <InfoLine
                icon={"at-sign"}
                label="Email"
                value={email}
                onChangeText={this.updateEmail}
              />
              <InfoLine
                icon={"hash"}
                label="Unique Name"
                value={uname}
                onChangeText={this.updateName}
              />
            </View>

            {/* Stats */}
            <View style={styles.section}>
              <Text style={styles.sectionHeading}>Statistics</Text>
              <View style={styles.wrapSection}>
                <Statistic header="Circles" text={1} />
                <Statistic header="Revisions Proposed" text={2} />
                <Statistic header="Revisions Accepted" text={2} />
                <Statistic header="Times Voted" text={2} />
                <Statistic
                  header="User Since"
                  text={new Date(
                    "2019-04-19T00:05:18.223Z"
                  ).toLocaleDateString()}
                />
              </View>
            </View>
            <View style={[styles.section, { marginBottom: 50 }]}>
              <Text style={styles.sectionHeading}>User Preferences</Text>
              <SwitchLine label={"Allow Marketing Emails"} />
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
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
    flex: 1
  },
  userNameText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginBottom: 10
  },
  userAndImageWrapper: {
    flex: 1,
    padding: 15,
    width: "100%",
    backgroundColor: "#00000080",
    justifyContent: "center",
    alignItems: "center"
  },
  section: {
    marginTop: 15,
    marginHorizontal: 15,
    marginBottom: 10
  },
  sectionHeading: {
    fontSize: 20,
    color: "#FFFFFF",
    marginBottom: 10
  },
  disclaimer: {
    fontSize: 15,
    color: "#FFFFFFb7",
    marginBottom: 5
  },
  label: {
    fontSize: 18,
    marginBottom: 10,
    color: "#FFF"
  },
  picker: {
    flexDirection: "column",
    alignItems: "stretch",
    marginBottom: 20
  },
  backgroundImage: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center"
  },
  marginTop: {
    marginTop: 15
  },
  wrapSection: {
    flexDirection: "row",
    flexWrap: "wrap"
  }
});
