import React, { Component, useState, Fragment } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { withNavigation } from 'react-navigation';

import Icon from '@expo/vector-icons/Feather';

import { Query } from 'react-apollo';
import { connect } from 'react-redux';
import { UIActivityIndicator } from 'react-native-indicators';

import { SEARCH_ALL } from '../../../graphql/queries';
// import { pull } from '../../store/ui/reducers';
// import { updateSearchParams } from '../../store/ui/actions';
import { SearchResults } from './SearchResults';

export const Search = () => {
  const [searchParams, setSearchParams] = useState('');

  const updateText = text => {
    setSearchParams(text);
  };

  return (
    <Query
      query={SEARCH_ALL}
      variables={{ id: searchParams, text: searchParams }}
    >
      {({ loading, err, data = {} }) => {
        return (
          <Fragment>
            {/* input */}
            <View style={styles.searchInputWrapper}>
              <Icon
                name='search'
                size={20}
                color={'#FFFFFFb7'}
                numberOfLines={1}
                style={styles.searchIcon}
              />
              <TextInput
                value={searchParams}
                style={styles.searchInput}
                onChangeText={updateText}
                placeholder={'Enter Search Text'}
                numberOfLines={1}
                placeholderTextColor={'#FFFFFFb7'}
              />
              {loading ? (
                <UIActivityIndicator
                  color={'#FFFFFF'}
                  size={20}
                  style={styles.searchIcon}
                />
              ) : (
                <Icon
                  name='x'
                  size={20}
                  color={'#00000000'}
                  numberOfLines={1}
                  style={styles.searchIcon}
                />
              )}
            </View>
            {/* results */}
            {searchParams.length > 2 && !loading && (
              <SearchResults {...data} searchParams={searchParams} />
            )}
          </Fragment>
        );
      }}
    </Query>
  );
};

const styles = StyleSheet.create({
  searchWrapper: {},
  searchInputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: '#2f3242',
  },
  searchIcon: {
    marginRight: 10,
    flex: 1,
  },
  searchInput: {
    color: '#FFFFFF',
    fontSize: 15,
    flex: 8,
  },
});
