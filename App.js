import { createAppContainer, createSwitchNavigator } from "react-navigation";

import NavigationHome from "./screens/NavigationHome";
import NavigationLogin from "./screens/NavigationLogin";
import LoginScreen from "./screens/LoginScreen";

const App = createSwitchNavigator({
  NavigationLogin: {screen: NavigationLogin},
  NavigationHome: {screen: NavigationHome},
  LoginScreen: {screen: LoginScreen},
  },
  {
    initialRouteName: 'NavigationHome',
  }
);

export default createAppContainer(App);