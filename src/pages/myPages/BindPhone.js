import React, { Component } from 'react'
import { View, Text, ImageBackground, Image,StyleSheet,TouchableOpacity,KeyboardAvoidingView  } from 'react-native'
import { Button, Toast ,InputItem,List} from 'antd-mobile-rn'
import { I18n } from '../../language/I18n'
import Rinput from '../../components/Rinput'
import CountDownBtn from '../../components/CountDownBtn'

import * as u from '../../utils'

export default class BindPhone extends Component {
    state={

    }
    render() {
        return (
            <KeyboardAvoidingView>
                <View style={{alignItems:'center'}}>
                    <List style={[styles.FormLayer]}>
                        {/* <Rinput  label={'新交易密码'} placeholder={'请确认新交易密码'}  ></Rinput> */}
                        <Rinput  label={'手机号'} placeholder={'请输入手机号'} ></Rinput>
                        <Rinput  label={'验证码'}  placeholder={'请输入验证码'}RightItem={<CountDownBtn text={'点击获取'} ></CountDownBtn>} ></Rinput>
                    </List>
                    <Button activeStyle={{opacity:0.2,backgroundColor:'#fff'}} style={[styles.button]} >提交</Button>  
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

