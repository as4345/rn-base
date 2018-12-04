import React, { Component } from 'react'
import { observer } from "mobx-react"
import {
    StyleSheet,
    Text,
    View,
    ImageBackground,
    Image,
    TouchableOpacity,
    StatusBar,
    ScrollView,
    KeyboardAvoidingView
} from 'react-native'
import {
    List,
    InputItem,
    Toast
} from 'antd-mobile-rn'
import { Scene, Router, ActionConst, Actions } from 'react-native-router-flux'

import { I18n } from '../language/I18n'
import DeviceInfo from 'react-native-device-info'
import * as u from '../utils'

@observer
class Login extends Component {

    state = {
        username: '',
        password: '',
        code: '',
        capCha: '',
        localLoginDataArr: [],
        isShowLocalUsername: false
    }

    isSelecting = false

    blurTime = 0

    login = async () => {
        if (
            !this.state.username
            || !this.state.password
            || !this.state.code
        ) {
            Toast.fail('请输入完整登录信息')
            return
        }
        Toast.loading('加载中', 20)
        const res = await u.post(u.config.baseUrl + '/common/v1.login/login', {
            username: this.state.username,
            password: this.state.password,
            client_secret: 'jNv8YgpOeFRas1Pa4Fn6FmWkIefNGlylwkTPTVQr',
            client_id: 1,
            device_id: DeviceInfo.getUniqueID(),
            agreed: 1,
            code: this.state.code
        })
        if (res.code != 0) {
            Toast.hide()
            Toast.fail(res.msg, 2)
            return 
        }
		u.store.tokenData = res.data
        await u.storage.setItem('tokenData', JSON.stringify(res.data))
        
        const res2 = await u.post(u.config.baseUrl + '/common/v1.user/getUserInfo')
        Toast.hide()
        if (res2.code != 0) {
            Toast.fail(res2.msg, 2)
            return 
        }
        await u.storage.setItem('loginData', this.state.username) // 成功登录后存储帐号
        let newLocalLoginDataArr = JSON.parse(JSON.stringify(this.state.localLoginDataArr))
        newLocalLoginDataArr.unshift(this.state.username)
        newLocalLoginDataArr.splice(3, 99)
        await u.storage.setItem('loginDataArr', JSON.stringify(newLocalLoginDataArr))

        u.store.setUserInfo(res2.data)
        Actions['SCENE_HOME']()
    }

    // 获取验证码
    getImgCaptcha = async () => {
        Toast.loading('加载中',20)
        let res = await u.get(u.config.baseUrl+'/common/v1.system/getImgCaptcha?device_id=' + DeviceInfo.getUniqueID())
        Toast.hide()
        if(res.code != 0){
            Toast.fail(res.msg)
            return
        }
        this.setState({capCha: res.data + '&asd=' + Math.random()})
    }
    
    // 删除本地历史帐号
    deleteLocalUsername = async val => {
        let newLocUserArr = JSON.parse(JSON.stringify(this.state.localLoginDataArr))
        for(let i = 0; i < newLocUserArr.length; i++) {
            if (newLocUserArr[i] == val) {
                newLocUserArr.splice(i, 1)
                break
            }
        }
        this.setState({localLoginDataArr: newLocUserArr})
        await u.storage.setItem('loginDataArr', JSON.stringify(newLocUserArr))
        if (!newLocUserArr.length) {
            this.setState({isShowLocalUsername: false})
        }
    }

    async componentDidMount() {
        const locUsername = await u.storage.getItem('loginData')
        if (locUsername) {
            this.setState({username: locUsername})
        }
        const localLoginDataArr = await u.storage.getItem('loginDataArr')
        if (localLoginDataArr) {
            this.setState({localLoginDataArr: JSON.parse(localLoginDataArr)})
        }
        this.getImgCaptcha()
    }

