import React from 'react';
import { withNavigation } from 'react-navigation';
import moment from 'moment';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import AsyncImageAnimated from 'react-native-async-image-animated';
import { connect } from 'react-redux';
import {
  updateRevision,
  updateAmendment,
  updateCircle,
  updateViewUser,
  updateChannel,
} from '../../../redux/state/actions';
import { closeSearch } from '../../../redux/ui/actions';

const SingleSearchItem = ({ item, category, navigation, ...props }) => {
  const navigate = () => {
    const { id } = item;

    if (item) {
      switch (category) {
        case 'circles':
          props.dispatch(updateCircle(id));
          break;
        case 'channels':
          props.dispatch(updateCircle(item.circle.id));
          props.dispatch(updateChannel(id));
          navigation.navigate('Channel');
          break;
        case 'amendments':
          props.dispatch(updateCircle(item.circle.id));
          props.dispatch(updateAmendment(id));
          navigation.navigate('Constitution');
          break;
        case 'revisions':
          props.dispatch(updateCircle(item.circle.id));
          props.dispatch(updateRevision(id));
          navigation.navigate('ViewRevision');
          break;
        case 'users':
          props.dispatch(updateViewUser(id));
          navigation.navigate('ViewOtherUser');
          break;
        default:
          break;
      }
      props.dispatch(closeSearch());
    }
  };
  return (
    <TouchableOpacity
      style={styles.suggestionItem}
      key={item.id}
      onPress={navigate}
      data-id={item.id}
    >
      {category === 'users' ? (
        <View style={styles.suggestionItemUser}>
          <AsyncImageAnimated
            source={{ uri: item.icon }}
            style={styles.userIcon}
            placeholderColor={'#3a3e52'}
          />
          <Text style={styles.suggestionText}>
            {item.firstName + ' ' + item.lastName}
          </Text>
          {item.uname && <Text>- {item.uname}</Text>}
        </View>
      ) : (
        <View>
          <Text style={styles.suggestionText}>
            {item[props.searchOn] +
              (category !== 'circles' ? ' - ' + item.circle.name : '')}
          </Text>
          {category !== 'circles' && (
            <Text style={[styles.suggestionText, styles.smaller]}>
              {moment(item.createdAt).fromNow()}
            </Text>
          )}
        </View>
      )}
    </TouchableOpacity>
  );
};

function mapStateToProps(state) {
  return {};
}

export default connect(mapStateToProps)(withNavigation(SingleSearchItem));

const styles = StyleSheet.create({
  suggestionItem: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    color: '#FFFFFFb7',
    borderBottomWidth: 1,
    borderColor: '#FFFFFFb7',
    flexDirection: 'row',
  },
  suggestionItemUser: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  suggestionText: {
    fontSize: 16,
    color: '#FFFFFFb7',
  },
  smaller: {
    fontSize: 12,
  },
  userIcon: {
    height: 30,
    width: 30,
    marginRight: 15,
  },
});
