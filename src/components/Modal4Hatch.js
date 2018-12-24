import React, { Component } from 'react'
import { observer } from "mobx-react"
import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    ImageBackground,
    Image,
    TouchableOpacity,
    TextInput,
    Button,
    KeyboardAvoidingView,
    Modal,
    Platform
} from 'react-native'
import rna, {
    List,
    InputItem,
    Toast
} from 'antd-mobile-rn'
import moment from 'moment'

import { I18n } from '../language/I18n'
import * as u from '../utils'
import { Scene, Router, ActionConst, Actions } from 'react-native-router-flux'

class Modal4Hatch extends Component {

    state = {
        isShow: false,
        detail: {},
        money: ''
    }

    componentDidMount() {

    }

    // 立即孵化按钮事件
    hatchFn = async () => {
        if (this.state.money < 1000) {
            // Toast.fail('孵化值不能小于1000', 2)
            rna.Modal.alert('孵化值不能小于1000')
            return
        }
        this.setState({isShow: false, money: ''})
        Toast.loading('加载中', 20)
        const res = await u.post(u.config.baseUrl + '/asset/v1.assets/invest', {
            investamount: this.state.money,
            productId: this.state.detail.id
        })
        Toast.hide()
        if (res.code != 0) {
            Toast.fail(res.msg, 2)
            return 
        }
        // 更新孵化记录页数据
        global.refreshHatchRecord && global.refreshHatchRecord()

        // 更新资产
        this.getAssets()
        // 更新个人信息
        this.getUserInfo()
        // 更新总资产及收益
        this.getUserStatistics()

        Toast.success('操作成功', 2)
        setTimeout(() => {
            // 跳到孵化记录页
            global.changeHomeTab(I18n.t('incubation'))
        }, 2000)
    }
    
    // 获取资产
    getAssets = async () => {
        const res = await u.get(u.config.baseUrl + '/asset/v1.assets/getAssets')
        if (res.code != 0) {
            Toast.fail(res.msg, 2)
            return 
        }
        u.store.assets = res.data
    }
    
    // 获取资产及收益
    getUserStatistics = async () => {
        Toast.loading('加载中',20)
        let data = await u.post(u.config.baseUrl+'/common/v1.user/getUserStatistics')
        console.log(data);
        Toast.hide()
        if(data.code != 0){
            Toast.fail(data.msg, 2)
            return
        }
        u.store.statistics = data.data
    }

    // 更新个人信息
    getUserInfo = async () => {
        const res = await u.post(u.config.baseUrl + '/common/v1.user/getUserInfo')
        if (res.code != 0) {
            Toast.fail(res.msg, 2)
            return 
        }
        u.store.setUserInfo(res.data)
    }

    render() {
        const money = this.state.money ? this.state.money : 0
        const dayEarnings = this.state.detail.rate ? ((money/100) * this.state.detail.rate).toFixed(2) : '0.00'
        const allEarnings = this.state.detail.rate ? ((money/100) * this.state.detail.period * this.state.detail.rate).toFixed(2) : '0.00'
        const getTime = this.state.detail.rate ? moment(new Date().getTime() + this.state.detail.period * 86400000).format('YYYY-MM-DD') : '--'
        return (
            
            <Modal
                animationType="fade"
                transparent={true}
                visible={this.state.isShow}
                onRequestClose={() => {}}
            >
            <ScrollView style={{flex: 1}} keyboardShouldPersistTaps="handled">
            <KeyboardAvoidingView>
                <View style={{...s.container, height: u.HEIGHT}}>
                    <View style={s.inner_con}>
                        <View style={s.v1}>
                            <Text style={s.t0}>理财孵化</Text>
                            <TouchableOpacity style={s.close} onPress={() => {this.setState({isShow: false, money: ''})}}>
                                <Text style={{fontFamily: 'iconfont', fontSize: 18, color:'#000'}}>&#xe611;</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={s.v2}>
                            <Text style={s.t1}>请输入理财数值</Text>
                            <View style={{justifyContent: 'flex-start'}}>
                                <InputItem
                                    ref='money'
                                    value={this.state.money}
                                    onChange={val => {
                                        this.setState({'money': val.replace(/[^\d]+/g, '')})
                                    }}
                                    style={s.ipt}
                                    placeholder={`可用余额:${u.store.assets.balance ? parseFloat(u.store.assets.balance).toFixed(2) : '--'}`}></InputItem>
                            </View>
                            <Text style={s.t2}>日利息收益：{dayEarnings}</Text>
                            <Text style={s.t2}>总利息收益：{allEarnings}</Text>
                            <Text style={s.t2}>取出日期：{getTime}</Text>
                            <TouchableOpacity onPress={this.hatchFn}>
                                <Text style={s.t3}>确定</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={s.v3}>
                            <Text style={s.t4}>交易规则说明</Text>
                            <Text style={s.t5}>买入： 1000FER起购，上不封顶。</Text>
                            <Text style={s.t5}>取出日期：今天日期+孵化周期。</Text>
                            <Text style={s.t5}>收益： 今日购买，明日00:00开始收益。</Text>
                            <Text style={s.t5}>取出：孵化到期后，将取至账户余额。 </Text>
                        </View>
                    </View>
                </View>
            </KeyboardAvoidingView>
            </ScrollView>
            </Modal>
            
        )
    }
}

const s = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.3)'
    },
    inner_con: {
        width: u.rw(280),
        marginLeft: 'auto',
        marginRight: 'auto',
        backgroundColor: '#fff'
    },
    v1: {
        backgroundColor: '#dcb125',
        justifyContent: 'center',
        height: u.rh(50),
        position: 'relative',
    },
    t0: {
        fontSize: 16,
        color: "#000000",
        textAlign: 'center'
    },
    close: {
        position: 'absolute',
        right: 4,
        top: 4
    },
    v2: {
        backgroundColor: '#fff',
        paddingTop: 12,
        paddingLeft: 15,
        paddingRight: 15
    },
    t1: {
        fontSize: 15,
        color: "#000000"
    },
    ipt: {
        marginLeft: 0,
        marginTop: 13,
        marginBottom: 15,
        height: 40,
        borderRadius: 5,
        backgroundColor: "#ffffff",
        borderStyle: "solid",
        borderWidth: 1,
        borderColor: "#bfbfbf",
    },
    v3: {
        padding: 15,
	    backgroundColor: "#eeeeee"
    },
    t3: {
        width: u.rw(250),
        height: u.rh(39),
        marginTop: u.rh(25),
        marginBottom: u.rh(25),
        marginLeft: 'auto',
        marginRight: 'auto',
        textAlign: 'center',
        textAlignVertical:'center',
        backgroundColor: '#dcb125',
        color: "#000000",
        fontSize: 18,
        borderRadius: 5,
        ...Platform.select({
            ios:{
                lineHeight: u.rh(39),
            },
            android:{
            }
        }),
    },
    t4: {
        fontSize: 13,
        color: "#ff0000"
    },
    t5: {
        fontSize: 12,
        color: "#ff0000"
    }
})

export default Modal4Hatch