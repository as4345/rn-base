import React, { Component } from 'react'
import { observer } from "mobx-react"
import {
    StyleSheet,
    Text,
    View,
    ImageBackground,
    Image,
    TouchableOpacity,
    TextInput,
    Button,
    Modal
} from 'react-native'
import {
    List,
    InputItem
} from 'antd-mobile-rn'

import { I18n } from '../language/I18n'
import * as u from '../utils'

class Modal4Hatch extends Component {

    state = {
        isShow: false
    }

    componentDidMount() {

    }

    render() {
        return (
            
            <Modal
                animationType="fade"
                transparent={true}
                visible={this.state.isShow}
                onRequestClose={() => {}}
            >
                <View style={s.container}>
                    <View style={s.inner_con}>
                        <View style={s.v1}>
                            <Text style={s.t0}>理财孵化</Text>
                            <TouchableOpacity style={s.close} onPress={() => {this.setState({isShow: false})}}>
                                <Text style={{fontFamily: 'iconfont', fontSize: 18, color:'#000'}}>&#xe611;</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={s.v2}>
                            <Text style={s.t1}>请输入理财数值</Text>
                            <TextInput style={s.ipt}></TextInput>
                            <Text style={s.t2}>日利息收益：0.00</Text>
                            <Text style={s.t2}>总利息收益：0.00</Text>
                            <Text style={s.t2}>取出日期：2018-11-22</Text>
                            <TouchableOpacity style={s.btn}>
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
        height: u.rh(405),
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
        marginTop: 13,
        marginBottom: 15,
        height: 40,
        borderRadius: 5,
        backgroundColor: "#ffffff",
        borderStyle: "solid",
        borderWidth: 1,
        borderColor: "#bfbfbf",
        paddingLeft: 12,
        paddingRight: 12
    },
    btn: {
        marginTop: 25,
        marginBottom: 25,
        backgroundColor: '#dcb125',
        width: 250,
        height: 39,
        justifyContent: 'center'
    },
    v3: {
        padding: 15,
	    backgroundColor: "#eeeeee"
    },
    t3: {
        textAlign: 'center',
        color: "#000000",
        fontSize: 18,
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