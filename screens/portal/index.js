import Login from "./Login";
import Register from "./Register";
import { createSwitchNavigator } from "react-navigation";
// import { fadingStackNavigator } from "../../config/navigators";

const PortalSwitchNavigator = createSwitchNavigator({
  Login: { screen: Login },
  Register: { screen: Register }
});

export default PortalSwitchNavigator;
