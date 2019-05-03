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
import { UIActivityIndicator } from "react-native-indicators";

import { Query } from "react-apollo";
import { GET_USER_BY_ID_ALL } from "../../../graphql/queries";

export default class ViewOtherUser extends Component {
  render() {
    return (
      <Query
        query={GET_USER_BY_ID_ALL}
        variables={{ id: this.props.activeUser || "" }}
      >
        {({ loading, data }) => {
          let user,
            stats = null;
          if (data.User) {
            user = data.User;
            stats = {
              voteCount: user.votes.length,
              circleCount: user.circles.length,
              revisionCount: user.revisions.length,
              passedRevisionCount: user.revisions.filter(r => r.passed).length
            };
          }
          if (loading) {
            return (
              <ScreenWrapper
                styles={{ justifyContent: "center", alignItems: "center" }}
              >
                <UIActivityIndicator color={"#FFFFFF"} />
              </ScreenWrapper>
            );
          }
          return (
            <ScreenWrapper styles={[styles.wrapper]}>
              <KeyboardAvoidingView behavior="position">
                <ScrollView styles={[styles.wrapper]}>
                  <ImageBackground
                    source={require("../../../assets/nasa-earth.jpg")}
                    style={styles.backgroundImage}
                  >
                    <View style={styles.userAndImageWrapper}>
                      <Text style={styles.userNameText}>{user.name}</Text>
                      <View style={[styles.previewWrapper]}>
                        <Image
                          source={{ uri: user.icon }}
                          style={[styles.preview]}
                        />
                      </View>
                    </View>
                  </ImageBackground>
                  {/* Info */}
                  <View style={styles.section}>
                    <Text style={styles.sectionHeading}>Info</Text>
                    <InfoLineStatic
                      icon={"phone"}
                      label="Phone"
                      value={user.phone}
                    />
                    <InfoLineStatic
                      icon={"at-sign"}
                      label="Email"
                      value={user.email}
                    />
                    <InfoLineStatic
                      icon={"hash"}
                      label="Unique Name"
                      value={user.uname}
                    />
                  </View>

                  {/* Stats */}
                  <View style={styles.section}>
                    <Text style={styles.sectionHeading}>Statistics</Text>
                    <View style={styles.wrapSection}>
                      <Statistic header="Circles" text={stats.circleCount} />
                      <Statistic
                        header="Revisions Proposed"
                        text={stats.revisionCount}
                      />
                      <Statistic
                        header="Revisions Accepted"
                        text={stats.passedRevisionCount}
                      />
                      <Statistic header="Times Voted" text={stats.voteCount} />
                      <Statistic
                        header="User Since"
                        text={new Date(user.createdAt).toLocaleDateString()}
                      />
                    </View>
                  </View>
                </ScrollView>
              </KeyboardAvoidingView>
            </ScreenWrapper>
          );
        }}
        }
      </Query>
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
