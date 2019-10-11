import React, { useState } from 'reactn';
import LinkText from '../../../components/LinkText';

import { Text, View, StyleSheet, Alert } from 'react-native';
import PortalButton from '../../../components/PortalButton';

import { CREATE_INVITE } from '../../../graphql/mutations';
import { GET_CIRCLE_NAME_BY_ID } from '../../../graphql/queries';
import { graphql, Query } from 'react-apollo';

import { UIActivityIndicator } from 'react-native-indicators';

function ShareCircle({ user, activeCircle, ...props }) {
  const [loadingOther, setloadingOther] = useState(false);
  const [showLink, setShowLink] = useState(false);
  const [link, setLink] = useState('');

  const generateLink = async () => {
    setloadingOther(true);
    setLink(null);

    try {
      let link = await props.createInvite({
        variables: {
          inviter: user,
          circle: activeCircle,
        },
      });

      let { id } = link.data.createInvite;

      setLink('https://www.athares.us/invite/' + id);
      setShowLink(true);
      setloadingOther(false);
    } catch (err) {
      console.error(new Error(err));
      setloadingOther(false);
      Alert.alert('Error', 'Unable to generate invite link.');
    }
  };

  return (
    <Query query={GET_CIRCLE_NAME_BY_ID} variables={{ id: activeCircle }}>
      {({ loading, data }) => {
        if (loading) {
          return (
            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
              <UIActivityIndicator color="#FFFFFF" />
            </View>
          );
        }
        let circle = null;
        if (data.Circle) {
          circle = data.Circle;
        }
        return (
          <View style={styles.section}>
            <Text style={styles.sectionHeading}>Share Circle</Text>
            <Text style={styles.disclaimer}>
              Invite someone to {circle.name} with a single-use link.
              Prospective users will have the option to sign up if they don't
              have an Athares account.
            </Text>
            {loadingOther ? (
              <UIActivityIndicator color="#FFFFFF" />
            ) : (
              <PortalButton
                title={'Generate Link'}
                onPress={generateLink}
                style={{ marginBottom: 15 }}
              />
            )}
            {showLink && <LinkText text={link} />}
          </View>
        );
      }}
    </Query>
  );
}

const styles = StyleSheet.create({
  section: {
    marginTop: 20,
    marginHorizontal: 15,
    marginBottom: 10,
    borderBottomWidth: 1,
    borderColor: '#FFFFFF',
    paddingBottom: 20,
  },
  sectionHeading: {
    fontSize: 20,
    color: '#FFFFFF',
    marginBottom: 10,
  },
  disclaimer: {
    fontSize: 15,
    color: '#FFFFFFb7',
    marginBottom: 20,
  },
});

export default graphql(CREATE_INVITE, {
  name: 'createInvite',
})(ShareCircle);
