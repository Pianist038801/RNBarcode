import { StackNavigator } from 'react-navigation'
import TeamScreen from '../Containers/TeamScreen'
import LoginScreen from '../Containers/LoginScreen'
import SendCode from '../Containers/SendCode'
import Main from '../Containers/Main'
import AuthFail from '../Containers/AuthFail'

const LoginStack = StackNavigator({
  LoginScreen: { screen: LoginScreen },
  SendCode: { screen: SendCode },
  AuthFail: { screen: AuthFail }
}, {
  headerMode: 'none',
  navigationOptions: {
    headerVisible: false,
  },
  initialRouteName: 'SendCode'
});

const MainStack = StackNavigator({
  TeamScreen: { screen: Main },
}, {
  headerMode: 'none',
  navigationOptions: {
    headerVisible: false,
  },
});

// Manifest of possible screens
const PrimaryNav = StackNavigator({
  Main: { screen: MainStack },
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
