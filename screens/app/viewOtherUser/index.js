import React, { Component } from "react";
import ScreenWrapper from "../../../components/ScreenWrapper";
import InfoLineStatic from "../../../components/InfoLineStatic";
import Statistic from "../../../components/Statistic";
import {
  Text,
  View,
  ScrollView,
  StyleSheet,
  KeyboardAvoidingView,
  ImageBackground,
  Image
} from "react-native";
import defaultCircleImage from "../../../components/defaultCircleImage";

export default class ViewOtherUser extends Component {
  render() {
    const { phone = null, email = null, uname = null } = {};
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
                <View style={[styles.previewWrapper]}>
                  <Image
                    source={{ uri: defaultCircleImage }}
                    style={[styles.preview]}
                  />
                </View>
              </View>
            </ImageBackground>
            {/* Info */}
            <View style={styles.section}>
              <Text style={styles.sectionHeading}>Info</Text>
              <InfoLineStatic icon={"phone"} label="Phone" value={phone} />
              <InfoLineStatic icon={"at-sign"} label="Email" value={email} />
              <InfoLineStatic icon={"hash"} label="Unique Name" value={uname} />
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
  },
  preview: {
    height: 150,
    width: 150,
    resizeMode: "stretch",
    padding: 0,
    margin: 0
  },
  previewWrapper: {
    backgroundColor: "transparent",
    height: 150,
    width: 150,
    padding: 0,
    marginBottom: 15,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
    borderRadius: 9999,
    borderColor: "#FFFFFF",
    borderWidth: 5
  }
});
