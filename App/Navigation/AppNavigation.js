import { StackNavigator } from 'react-navigation'
import TeamScreen from '../Containers/TeamScreen'
import LoginScreen from '../Containers/LoginScreen'
import SendCode from '../Containers/SendCode'
import Main from '../Containers/Main'
import AuthFail from '../Containers/AuthFail'

const HomeStack = StackNavigator({
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

const prevGetStateForActionHomeStack = HomeStack.router.getStateForAction;
HomeStack.router.getStateForAction = (action, state) => {
    if (state && action.type === 'ReplaceCurrentScreen') {
      const routes = state.routes.slice(0, state.routes.length - 1);
      routes.push(action);
      return {
        ...state,
        routes,
        index: routes.length - 1,
      };
    }
    return prevGetStateForActionHomeStack(action, state);
  }

export default HomeStack
