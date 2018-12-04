import React, { Component } from 'react'
import { View, Text, ImageBackground, Image,StyleSheet,TouchableOpacity,KeyboardAvoidingView, StatusBar  } from 'react-native'
import { Button, Toast ,InputItem,List} from 'antd-mobile-rn'
import { I18n } from '../../language/I18n'
import Rinput from '../../components/Rinput'
import CountDownBtn from '../../components/CountDownBtn'
import { Scene, Router, ActionConst, Actions } from 'react-native-router-flux'
import * as u from '../../utils'

export default class register extends Component {
    state={
      email : '',
      password : '',
      rePassword : '',
      code : '',
      inviteCode : '',

    }
    async getCode(){
        const _this = this.state;
        if(!_this.email){ Toast.fail('请输入邮箱', 2); return }
        let data = await u.post(u.config.baseUrl+'/common/v1.system/getEmailCaptcha',{
            email : _this.email,
            type : 'reg'
        })
        if (data.code != 0) {
            Toast.fail(data.msg, 2)
            return 
        }
        this.refs.code.timeOut()
        Toast.success(data.msg, 2)
    }
    async refor(){
        const _this = this.state;
        if(!_this.email){ Toast.fail('请输入邮箱', 2); return }
        if(!_this.code){ Toast.fail('请输入验证码', 2); return }
        if(!_this.password){ Toast.fail('请输入登录密码', 2); return }
        if(!_this.rePassword){ Toast.fail('请输入确定密码', 2); return }
        if(_this.password != _this.rePassword){ Toast.fail('两次密码必须一致', 2); return }
        Toast.loading('加载中',20)
        let data = await u.post(u.config.baseUrl+'/common/v1.register/user',{
            username : _this.email,
            password : _this.password,
            repassword : _this.rePassword,
            type : 'email',
            agreed : '1',
            client_secret : 'jNv8YgpOeFRas1Pa4Fn6FmWkIefNGlylwkTPTVQr',
            client_id : '1',
            inviteCode : _this.inviteCode,
            code : _this.code,
        })
        console.log(data)
        Toast.hide()
        if (data.code != 0) {
            Toast.fail(data.msg, 2)
            return 
        }
        Toast.success('注册成功',2);
        Actions.push('SCENE_LOGIN');
    }
    render() {
        const _this = this.state
        return (
            <KeyboardAvoidingView>
                <StatusBar
                    animated={true} //指定状态栏的变化是否应以动画形式呈现。目前支持这几种样式：backgroundColor, barStyle和hidden
                    hidden={false}  //是否隐藏状态栏。
                    backgroundColor='#000' //状态栏的背景色
                    translucent={false}//指定状态栏是否透明。设置为true时，应用会在状态栏之下绘制（即所谓“沉浸式”——被状态栏遮住一部分）。常和带有半透明背景色的状态栏搭配使用。
                    barStyle='light-content'
                />
                <View style={{alignItems:'center'}}>
                    <List style={[styles.FormLayer]}>
                        <Rinput  
                            placeholder={'请输入邮箱'} 
                            label={'邮箱'}   
                            value={_this.email}
                            onChange={(val)=>{
                                this.setState({email : val})
                            }}>
                        </Rinput>
                        <Rinput  
                            placeholder={'请输入验证码'}
                            label={'验证码'} 
                            RightItem={<CountDownBtn  ref='code' text={'点击获取'} start={()=>{ this.getCode() }}  ></CountDownBtn>}
                            value={_this.code}
                            onChange={(val)=>{ this.setState({code : val}) }}>
                        </Rinput>
                        <Rinput  
                            placeholder={'请输入邀请码'} 
                            label={'邀请码'} 
                            value={_this.inviteCode}
                            onChange={(val)=>{this.setState({inviteCode:val})}}>
                        </Rinput>
                        <Rinput  
                            placeholder={'请输入密码'} 
                            label={'登录密码'} 
                            value={_this.password}
                            onChange={(val)=>{this.setState({password:val})}}
                            type={'password'}>
                        </Rinput>
                        <Rinput  
                            placeholder={'请再次输入密码'} 
                            label={'确认密码'} 
                            value={_this.rePassword}
                            onChange={(val)=>{this.setState({rePassword:val})}}
                            type={'password'}></Rinput>
                    </List>
                    <Button activeStyle={{opacity:0.2,backgroundColor:'#fff'}}  onClick={()=>{ this.refor()}} style={[styles.button]} >立即注册</Button>  
                </View>
            </KeyboardAvoidingView>
        )
    }
}
const styles = StyleSheet.create({
    FormLayer:{
        width:u.WIDTH,
        marginTop:u.rh(10),
        backgroundColor: '#fff',
        paddingLeft:u.rw(13),
        paddingRight:u.rw(13),
    },
    itemLayer:{
        flexDirection:'row',
        alignItems:'center',
        borderBottomColor:'#E5E5E5',
        borderBottomWidth:1,
    },
    button:{
        width:u.rw(300),
        backgroundColor:'#DCB125',
        borderRadius:u.rw(20),
        marginTop:u.rh(50),
    }
})

