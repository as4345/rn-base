import React, { Component } from 'react'
import { View, Text, ImageBackground, Image,StyleSheet,TouchableOpacity,ScrollView } from 'react-native'
import { Button, Toast } from 'antd-mobile-rn'
import { I18n } from '../../language/I18n'
import { Scene, Router, ActionConst, Actions } from 'react-native-router-flux'
import * as u from '../../utils'

export default class SecuritySetting extends Component {
    state={
      
    }
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
    exam(val){
        let value  = '';
        switch(val){
            case '0' : value = '未认证';
            break;
            case '1' : value = '认证中';
            break;
            case '2' : value = '已认证';
            break;
            case '3' : value = '认证失败';
            break;
        }
        return value
    }
    componentDidMount(){
        this.getUserInfo()
    }
    render() {
        const { email,inviteCode,phone,payPasswordState,is_exam } = u.store.userInfo
        const _this = this.state
        return (
            <View style={{flex:1}}>
                <ImageBackground source={require('../../assets/img/mybg.png')} style={{width:u.WIDTH,height:u.rh(250)}}>
                    <View style={[s.topBar]}>
                        <Image source={require('../../assets/img/indexMoney.png')} style={{width:u.rw(55),height:u.rw(55),marginTop:u.rh(85)}}></Image>
                        <Text style={{color:'#fff',marginTop:u.rh(20)}}>{email}</Text>
                        <Text style={{color:'#fff',marginTop:u.rh(10)}}>邀请码：{inviteCode}</Text>
                    </View>
                </ImageBackground>
                <ScrollView style={{flex:1}}>
                <View>
                    <View style={[s.itemBar]}>
                        <Text style={[s.itemTitle]}>安全邮箱</Text>
                        <Text style={[s.itemTip]}>可用于登录，获取节点资产变动通知</Text>
                        <View style={[s.itemBtnlayer]}>
                            <Text  style={[s.itemBarInfo]}>{email}</Text>
                        </View>
                    </View>
                    <View style={[s.itemBar]}>
                        <Text style={[s.itemTitle]}>手机认证</Text>
                        <Text style={[s.itemTip]}>节点更安全更放心</Text>
                        <View style={[s.itemBtnlayer]}>
                            <Text  style={[s.itemBarInfo]}>{phone ? phone : '暂时无绑定手机'}</Text>
                            {
                                !phone && (
                                        <TouchableOpacity onPress={Actions['SCENE_BINDPHONE']}>
                                            <Text style={[s.itemBtnText]}>立即绑定</Text>
                                        </TouchableOpacity>
                                )
                            }
                            
                        </View>
                    </View>
                    <View style={[s.itemBar]}>
                        <Text style={[s.itemTitle]}>登录密码</Text>
                        <Text style={[s.itemTip]}>可用于登录节点，保障节点安全</Text>
                        <View style={[s.itemBtnlayer]}>
                            <Text  style={[s.itemBarInfo]}>*******</Text>
                            <TouchableOpacity onPress={Actions['SCENE_CHANGEPASSWORD']}>
                                <Text style={[s.itemBtnText]}>修改</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={[s.itemBar]}>
                        <Text style={[s.itemTitle]}>交易密码</Text>
                        <Text style={[s.itemTip]}>用户孵化、存入资产、提取资产等操作、保障节点安全</Text>
                        <View style={[s.itemBtnlayer]}>
                            <Text  style={[s.itemBarInfo]}>{payPasswordState ? '已设置':'暂未设置'}</Text>
                            <TouchableOpacity onPress={Actions[payPasswordState ? 'SCENE_CHANGETRANSACTIONPASSWORD' :'SCENE_SETTRANSACTIONPASSWORD']}>
                                <Text style={[s.itemBtnText]}>{payPasswordState ? '修改' : '立即设置'}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={[s.itemBar]}>
                        <Text style={[s.itemTitle]}>实名认证</Text>
                        <Text style={[s.itemTip]}>用户注册账号后，需要完成实名认证，才能进行孵化</Text>
                        <View style={[s.itemBtnlayer]}>
                            <Text  style={[s.itemBarInfo]}>{this.exam(is_exam)}</Text>
                            <TouchableOpacity onPress={Actions['SCENE_CERTIFICATION']}>
                                <Text style={[s.itemBtnText]}>实名认证</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                </ScrollView>
            </View>
        )
    }
}
const s = StyleSheet.create({
    topBar:{
        alignItems:'center',
    },
    assetsLayer:{
        width:u.rw(350),
        flexDirection:'row',
        backgroundColor:'#fff',
        marginTop:u.rh(20),
        paddingTop:u.rh(15),
        paddingBottom:u.rh(10),
    },
    itemBar:{
        backgroundColor : '#fff',
        marginBottom:u.rh(10),
    },
    itemTitle:{
        fontSize:15,
        color:'#000',
        padding:u.rh(10)
    },
    itemTip:{
        fontSize:13,
        color:'#999999',
        padding:u.rh(10),
        borderBottomColor:'#EEEEEE',
        borderBottomWidth:1,
    },
    itemBtnlayer:{
        flexDirection:'row',
        padding:u.rh(10),
        justifyContent:'space-between',
    },
    itemBarInfo:{
        fontSize:15,
        color:'#000000',
    },
    itemBtnText:{
        fontSize:15,
        color:'#DCB125',
    }
})

