import React, { useEffect, useState, useGlobal } from 'reactn';
import PortalInput from '../../components/PortalInput';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Linking,
  Alert,
  AsyncStorage,
} from 'react-native';
import PortalButton from '../../components/PortalButton';
import PortalCard from '../../components/PortalCard';
import PortalWrapper from '../../components/PortalWrapper';
import PortalToggle from '../../components/PortalToggle';

import { validateLogin } from '../../utils/validators';

import { SIGNIN_USER } from '../../graphql/mutations';
import { graphql } from 'react-apollo';
import { sha } from '../../utils/crypto';
import { UIActivityIndicator } from 'react-native-indicators';

function Login(props) {
  const [activeChannel, setActiveChannel] = useGlobal('activeChannel');
  const [activeCircle, setActiveCircle] = useGlobal('activeCircle');
  const [activeRevision, setActiveRevision] = useGlobal('activeRevision');
  const [user, setUser] = useGlobal('user');
  const [pub, setPub] = useGlobal('pub');

  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const init = async () => {
    setActiveChannel(null);
    setActiveCircle(null);
    setActiveRevision(null);
    // check if user could log in
    let alias = await AsyncStorage.getItem('ATHARES_ALIAS');
    let hash = await AsyncStorage.getItem('ATHARES_HASH');
    if (!props.user && alias && hash) {
      // indicate that the user is logging in and syncing

      try {
        const res = await props.signinUser({
          variables: {
            email: alias,
            password: hash,
          },
        });

        const {
          data: {
            signinUser: { token, userId },
          },
        } = res;
        setUser(userId);
        setPub(hash);
        AsyncStorage.setItem('ATHARES_TOKEN', token);
        props.navigation.navigate('Dashboard');
      } catch (err) {
        console.error(new Error(err));
        // there was some sort of error auto-logging in, clear localStorage just in case
        AsyncStorage.multiRemove([
          'ATHARES_ALIAS',
          'ATHARES_HASH',
          'ATHARES_TOKEN',
        ]);
        setActiveChannel(null);
        setActiveCircle(null);
        setActiveRevision(null);
        setUser(null);
      }
    }
  };

  useEffect(() => {
    init();
  }, []);

  updateEmail = text => {
    setEmail(text.toLowerCase());
  };
  updatePassword = text => {
    setPassword(text);
  };
  const goToPolicy = () => {
    Linking.openURL('https://www.athares.us/policy');
  };
  const tryLogin = async e => {
    e.preventDefault();
    await setLoading(true);
    const isValid = validateLogin({ password, email });

    if (isValid !== undefined) {
      Alert.alert('Error', isValid[Object.keys(isValid)[0]][0]);
      setLoading(false);
      return false;
    }
    const { signinUser } = props;
    try {
      let hashedToken = sha(password);

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

      await AsyncStorage.setItem('ATHARES_ALIAS', email);
      await AsyncStorage.setItem('ATHARES_HASH', hashedToken);
      await AsyncStorage.setItem('ATHARES_TOKEN', token);

      setUser(userId);
      setPub(hashedToken);
      props.navigation.navigate('Dashboard');
    } catch (err) {
      if (err.message.indexOf('Invalid Credentials') !== -1) {
        Alert.alert('Error', 'Invalid Credentials');
      } else {
        Alert.alert('Error', err.message);
      }
      await setLoading(false);
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
        <UIActivityIndicator color="#FFFFFF" />
      </View>
    );
  }
  return (
    <PortalWrapper>
      <PortalCard>
        <Image
          style={{ height: 60, width: 60, marginBottom: 10 }}
          source={require('../../assets/Athares-owl-logo-large-white-thin.png')}
        />
        <Image
          style={{ height: 20, width: 120, marginBottom: 25 }}
          source={require('../../assets/Athares-type-small-white.png')}
        />
        <Text
          style={{
            marginBottom: 25,
            color: '#FFFFFF',
          }}
        >
          Login to Athares
        </Text>
        <PortalInput
          icon="at-sign"
          placeholder="email"
          onChangeText={updateEmail}
          value={email}
        />
        <PortalInput
          icon="lock"
          placeholder="password"
          secureTextEntry
          onChangeText={updatePassword}
          value={password}
        />
        <PortalButton title="LOGIN" onPress={tryLogin} />
      </PortalCard>
      <PortalToggle
        onPress={() => props.navigation.navigate('Register')}
        text={'I need to register'}
      />
      <TouchableOpacity
        style={{ width: '100%', paddingHorizontal: 15, alignItems: 'center' }}
        onPress={() => props.navigation.navigate('Register')}
      >
        <Text style={{ color: '#FFF', alignItems: 'center' }}>
          By logging in you acknowledge that you agree to the Terms of Use and
          Privacy Policy.
        </Text>
      </TouchableOpacity>
    </PortalWrapper>
  );
}

export default graphql(SIGNIN_USER, {
  name: 'signinUser',
})(Login);
