import React, { Component } from "react";
import { StyleSheet, View, ImageBackground } from "react-native";
import { SafeAreaView } from "react-navigation";
import { Font, AppLoading } from "expo";
import { setCustomText, setCustomTextInput } from "react-native-global-props";

// redux tomfoolery
import { Provider } from "react-redux";
import { store } from "./redux";
import AppContaner from "./screens";

export default class App extends Component {
  state = {
    fontsAreLoaded: false
  };

  async componentDidMount() {
    await Font.loadAsync({
      SpaceGrotesk: require("./assets/SpaceGrotesk-SemiBold.otf")
    });
    const customTextProps = {
      style: {
        fontFamily: "SpaceGrotesk"
      }
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
      <Provider store={store}>
        <SafeAreaView
          style={styles.container}
          forceInset={{
            top: "always",
            bottom: "always"
          }}
        >
          <ImageBackground
            source={require("./assets/iss-master.jpg")}
            style={styles.image}
          >
            <View style={styles.transparentView}>
              <AppContaner style={styles.appContainer} />
            </View>
          </ImageBackground>
        </SafeAreaView>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#282a38",
    justifyContent: "space-between"
  },
  image: {
    flex: 1,
    height: "100%",
    backgroundColor: "transparent",
    justifyContent: "center",
    alignItems: "center"
  },
  transparentView: {
    flex: 1,
    backgroundColor: "transparent",
    width: "100%"
  },
  appContainer: {
    flex: 1,
    width: "100%",
    backgroundColor: "transparent"
  }
});
