import React from 'reactn';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import AsyncImageAnimated from 'react-native-async-image-animated';

const UserLink = ({ user, ...props }) => {
  const userImage = user.icon
    ? { uri: user.icon }
    : require('../assets/user-default.png');
  return (
    <TouchableOpacity style={styles.userLink} {...props}>
      <View style={styles.imageWrapper}>
        <AsyncImageAnimated
          source={userImage}
          style={styles.image}
          placeholderColor={'#3a3e52'}
        />
      </View>
      <View>
        <Text style={styles.header}>
          {user.firstName + ' ' + user.lastName}
        </Text>
        <Text style={styles.disclaimer}>View Profile</Text>
      </View>
    </TouchableOpacity>
  );
};

export default UserLink;

const styles = StyleSheet.create({
  userLink: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: 10,
  },
  image: {
    height: 55,
    width: 55,
  },
  imageWrapper: {
    marginRight: 15,
    borderRadius: 9999,
    height: 60,
    width: 60,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    fontSize: 18,
    color: '#FFFFFF',
  },
  disclaimer: {
    fontSize: 14,
    color: '#FFFFFFb7',
  },
});
