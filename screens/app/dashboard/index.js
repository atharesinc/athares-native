import React, { Component } from "react";

import { ScrollView, View } from "react-native";
// import { createDrawerNavigator, createStackNavigator } from "react-navigation";
import Footer from "../../../components/Footer";
import Circles from "../../../components/Circles";
import ChannelItem from "../../../components/ChannelItem";
import ChannelGroupHeader from "../../../components/ChannelGroupHeader";
import CircleHeader from "../../../components/CircleHeader";
import GovernanceChannelItem from "../../../components/GovernanceChannelItem";

class Dashboard extends Component {
  state = {
    showSearch: false
  };

  render() {
    return (
      <View
        style={{
          alignItems: "stretch",
          justifyContent: "space-between",
          width: "100%",
          flex: 1
        }}
      >
        <Circles />
        <View style={{ backgroundColor: "#282a38", height: "75%" }}>
          <CircleHeader />
          <ScrollView>
            <ChannelGroupHeader title={"GOVERNANCE"} />
            <GovernanceChannelItem
              title={"Constitution"}
              link={"Constitution"}
            />
            <GovernanceChannelItem title={"Polls"} link={"Revisions"} />
            <GovernanceChannelItem title={"Settings"} link={"CircleSettings"} />
            <ChannelGroupHeader title={"CHANNELS"} displayPlus={true} />
            <ChannelItem showUnread={true} />
            <ChannelItem />
            <ChannelItem showUnread={true} />
            <ChannelItem />
            <ChannelItem />
            <ChannelItem />
            <ChannelItem />

            <ChannelGroupHeader title={"DIRECT MESSAGES"} displayPlus={true} />
            <ChannelItem
              showUnread={false}
              channel={{ name: "Jim", channelType: "dm" }}
            />
          </ScrollView>
        </View>
        <Footer />
      </View>
    );
  }
}

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