    render() {
        return (
            <ScrollView style={s.container} keyboardShouldPersistTaps="handled">
            <KeyboardAvoidingView>
                <StatusBar
                    animated={true} //指定状态栏的变化是否应以动画形式呈现。目前支持这几种样式：backgroundColor, barStyle和hidden
                    hidden={false}  //是否隐藏状态栏。
                    backgroundColor='#000' //状态栏的背景色
                    translucent={false}//指定状态栏是否透明。设置为true时，应用会在状态栏之下绘制（即所谓“沉浸式”——被状态栏遮住一部分）。常和带有半透明背景色的状态栏搭配使用。
                    barStyle='light-content'
                />
                <ImageBackground style={s.backgroundImage} source={require('../assets/img/login_bg.jpg')}>
                    <View style={s.rFlex}>
                        <TouchableOpacity style={s.btnCon} onPress={() => {Actions['SCENE_REGISTER']()}}>
                            <Text style={s.opBtnText}>{I18n.t('register')}</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={s.logoCon}>
                        <Image style={s.logo} source={require('../assets/img/logo.png')}></Image>
                        <Image style={s.logo_title} source={require('../assets/img/logo_title.png')}></Image>
                    </View>
                    <View style={s.listCon}>
                        <View>
                            <List style={s.list}>
                                <View style={s.iptItem}>
                                    <Text style={s.iptLabel}>{I18n.t('username')}</Text>
                                    <InputItem
                                        ref='username'
                                        value={this.state.username}
                                        onChange={val => {this.setState({username: val})}}
                                        onFocus={() => {
                                            console.log(this.state.localLoginDataArr)
                                            if (this.state.localLoginDataArr.length ) {
                                                this.setState({
                                                    isShowLocalUsername: true
                                                })
                                            }
                                        }}
                                        onEndEditing={() => {
                                                    this.setState({
                                                        isShowLocalUsername: false
                                                    })
                                        }}
                                        style={s.iptIpt} placeholder={I18n.t('inputUsername')} placeholderTextColor="#adacac"></InputItem>
                                    
                                </View>
                            </List>
                            <List style={s.list}>
                                <View style={s.iptItem}>
                                    <Text style={s.iptLabel}>{I18n.t('password')}</Text>
                                    <InputItem
                                        ref='password'
                                        value={this.state.password}
                                        type='password'
                                        onChange={val => {this.setState({password: val})}}
                                        style={s.iptIpt} placeholder={I18n.t('inputPassword')} placeholderTextColor="#adacac"></InputItem>
                                </View>
                            </List>
                            <List style={s.list}>
                                <View style={s.iptItem}>
                                    <Text style={s.iptLabel}>{I18n.t('verificationCode')}</Text>
                                    <InputItem
                                        ref='code'
                                        value={this.state.code}
                                        onChange={val => {this.setState({code: val})}}
                                        style={{...s.iptIpt, width: u.rw(140)}} placeholder={I18n.t('inputVeriCode')} placeholderTextColor="#adacac"></InputItem>
                                    <TouchableOpacity onPress={() => {
                                        this.setState({
                                            capCha: this.state.capCha + '&asd=' + Math.random()
                                        })
                                    }}>
                                        {
                                            this.state.capCha
                                            ? <Image style={s.yzm} resizeMode='stretch' source={{uri: this.state.capCha}}></Image>
                                            : <Text style={s.yzm}>重试</Text>
                                        }
                                        
                                    </TouchableOpacity>
                                </View>
                            </List>
                            {   
                                this.state.isShowLocalUsername && 
                                <ScrollView style={{...s.v1, maxHeight: u.rh(140)}}>
                                    {
                                        this.state.localLoginDataArr.map((item, idx) => {
                                            return (
                                                <View style={s.v2} key={idx}>
                                                    <TouchableOpacity style={{flex: 1}} onPress={() => {
                                                            this.setState({username: item, isShowLocalUsername: false});
                                                        }}>
                                                        <Text style={s.t1}>{item}</Text>
                                                    </TouchableOpacity>
                                                    <TouchableOpacity onPress={() => {
                                                            this.deleteLocalUsername(item)}
                                                        }>
                                                        <Text style={s.t2}>&#xe611;</Text>
                                                    </TouchableOpacity>
                                                </View>
                                            )
                                        })
                                    }
                                </ScrollView>
                            }
                        </View>
                        
                        <View style={s.submitCon}>
                            <TouchableOpacity style={s.submitOp} onPress={this.login}>
                                <ImageBackground style={s.submitOp} source={require('../assets/img/btn.png')}>
                                    <Text style={s.submitText}>{I18n.t('login')}</Text>
                                </ImageBackground>
                            </TouchableOpacity>
                        </View>
                        <View style={{ ...s.rFlex, paddingRight: 5 }}>
                            <TouchableOpacity style={s.btnCon}  onPress={() => {Actions['SCENE_FORGOTPASSWORD']()}}>
                                <Text style={s.opBtnText}>{I18n.t('forgetPassword')}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ImageBackground>
            </KeyboardAvoidingView>
            </ScrollView>
        )
    }
}

const s = StyleSheet.create({
    container: {
        flex: 1,
    },
    backgroundImage: {
        flex: 1,
        width: u.WIDTH,
        height: u.HEIGHT
    },
    rFlex: {
        alignItems: 'flex-end',
        padding: u.rw(12),
        height: u.rh(15),
    },
    btnCon: {
        height: u.rh(50),
    },
    opBtnText: {
        fontSize: 15,
        color: "#ffffff",
    },
    logoCon: {
        marginTop: u.rh(30),
        alignItems: 'center',
    },
    logo: {
        width: u.rw(104),
        height: u.rh(105)
    },
    logo_title: {
        width: u.rw(86),
        height: u.rw(25),
    },
    listCon: {
        marginTop: u.rh(40),
        marginLeft: 'auto',
        marginRight: 'auto'
    },
    list: {
        width: u.rw(305),
        marginTop: u.rh(18)
    },
    iptItem: {
        borderRadius: 5,
        flexDirection: 'row',
        alignItems: 'center',
    },
    iptLabel: {
        width: u.rw(80),
        paddingLeft: u.rw(17),
        textAlign: 'left',
        fontSize: 16,
        color: "#343434"
    },
    iptIpt: {
        height: u.rh(43),
        flex: 1
    },
    submitCon: {
        marginTop: u.rh(50)
    },
    submitOp: {
        width: u.rw(300),
        height: u.rh(40),
        justifyContent: 'center',
    },
    submitText: {
        fontSize: 18,
        color: "#010000",
        textAlign: "center"
    },
    yzm: {
        width: u.rw(66),
        height: u.rh(38),
        marginRight: u.rw(4)
    },
    v1: {
        position: 'absolute',
        width: u.rw(220),
        top: u.rh(62),
        backgroundColor: '#fff',
        left: u.rw(80),
        borderColor: '#f1f1f1',
        borderWidth: 1
    },
    v2: {
        width: u.rw(220),
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomColor: '#f1f1f1',
        borderBottomWidth: 1
    },
    t1: {
        flex: 1,
        fontSize: 16,
        paddingTop: u.rh(6),
        paddingBottom: u.rh(6),
        paddingLeft: u.rw(12),
    },
    t2: {
        fontFamily: 'iconfont',
        fontSize: 18,
        color:'gray',
        paddingRight: u.rw(12),
        paddingLeft: u.rw(12),

    }

})

export default Login