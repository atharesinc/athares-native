import React, { Component } from "react";
import ScreenWrapper from "../../../components/ScreenWrapper";
import InviteUser from "../../../components/InviteUser";

import {
  Text,
  View,
  ScrollView,
  StyleSheet,
  KeyboardAvoidingView,
  Alert
} from "react-native";

import PortalButton from "../../../components/PortalButton";
import { graphql, compose } from "react-apollo";
import { ADD_USER_TO_CIRCLE } from "../../../graphql/mutations";

import { connect } from "react-redux";
import { pull } from "../../../redux/state/reducers";
import { UIActivityIndicator } from "react-native-indicators";

class AddUser extends Component {
  state = {
    isFocused: false,
    tags: []
  };
  onFocusChange = isFocused => {
    this.setState({
      isFocused
    });
  };
  updateTags = tags => {
    this.setState({
      tags
    });
  };
  renderTags = tags => {
    return tags.map(t => (
      <View style={styles.tag} key={t.id}>
        <Text style={styles.tagText}>{t.name}</Text>
      </View>
    ));
  };
  submit = async e => {
    // add each user to circle
    let { tags } = this.state;
    if (tags.length === 0) {
      return;
    }
    try {
      let invites = tags.map(user => {
        return this.props.addUserToCircle({
          variables: {
            user: user.id,
            circle: this.props.activeCircle
          }
        });
      });

      Promise.all(invites).then(() => {
        Alert.alert(
          `${tags.length > 1 ? "Users Added" : "User Added"}`,
          `${
            tags.length > 1 ? "These users have" : "This user has"
          } been added.`
        );
        this.props.navigation.goBack(null);
      });
    } catch (err) {
      console.error(new Error(err));
      Alert.alert("Error", "There was an error inviting users.");
    }
  };
  render() {
    const { tags, loading } = this.state;

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
        <ScrollView styles={[styles.wrapper]}>
          <KeyboardAvoidingView behavior="padding">
            <Text style={styles.header}>
              ADD EXISTING USERS TO PARTICIPATE IN THIS CIRCLE
            </Text>
            <Text style={styles.label}>Invite Users</Text>
            <View style={styles.picker}>
              {tags.length !== 0 && (
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center"
                  }}
                >
                  <Text style={styles.toText}>Invite:</Text>
                  <ScrollView
                    contentContainerStyle={styles.tagsList}
                    horizontal={true}
                  >
                    {this.renderTags(tags)}
                  </ScrollView>
                </View>
              )}
              <InviteUser
                tags={tags}
                updateTags={this.updateTags}
                onFocusChange={this.onFocusChange}
              />
            </View>

            <Text style={styles.disclaimer}>
              After pressing "Invite Users", the recipient(s) will be added
              automatically to this circle.
            </Text>
            <Text style={styles.disclaimer}>
              Invitations aren't subject to democratic process.
            </Text>
            <PortalButton
              title="Invite Users"
              style={styles.marginTop}
              onPress={this.submit}
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
  tagsWrapper: {
    backgroundColor: "#3a3e52",
    borderRadius: 9999,
    paddingVertical: 5,
    paddingHorizontal: 10
  },
  tagsList: {
    backgroundColor: "transparent",
    paddingVertical: 5,
    paddingHorizontal: 10
  },
  toText: {
    color: "#FFFFFF80",
    marginRight: 5,
    fontSize: 15
  },
  tag: {
    borderColor: "#00DFFC",
    borderWidth: 1,
    borderRadius: 9999,
    paddingVertical: 3,
    paddingHorizontal: 10,
    marginRight: 5
  },
  tagText: {
    color: "#00DFFC",
    fontSize: 15
  },
  marginTop: {
    marginTop: 15
  }
});

function mapStateToProps(state) {
  return {
    user: pull(state, "user"),
    pub: pull(state, "pub"),
    activeCircle: pull(state, "activeCircle")
  };
}
export default connect(mapStateToProps)(
  compose(graphql(ADD_USER_TO_CIRCLE, { name: "addUserToCircle" }))(AddUser)
);
