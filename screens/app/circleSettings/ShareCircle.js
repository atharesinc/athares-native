import React, { Component } from "react";
import LinkText from "../../../components/LinkText";

import { Text, View, StyleSheet, Alert } from "react-native";
import PortalButton from "../../../components/PortalButton";

import { CREATE_INVITE } from "../../../graphql/mutations";
import { GET_CIRCLE_NAME_BY_ID } from "../../../graphql/queries";
import { graphql, Query } from "react-apollo";

import { connect } from "react-redux";
import { pull } from "../../../redux/state/reducers";
import { UIActivityIndicator } from "react-native-indicators";

class ShareCircle extends Component {
  state = {
    loading: false,
    showLink: false,
    link: ""
  };
  generateLink = async () => {
    let { user, activeCircle } = this.props;
    await this.setState({
      loading: true,
      link: null
    });

    try {
      let link = await this.props.createInvite({
        variables: {
          inviter: user,
          circle: activeCircle
        }
      });

      let { id } = link.data.createInvite;

      this.setState({
        link: "https://www.athares.us/invite/" + id,
        showLink: true,
        loading: false
      });
    } catch (err) {
      console.error(new Error(err));
      this.setState({
        loading: false
      });
      Alert.alert("Error", "Unable to generate invite link.");
    }
  };
  render() {
    const { showLink, link } = this.state;
    let circle = null;
    return (
      <Query
        query={GET_CIRCLE_NAME_BY_ID}
        variables={{ id: this.props.activeCircle }}
      >
        {({ loading, data }) => {
          if (loading) {
            return (
              <View style={{ justifyContent: "center", alignItems: "center" }}>
                <UIActivityIndicator color="#FFFFFF" />
              </View>
            );
          }
          if (data.Circle) {
            circle = data.Circle;
          }
          return (
            <View style={styles.section}>
              <Text style={styles.sectionHeading}>Share Circle</Text>
              <Text style={styles.disclaimer}>
                Invite someone to {circle.name} with a single-use link.
                Prospective users will have the option to sign up if they don't
                have an Athares account.
              </Text>
              {this.state.loading ? (
                <UIActivityIndicator color="#FFFFFF" />
              ) : (
                <PortalButton
                  title={"Generate Link"}
                  onPress={this.generateLink}
                  style={{ marginBottom: 15 }}
                />
              )}
              {showLink && <LinkText text={link} />}
            </View>
          );
        }}
      </Query>
    );
  }
}

const styles = StyleSheet.create({
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
  }
});
function mapStateToProps(state) {
  return {
    user: pull(state, "user"),
    activeCircle: pull(state, "activeCircle")
  };
}
export default graphql(CREATE_INVITE, {
  name: "createInvite"
})(connect(mapStateToProps)(ShareCircle));
