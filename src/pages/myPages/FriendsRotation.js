import React, { Component } from 'react'
import { View, Text, ImageBackground, Image,StyleSheet,TouchableOpacity,KeyboardAvoidingView,Picker ,ScrollView } from 'react-native'
import { Button, Toast ,InputItem,List,Switch} from 'antd-mobile-rn'
import { I18n } from '../../language/I18n'
import Rinput from '../../components/Rinput'
import CountDownBtn from '../../components/CountDownBtn'
import { Scene, Router, ActionConst, Actions } from 'react-native-router-flux'
import * as u from '../../utils'

export default class FriendsRotation extends Component {
    state={
        balance : 0,
        friendsAddress : '',
        transferamount : '',
        payPassword : '',
    }
    async getAssets(){
        Toast.loading('加载中',20)
        let data = await u.post(u.config.baseUrl+'/asset/v1.assets/getAssets')
        console.log(data);
        Toast.hide()
        if(data.code != 0){
            Toast.fail(data.msg, 2)
            return
        }
        this.setState({ balance : data.data.balance})
    }
    async refor(){  
        const _this = this.state;
        if(!_this.friendsAddress){ Toast.fail('请输入地址',2) ; return }
        if(!_this.transferamount){ Toast.fail('请输入金额',2); return }
        if(!_this.payPassword){ Toast.fail('请输入交易密码',2); return }

        Toast.loading('加载中',20)
        let data = await u.post(u.config.baseUrl+'/asset/v1.assets/transfer',{
            friendsAddress : _this.friendsAddress,
            transferamount : _this.transferamount,
            payPassword : _this.payPassword,
        })
        console.log(data);
        Toast.hide()
        if(data.code != 0){
            Toast.fail(data.msg,2)
            return
        }
        Toast.success('转账成功',2)
        Actions.pop()
    }
    componentDidMount(){
        this.getAssets()
    }
    render() {
        const _this = this.state
        return (
            <ScrollView>
            <KeyboardAvoidingView>
                <View style={{alignItems:'center'}}>
                    <List style={[styles.FormLayer]}>
                        <Rinput 
                            label={'地址'} 
                            placeholder={'请输入地址'}  
                            value={_this.friendsAddress}
                            onChange={(val)=>{this.setState({friendsAddress:val})}}>
                        </Rinput>
                        <Rinput 
                            label={'数量'} 
                            placeholder={'余额'+ parseFloat(_this.balance).toFixed(2)}
                            value={_this.transferamount}
                            onChange={(val)=>{this.setState({transferamount:val})}}>
                        </Rinput>
                        <Rinput 
                            label={'交易密码'} 
                            placeholder={'请输入交易密码'} 
                            type={"password"} 
                            value={_this.payPassword}
                            onChange={(val)=>{this.setState({payPassword:val})}}>
                        </Rinput>
                    </List>
                    <Button  onClick={()=>{ this.refor() }} activeStyle={{opacity:0.2,backgroundColor:'#fff'}} style={[styles.button]}>提交</Button>  
                    <View style={[styles.tipLayer,{alignSelf:'flex-start'}]}>
                        <Text style={[styles.tipText,{textAlign: 'left'}]}>说明：</Text>   
                        <Text style={[styles.tipText,{textAlign: 'left'}]}>转账获得的FER币必须孵化完成后，才能提币。</Text>   
                        <Text style={[styles.tipText,{textAlign: 'left'}]}>理财利息与团队分红获得的FER币，可以正常提币。</Text>   
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

