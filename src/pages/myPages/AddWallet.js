import React, { Component } from 'react'
import { View, Text, ImageBackground, Image,StyleSheet,TouchableOpacity,KeyboardAvoidingView ,Picker } from 'react-native'
import { Button, Toast ,InputItem,List,Switch} from 'antd-mobile-rn'
import { I18n } from '../../language/I18n'
import Rinput from '../../components/Rinput'
import CountDownBtn from '../../components/CountDownBtn'
import { Scene, Router, ActionConst, Actions } from 'react-native-router-flux'
import * as u from '../../utils'

export default class AddWallet extends Component {
    state={
        switch : true,
        types : [],
        withdrawalAddress : '',
        label : '',
        payPassword : '',
        emailcode : '',
        withdrawaltype : ''
    }
    async getTypes(){
        Toast.loading('加载中',20)
        let data = await u.post(u.config.baseUrl+'/asset/v1.assets/getWithdrawChannelList')
        Toast.hide();
        console.log(data);
        if(data.code!=0){
            Toast.fail(data.msg);
            return
        }

        this.setState({types:data.data})
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
    async refor(){
        const _this = this.state;
        if(!_this.withdrawaltype){ Toast.fail('请选择通道!',2);return }
        if(!_this.withdrawalAddress){ Toast.fail('请输入钱包地址！',2);return }
        if(!_this.label){ Toast.fail('请输入标签!', 2);return }
        if(!_this.payPassword){ Toast.fail('请输入交易密码！',2);return }
        if(!_this.emailcode){ Toast.fail('请输入邮箱验证码!',2);return }
        Toast.loading('正在提交',20)
        let obj = {
            withdrawaltype : _this.withdrawaltype,
            withdrawalAddress : _this.withdrawalAddress,
            label : _this.label,
            payPassword : _this.payPassword,
            emailcode : _this.emailcode,
            default : _this.switch ? 1 : 0,
        };
        console.log(obj)
        let data = await u.post(u.config.baseUrl+'/asset/v1.assets/bindWithdrawaddress',obj)
        Toast.hide()
        if(data.code != 0){
            Toast.fail(data.msg, 2)
            return
        }
        Toast.success(data.msg, 2);
        Actions.push('SCENE_WALLETADMIN')

    }
    componentDidMount(){
        this.getTypes();
    }
    render() { // /asset/v1.assets/getWithdrawChannelList  /asset/v1.assets/bindWithdrawaddress
        return (
            <KeyboardAvoidingView>
                <View style={{alignItems:'center'}}>
                    <List style={[styles.FormLayer]}>
                        <Rinput   
                            label={'提币通道'}   
                            content={<Picker
                                        selectedValue={this.state.withdrawaltype}
                                        style={{ height: u.rh(45),marginLeft:u.rw(10)}}
                                        onValueChange={(itemValue, itemIndex) => this.setState({withdrawaltype: itemValue})}>
                                        <Picker.Item label='请选择' value=''  />
                                        {
                                            this.state.types.map((item,index)=>{
                                                return <Picker.Item label={item.name} value={item.id} key={index} />
                                            })
                                        }
                                        
                                    </Picker>}>
                        </Rinput> 
                        <Rinput  
                            placeholder={'请输入接收钱包'} 
                            label={'钱包'}   
                            value={this.state.withdrawalAddress}
                            onChange={(val)=>{
                                this.setState({withdrawalAddress : val})}}
                                >
                            </Rinput>
                        <Rinput 
                            label={'标签'} 
                            placeholder={'请输入标签'}
                            value={this.state.label}
                            onChange={(val)=>{
                                this.setState({label : val})}}>
                        </Rinput>
                        <Rinput 
                            label={'交易密码'} 
                            placeholder={'请输入交易密码'} 
                            value={this.state.payPassword}
                            type="password"
                            onChange={(val)=>{
                                this.setState({payPassword : val})}} ></Rinput>
                        <Rinput  
                            label={'邮箱验证码'}  
                            placeholder={'请输入验证码'}
                            RightItem={<CountDownBtn ref="code" text={'点击获取'} start={()=>{ this.getCode() }} ></CountDownBtn>} 
                            value={this.state.emailcode}
                            onChange={(val)=>{ this.setState({emailcode : val}) }}>
                        </Rinput>
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
                    <Button onClick={()=>{ this.refor() }} activeStyle={{opacity:0.2,backgroundColor:'#fff'}} style={[styles.button]}>提交</Button>  
                    <View style={styles.tipLayer}>
                        <Text style={[styles.tipText]}>温馨提示：  </Text>   
                        <Text style={[styles.tipText]}>区块链转账是不可逆转的，由自身原因导致提币地址错误的，自身承担相应损失。</Text>
                        <Text style={[styles.tipText]}>转入是自动的，转币需要整个网络进行确认，达到三个确认后您的币会自动转入到您的账户中。 </Text>
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
        marginBottom: u.rh(20),
    },
    tipText:{
        color:'#E60012',
        fontSize: 13,
        lineHeight : u.rh(23),
    }
})

