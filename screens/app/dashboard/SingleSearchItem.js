import React, { useGlobal } from 'reactn';
import { withNavigation } from 'react-navigation';
import moment from 'moment';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import AsyncImageAnimated from 'react-native-async-image-animated';

const SingleSearchItem = ({ item, category, navigation, ...props }) => {
  const [activeCircle, setActiveCircle] = useGlobal('activeCircle');
  const [activeChannel, setActiveChannel] = useGlobal('activeChannel');
  const [activeRevision, setActiveRevision] = useGlobal('activeRevision');
  const [activeAmendment, setActiveAmendment] = useGlobal('activeAmendment');
  const [viewUser, setViewUser] = useGlobal('viewUser');
  const [showSearch, setShowSearch] = useGlobal('showSearch');

  const navigate = () => {
    const { id } = item;

    if (item) {
      switch (category) {
        case 'circles':
          setActiveCircle(id);
          break;
        case 'channels':
          setActiveCircle(item.circle.id);
          setActiveChannel(id);
          navigation.navigate('Channel');
          break;
        case 'amendments':
          setActiveCircle(item.circle.id);
          setActiveAmendment(id);
          navigation.navigate('Constitution');
          break;
        case 'revisions':
          setActiveCircle(item.circle.id);
          setActiveRevision(id);
          navigation.navigate('ViewRevision');
          break;
        case 'users':
          setActiveViewUser(id);
          navigation.navigate('ViewOtherUser');
          break;
        default:
          break;
      }
      setShowSearch(false);
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

export default withNavigation(SingleSearchItem);

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
