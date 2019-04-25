import Login from "./Login";
import Register from "./Register";
import { createSwitchNavigator } from "react-navigation";

const PortalSwitchNavigator = createSwitchNavigator({
  Register: { screen: Register },
  Login: { screen: Login }
});

export default PortalSwitchNavigator;
