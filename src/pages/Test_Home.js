import React, { Component } from 'react'
import { observer } from "mobx-react"
import {
    View,
    Text
} from 'react-native'
import { Button, Toast } from 'antd-mobile-rn'
import { I18n } from '../language/I18n'

import * as u from '../utils'
global.stime = global.stime ? global.stime : null
@observer
class Home extends Component {
    state = {
        test: 1
    }
    componentDidMount() {
        stime = setInterval(() => {
            u.store.setStayHomeTime(u.store.stayHomeTime + 1)
        }, 1000)
    }
    componentWillUnmount() {
        clearInterval(stime)
    }
    render() {
        return (
            <View>
                <Text>{I18n.t('homePage')}</Text>
                <Text>{I18n.t('test')}</Text>
                <Text>测试store{u.store.stayHomeTime}</Text>
                <Text>userInfo{JSON.stringify(u.store.userInfo)}</Text>
                <Text>{this.state.test}</Text>
                <Text>{JSON.stringify(u)}</Text>
                <Button onClick={()=>{Toast.loading('加载中')}}>toast一下</Button>
                <Text style={{fontFamily:'iconfont',fontSize:18,color:'#000',}}>&#xe6be;</Text>
            </View>
        )
    }
}
export default Home