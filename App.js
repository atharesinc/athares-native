import React, { Component, Fragment } from 'react';
import { StyleSheet, View, ImageBackground, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-navigation';
import { AppLoading } from 'expo';
import * as Font from 'expo-font';
import { setCustomText, setCustomTextInput } from 'react-native-global-props';

// Faux multi-threading app monitoring
import RevisionMonitor from './components/RevisionMonitor';
import ChannelUpdateMonitor from './components/ChannelUpdateMonitor';
import DMUpdateMonitor from './components/DMUpdateMonitor';

// redux tomfoolery
import { Provider } from 'react-redux';
import { store } from './redux';
import AppContaner from './screens';

// apollo graphql
import { ApolloProvider } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { link, cache } from './graphql';

const client = new ApolloClient({
  link,
  cache,
});

export default class App extends Component {
  state = {
    fontsAreLoaded: false,
  };

  async componentDidMount() {
    await Font.loadAsync({
      SpaceGrotesk: require('./assets/SpaceGrotesk-SemiBold.otf'),
    });
    const customTextProps = {
      style: {
        fontFamily: 'SpaceGrotesk',
      },
    };
    setCustomText(customTextProps);
    setCustomTextInput(customTextProps);

    this.setState({ fontsAreLoaded: true });
  }
  render() {
    if (!this.state.fontsAreLoaded) {
      return <AppLoading />;
    }
    return (
      <Fragment>
        <StatusBar barStyle='light-content' />
        <ApolloProvider client={client}>
          <Provider store={store}>
            <SafeAreaView
              style={styles.container}
              forceInset={{
                top: 'always',
                bottom: 'always',
              }}
            >
              <ImageBackground
                source={require('./assets/iss-master.jpg')}
                style={styles.image}
              >
                <View style={styles.transparentView}>
                  <AppContaner style={styles.appContainer} />
                </View>
                {/* Fun Stuff! */}
                <RevisionMonitor />
                <ChannelUpdateMonitor />
                <DMUpdateMonitor />
              </ImageBackground>
            </SafeAreaView>
          </Provider>
        </ApolloProvider>
      </Fragment>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#282a38',
    justifyContent: 'space-between',
  },
  image: {
    flex: 1,
    height: '100%',
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
  },
  transparentView: {
    flex: 1,
    backgroundColor: 'transparent',
    width: '100%',
  },
  appContainer: {
    flex: 1,
    width: '100%',
    backgroundColor: 'transparent',
  },
});
