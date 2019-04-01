import React, { Component } from "react";
import { NavigationActions } from "react-navigation";
import { ScrollView, Text, View } from "react-native";

class SideMenu extends Component {
  navigateToScreen = route => () => {
    const navigateAction = NavigationActions.navigate({
      routeName: route
    });
    this.props.navigation.dispatch(navigateAction);
  };

  render() {
    return (
      <View style={{ backgroundColor: "#333333", flex: 1 }}>
        <ScrollView>
          <View>
            <View>
              <Text onPress={this.navigateToScreen("Me")}>Me</Text>
            </View>
          </View>
          <View>
            <View>
              <Text onPress={this.navigateToScreen("About")}>About</Text>
            </View>
          </View>
          <View>
            <View>
              <Text onPress={this.navigateToScreen("Policy")}>Policy</Text>
            </View>
          </View>
          <View>
            <View>
              <Text onPress={this.navigateToScreen("Logout")}>Logout</Text>
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}

export default SideMenu;
