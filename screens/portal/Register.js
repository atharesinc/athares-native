import React, { Component } from 'react';
import PortalInput from '../../components/PortalInput';
import PortalButton from '../../components/PortalButton';
import PortalCard from '../../components/PortalCard';
import PortalWrapper from '../../components/PortalWrapper';
import PortalToggle from '../../components/PortalToggle';

import {
  TouchableOpacity,
  Linking,
  Image,
  Text,
  View,
  AsyncStorage,
  Alert,
} from 'react-native';
import {
  updateUser,
  updatePub,
  updateChannel,
  updateCircle,
  updateRevision,
} from '../../redux/state/actions';
import {
  CREATE_USER,
  SIGNIN_USER,
  CREATE_USER_PREF,
} from '../../graphql/mutations';
import { pull } from '../../redux/state/reducers';
import { connect } from 'react-redux';
import { sha, pair } from '../../utils/crypto';
import { validateRegister } from '../../utils/validators';
import { UIActivityIndicator } from 'react-native-indicators';
import { compose, graphql } from 'react-apollo';
import SimpleCrypto from 'simple-crypto-js';
import getEnvVars from '../../env';

const { DEFAULT_IMG } = getEnvVars();

class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {
      firstName: '',
      lastName: '',
      password: '',
      email: '',
      loading: false,
    };
  }
  componentDidMount() {
    this.props.dispatch(updateChannel(null));
    this.props.dispatch(updateCircle(null));
    this.props.dispatch(updateRevision(null));
  }
  updateFirstName = text => {
    this.setState({
      firstName: text,
    });
  };
  updateLastName = text => {
    this.setState({
      lastName: text,
    });
  };
  updateEmail = text => {
    this.setState({
      email: text.toLowerCase(),
    });
  };
  updatePassword = text => {
    this.setState({
      password: text,
    });
  };
  goToPolicy = () => {
    Linking.openURL('https://www.athares.us/policy');
  };
  tryRegister = async e => {
    e.preventDefault();
    await this.setState({ loading: true });

    const isValid = validateRegister({
      ...this.state,
    });

    if (isValid !== undefined) {
      Alert.alert('Error', isValid[Object.keys(isValid)[0]][0]);
      await this.setState({ loading: false });
      return false;
    }

    let { createUser, signinUser, createUserPref } = this.props;
    let { firstName, lastName, password, email } = this.state;

    let hashedToken = sha(password);
    try {
      // Encrypt the user's private key in the database with the hashed password
      let simpleCrypto = new SimpleCrypto(hashedToken);
      let keys = await pair();
      await createUser({
        variables: {
          firstName,
          lastName,
          email,
          icon: DEFAULT_IMG,
          password: hashedToken,
          pub: keys.pub,
          priv: simpleCrypto.encrypt(keys.priv),
        },
      });

      const res = await signinUser({
        variables: {
          email,
          password: hashedToken,
        },
      });

      const {
        data: {
          signinUser: { token, userId },
        },
      } = res;

      await createUserPref({
        variables: {
          id: userId,
        },
      });
      //store in redux
      await AsyncStorage.setItem('ATHARES_ALIAS', email);
      await AsyncStorage.setItem('ATHARES_HASH', hashedToken);
      await AsyncStorage.setItem('ATHARES_TOKEN', token);
      this.props.dispatch(updateUser(userId));
      this.props.dispatch(updatePub(hashedToken));

      this.props.navigation.navigate('Dashboard');
    } catch (err) {
      await this.setState({ loading: false });
      console.error(err);
      if (err.message.indexOf('Field name = email') !== -1) {
        Alert.alert('Error', 'A user already exists with this email address.');
      } else {
        Alert.alert('Error', err.message);
      }
    }
  };
  render() {
    const { loading, email, firstName, lastName, password } = this.state;
    if (loading) {
      return (
        <View
          style={{
            flex: 1,
            width: '100%',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'transparent',
            alignItems: 'center',
            backgroundColor: 'transparent',
          }}
        >
          <UIActivityIndicator
            color='#FFFFFF'
            style={{ flex: 1, marginBottom: 15 }}
          />
          <Text>Building Profile...</Text>
        </View>
      );
    }
    return (
      <PortalWrapper>
        <PortalCard>
          <Image
            style={{
              height: 60,
              width: 60,
              marginBottom: 10,
            }}
            source={require('../../assets/Athares-owl-logo-large-white-thin.png')}
          />
          <Image
            style={{
              height: 20,
              width: 120,
              marginBottom: 25,
            }}
            source={require('../../assets/Athares-type-small-white.png')}
          />
          <Text
            style={{
              marginBottom: 25,
              color: '#FFFFFF',
            }}
          >
            Register with Athares
          </Text>
          <PortalInput
            icon='user'
            placeholder='First Name'
            onChangeText={this.updateFirstName}
            value={firstName}
          />
          <PortalInput
            icon='user'
            placeholder='Last Name'
            onChangeText={this.updateLastName}
            value={lastName}
          />
          <PortalInput
            icon='at-sign'
            placeholder='Email Address'
            onChangeText={this.updateEmail}
            value={email}
          />
          <PortalInput
            icon='lock'
            placeholder='Password'
            secureTextEntry
            onChangeText={this.updatePassword}
            value={password}
          />
          <PortalButton title='REGISTER' onPress={this.tryRegister} />
        </PortalCard>
        <PortalToggle
          onPress={() => this.props.navigation.navigate('Login')}
          text={'I already have an account'}
        />

        <TouchableOpacity
          style={{
            width: '100%',
            paddingHorizontal: 15,
            alignItems: 'center',
          }}
          onPress={() => this.props.navigation.navigate('Register')}
        >
          <Text
            style={{
              color: '#FFF',
              alignItems: 'center',
            }}
          >
            By registering you acknowledge that you agree to the Terms of Use
            and Privacy Policy.
          </Text>
        </TouchableOpacity>
      </PortalWrapper>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: pull(state, 'user'),
  };
}

export default compose(
  graphql(SIGNIN_USER, { name: 'signinUser' }),
  graphql(CREATE_USER, {
    name: 'createUser',
  }),
  graphql(CREATE_USER_PREF, { name: 'createUserPref' }),
)(connect(mapStateToProps)(Register));
