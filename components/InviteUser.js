import React, { Component } from "react";
import { View, StyleSheet, Text, Image } from "react-native";
import AutoTags from "react-native-tag-autocomplete";

export default class InviteUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tagsSelected: [],
      isFocused: false
    };
  }

  handleDelete = index => {
    let tagsSelected = this.state.tagsSelected;
    tagsSelected.splice(index, 1);
    this.setState({ tagsSelected });
  };

  handleAddition = suggestion => {
    this.setState({
      tagsSelected: this.state.tagsSelected.concat([suggestion])
    });
  };
  // render tags from array of selected objects
  _renderTags = tags => {
    return tags.map(t => (
      <View style={s.tag} key={t.id}>
        <Text style={s.tagText}>{t.name}</Text>
      </View>
    ));
  };
  //react function to render each suggestions
  _renderSuggestion = item => {
    return (
      <View style={s.suggestion}>
        <Text style={s.suggestionText}>{item.name}</Text>
      </View>
    );
  };
  _filterData = val => {
    return this.props.suggestions.filter(sugg => sugg.name.indexOf(val) !== -1);
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
    const { suggestions = [], styles = {} } = this.props;
    const { isFocused } = this.state;
    return (
      <View styles={[s.autocompleteContainer, styles.wrapper]}>
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
        />
      </View>
    );
  }
}

const s = StyleSheet.create({
  autoTags: { backgroundColor: "#3a3e52", color: "#FFF" },

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
  tag: {
    borderColor: "#00DFFC",
    borderWidth: 1,
    borderRadius: 9999,
    paddingVertical: 3,
    paddingHorizontal: 10,
    marginRight: 5
  },
  tagText: {
    color: "#00DFFC"
  },
  base: {},
  autocompleteContainer: {
    flex: 1,
    left: 0,
    position: "absolute",
    right: 0,
    top: 0,
    zIndex: 1,
    backgroundColor: "#3a3e52",
    width: "100%",
    height: 50
  }
});
