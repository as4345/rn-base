import React, { Component } from 'react'
import { observer } from "mobx-react"
import {
    StyleSheet,
    Text,
    View,
    Button
} from 'react-native'
import TabNavigator from 'react-native-tab-navigator'
import ManagerMoney from './ManagerMoney'
import HatchRecord from './HatchRecord'
import MyPage from './myPages/myPage'
import { Scene, Router, ActionConst, Actions } from 'react-native-router-flux'
import * as u from '../utils'

import { I18n } from '../language/I18n'


@observer
class Home extends Component {

    state = {
        selectedTab: I18n.t('managerMoney')
    }

    tabArr = [
        {
            name:  I18n.t('managerMoney'),
            component: <ManagerMoney />,
            defaultIcon: <Text style={{fontFamily: 'iconfont', fontSize: 18, color:'#fff'}}>&#xe618;</Text>,
            selectedIcon: <Text style={{fontFamily: 'iconfont', fontSize: 18, color:'#dcb125'}}>&#xe618;</Text>
        },
        {
            name:  I18n.t('incubation'),
            component: <HatchRecord />,
            defaultIcon: <Text style={{fontFamily: 'iconfont', fontSize: 18, color:'#fff'}}>&#xe63e;</Text>,
            selectedIcon: <Text style={{fontFamily: 'iconfont', fontSize: 18, color:'#dcb125'}}>&#xe63e;</Text>
        },
        {
            name:  I18n.t('mine'),
            component: <MyPage />,
            defaultIcon: <Text style={{fontFamily: 'iconfont', fontSize: 18, color:'#fff'}}>&#xe601;</Text>,
            selectedIcon: <Text style={{fontFamily: 'iconfont', fontSize: 18, color:'#dcb125'}}>&#xe601;</Text>
        },
    ]
    

    componentDidMount() {
        // 暴漏切换tab方法到全局
        global.changeHomeTab = val => {
            this.setState({
                selectedTab: val
            })
        }
    }

    render() {
        return (
            <View style={s.container}>
                <TabNavigator tabBarStyle={{backgroundColor: '#000'}}>
                    {
                        this.tabArr.map((item, idx) => {
                            return (
                                <TabNavigator.Item
                                    key={idx}
                                    selected={this.state.selectedTab === item.name}
                                    title={item.name}
                                    titleStyle={{color:'#fff'}}
                                    selectedTitleStyle={{color:'#dcb125'}}
                                    renderIcon={() => item.defaultIcon}
                                    renderSelectedIcon={() => item.selectedIcon}
                                    onPress={() => global.changeHomeTab(item.name)}
                                >
                                    {item.component}
                                </TabNavigator.Item>
                            )
                        })
                    }
                </TabNavigator>
                {/* <Button title="测试" onPress={Actions['SCENE_LANGTEST']}></Button> */}
            </View>
        )
    }
}

const s = StyleSheet.create({
    container: {
        flex: 1,
    },
})

export default Home