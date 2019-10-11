import React, { useEffect, useState, useGlobal } from 'reactn';
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
  CREATE_USER,
  SIGNIN_USER,
  CREATE_USER_PREF,
} from '../../graphql/mutations';

import { sha, pair } from '../../utils/crypto';
import { validateRegister } from '../../utils/validators';
import { UIActivityIndicator } from 'react-native-indicators';
import { compose, graphql } from 'react-apollo';
import SimpleCrypto from 'simple-crypto-js';
import getEnvVars from '../../env';

const { DEFAULT_IMG } = getEnvVars();

function Register({ createUser, signinUser, createUserPref, ...props }) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [activeChannel, setActiveChannel] = useGlobal('activeChannel');
  const [activeCircle, setActiveCircle] = useGlobal('activeCircle');
  const [activeRevision, setActiveRevision] = useGlobal('activeRevision');
  const [user, setUser] = useGlobal('user');
  const [pub, setPub] = useGlobal('pub');

  useEffect(() => {
    setActiveChannel(null);
    setActiveCircle(null);
    setActiveRevision(null);
  }, []);

  const updateEmail = text => {
    setEmail(text.toLowerCase());
  };

  const goToPolicy = () => {
    Linking.openURL('https://www.athares.us/policy');
  };

  const tryRegister = async e => {
    e.preventDefault();
    setLoading(true);

    const isValid = validateRegister({
      firstName,
      lastName,
      password,
      email,
    });

    if (isValid !== undefined) {
      Alert.alert('Error', isValid[Object.keys(isValid)[0]][0]);
      setLoading(false);
      return false;
    }

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
      setUser(userId);
      setPub(hashedToken);

      props.navigation.navigate('Dashboard');
    } catch (err) {
      setLoading(false);
      console.error(err);
      if (err.message.indexOf('Field name = email') !== -1) {
        Alert.alert('Error', 'A user already exists with this email address.');
      } else {
        Alert.alert('Error', err.message);
      }
    }
  };

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
          color="#FFFFFF"
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
          icon="user"
          placeholder="First Name"
          onChangeText={setFirstName}
          value={firstName}
        />
        <PortalInput
          icon="user"
          placeholder="Last Name"
          onChangeText={setLastName}
          value={lastName}
        />
        <PortalInput
          icon="at-sign"
          placeholder="Email Address"
          onChangeText={updateEmail}
          value={email}
        />
        <PortalInput
          icon="lock"
          placeholder="Password"
          secureTextEntry
          onChangeText={setPassword}
          value={password}
        />
        <PortalButton title="REGISTER" onPress={tryRegister} />
      </PortalCard>
      <PortalToggle
        onPress={() => props.navigation.navigate('Login')}
        text={'I already have an account'}
      />

      <TouchableOpacity
        style={{
          width: '100%',
          paddingHorizontal: 15,
          alignItems: 'center',
        }}
        onPress={goToPolicy}
      >
        <Text
          style={{
            color: '#FFF',
            alignItems: 'center',
          }}
        >
          By registering you acknowledge that you agree to the Terms of Use and
          Privacy Policy.
        </Text>
      </TouchableOpacity>
    </PortalWrapper>
  );
}

export default compose(
  graphql(SIGNIN_USER, { name: 'signinUser' }),
  graphql(CREATE_USER, {
    name: 'createUser',
  }),
  graphql(CREATE_USER_PREF, { name: 'createUserPref' }),
)(Register);
