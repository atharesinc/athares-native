import React, { Component } from "react";
import PortalInput from "../../components/PortalInput";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Linking,
  Alert,
  AsyncStorage
} from "react-native";
import PortalButton from "../../components/PortalButton";
import PortalCard from "../../components/PortalCard";
import PortalWrapper from "../../components/PortalWrapper";
import PortalToggle from "../../components/PortalToggle";
import {
  updateUser,
  updatePub,
  updateChannel,
  updateCircle,
  updateRevision,
  logout
} from "../../redux/state/actions";

import { validateLogin } from "../../utils/validators";
import { pull } from "../../redux/state/reducers";
import { connect } from "react-redux";
import { SIGNIN_USER } from "../../graphql/mutations";
import { graphql } from "react-apollo";
import { sha } from "../../utils/crypto";
import { UIActivityIndicator } from "react-native-indicators";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      password: "",
      email: "",
      loading: false
    };
  }
  async componentDidMount() {
    this.props.dispatch(updateChannel(null));
    this.props.dispatch(updateCircle(null));
    this.props.dispatch(updateRevision(null));
    // check if user could log in
    let alias = await AsyncStorage.getItem("ATHARES_ALIAS");
    let hash = await AsyncStorage.getItem("ATHARES_HASH");
    if (!this.props.user && alias && hash) {
      // indicate that the user is logging in and syncing

      try {
        const res = await this.props.signinUser({
          variables: {
            email: alias,
            password: hash
          }
        });

        const {
          data: {
            signinUser: { token, userId }
          }
        } = res;
        this.props.dispatch(updateUser(userId));
        this.props.dispatch(updatePub(hash));
        AsyncStorage.setItem("ATHARES_TOKEN", token);
        this.props.navigation.navigate("Dashboard");
      } catch (err) {
        console.error(new Error(err));
        // there was some sort of error auto-logging in, clear localStorage and redux just in case
        this.props.dispatch(logout());
      }
    }
  }
  updateEmail = text => {
    this.setState({
      email: text.toLowerCase()
    });
  };
  updatePassword = text => {
    this.setState({
      password: text
    });
  };
  goToPolicy = () => {
    Linking.openURL("https://www.athares.us/policy");
  };
  tryLogin = async e => {
    e.preventDefault();
    await this.setState({ loading: true });
    const isValid = validateLogin({ ...this.state });

    if (isValid !== undefined) {
      Alert.alert("Error", isValid[Object.keys(isValid)[0]][0]);
      this.setState({ loading: false });
      return false;
    }
    const { signinUser } = this.props;
    let { password, email } = this.state;
    try {
      let hashedToken = sha(password);

      const res = await signinUser({
        variables: {
          email,
          password: hashedToken
        }
      });

      const {
        data: {
          signinUser: { token, userId }
        }
      } = res;

      //store in redux
      await AsyncStorage.setItem("ATHARES_ALIAS", email);
      await AsyncStorage.setItem("ATHARES_HASH", hashedToken);
      await AsyncStorage.setItem("ATHARES_TOKEN", token);

      this.props.dispatch(updateUser(userId));
      this.props.dispatch(updatePub(hashedToken));
      this.props.navigation.navigate("Dashboard");
    } catch (err) {
      if (err.message.indexOf("Invalid Credentials") !== -1) {
        Alert.alert("Error", "Invalid Credentials");
      } else {
        Alert.alert("Error", err.message);
      }
      await this.setState({ loading: false });
    }
  };
  render() {
    const { loading, email, password } = this.state;
    if (loading) {
      return (
        <View
          style={{
            flex: 1,
            width: "100%",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "transparent",
            alignItems: "center",
            backgroundColor: "transparent"
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
            source={require("../../assets/Athares-owl-logo-large-white-thin.png")}
          />
          <Image
            style={{ height: 20, width: 120, marginBottom: 25 }}
            source={require("../../assets/Athares-type-small-white.png")}
          />
          <Text
            style={{
              marginBottom: 25,
              color: "#FFFFFF"
            }}
          >
            Login to Athares
          </Text>
          <PortalInput
            icon="at-sign"
            placeholder="email"
            onChangeText={this.updateEmail}
            value={email}
          />
          <PortalInput
            icon="lock"
            placeholder="password"
            secureTextEntry
            onChangeText={this.updatePassword}
            value={password}
          />
          <PortalButton title="LOGIN" onPress={this.tryLogin} />
        </PortalCard>
        <PortalToggle
          onPress={() => this.props.navigation.navigate("Register")}
          text={"I need to register"}
        />
        <TouchableOpacity
          style={{ width: "100%", paddingHorizontal: 15, alignItems: "center" }}
          onPress={() => this.props.navigation.navigate("Register")}
        >
          <Text style={{ color: "#FFF", alignItems: "center" }}>
            By logging in you acknowledge that you agree to the Terms of Use and
            Privacy Policy.
          </Text>
        </TouchableOpacity>
      </PortalWrapper>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: pull(state, "user")
  };
}
export default graphql(SIGNIN_USER, {
  name: "signinUser"
})(connect(mapStateToProps)(Login));
