import React, { Component } from "react";

import { StyleSheet, ScrollView, Text, View } from "react-native";
import { createDrawerNavigator } from "react-navigation";
import Menu from "../menu";
import Icon from "@expo/vector-icons/Feather";
import Footer from "../../../components/Footer";

import Circles from "../../../components/Circles";
import ChannelItem from "../../../components/ChannelItem";
import ChannelGroupHeader from "../../../components/ChannelGroupHeader";

class DashboardWithoutDrawer extends Component {
  state = {
    showSearch: false
  };

  render() {
    return (
      <View
        style={{
          flex: 1,
          alignItems: "stretch",
          justifyContent: "space-between",
          width: "100%"
        }}
      >
        <Circles />
        <View style={{ backgroundColor: "#282a38", height: "75%" }}>
          <ScrollView>
            <ChannelGroupHeader title={"GOVERNANCE"} />
            <ChannelItem />
            <ChannelGroupHeader title={"CHANNELS"} displayPlus={true} />
            <ChannelItem showUnread={true} />
            <ChannelItem />
            <ChannelItem showUnread={true} />
            <ChannelItem />
            <ChannelItem />
            <ChannelItem />
            <ChannelItem />

            <ChannelGroupHeader title={"DIRECT MESSAGES"} displayPlus={true} />
            <ChannelItem showUnread={false} />
          </ScrollView>
        </View>
        <Footer />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  navBar: {
    backgroundColor: "#282a38",
    height: "10%"
  }
});

// this should be a list of all things in the drawer
// Me
// About
// Policy
// Logout
const Dashboard = createDrawerNavigator(
  {
    DashboardWithoutDrawer: {
      screen: DashboardWithoutDrawer
    }
  },
  {
    contentComponent: Menu,
    drawerPosition: "left"
  }
);
export default Dashboard;

// return (
//     <Button
//       onPress={() => this.props.navigation.openDrawer()}
//       title="Open Drawer"
//     />
//     <Text>Dashboard</Text>
//     <Button
//       title="Portal"
//       onPress={() => this.props.navigation.navigate("Portal")}
//     />
//     <View>
//       <Text>Other Views in Stack</Text>
//       <Button
//         title="CreateCircle"
//         onPress={() => this.props.navigation.navigate("CreateCircle")}
//       />
//       <Button
//         title="CircleSettings"
//         onPress={() => this.props.navigation.navigate("CircleSettings")}
//       />
//       <Button
//         title="Constitution"
//         onPress={() => this.props.navigation.navigate("Constitution")}
//       />
//       <Button
//         title="CreateChannel"
//         onPress={() => this.props.navigation.navigate("CreateChannel")}
//       />
//       <Button
//         title="Channel"
//         onPress={() => this.props.navigation.navigate("Channel")}
//       />
//       <Button
//         title="CreateDM"
//         onPress={() => this.props.navigation.navigate("CreateDM")}
//       />
//       <Button
//         title="DMChannel"
//         onPress={() => this.props.navigation.navigate("DMChannel")}
//       />
//       <Button
//         title="AddUser"
//         onPress={() => this.props.navigation.navigate("AddUser")}
//       />
//       <Button
//         title="ViewOtherUser"
//         onPress={() => this.props.navigation.navigate("ViewOtherUser")}
//       />
//     </View>
//   </View>
// );
