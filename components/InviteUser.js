import React, { Component } from "react";
import { View, StyleSheet, Text, Image } from "react-native";
import AutoTags from "react-native-tag-autocomplete";

export default class InviteUser extends Component {
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
  _filterData = val => {
    return this.props.suggestions
      .filter(sugg => sugg.name.toLowerCase().indexOf(val.toLowerCase()) !== -1)
      .filter(sugg => this.props.tags.findIndex(t => t.id === sugg.id) === -1);
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
    const { suggestions = [], style = {}, tags } = this.props;
    const { isFocused } = this.state;
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
    // position: "absolute",
    // flex: 1,
    // left: 0,
    // right: 0,
    // top: 0,
    // zIndex: 1,
    width: "100%"
  }
});
