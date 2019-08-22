import React, { Component } from "react";
import { FlatList } from "react-native";
import Message from "./Message";

export default class Chat extends Component {
  _renderItem = ({ item, index }) => (
    <Message
      multiMsg={
        index < this.props.messages.length - 1 &&
        this.props.messages[index + 1].user.id ===
          this.props.messages[index].user.id
      }
      isMine={item.user.id === this.props.user}
      key={item.id}
      timestamp={item.createdAt}
      message={item}
    />
  );
  _getItemLayout = (data, index) => ({
    length: 50,
    offset: 50 * index,
    index
  });
  _keyExtractor = item => item.id;
  render() {
    return (
      <FlatList
        data={this.props.messages}
        renderItem={this._renderItem}
        inverted
        keyExtractor={this._keyExtractor}
        contentContainerStyle={{ paddingBottom: 40 }}
      />
    );
  }
}
