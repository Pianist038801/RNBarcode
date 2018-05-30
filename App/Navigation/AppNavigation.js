import { StackNavigator } from 'react-navigation'
import TeamScreen from '../Containers/TeamScreen'
import LoginScreen from '../Containers/LoginScreen'

const LoginStack = StackNavigator({
  LoginScreen: { screen: LoginScreen },
}, {
  headerMode: 'none',
  navigationOptions: {
    headerVisible: false,
  },
});

const MainStack = StackNavigator({
  TeamScreen: { screen: TeamScreen },
}, {
  headerMode: 'none',
  navigationOptions: {
    headerVisible: false,
  },
});

// Manifest of possible screens
const PrimaryNav = StackNavigator({
  mainStack: { screen: MainStack },
  loginStack: { screen: LoginStack },
}, {
  // Default config for all screens
  headerMode: 'none',
  navigationOptions: {
    headerVisible: false,
  },
  initialRouteName: 'loginStack'
})

export default PrimaryNav
