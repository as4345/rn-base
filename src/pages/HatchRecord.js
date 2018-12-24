import React, { Component } from 'react'
import { observer } from "mobx-react"
import {
    StyleSheet,
    Text,
    ScrollView,
    StatusBar,
    View,
    ImageBackground,
    Image,
    TouchableOpacity,
} from 'react-native'
import {
    List,
    InputItem,
    Toast
} from 'antd-mobile-rn'

import HatchBlock from '../components/HatchBlock'
import Modal4Hatch from '../components/Modal4Hatch'
import RollView from '../components/RollView'

import { I18n } from '../language/I18n'
import * as u from '../utils'

@observer
class ManagerMoney extends Component {

    state = {
        MarqueeLabel: '聚宝盆活动时间(10天)：2018.11.9~11.19，在此期间聚宝盆不能孵化，新用户注册聚宝盆后可以发二维码推荐好友注册排位，活动结束后必须孵化才可以显示二维码推荐好友。\
            聚宝盆正式孵化时间：2018.11.19日上午10:00，正式开始孵化产生收益。\
            活动期间可在NR交易所进行以下操作：\
            1、可以充值RESS兑换FER充值到聚宝盆\
            2、可以充值USDT挂单购买FER等待19号发放'
    }


    // 获取孵化记录
    getRecord = async () => {
        // 更新孵化记录页数据
        Toast.loading('加载中', 20)
        const res = await u.post(u.config.baseUrl + '/common/v1/Record/getDayincomLog')
        Toast.hide()
        if (res.code != 0) {
            Toast.fail(res.msg, 2)
            return 
        }
        u.store.hatchRecord = res.data
    }

    itemView = data => {
        return (
            <HatchBlock
                hatchTitle={`${data.item.period}天孵化期`}
                percent={data.item.rate}
                date={`${data.item.period}天`}
                beginTime={data.item.created_at}
                amount={`总资产 ${data.item.totalBalance}`}
                hadInterest={`已获得利息 ${data.item.income}`}
                allInterest={`可获得总利息 ${data.item.havedIncome}`}
                hatchEndTime={`取出时间 ${data.item.out_time}`}
            />
        )
    }

    componentDidMount() {
        global.refreshHatchRecord = this.refs['hatchRecord'].handleRefresh
    }
    componentDidUpdate() {
    }

    render() {
        return (
            <View style={s.container}>
                <StatusBar
                    animated={true} //指定状态栏的变化是否应以动画形式呈现。目前支持这几种样式：backgroundColor, barStyle和hidden
                    hidden={false}  //是否隐藏状态栏。
                    backgroundColor='#000' //状态栏的背景色
                    translucent={false}//指定状态栏是否透明。设置为true时，应用会在状态栏之下绘制（即所谓“沉浸式”——被状态栏遮住一部分）。常和带有半透明背景色的状态栏搭配使用。
                    barStyle='light-content'
                />
                <RollView
                    ref='hatchRecord'
                    headView={<Text style={s.w_f_18}>孵化记录</Text>}
                    itemView={this.itemView}
                    disabledReached={true}
                    url={'/common/v1/Record/getDayincomLog'}
                />
                {/* <HatchBlock
                    hatchTitle="30天孵化期"
                    percent="0.3"
                    date="30天"
                    beginTime="2018-10-19 11:10:09"
                    amount='总资产 121212'
                    hadInterest='已获得利息 0'
                    allInterest='可获得总利息 54545.4'
                    hatchEndTime='取出时间 2019-02-14'
                />
                <HatchBlock
                    hatchTitle="30天孵化期"
                    percent="0.3"
                    date="30天"
                    beginTime="2018-10-19 11:10:09"
                    amount='总资产 121212'
                    hadInterest='已获得利息 0'
                    allInterest='可获得总利息 54545.4'
                    hatchEndTime='取出时间 2019-02-14'
                />
                <HatchBlock
                    hatchTitle="30天孵化期"
                    percent="0.3"
                    date="30天"
                    beginTime="2018-10-19 11:10:09"
                    amount='总资产 121212'
                    hadInterest='已获得利息 0'
                    allInterest='可获得总利息 54545.4'
                    hatchEndTime='取出时间 2019-02-14'
                /> */}
            </View>
        )
    }
}

const s = StyleSheet.create({
    container: {
        flex: 1
    },
    w_f_18: {
        fontSize: 18,
        color: "#ffffff",
        textAlign: 'center',
        padding: 6,
        backgroundColor: '#0c0b0b'
    }
})

export default ManagerMoney