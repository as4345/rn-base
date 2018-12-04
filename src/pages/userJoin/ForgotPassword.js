import React, { Component } from 'react'
import { View, Text, ImageBackground, Image,StyleSheet,TouchableOpacity,KeyboardAvoidingView, StatusBar  } from 'react-native'
import { Button, Toast ,InputItem,List} from 'antd-mobile-rn'
import { I18n } from '../../language/I18n'
import Rinput from '../../components/Rinput'
import CountDownBtn from '../../components/CountDownBtn'
import { Scene, Router, ActionConst, Actions } from 'react-native-router-flux'
import * as u from '../../utils'

export default class ForgotPassword extends Component {
    state={
        email:'',
        password : '',
        repassword : '',
        emailcode : '',
    }
    async getCode(){
        const _this = this.state;
        if(!_this.email){ Toast.fail('请输入邮箱', 2); return }
        let data = await u.post(u.config.baseUrl+'/common/v1.system/getEmailCaptcha',{
            email : _this.email,
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
        if(!_this.password){ Toast.fail('请输入登录密码', 2); return }
        if(!_this.repassword){ Toast.fail('请输入确定密码', 2); return }
        if(!_this.emailcode){ Toast.fail('请输入验证码', 2); return }
        if(_this.password != _this.repassword){ Toast.fail('两次密码必须一致', 2); return }
        Toast.loading('加载中',20)
        let data = await u.post(u.config.baseUrl+'/common/v1.system/forgetPassword',{
            email : _this.email,
            password : _this.password,
            repassword : _this.repassword,
            emailcode : _this.emailcode,
        })
        Toast.hide()
        if (data.code != 0) {
            Toast.fail(data.msg, 2)
            return 
        }
        Toast.success(data.msg, 2)
        Actions['SCENE_LOGIN']()
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
                            onChange={(val)=>{ this.setState({email : val}) }}
                                >
                        </Rinput>
                        <Rinput  
                            type={"password"}
                            placeholder={'请输入新密码'} 
                            label={'密码'} 
                            value={_this.password}
                            onChange={(val)=>{ this.setState({password:val}) }}>
                        </Rinput>
                        <Rinput  
                            type={"password"}
                            placeholder={'请再次输入密码'} 
                            label={'确认密码'} 
                            value={_this.repassword}
                            onChange={(val)=>{ this.setState({repassword:val}) }}>
                        </Rinput>
                        <Rinput  
                            placeholder={'请输入验证码'} 
                            label={'邮箱验证码'} 
                            RightItem={<CountDownBtn ref="code" text={'点击获取'}  start={()=> { this.getCode() }} ></CountDownBtn>} 
                            value={_this.emailcode}
                            onChange={(val)=>{this.setState({emailcode:val})}} >
                        </Rinput>
                    </List>
                    <Button  onClick={()=>{ this.refor() }} activeStyle={{opacity:0.2,backgroundColor:'#fff'}} style={[styles.button]} >立即找回</Button>  
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

