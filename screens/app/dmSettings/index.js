import React, { Component } from "react";

import ScreenWrapper from "../../../components/ScreenWrapper";
import PortalButton from "../../../components/PortalButton";
import {
  Text,
  View,
  ScrollView,
  StyleSheet,
  KeyboardAvoidingView,
  TouchableOpacity
} from "react-native";
import { UIActivityIndicator } from "react-native-indicators";
import { NavigationActions } from "react-navigation";
import InviteUser from "../../../components/InviteUser";
import Icon from "@expo/vector-icons/Feather";

export default class CircleSettings extends Component {
  state = {
    loading: false,
    showAddUsers: false,
    tags: []
  };
  navigateToScreen = route => () => {
    const navigateAction = NavigationActions.navigate({
      routeName: route
    });
    this.props.navigation.dispatch(navigateAction);
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
  close = () => {
    this.props.navigation.toggleDrawer();
  };
  render() {
    const { loading, showAddUsers, tags } = this.state;
    return (
      <ScreenWrapper styles={[styles.wrapper]}>
        <View style={[styles.lineItem, { backgroundColor: "#2f3242" }]}>
          <Text style={styles.sectionHeading}>Settings</Text>
          <TouchableOpacity style={styles.center} onPress={this.close}>
            <Icon name={"x"} size={25} color={"#FFFFFF"} />
          </TouchableOpacity>
        </View>
        <KeyboardAvoidingView behavior="position">
          <ScrollView styles={[styles.wrapper]}>
            <View style={styles.lineItem}>
              <Text style={styles.sectionHeading}>Add User</Text>
              <Icon name={"user-plus"} size={20} color={"#FFFFFF"} />
            </View>
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
                <TouchableOpacity style={styles.addButton}>
                  <Icon name={"plus"} size={20} color={"#00dffc"} />
                </TouchableOpacity>
              </View>
            )}
            <InviteUser
              suggestions={suggestions}
              tags={tags}
              updateTags={this.updateTags}
              onFocusChange={this.onFocusChange}
            />

            <View style={styles.section}>
              <Text style={styles.sectionHeading}>Leave Channel</Text>
              <Text style={styles.disclaimer}>
                By pressing "Leave Channel" you will be removed from this
                channel, and any messages or files you shared will not be
                accessible by you. If you would like to return to this channel
                at a later date, you will need to be re-invited by someone
                inside the channel.
              </Text>
              <PortalButton
                style={styles.repealButton}
                textStyle={styles.repealText}
                title={"Leave Channel"}
              />
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </ScreenWrapper>
    );
  }
}
var suggestions = [
  { name: "Jim", id: "123123" },
  { name: "Dan", id: "!2315" },
  { name: "Brian", id: "9182763" },
  { name: "Kyle", id: "48739201" }
];

const styles = StyleSheet.create({
  wrapper: {
    alignItems: "stretch",
    justifyContent: "flex-start",
    width: "100%",
    flex: 1,
    backgroundColor: "#282a38"
  },
  center: {
    alignItems: "center",
    justifyContent: "center"
  },
  lineItem: {
    padding: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  addButton: {
    width: 25,
    height: 25,
    borderColor: "#00dffc",
    borderRadius: 9999,
    borderWidth: 2,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15
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
    marginLeft: 15,
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
    color: "#FFFFFF"
  },
  disclaimer: {
    fontSize: 15,
    color: "#FFFFFFb7",
    marginBottom: 20
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
