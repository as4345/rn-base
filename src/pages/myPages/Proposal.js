import React, { Component } from 'react'
import { View, Text, ImageBackground, Image,StyleSheet,TouchableOpacity,KeyboardAvoidingView ,Picker,TextInput } from 'react-native'
import { Button, Toast ,InputItem,List} from 'antd-mobile-rn'
import { I18n } from '../../language/I18n'
import Rinput from '../../components/Rinput'
import CountDownBtn from '../../components/CountDownBtn'
import { Scene, Router, ActionConst, Actions } from 'react-native-router-flux'
import * as u from '../../utils'

export default class Proposal extends Component {
    state={
        email : '',
        content : '',
        maxLength : 500,
        activa:false,
    }
    async refor(){
        if(!this.state.email){ Toast.fail('请输入邮箱!',2);return }
        if(!this.state.content){ Toast.fail('请输入反馈内容！',2);return }
        Toast.loading('加载中',20);
        let data = await u.post(u.config.baseUrl + '/common/v1.feedback/collect',{
            contact : this.state.email,
            content : this.state.content,
        })
        Toast.hide()
        if(data.code != 0){
            Toast.fail(data.msg)
            return
        }
        Toast.success(data.msg,2);
        this.setState({
            email : '',
            content : '',
        })

    }
    render() {
        const _this = this.state;
        return (
            <KeyboardAvoidingView>
                <View style={{alignItems:'center'}}>
                    <List style={[styles.FormLayer]}>
                        <Rinput  
                            label={'邮箱'} 
                            placeholder={'请输入邮箱'} 
                            value={_this.email}
                            onChange={(val)=>{ this.setState({email : val}) }}>
                        </Rinput>
                        <View>
                            <Text style={{color:'#353535',fontSize:14,marginTop:u.rw(10)}}>反馈内容 </Text>
                            <View style={{position:'relative'}}>
                                <TextInput
                                    multiline = {true}
                                    numberOfLines = {4}
                                    value={_this.content}
                                    placeholder={'请输入反馈内容(500字以内)'}
                                    style={{height:u.rw(150),borderColor:'#E5E5E5',borderWidth:1,padding:u.rw(10),marginTop:u.rw(10),marginBottom:u.rw(10),textAlignVertical: 'top'}}
                                    onChangeText={(val)=>{ this.setState({content:val})  }}
                                    maxLength={_this.maxLength}
                                    onFocus={()=>{ this.setState({activa:true}) }}
                                    onBlur={()=>{ this.setState({activa:false}) }}
                                />
                                { 
                                    _this.activa && <Text style={{position:'absolute',right:u.rw(15),bottom:u.rw(15),color:'#ccc'}}>{_this.maxLength-(_this.content.length?_this.content.length:0)}</Text>
                                }
                            </View>
                        </View>
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

