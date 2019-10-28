import React, { useState, useGlobal } from 'reactn';
import ScreenWrapper from '../../../components/ScreenWrapper';
import Input from '../../../components/Input';

import {
  Text,
  ScrollView,
  StyleSheet,
  KeyboardAvoidingView,
  Alert,
} from 'react-native';
import PortalButton from '../../../components/PortalButton';
import { UIActivityIndicator } from 'react-native-indicators';
import {
  CREATE_CHANNEL,
  ADD_CHANNEL_TO_CIRCLE,
} from '../../../graphql/mutations';
import { GET_CIRCLE_NAME_BY_ID } from '../../../graphql/queries';
import { compose, graphql, Query } from 'react-apollo';

function CreateChannel(props) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [loadingOther, setLoadingOther] = useState(false);
  const [activeChannel, setActiveChannel] = useGlobal('activeChannel');

  submit = async e => {
    setLoadingOther(true);

    if (name.trim().length === 0) {
      return false;
    }
    // /* Check if doesn't exist */

    // validate & trim fields
    // TODO: ???
    /* create channel */
    let newChannel = {
      name,
      description,
      channelType: 'group',
    };

    try {
      let newChannelRes = await props.createChannel({
        variables: {
          ...newChannel,
        },
      });

      newChannel.id = newChannelRes.data.createChannel.id;

      let res = await props.addChannelToCircle({
        variables: {
          circle: props.activeCircle,
          channel: newChannel.id,
        },
      });

      let { name } = res.data.addToCircleOnChannels.circleCircle;

      Alert.alert('Channel Created', `${name} has been created in ${name}.`);
      setActiveChannel(newChannel.id);

      props.navigation.navigate('Channel');
    } catch (err) {
      console.error(new Error(err));
    }
  };

  let circle = null;
  return (
    <Query
      query={GET_CIRCLE_NAME_BY_ID}
      variables={{ id: props.activeCircle || '' }}
    >
      {({ loading, data }) => {
        if (loading || loadingOther) {
          return (
            <ScreenWrapper styles={[styles.wrapper]}>
              <UIActivityIndicator color={'#FFFFFF'} />
            </ScreenWrapper>
          );
        }
        if (data) {
          circle = data.Circle;
        }
        return (
          <ScreenWrapper styles={[styles.wrapper]}>
            <ScrollView styles={[styles.wrapper]}>
              <KeyboardAvoidingView behavior="padding">
                <Text style={styles.header}>
                  CREATE A NEW CHANNEL WITHIN {circle.name}.
                </Text>
                <Input
                  placeholder={'Channel Name'}
                  label={'Channel Name'}
                  onChangeText={setName}
                  value={name}
                  placeholderTextColor={'#FFFFFFb7'}
                />
                <Input
                  value={description}
                  onChangeText={setDescription}
                  label={'Description'}
                  description={'Describe this channel'}
                  multiline={true}
                  placeholderTextColor={'#FFFFFFb7'}
                />
                <Text style={styles.disclaimer}>
                  By pressing "Create Channel" you will create a new channel
                  within {circle.name}.
                </Text>
                <PortalButton title="Create Channel" onPress={submit} />
              </KeyboardAvoidingView>
            </ScrollView>
          </ScreenWrapper>
        );
      }}
    </Query>
  );
}

const styles = StyleSheet.create({
  header: {
    textTransform: 'uppercase',
    letterSpacing: 2,
    fontSize: 13,
    color: '#FFFFFFb7',
    marginBottom: 25,
  },
  wrapper: {
    alignItems: 'stretch',
    justifyContent: 'flex-start',
    width: '100%',
    flex: 1,
    padding: 13,
  },
  disclaimer: {
    fontSize: 15,
    color: '#FFFFFFb7',
    marginBottom: 20,
  },
  label: {
    fontSize: 18,
    marginBottom: 10,
    color: '#FFF',
  },
});

export default compose(
  graphql(CREATE_CHANNEL, { name: 'createChannel' }),
  graphql(ADD_CHANNEL_TO_CIRCLE, { name: 'addChannelToCircle' }),
)(CreateChannel);
