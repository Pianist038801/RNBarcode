import { StackNavigator } from 'react-navigation'
import TeamScreen from '../Containers/TeamScreen'
import LoginScreen from '../Containers/LoginScreen'
import SendCode from '../Containers/SendCode'
import Main from '../Containers/Main'
import AuthFail from '../Containers/AuthFail'

const LoginStack = StackNavigator({
  LoginScreen: { screen: LoginScreen },
  SendCode: { screen: SendCode },
  AuthFail: { screen: AuthFail },
  Main: {screen: Main}
}, {
  headerMode: 'none',
  navigationOptions: {
    headerVisible: false,
  },
  initialRouteName: 'SendCode'
});

 
 

export default LoginStack
