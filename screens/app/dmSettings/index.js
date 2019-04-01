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
      <View>
        <ScrollView>
          <View>
            <View>
              <Text onPress={this.navigateToScreen("About")}>Add Users</Text>
            </View>
          </View>
          <View>
            <View>
              <Text onPress={this.navigateToScreen("Me")}>Leave</Text>
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}

export default SideMenu;
