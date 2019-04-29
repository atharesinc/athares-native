import React, { Component } from "react";
import { View, StyleSheet, Text, Image } from "react-native";
import AutoTags from "react-native-tag-autocomplete";

import { connect } from "react-redux";
import { pull } from "../redux/state/reducers";
import { SEARCH_FOR_USER, GET_USERS_BY_CIRCLE_ID } from "../graphql/queries";
import { compose, graphql } from "react-apollo";

class InviteUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isFocused: false
    };
  }

  handleDelete = index => {
    let tagsSelected = this.props.tags;
    tagsSelected.splice(index, 1);
    this.props.updateTags(tagsSelected);
  };

  handleAddition = suggestion => {
    let newTags = this.props.tags.concat([suggestion]);
    this.props.updateTags(newTags);
  };
  // render tags from array of selected objects
  _renderTags = tags => {
    // return tags.map(t => (
    //   <View style={s.tag} key={t.id}>
    //     <Text style={s.tagText}>{t.name}</Text>
    //   </View>
    // ));
  };
  //react function to render each suggestions
  _renderSuggestion = item => {
    return (
      <View style={s.suggestion}>
        <Text style={s.suggestionText}>{item.name}</Text>
      </View>
    );
  };
  _filterData = async val => {
    const { getUsers, tags } = this.props;
    // display some results to the user
    // filter out names that don't meet criteria and filter out alreadys selected users
    let res = await this.props.searchForUser.updateQuery(
      this.props.searchForUser,
      {
        variables: { text: val }
      }
    );
    console.log(res);
    let { allUsers } = res;
    return allUsers
      .filter(s => getUsers.Circle.users.findIndex(su => su.id === s.id) === -1)
      .filter(s => tags.findIndex(su => su.id === s.id) === -1)
      .filter(s => s.id !== this.props.user)
      .map(s => ({ name: s.firstName + " " + s.lastName, ...s }));
  };
  focus = () => {
    if (this.props.onFocusChange) {
      this.props.onFocusChange(true);
    }
    this.setState({
      isFocused: true
    });
  };
  blur = () => {
    if (this.props.onFocusChange) {
      this.props.onFocusChange(false);
    }
    this.setState({
      isFocused: false
    });
  };
  render() {
    const { style = {} } = this.props;
    const { isFocused, suggestions = [] } = this.state;

    return (
      <View styles={[s.autocompleteContainer, style]}>
        <AutoTags
          style={[s.autoTags, isFocused ? s.autoTagsFocused : {}]}
          onFocus={this.focus}
          onBlur={this.blur}
          suggestions={suggestions}
          tagsSelected={this.state.tagsSelected}
          handleAddition={this.handleAddition}
          handleDelete={this.handleDelete}
          placeholder="Enter a name"
          filterData={this._filterData}
          renderTags={this._renderTags}
          renderSuggestion={this._renderSuggestion}
          inputContainerStyle={s.inputStyle}
          containerStyle={s.container}
        />
      </View>
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
    width: "100%"
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
    paddingVertical: 10
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
    user: pull(state, "user"),
    activeCircle: pull(state, "activeCircle")
  };
}
export default connect(mapStateToProps)(
  compose(
    graphql(GET_USERS_BY_CIRCLE_ID, {
      name: "getUsers",
      options: ({ activeCircle }) => ({ variables: { id: activeCircle || "" } })
    }),
    graphql(SEARCH_FOR_USER, {
      name: "searchForUser",
      options: props => ({ variables: { text: "s7d9f87vs69d8fv7" } })
    })
  )(InviteUser)
);
