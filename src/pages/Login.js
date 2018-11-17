import React, { Component } from 'react'
import { observer } from "mobx-react"
import {
    StyleSheet,
    Text,
    View,
    ImageBackground,
    Image,
    TouchableOpacity,
} from 'react-native'
import {
    List,
    InputItem
} from 'antd-mobile-rn'

import { I18n } from '../language/I18n'
import * as u from '../utils'

@observer
class Login extends Component {

    state = {

    }

    componentDidMount() {

    }

  render() {
    return (
        <View style={s.container}>
            <ImageBackground style={s.backgroundImage} source={require('../assets/img/login_bg.jpg')}>
                <View style={s.rFlex}>
                    <TouchableOpacity style={s.btnCon}>
                        <Text style={s.opBtnText}>{I18n.t('register')}</Text>
                    </TouchableOpacity>
                </View>
                <View style={s.logoCon}>
                    <Image style={s.logo} source={require('../assets/img/logo.png')}></Image>
                    <Image style={s.logo_title} source={require('../assets/img/logo_title.png')}></Image>
                </View>
                <View style={s.listCon}>
                    <List style={s.list}>
                        <View style={s.iptItem}>
                            <Text style={s.iptLabel}>{I18n.t('username')}</Text>
                            <InputItem
                                type='number'
                                clear={true} style={s.iptIpt} placeholder={I18n.t('inputUsername')} placeholderTextColor="#adacac"></InputItem>
                        </View>
                    </List>
                    <List style={s.list}>
                        <View style={s.iptItem}>
                            <Text style={s.iptLabel}>{I18n.t('password')}</Text>
                            <InputItem style={s.iptIpt} placeholder={I18n.t('inputPassword')} placeholderTextColor="#adacac"></InputItem>
                        </View>
                    </List>
                    <List style={s.list}>
                        <View style={s.iptItem}>
                            <Text style={s.iptLabel}>{I18n.t('verificationCode')}</Text>
                            <InputItem style={s.iptIpt} placeholder={I18n.t('inputVeriCode')} placeholderTextColor="#adacac"></InputItem>
                        </View>
                    </List>
                    <View style={s.submitCon}>
                        <TouchableOpacity style={s.submitOp}>
                            <ImageBackground style={s.submitOp} source={require('../assets/img/btn.png')}>
                                <Text style={s.submitText}>{I18n.t('login')}</Text>
                            </ImageBackground>
                        </TouchableOpacity>
                    </View>
                    <View style={{...s.rFlex, paddingRight: 5}}>
                        <TouchableOpacity style={s.btnCon}>
                            <Text style={s.opBtnText}>{I18n.t('forgetPassword')}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ImageBackground>
        </View>
    )
  }
}

const s = StyleSheet.create({
    container: {
        flex: 1
    },
    backgroundImage:{
        flex: 1,
        width: u.WIDTH,
        height: u.HEIGHT
    },
    rFlex: {
        alignItems: 'flex-end',
        padding: 12,
	    height: 15,
    },
    btnCon: {
	    height: 15,
    },
    opBtnText: {
        fontSize: 15,
        color: "#ffffff"
    },
    logoCon: {
        marginTop: 30,
        alignItems: 'center',
    },
    logo: {
        width: 104,
        height: 105
    },
    logo_title: {
        width: 86,
        height: 25,
    },
    listCon: {
        marginTop: 40,
        marginLeft: 'auto',
        marginRight: 'auto'
    },
    list: {
        width: 305,
        marginTop: 18
    },
    iptItem: {
        borderRadius: 5,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    iptLabel: {
        width: 80,
        paddingLeft: 17,
        textAlign: 'left',
        fontSize: 16,
        color: "#343434"
    },
    iptIpt: {
        width: 200,
        height: 43
    },
    submitCon: {
        marginTop: 50
    },
    submitOp: {
        width: 300,
        height: 40,
        justifyContent: 'center',
    },
    submitText: {
        fontSize: 18,
        color: "#010000",
        textAlign: "center"
    }
})

export default Login