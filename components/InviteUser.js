import React, { Component } from "react";
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity
} from "react-native";
import AsyncImageAnimated from "react-native-async-image-animated";

import { connect } from "react-redux";
import { pull } from "../redux/state/reducers";
import { SEARCH_FOR_USER, GET_USERS_BY_CIRCLE_ID } from "../graphql/queries";
import { compose, graphql, Query } from "react-apollo";

class InviteUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      input: ""
    };
  }

  handleAddition = suggestion => {
    let newTags = this.props.tags.concat([suggestion]);
    this.props.updateTags(newTags);
    this.setState({
      input: ""
    });
  };
  _renderSuggestion = item => {
    return (
      <TouchableOpacity
        key={item.id}
        style={s.suggestion}
        onPress={() => {
          this.handleAddition(item);
        }}
      >
        <AsyncImageAnimated
          source={{ uri: item.icon }}
          style={s.miniIcon}
          placeholderColor={"#3a3e52"}
        />
        <Text style={s.suggestionText}>{item.name}</Text>
        {item.uname && <Text style={s.suggestionText}>@{item.uname}</Text>}
      </TouchableOpacity>
    );
  };
  updateInput = text => {
    this.setState({
      input: text
    });
  };
  render() {
    const { style = {}, getUsers, tags, circle } = this.props;
    const { input } = this.state;
    let suggestions = [];
    return (
      <Query
        query={SEARCH_FOR_USER}
        variables={{ text: input || "s7d9f87vs69d8fv7" }}
      >
        {({ data: { allUsers } }) => {
          // filter data.suggestions by users that are in tags list, and if in addUser, users already in this circle
          if (input.trim().length >= 1 && tags.length < 7 && allUsers) {
            suggestions = allUsers
              .filter(u => tags.findIndex(su => su.id === u.id) === -1)
              .map(u => ({ name: u.firstName + " " + u.lastName, ...u }));
            if (circle) {
              suggestions = suggestions.filter(
                u =>
                  getUsers.Circle.users.findIndex(su => su.id === u.id) === -1
              );
            }
          }
          return (
            <View styles={[s.autocompleteContainer, style]}>
              <TextInput
                value={input}
                onChangeText={this.updateInput}
                style={s.inputStyle}
                placeholder="Enter a name"
              />
              {suggestions.map(u => this._renderSuggestion(u))}
            </View>
          );
        }}
      </Query>
    );
  }
}

const s = StyleSheet.create({
  //style internal
  inputStyle: {
    borderRadius: 0,
    paddingHorizontal: 15,
    height: 40,
    width: 300,
    justifyContent: "center",
    borderColor: "transparent",
    alignItems: "stretch",
    backgroundColor: "#3a3e5299",
    width: "100%",
    color: "#FFFFFF"
  },
  // suggestions container
  container: {
    alignItems: "stretch",
    padding: 0,
    backgroundColor: "transparent",
    width: "100%"
  },
  autoTags: {
    backgroundColor: "transparent",
    color: "#FFF",
    flex: 1
  },
  suggestion: {
    width: "100%",
    backgroundColor: "#282a38",
    borderBottomColor: "#3a3e5299",
    borderBottomWidth: 1,
    paddingHorizontal: 15,
    paddingVertical: 10,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center"
  },
  miniIcon: {
    height: 30,
    width: 30,
    marginRight: 10,
    borderRadius: 9999
  },
  suggestionText: {
    color: "#FFFFFF"
  },
  autocompleteContainer: {
    width: "100%"
  }
});

function mapStateToProps(state) {
  return {
    user: pull(state, "user")
  };
}
export default connect(mapStateToProps)(
  compose(
    graphql(GET_USERS_BY_CIRCLE_ID, {
      name: "getUsers",
      options: ({ circle }) => ({ variables: { id: circle || "" } })
    })
  )(InviteUser)
);
