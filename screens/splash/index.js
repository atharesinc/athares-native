import React, { useEffect, useGlobal } from 'reactn';
import { AsyncStorage, Image, View } from 'react-native';
import { SIGNIN_USER } from '../../graphql/mutations';
import { graphql } from 'react-apollo';
import { sha } from '../../utils/crypto';
import { UIActivityIndicator } from 'react-native-indicators';
import FadeInView from '../../components/FadeInView';

export const SplashScreen = props => {
  const [activeChannel, setActiveChannel] = useGlobal('activeChannel');
  const [activeCircle, setActiveCircle] = useGlobal('activeCircle');
  const [activeRevision, setActiveRevision] = useGlobal('activeRevision');
  const [user, setUser] = useGlobal('user');
  const [pub, setPub] = useGlobal('pub');
  const [activeAmendment, setActiveAmendment] = useGlobal('activeAmendment');
  const [channels, setChannels] = useGlobal('channels');
  const [unreadChannels, setUnreadChannels] = useGlobal('unreadChannels');
  const [dms, setDMs] = useGlobal('dms');
  const [unreadDMs, setUnreadDMs] = useGlobal('unreadDMs');

  // const [appInitialized, setAppInitialized] = useGlobal('appInitialized');
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
        // there was some sort of error auto-logging in, clear localStorage and redux just in case
        logout();
        props.navigation.navigate('Login');
      }
    } else {
      props.navigation.navigate('Login');
    }
  };

  useEffect(() => {
    init();
  }, []);

  const logout = () => {
    setActiveChannel(null);
    setActiveCircle(null);
    setActiveRevision(null);
    setUser(null), setPub(null);
    setActiveAmendment(null);
    setChannels([]);
    setUnreadChannels([]);
    setDMs([]);
    setUnreadDMs([]);
  };

  return (
    <FadeInView
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
      }}
    >
      <Image
        source={require('../../assets/splash-big.png')}
        style={{
          resizeMode: 'contain',
          backgroundColor: '#282a38',
          flex: 1,
          opacity: 0.6,
        }}
      />
    </FadeInView>
  );
};

export default graphql(SIGNIN_USER, {
  name: 'signinUser',
})(SplashScreen);
