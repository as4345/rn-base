import React, { Component } from 'react'
import { View, Text, ImageBackground, Image,StyleSheet,TouchableOpacity,KeyboardAvoidingView  } from 'react-native'
import { Button, Toast ,InputItem,List,Switch} from 'antd-mobile-rn'
import { I18n } from '../../language/I18n'
import Rinput from '../../components/Rinput'
import CountDownBtn from '../../components/CountDownBtn'

import * as u from '../../utils'

export default class AddWallet extends Component {
    state={
        switch : true,
    }
    render() {
        return (
            <KeyboardAvoidingView>
                <View style={{alignItems:'center'}}>
                    <List style={[styles.FormLayer]}>
                        <Rinput  
                            placeholder={'请输入接收钱包'} 
                            label={'钱包'}   
                           
                            // value={this.state.a}
                            // onChange={(val)=>{
                            //     this.setState({a : val})
                            //     console.log(this.state.a)}}
                                >
                            </Rinput>
                        <Rinput label={'标签'} placeholder={'请输入标签'}   ></Rinput>
                        <Rinput label={'交易密码'} placeholder={'请输入交易密码'}  ></Rinput>
                        <Rinput label={'邮箱验证码'} placeholder={'请输入验证码'}  ></Rinput>
                    </List>
                    <List style={[styles.FormLayer]}>
                        <Rinput   label={'设为默认地址'} editable={true} RightItem={<Switch  checked={this.state.switch}
                         onChange={
                             (val)=>{
                                 this.setState({
                                     switch:val
                                    })
                                }
                             } />} ></Rinput>
                    </List>
                    <Button activeStyle={{opacity:0.2,backgroundColor:'#fff'}} style={[styles.button]}>提交</Button>  
                    <View style={styles.tipLayer}>
                        <Text style={[styles.tipText]}>注：  </Text>   
                        <Text style={[styles.tipText]}>孵化器安全领域做出重要升级，以更加确保节点的权益安全。</Text>
                        <Text style={[styles.tipText]}>1.孵化期提取资产地址请选任意一交易地址进行绑定，并作为您的唯一提取资产地址。 </Text>
                        <Text style={[styles.tipText]}>2.每周可更换一次提取资产地址，更换提取资产地址后24小时不可提取资产。</Text>    
                        <Text style={[styles.tipText]}>3.区块链转账是不可逆转的，由自身原因导致提取资产地址错误的，自身承担相应损失。</Text>    
                    </View>
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
    },
    tipLayer:{
        marginTop:u.rh(20),
        paddingLeft:u.rw(13),
        paddingRight:u.rw(13),
    },
    tipText:{
        color:'#E60012',
        fontSize: 13,
        lineHeight : u.rh(23),
    }
})

