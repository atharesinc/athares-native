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
import ViewRevision from "./viewRevision";
import ViewOtherUser from "./viewOtherUser";
import Me from "./me";
import CreateRevision from "./createRevision";
import { slidingStackNavigator } from "../../config/navigators";
import Menu from "./menu";
import EditAmendment from "./editAmendment";

const DashboardStackNavigator = createStackNavigator(
  {
    Dashboard: Dashboard,
    Constitution: Constitution,
    EditAmendment: EditAmendment,
    CreateRevision: CreateRevision,
    ViewRevision: ViewRevision,
    Revisions: Revisions,
    CircleSettings: CircleSettings,
    ViewUser: Me,
    CreateCircle: CreateCircle,
    CreateChannel: CreateChannel,
    CreateDM: CreateDM,
    Channel: Channel,
    DMChannel: DMChannel,
    ViewOtherUser: ViewOtherUser,
    AddUser: AddUser
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
    drawerPosition: "left",
    drawerWidth: 350
  }
);
export default DashboardWithDrawer;
