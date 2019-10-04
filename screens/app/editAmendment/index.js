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

import { updateRevision } from '../../../redux/state/actions';
import { connect } from 'react-redux';
import { pull } from '../../../redux/state/reducers';
import { compose, graphql } from 'react-apollo';
import {
  CREATE_REVISION,
  CREATE_VOTE,
  ADD_REVISION_TO_AMENDMENT,
} from '../../../graphql/mutations';
import { GET_AMENDMENT_BY_ID } from '../../../graphql/queries';
import { sha } from '../../../utils/crypto';

class EditAmendment extends Component {
  state = {
    text: '',
  };
  componentDidMount() {
    if (this.props.data.Amendment) {
      this.setState({
        text: this.props.data.Amendment.text,
      });
    }
  }
  componentDidUpdate(prevProps) {
    if (prevProps.data.Amendment !== this.props.data.Amendment) {
      this.setState({
        text: this.props.data.Amendment.text,
      });
    }
  }
  updateText = text => {
    this.setState({
      text,
    });
  };
  confirmRepeal = () => {
    Alert.alert(
      'Confirm Repeal?',
      "Are you sure you'd like to repeal this amendment?\n\nBy starting the repeal process, you will create a revision with the intention of permanently deleting this amendment.",
      [
        {
          text: 'Yes, Repeal',
          onPress: () => this.repeal(),
        },
        { text: 'Cancel', onPress: () => {}, style: 'cancel' },
      ],
      { cancelable: true },
    );
  };
  repeal = () => {
    try {
      const { activeCircle, circle, user } = this.props;
      const { title, text, id } = this.props.data.Amendment;

      let numUsers = circle.users.length;
      let newRevision = {
        circle: activeCircle,
        user: user,
        title,
        oldText: null,
        newText: text,
        expires: moment()
          .add(Math.max(this.customSigm(numUsers), 61), 's')
          .format(),
        voterThreshold: Math.round(numUsers * this.ratifiedThreshold(numUsers)),
        amendment: id,
        repeal: true,
      };
      this.createRevision(newRevision);
    } catch (err) {
      console.error(new Error(err));
      swal('Error', 'There was an error in the repeal process', 'error');
    }
  };
  customSigm = x => {
    return 604800 / (1 + Math.pow(Math.E, -1 * (x - 10))) / 2;
  };
  // a minimum number of users in a circle must have voted on a revision to ratify it
  // this prevents someone from sneaking in a revision where only one person votes to support and no one rejects it
  ratifiedThreshold = n => {
    return 0.4 / (1 + Math.pow(Math.E, -1 * n * 0.2));
  };
  submit = async () => {
    // reject if there's been no changes
    if (this.props.data.Amendment.text.trim() === this.state.text) {
      return;
    }

    const { activeCircle, circle, user } = this.props;
    const { title, text, id } = this.props.data.Amendment;

    let numUsers = circle.users.length;
    let newRevision = {
      circle: activeCircle,
      user: user,
      title,
      oldText: text,
      newText: this.state.text.trim(),
      expires: moment()
        .add(Math.max(this.customSigm(numUsers), 61), 's')
        .format(),
      voterThreshold: Math.round(numUsers * this.ratifiedThreshold(numUsers)),
      amendment: id,
      repeal: false,
    };
    this.createRevision(newRevision);
  };
  createRevision = async newRevision => {
    try {
      let hash = sha(
        JSON.stringify({
          title: newRevision.title,
          text: newRevision.newText,
          circle: newRevision.circle,
          expires: newRevision.expires,
          voterThreshold: newRevision.voterThreshold,
        }),
      );

      let newRevisionRes = await this.props.createRevision({
        variables: {
          ...newRevision,
          hash,
        },
      });

      await this.props.addNewRevisionToAmendment({
        variables: {
          revision: newRevisionRes.data.createRevision.id,
          amendment: this.props.activeAmendment,
          title: newRevision.title,
        },
      });
      newRevision.id = newRevisionRes.data.createRevision.id;

      const newVote = {
        circle: this.props.activeCircle,
        revision: newRevision.id,
        user: this.props.user,
        support: true,
      };

      await this.props.createVote({
        variables: {
          ...newVote,
        },
      });

      this.props.dispatch(updateRevision(newRevision.id));

      this.props.navigation.navigate('ViewRevision');
    } catch (err) {
      if (
        !err.message.includes('unique constraint would be violated') ||
        !err.message.includes('hash')
      ) {
        console.error(err);
        Alert.alert('Error', err.message);
      }
    }
  };
  render() {
    const { text = '' } = this.state;

    return (
      <ScreenWrapper styles={[styles.wrapper]}>
        <ScrollView styles={[styles.wrapper]}>
          <KeyboardAvoidingView behavior='padding'>
            <Text style={styles.header}>EDIT OR REPEAL THIS AMENDMENT</Text>
            <Input
              value={text}
              onChangeText={this.updateText}
              label={'Amendment Text'}
              description={
                "Here you can make changes to the existing amendment. If you'd instead like to remove the amendment altogether, select 'Repeal Amendment'."
              }
              multiline={true}
            />
            <Text style={styles.disclaimer}>
              Pressing "Update Amendment" will create a revision for this
              amendment. If the revision gains the minimum number of votes to be
              ratified and the majority of voters support these changes, then
              the existing Amendment will be replaced with these changes.
            </Text>
            <PortalButton title='Update Amendment' onPress={this.submit} />
            <PortalButton
              title='Repeal Amendment'
              style={styles.repealButton}
              onPress={this.repeal}
              textStyle={styles.repealText}
            />
          </KeyboardAvoidingView>
        </ScrollView>
      </ScreenWrapper>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: pull(state, 'user'),
    activeCircle: pull(state, 'activeCircle'),
    activeAmendment: pull(state, 'activeAmendment'),
  };
}
export default connect(mapStateToProps)(
  compose(
    graphql(CREATE_REVISION, { name: 'createRevision' }),
    graphql(CREATE_VOTE, { name: 'createVote' }),
    graphql(ADD_REVISION_TO_AMENDMENT, { name: 'addNewRevisionToAmendment' }),
    graphql(GET_AMENDMENT_BY_ID, {
      options: ({ activeAmendment }) => ({
        variables: { id: activeAmendment || '' },
      }),
    }),
  )(EditAmendment),
);

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
  repealButton: {
    marginTop: 20,
    borderColor: '#ff725c',
    borderWidth: 2,
    backgroundColor: '#282a38',
  },
  repealText: {
    color: '#ff725c',
  },
});
