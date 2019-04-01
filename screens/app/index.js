import { createStackNavigator } from "react-navigation";

import Dashboard from "./dashboard";
import CreateCircle from "./createCircle";
import CircleSettings from "./circleSettings";
import Constitution from "./constitution";
import CreateChannel from "./createChannel";
import Channel from "./channel";
import CreateDM from "./createDM";
import DMChannel from "./dmChannel";
import AddUser from "./addUser";
import ViewOtherUser from "./viewOtherUser";
import { slidingStackNavigator } from "../../config/navigators";

const DashboardStackNavigator = createStackNavigator(
  {
    Dashboard: Dashboard,
    CreateCircle: CreateCircle,
    CircleSettings: CircleSettings,
    Constitution: Constitution,
    CreateChannel: CreateChannel,
    Channel: Channel,
    CreateDM: CreateDM,
    DMChannel: DMChannel,
    AddUser: AddUser,
    ViewOtherUser: ViewOtherUser
  },
  slidingStackNavigator
);

export default DashboardStackNavigator;
