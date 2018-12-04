import React, { Component } from 'react'
import { View, ScrollView, Text, ImageBackground, Image, StyleSheet, TouchableOpacity, KeyboardAvoidingView, Platform, Clipboard  } from 'react-native'
import { Button, Toast, InputItem, List} from 'antd-mobile-rn'
import { I18n } from '../../language/I18n'
import Rinput from '../../components/Rinput'
import CountDownBtn from '../../components/CountDownBtn'
import { Scene, Router, ActionConst, Actions } from 'react-native-router-flux'
import * as u from '../../utils'
import DeviceInfo from 'react-native-device-info'
import { observer } from "mobx-react"
import QRCode from 'react-native-qrcode'

@observer
class ChargeCoin extends Component {
    state={
        address: ''
    }
    // 获取充值地址
    getAddress = async () => {
        Toast.loading('加载中', 20)
        const res = await u.post(u.config.baseUrl + '/asset/v1.assets/getDepositaddress')
        Toast.hide()
        if (res.code != 0) {
            Toast.fail(res.msg, 2)
            return 
        }
        this.setState({address: res.data.address})
    }
    componentDidMount() {
        this.getAddress()
    }
    render() {
        const _this = this.state;
        return (
            <ScrollView>
            <KeyboardAvoidingView>
                <View style={{alignItems:'center'}}>
                    <List style={[s.FormLayer]}>
                        <Text style={s.t1} onLongPress={() => {Clipboard.setString(this.state.address); Toast.success('复制成功', 2)}}>{this.state.address}</Text>
                        <Text style={s.t2}>(长按复制)</Text>
                        <View style={s.v0}>
                            <QRCode
                                value={this.state.address}
                                size={u.rw(200)}
                                bgColor='#fff'
                                fgColor='#000'/>
                        </View>
                        <TouchableOpacity onPress={() => {Clipboard.setString(this.state.address); Toast.success('复制成功', 2)}}>
                            <Text style={s.t3}>复制钱包地址</Text>
                        </TouchableOpacity>
                        <View style={s.v1}>
                            <Text style={s.t4}>
                                温馨提示：
                            </Text>
                            <Text style={s.t4}>
                                目前只接受FER币充值。
                            </Text>
                            <Text style={s.t4}>
                                区块链转账是不可逆转的，由自身原因导致提币地址错误的，自身承担相应损失。
                            </Text>
                            <Text style={s.t4}>
                                转入是自动的，转币需要整个网络进行确认，达到三个确认后您的币会自动转入到您的账户中。
                            </Text>
                        </View>
                    </List>
                </View>
            </KeyboardAvoidingView>
            </ScrollView>
        )
    }
}
const s = StyleSheet.create({
    FormLayer:{
        width:u.WIDTH,
        marginTop:u.rh(10),
        backgroundColor: '#fff',
        paddingLeft:u.rw(13),
        paddingRight:u.rw(13),
    },
    t1: {
        fontSize: 14,
        textAlign: 'center',
        marginTop: u.rh(34),
    },
    t2: {
        fontSize: 14,
        color: "#808080",
        textAlign: 'center',
        marginTop: u.rh(10),
    },
    v0: {
        marginTop: u.rh(28),
        alignItems: 'center'
    },
    t3: {
        width: u.rw(350),
        height: u.rh(41),
        marginTop: u.rh(28),
        borderRadius: 5,
        backgroundColor: "#dcb125",
        fontSize: 18,
        textAlignVertical:'center',
        textAlign: 'center',
        color: "#000000",
        ...Platform.select({
            ios:{
                lineHeight: u.rh(41),
            },
            android:{
            }
        }),
    },
    v1: {
        marginTop: u.rh(15),
        marginBottom: u.rh(32)
    },
    t4: {
        fontSize: 12,
        color: "#808080"
    }
})

export default ChargeCoin
