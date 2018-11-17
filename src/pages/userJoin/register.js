import React, { Component } from 'react'
import { View, Text, ImageBackground, Image,StyleSheet,TouchableOpacity,KeyboardAvoidingView  } from 'react-native'
import { Button, Toast ,InputItem,List} from 'antd-mobile-rn'
import { I18n } from '../../language/I18n'
import Rinput from '../../components/Rinput'
import CountDownBtn from '../../components/CountDownBtn'

import * as u from '../../utils'

export default class register extends Component {
    state={
      a:'131'
    }
    render() {
        return (
            <KeyboardAvoidingView>
                <View style={{alignItems:'center'}}>
                    <List style={[styles.FormLayer]}>
                        <Rinput  
                            placeholder={'请输入邮箱'} 
                            label={'邮箱'}   
                            
                            value={this.state.a}
                            onChange={(val)=>{
                                this.setState({a : val})
                                console.log(this.state.a)
                            }}></Rinput>
                        <Rinput  placeholder={'请输入验证码'} label={'验证码'} RightItem={<CountDownBtn text={'点击获取'} ></CountDownBtn>}></Rinput>
                        <Rinput  placeholder={'请输入邀请码'} label={'邀请码'} ></Rinput>
                        <Rinput  placeholder={'请输入密码'} label={'登录密码'} ></Rinput>
                        <Rinput  placeholder={'请再次输入密码'} label={'确认密码'} ></Rinput>
                    </List>
                    <Button activeStyle={{opacity:0.2,backgroundColor:'#fff'}} style={[styles.button]} >立即注册</Button>  
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

