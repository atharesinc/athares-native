import React from 'react';

import {
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  View,
} from 'react-native';
import { withNavigation } from 'react-navigation';
import Icon from '@expo/vector-icons/Feather';
import CircleIcon from './CircleIcon';

import { Query } from 'react-apollo';
import { GET_CIRCLES_BY_USER_ID } from '../graphql/queries';
import { connect } from 'react-redux';
import { updateCircle } from '../redux/state/actions';
import { pull } from '../redux/state/reducers';

const Circles = ({ loggedIn = false, activeCircle, user, ...props }) => {
  const selectCircle = (id = null) => {
    props.dispatch(updateCircle(id));
  };
  const goToCreateCircle = () => {
    if (loggedIn) {
      props.navigation.navigate('CreateCircle');
    }
  };
  let circles = [];
  return (
    <Query
      query={GET_CIRCLES_BY_USER_ID}
      variables={{ id: user || '' }}
      pollInterval={3000}
    >
      {({ data }) => {
        if (data.User) {
          circles = data.User.circles;
        }
        return (
          <View style={styles.wrapper}>
            <TouchableOpacity
              style={styles.addCircleWrapper}
              onPress={goToCreateCircle}
            >
              <View style={styles.iconWrapper}>
                <Icon
                  name='plus'
                  color={loggedIn ? '#FFFFFF' : '#282a38'}
                  size={30}
                />
              </View>
              <Text numberOfLines={1} style={styles.circleLabel}>
                New
              </Text>
            </TouchableOpacity>
            <ScrollView
              horizontal={true}
              contentContainerStyle={styles.circlesList}
            >
              {circles.map(c => (
                <CircleIcon
                  selected={c.id === activeCircle}
                  selectCircle={selectCircle}
                  circle={c}
                  key={c.id}
                />
              ))}
            </ScrollView>
          </View>
        );
      }}
    </Query>
  );
};

const styles = StyleSheet.create({
  addCircleWrapper: {
    width: 60,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginRight: 15,
  },
  iconWrapper: {
    width: 60,
    height: 60,
    borderRadius: 9999,
    backgroundColor: '#2f3242',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 5,
  },
  circlesList: {
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  wrapper: {
    backgroundColor: '#282a38',
    paddingHorizontal: 15,
    paddingVertical: 10,
    // height: "15%",
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  circleLabel: {
    fontSize: 13,
    color: '#ffffffb7',
  },
});

function mapStateToProps(state) {
  return {
    activeCircle: pull(state, 'activeCircle'),
    user: pull(state, 'user'),
  };
}
export default connect(mapStateToProps)(withNavigation(Circles));
