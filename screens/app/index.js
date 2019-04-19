import { createStackNavigator, createDrawerNavigator } from "react-navigation";

import Dashboard from "./dashboard";
import CreateCircle from "./createCircle";
import CircleSettings from "./circleSettings";
import Constitution from "./constitution";
import CreateChannel from "./createChannel";
import Channel from "./channel";
import CreateDM from "./createDM";
import DMChannel from "./dmChannel";
import AddUser from "./addUser";
import Revisions from "./revisions";
import ViewOtherUser from "./viewOtherUser";
import Me from "./me";

import { slidingStackNavigator } from "../../config/navigators";
import Menu from "./menu";

const DashboardStackNavigator = createStackNavigator(
  {
    CircleSettings: CircleSettings,
    Dashboard: Dashboard,
    ViewUser: Me,
    CreateCircle: CreateCircle,
    CreateChannel: CreateChannel,
    CreateDM: CreateDM,
    Constitution: Constitution,
    Channel: Channel,
    DMChannel: DMChannel,
    ViewOtherUser: ViewOtherUser,
    AddUser: AddUser,
    Revisions: Revisions
  },
  slidingStackNavigator
);

// this should be a list of all things in the drawer
// Me
// About
// Policy
// Logout
const DashboardWithDrawer = createDrawerNavigator(
  {
    Dashboard: DashboardStackNavigator
  },
  {
    contentComponent: Menu,
    drawerPosition: "left"
  }
);
export default DashboardWithDrawer;
