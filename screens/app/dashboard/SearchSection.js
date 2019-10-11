import React from 'reactn';
import { View, Text, StyleSheet } from 'react-native';
import SingleSearchItem from './SingleSearchItem';

const SearchSection = props => {
  let { data, navigation, clearSearch } = props;

  // If the user hasn't entered any search terms, or there are no results for this section, don't display the section
  if (props.search.trim() === '' || data.length === 0) {
    return null;
  }

  return (
    <View style={styles.suggestionItemsWrapper}>
      <View style={styles.suggestionBackground}>
        <Text style={styles.suggestionHeader}>{props.title.toUpperCase()}</Text>
      </View>
      <View style={styles.suggestionItems}>
        {data.map(item => (
          <SingleSearchItem
            key={item.id}
            item={item}
            navigation={navigation}
            clearSearch={clearSearch}
            category={props.title}
            searchOn={props.searchOn}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  suggestionItemsWrapper: {},
  suggestionBackground: {
    backgroundColor: '#3a3e52',
  },
  suggestionHeader: {
    paddingHorizontal: 15,
    paddingVertical: 5,
    color: '#FFFFFFb7',
  },
  suggestionItems: {},
});

export default SearchSection;
