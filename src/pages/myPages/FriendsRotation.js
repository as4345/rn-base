import React, { Component } from 'react'
import { View, Text, ImageBackground, Image,StyleSheet,TouchableOpacity,KeyboardAvoidingView,Picker ,ScrollView } from 'react-native'
import { Button, Toast ,InputItem,List,Switch} from 'antd-mobile-rn'
import { I18n } from '../../language/I18n'
import Rinput from '../../components/Rinput'
import CountDownBtn from '../../components/CountDownBtn'

import * as u from '../../utils'

export default class FriendsRotation extends Component {
    state={
      
    }
    render() {
        return (
            <ScrollView>
            <KeyboardAvoidingView>
                <View style={{alignItems:'center'}}>
                    <List style={[styles.FormLayer]}>
                        <Rinput label={'地址'} placeholder={'请输入地址'}    ></Rinput>
                        <Rinput label={'数量'} placeholder={'请输入数量'} ></Rinput>
                        <Rinput label={'交易密码'} placeholder={'请输入交易密码'}  ></Rinput>
                    </List>
                    <Button activeStyle={{opacity:0.2,backgroundColor:'#fff'}} style={[styles.button]}>提交</Button>  
                    <View style={styles.tipLayer}>
                        <Text style={[styles.tipText,{textAlign: 'left'}]}>说明：内部互转不经过网络节点，不需要交易手续费</Text>   
                    </View>
                </View>
            </KeyboardAvoidingView>
            </ScrollView>
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
        marginTop:u.rh(20),
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

