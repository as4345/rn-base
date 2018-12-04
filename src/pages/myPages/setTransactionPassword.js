import React, { Component } from 'react'
import { View, Text, ImageBackground, Image,StyleSheet,TouchableOpacity,KeyboardAvoidingView  } from 'react-native'
import { Button, Toast ,InputItem,List} from 'antd-mobile-rn'
import { I18n } from '../../language/I18n'
import Rinput from '../../components/Rinput'
import CountDownBtn from '../../components/CountDownBtn'
import { Scene, Router, ActionConst, Actions } from 'react-native-router-flux'
import * as u from '../../utils'
import { observer } from "mobx-react"
@observer
export default class setTransactionPassword extends Component {
    state={
        password : '',
        repassword : '',
        emailcode : ''
    }
    async refor(){
        const _this = this.state;
        if(!_this.password){ Toast.fail('请输入交易密码',2); return}
        if(!_this.repassword){ Toast.fail('请输入确定密码',2); return}
        if(!_this.emailcode){ Toast.fail('请输入邮箱验证码',2); return}
        if(_this.password!=_this.repassword){ Toast.fail('两次密码必须一致',2); return}
        Toast.loading('加载中',20)
        let data = await u.post(u.config.baseUrl+'/common/v1.user/setPayPassword',{
            password : _this.password,
            repassword : _this.repassword,
            emailcode : _this.emailcode,
        })
        Toast.hide()
        if(data.code != 0){
            Toast.fail(data.msg, 2)
            return
        }
        Toast.success('设置成功',2);
        this.getUserInfo();

        
    }
    async getCode(){
        const _this = this.state;
        Toast.loading('加载中',20)
        let data = await u.post(u.config.baseUrl+'/common/v1.user/getEmailCaptcha')
        Toast.hide()
        if (data.code != 0) {
            Toast.fail(data.msg, 2)
            return 
        }
        this.refs.code.timeOut()
        Toast.success(data.msg, 2)
    }
    getUserInfo = async () => {
        Toast.loading('加载中', 20)
        const res = await u.post(u.config.baseUrl + '/common/v1.user/getUserInfo')
        Toast.hide()
        if (res.code != 0) {
            Toast.fail(res.msg, 2)
            return 
        }
        u.store.setUserInfo(res.data)
        Actions.pop()
    }
    render() {
        const _this = this.state;
        return (
            <KeyboardAvoidingView>
                <View style={{alignItems:'center'}}>
                    <List style={[styles.FormLayer]}>
                        <Rinput  
                            label={'交易密码'} 
                            placeholder={'请确认新交易密码'}  
                            value={_this.password}
                            onChange={(val)=>{ this.setState({password : val}) }}
                            type="password">
                        </Rinput>
                        <Rinput  
                            label={'确认新密码'} 
                            placeholder={'请确认新交易密码'} 
                            value={_this.repassword}
                            onChange={(val)=>{ this.setState({repassword : val}) }}
                            type="password">
                        </Rinput>
                        <Rinput  
                            label={'邮箱验证码'}  
                            placeholder={'请输入验证码'}
                            RightItem={<CountDownBtn ref="code" text={'点击获取'} start={()=>{ this.getCode() }}></CountDownBtn>} 
                            value={_this.emailcode}
                            onChange={(val)=>{ this.setState({emailcode : val}) }}>
                        </Rinput>
                    </List>
                    <Button  onClick={()=>{ this.refor() }} activeStyle={{opacity:0.2,backgroundColor:'#fff'}} style={[styles.button]} >提交</Button>  
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

