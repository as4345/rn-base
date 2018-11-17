import React, { Component } from 'react'
import { View, Text, ImageBackground, Image,StyleSheet,TouchableOpacity,KeyboardAvoidingView  } from 'react-native'
import { Button, Toast ,InputItem,List} from 'antd-mobile-rn'
import { I18n } from '../../language/I18n'
import Rinput from '../../components/Rinput'
import CountDownBtn from '../../components/CountDownBtn'

import * as u from '../../utils'

export default class TotalAssets extends Component {
    state={

    }
    render() {
        return (
            <KeyboardAvoidingView>
                <View style={{alignItems:'center'}}>
                    <List style={[styles.FormLayer]}>
                        <Rinput  
                            placeholder={'1852322323@163.com'} 
                            label={'我的节点'}   
                            editable={true}
                            // value={this.state.a}
                            // onChange={(val)=>{
                            //     this.setState({a : val})
                            //     console.log(this.state.a)}}
                                >
                            </Rinput>
                        <Rinput  placeholder={'38501.58628566'} label={'算力总资产'} editable={true} ></Rinput>
                        <Rinput  placeholder={'25人'} label={'节点人数'} editable={true} ></Rinput>
                    </List>
                    <Button activeStyle={{opacity:0.2,backgroundColor:'#fff'}} style={[styles.button]}>查看邀请记录</Button>  
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

