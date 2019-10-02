import React, { Component } from 'react';
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
import { updateChannel } from '../../../redux/state/actions';

import { connect } from 'react-redux';
import { pull } from '../../../redux/state/reducers';

class CreateChannel extends Component {
  state = {
    name: '',
    description: '',
    loading: false,
  };

  updateName = text => {
    this.setState({
      name: text,
    });
  };
  updateDesc = text => {
    this.setState({
      description: text,
    });
  };
  submit = async e => {
    await this.setState({
      loading: true,
    });

    if (this.state.name.trim().length === 0) {
      return false;
    }
    const { name, description } = this.state;
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
      let newChannelRes = await this.props.createChannel({
        variables: {
          ...newChannel,
        },
      });

      newChannel.id = newChannelRes.data.createChannel.id;

      let res = await this.props.addChannelToCircle({
        variables: {
          circle: this.props.activeCircle,
          channel: newChannel.id,
        },
      });

      let { name } = res.data.addToCircleOnChannels.circleCircle;

      Alert.alert(
        'Channel Created',
        `${this.state.name} has been created in ${name}.`,
      );
      this.props.dispatch(updateChannel(newChannel.id));

      this.props.navigation.navigate('Channel');
    } catch (err) {
      console.error(new Error(err));
    }
  };
  render() {
    const { name, description } = this.state;
    let circle = null;
    return (
      <Query
        query={GET_CIRCLE_NAME_BY_ID}
        variables={{ id: this.props.activeCircle || '' }}
      >
        {({ loading, data }) => {
          if (data) {
            circle = data.Circle;
          }
          if (loading || this.state.loading) {
            return (
              <ScreenWrapper styles={[styles.wrapper]}>
                <UIActivityIndicator color={'#FFFFFF'} />
              </ScreenWrapper>
            );
          }
          return (
            <ScreenWrapper styles={[styles.wrapper]}>
              <ScrollView styles={[styles.wrapper]}>
                <KeyboardAvoidingView behavior='padding'>
                  <Text style={styles.header}>
                    CREATE A NEW CHANNEL WITHIN {circle.name}.
                  </Text>
                  <Input
                    placeholder={'Channel Name'}
                    label={'Channel Name'}
                    onChangeText={this.updateName}
                    value={name}
                    placeholderTextColor={'#FFFFFFb7'}
                  />
                  <Input
                    value={description}
                    onChangeText={this.updateDesc}
                    label={'Description'}
                    description={'Describe this channel'}
                    multiline={true}
                    placeholderTextColor={'#FFFFFFb7'}
                  />
                  <Text style={styles.disclaimer}>
                    By pressing "Create Channel" you will create a new channel
                    within {circle.name}.
                  </Text>
                  <PortalButton title='Create Channel' onPress={this.submit} />
                </KeyboardAvoidingView>
              </ScrollView>
            </ScreenWrapper>
          );
        }}
      </Query>
    );
  }
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

function mapStateToProps(state) {
  return {
    user: pull(state, 'user'),
    activeCircle: pull(state, 'activeCircle'),
    circles: pull(state, 'circles'),
  };
}

export default compose(
  graphql(CREATE_CHANNEL, { name: 'createChannel' }),
  graphql(ADD_CHANNEL_TO_CIRCLE, { name: 'addChannelToCircle' }),
)(connect(mapStateToProps)(CreateChannel));
