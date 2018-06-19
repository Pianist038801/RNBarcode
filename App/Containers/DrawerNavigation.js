import { DrawerNavigator } from 'react-navigation';
import React, { Component } from 'react'
import { View, ImageBackground, Image, SafeAreaView, Text, ScrollView, TouchableOpacity} from 'react-native'
import { connect } from 'react-redux'
import { Images, Colors, Metrics, Fonts } from '../Themes'
import { Container, Content, Form, Item, Input, Spinner, Toast } from 'native-base';
import LeftSideBar from './LeftSideBar';

const routeConfigs = {
	feedNav: {
		screen: FeedNavigator,
		navigationOptions: ({ navigation }) => ({
			drawerLockMode: 'locked-closed'
		})
	}
};

const navigatorConfig = {
  drawerWidth: Metrics.screenWidth * 0.7,
	initialRouteName: 'leftNav',
	contentComponent: ({ navigation }) => <LeftSideBar navigation={navigation} />,
	drawerPosition: 'left',
	drawerOpenRoute: 'DrawerOpen',
	drawerCloseRoute: 'DrawerClose',
	drawerToggleRoute: 'DrawerToggle'
};

const MainDrawerNavigator = DrawerNavigator(routeConfigs, navigatorConfig);

export default MainDrawerNavigator;
