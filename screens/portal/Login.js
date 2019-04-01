import React, { Component } from "react";
import PortalInput from "../../components/PortalInput";
import { View, Text, Image, TouchableOpacity, Linking } from "react-native";
import PortalButton from "../../components/PortalButton";
import PortalCard from "../../components/PortalCard";

export default class Login extends Component {
  updateEmail = text => {};
  tryLogin = () => {
    // whole lotta code
    this.props.navigation.navigate("Dashboard");
  };
  goToPolicy = () => {
    Linking.openURL("https://www.athares.us/policy");
  };
  render() {
    return (
      <View
        style={{
          flex: 1,
          width: "100%",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "transparent",
          alignItems: "center"
        }}
      >
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
          />
          <PortalInput
            icon="lock"
            placeholder="password"
            secureTextEntry
            onChangeText={this.updateEmail}
          />
          <PortalButton title="LOGIN" onPress={this.tryLogin} />
        </PortalCard>
        <TouchableOpacity
          style={{
            width: "100%",
            height: 15,
            alignItems: "center",
            marginBottom: 50
          }}
          onPress={() => this.props.navigation.navigate("Register")}
        >
          <Text style={{ color: "#FFF" }}>I need to register</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{ width: "90%", height: 15, alignItems: "center" }}
          onPress={() => this.props.navigation.navigate("Register")}
        >
          <Text style={{ color: "#FFF", alignItems: "center" }}>
            By logging in you acknowledge that you agree to the Terms of Use and
            have read the Privacy Policy.
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}
