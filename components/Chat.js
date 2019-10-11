import React, { Component } from 'reactn';
import { FlatList } from 'react-native';
import Message from './Message';

export default function Chat({ messages, ...props }) {
  _renderItem = ({ item, index }) => (
    <Message
      multiMsg={
        index < messages.length - 1 &&
        messages[index + 1].user.id === messages[index].user.id
      }
      isMine={item.user.id === props.user}
      key={item.id}
      timestamp={item.createdAt}
      message={item}
    />
  );
  _getItemLayout = (data, index) => ({
    length: 50,
    offset: 50 * index,
    index,
  });
  _keyExtractor = item => item.id;

  return (
    <FlatList
      data={messages}
      renderItem={_renderItem}
      inverted
      keyExtractor={_keyExtractor}
      contentContainerStyle={{ paddingBottom: 40 }}
    />
  );
}
