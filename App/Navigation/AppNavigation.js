
import React, { Component } from 'react'
import { StackNavigator, DrawerNavigator } from 'react-navigation'
import { Images, Colors, Metrics, Fonts } from '../Themes'
import TeamScreen from '../Containers/TeamScreen'
import LoginScreen from '../Containers/LoginScreen'
import SendCode from '../Containers/SendCode'
import Main from '../Containers/Main'
import AuthFail from '../Containers/AuthFail'
import ProductsUploader from '../Containers/ProductsUploader';
import LeftSideMenu from '../Containers/LeftSideBar';
import RightSideMenu from '../Containers/RightSideBar';
import DemoShop from '../Containers/DemoShop';

const HomeStack = StackNavigator({
  LoginScreen: { screen: LoginScreen},
  SendCode: { screen: SendCode },
  AuthFail: { screen: AuthFail },
  Main: {screen: Main},
  ProductsUploader: {screen: ProductsUploader},
  DemoShop: {screen: DemoShop},
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

const MainDrawer = DrawerNavigator(
  {
    HomeStack:{
      screen: HomeStack
    }
  },
  {
    initialRouteName: 'HomeStack',
    drawerWidth: Metrics.screenWidth * 36 / 46,
    drawerPosition: 'left',
    contentComponent: props => <LeftSideMenu {...props} />,
    drawerOpenRoute: 'LeftSideMenu',
    drawerCloseRoute: 'LeftSideMenuClose',
    drawerToggleRoute: 'LeftSideMenuToggle',
  },
);

const AppRoute = DrawerNavigator(
  {
    MainDrawer: {
      screen: MainDrawer,
    },
  },
  {
    navigationOptions: {
    },
    drawerPosition: 'right',
    drawerWidth: Metrics.screenWidth * 36 / 46,
    contentComponent: props => <RightSideMenu {...props} />,
    drawerOpenRoute: 'RightSideMenu',
    drawerCloseRoute: 'RightSideMenuClose',
    drawerToggleRoute: 'RightSideMenuToggle',
  },
);

export default AppRoute;
