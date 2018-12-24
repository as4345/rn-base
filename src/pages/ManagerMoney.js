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
    ActivityIndicator,
    TouchableOpacity,
} from 'react-native'
import {
    Toast
} from 'antd-mobile-rn'
import { Scene, Router, ActionConst, Actions } from 'react-native-router-flux'


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
            2、可以充值USDT挂单购买FER等待19号发放',
        productArr: [],
        detail: {}
    }

    async componentDidMount() {
        let tokenData = await u.storage.getItem('tokenData')
        tokenData = tokenData ? JSON.parse(tokenData) : {}
        if (!tokenData.token) {
            Actions['SCENE_LOGIN']()
            return 
        }
        this.getUserInfo()
        this.getProduct()
        this.getDetail()
        this.getAssets()
    }

    // 获取产品
    getProduct = async () => {
        Toast.loading('加载中', 20)
        const res = await u.post(u.config.baseUrl + '/common/v1/System/getProduct')
        Toast.hide()
        if (res.code != 0) {
            Toast.fail(res.msg, 2)
            return 
        }
        this.setState({productArr: res.data})
    }

    // 获取公告
    getDetail = async () => {
        Toast.loading('加载中', 20)
        const res = await u.post(u.config.baseUrl + '/common/v1/notice/detail')
        Toast.hide()
        if (res.code != 0) {
            Toast.fail(res.msg, 2)
            return 
        }
        this.setState({detail: res.data})
    }

    // 获取资产
    getAssets = async () => {
        Toast.loading('加载中', 20)
        const res = await u.get(u.config.baseUrl + '/asset/v1.assets/getAssets')
        Toast.hide()
        if (res.code != 0) {
            Toast.fail(res.msg, 2)
            return 
        }
        u.store.assets = res.data
    }
    // 获取用户信息
    getUserInfo = async () => {
        Toast.loading('加载中', 20)
        const res = await u.post(u.config.baseUrl + '/common/v1.user/getUserInfo')
        Toast.hide()
        if (res.code != 0) {
            Toast.fail(res.msg, 2)
            return 
        }
        console.log(res)
        u.store.setUserInfo(res.data)
    }
    componentWillUnmount() {
        this.setState = () => {
            return false
        }
    }
    itemView= (data) => {
        const detail = this.state.detail.title ? `${this.state.detail.title} ${this.state.detail.desc}`  : null
        return (
            <HatchBlock
            key={data.item}
            mqrqueeLabel={data.index == 0 && detail ? detail : null}
            title={data.item.name}
            percent={data.item.rate}
            date={`${data.item.period}天`}
            beginTime={data.item.created_at}
            pressFn={() => {this.refs.Modal4Hatch.setState({isShow: true, detail: data.item})}}
            />
        )
    }
    render() {
        const detail = this.state.detail.title ? `${this.state.detail.title} ${this.state.detail.desc}`  : null
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
                headView={<Text style={s.w_f_18}>孵化期</Text>}
                itemView={this.itemView}
                disabledReached={true}
                url={'/common/v1/System/getProduct'}
                refreshCallback={()=>{
                    this.getUserInfo()
                    this.getProduct()
                    this.getDetail()
                    this.getAssets()
                }}
                >
                </RollView>
                {/* {
                    this.state.productArr.map((item, idx) => {
                        return (
                            <HatchBlock
                                key={idx}
                                mqrqueeLabel={idx == 0 && detail ? detail : null}
                                title={item.name}
                                percent={item.rate}
                                date={`${item.period}天`}
                                beginTime={item.created_at}
                                pressFn={() => {this.refs.Modal4Hatch.setState({isShow: true, detail: item})}}
                            />
                        )
                    })
                } */}
                {/* <HatchBlock
                    mqrqueeLabel={this.state.MarqueeLabel}
                    title="30天孵化期"
                    percent="0.3"
                    date="30天"
                    beginTime="2018-10-19 11:10:09"
                    pressFn={() => {this.refs.Modal4Hatch.setState({isShow: true})}}
                />
                <HatchBlock
                    title="30天孵化期"
                    percent="0.3"
                    date="30天"
                    beginTime="2018-10-19 11:10:09"
                />
                <HatchBlock
                    title="30天孵化期"
                    percent="0.3"
                    date="30天"
                    beginTime="2018-10-19 11:10:09"
                /> */}
                <Modal4Hatch
                    ref='Modal4Hatch'
                />
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