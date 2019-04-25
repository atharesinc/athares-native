import Login from "./Login";
import Register from "./Register";
import { createSwitchNavigator } from "react-navigation";

const PortalSwitchNavigator = createSwitchNavigator({
  Login: { screen: Login },
  Register: { screen: Register }
});

export default PortalSwitchNavigator;
