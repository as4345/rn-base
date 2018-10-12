
import { createBottomTabNavigator } from 'react-navigation'
import React, { Component } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome'
import {
  Dimensions
} from 'react-native';
// 这里注意每个页面要单独引入，用 * as的方式会导致加载不到
import HomeTabP from "../../pages/HomeTab/HomeTab"
import SecondTabP from "../../pages/SecondTab/SecondTab"

const deviceW = Dimensions.get('window').width

const basePx = 375
function px2dp(px) {
  return px *  deviceW / basePx
}

// 两个参数 routeConfigs: NavigationRouteConfigMap,  config: TabNavigatorConfig = {}
// 一个route对应的页面和tab图标， 一个切换的样式整个tab栏的样式

// 重要！！此处定义的tabBarLabel字段会跟app.js处定义的路由同级（即两处互通，在这里定义了app.js外面就无需再定义）
export default AppTabContent = createBottomTabNavigator({
	HomeTab: {screen: HomeTabP, navigationOptions: {
		tabBarLabel: 'HomeTab',
		tabBarIcon: ({ tintColor, focused }) => (
      <Icon name="home" size={px2dp(22)} color="#666"/>
		)
	}},
	SecondTab: {screen: SecondTabP, navigationOptions: {
		tabBarLabel: 'SecondTab',
		tabBarIcon: ({ tintColor, focused }) => (
      <Icon name="home" size={px2dp(22)} color="#666"/>
		)
	}},
}, {
	tabBarPosition: 'bottom',
	lazy: true, // 是否懒加载
	initialRouteName: 'HomeTab',
	tabBarOptions: {
		showIcon: true,
		pressOpacity: 0.8,
		style: {
			height: 45,
			backgroundColor: '#fff',
			zIndex: 0,
			position: 'relative'
    	},
    	labelStyle: {
        	fontSize: 11,
			paddingVertical: 0,
			marginTop: -4
    	},
		iconStyle: {
			marginTop: -3
		},
		tabStyle: {
			backgroundColor: '#fff',
		},
	}
});
