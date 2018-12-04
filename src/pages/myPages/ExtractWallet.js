import React, { Component } from 'react'
import { View, Text, ImageBackground, Image,StyleSheet,TouchableOpacity,KeyboardAvoidingView,Picker ,ScrollView } from 'react-native'
import { Button, Toast ,InputItem,List,Switch} from 'antd-mobile-rn'
import { I18n } from '../../language/I18n'
import Rinput from '../../components/Rinput'
import CountDownBtn from '../../components/CountDownBtn'

import * as u from '../../utils'

export default class ExtractWallet extends Component {
    state={
        addressList:[],
        types:[],
        type:'',
        addressId:'',
        withdrawBalance : '',
        num : '',
        trueNum : '',
        payPassword : '',
        code : '',
        nickName:'',
    }
    async getAddressList(){  //
        Toast.loading('加载中',20);
        let data = await u.post(u.config.baseUrl+'/asset/v1.assets/getWalletaddressList')
        Toast.hide();
        if(data.code != 0 ){
            Toast.fail(data.msg,2)
            return
        }
        this.setState({
            addressList : data.data
        },()=>{
            if(!this.props.id){
                for(let i = 0; i < this.state.addressList.length; i++){
                    let item = this.state.addressList[i];
                    if(item.default){
                        this.setState({
                            addressId : item.id,
                            type : item.type
                        },()=>{
                            if(this.state.type == 2){
                                this.getNickName()
                            }
                        })
                    }
                }
            }
        })
        console.log(data);
    }
    async getTypes(){
        Toast.loading('加载中',20)
        let data = await u.post(u.config.baseUrl+'/asset/v1.assets/getWithdrawChannelList')
        Toast.hide();
        console.log(data);
        if(data.code!=0){
            Toast.fail(data.msg, 2);
            return
        }
        this.setState({types:data.data})
    }
    async getAssets(){
        // Toast.loading('加载中',20)
        let data = await u.post(u.config.baseUrl+'/asset/v1.assets/getAssets')
        // Toast.hide();
        // console.log(data);
        if(data.code!=0){
            Toast.fail(data.msg, 2);
            return
        }
        this.setState({withdrawBalance:data.data.withdrawBalance})
    }
    async getNickName(){
        Toast.loading('加载中',20)
        let data = await u.get(u.config.baseUrl + '/asset/v1.assets/checkWalletaddress',{
            params: {
                addressId :this.state.addressId
            }
          })
        Toast.hide();
        console.log(this.state.addressId);
        if(data.code!=0){
            Toast.fail(data.msg, 2);
            return
        }
        this.setState({
            nickName : data.data.nickname
        })

    }
    changeAddress(item,index){
        this.setState({
            addressId: item,
            type : index  == 0 ? index : this.state.addressList[index-1].type
        },()=>{
            if(this.state.type == 2){
                this.getNickName()
            }
        })
    }
    async submit(){
       if(!this.state.addressId){Toast.fail('请选择地址!',2);return}
       if(!this.state.num){Toast.fail('请输入提币数量!',2);return}
       if(this.state.num < 1000){ Toast.fail('数量不能小于1000！',2); return }
       if(!this.state.payPassword){Toast.fail('请输入交易密码!',2);return}
       if(!this.state.code){Toast.fail('请输入邮箱验证码!',2);return}
       Toast.loading('加载中',20)
       let data = await u.post(u.config.baseUrl + '/asset/v1.assets/withdraw',{
        payPassword: this.state.payPassword,
        emailcode : this.state.code,
        withdrawalamount: this.state.num,
        withdrawalAddressId: this.state.addressId,
       })
       Toast.hide();
        console.log(this.state.addressId);
        if(data.code!=0){
            Toast.fail(data.msg, 2);
            return
        }
        
        this.getAssets()
        this.setState({
            code : '',
            payPassword : '',
            num : '',
            trueNum : ''
        })
        Toast.success(data.msg, 2);

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
    componentDidMount(){
        this.setState({
            type : this.props.type ? this.props.type :'' ,
            addressId : this.props.id ? this.props.id : '',
        },()=>{
            if(this.props.type == 2){
                this.getNickName()
            }
        })
        
        this.getAssets();
        this.getTypes();
        this.getAddressList();
        
    }
    render() {
        return (
            <ScrollView >
            <KeyboardAvoidingView>
                <View style={{alignItems:'center'}}>
                    <List style={[styles.FormLayer]}>
                        <Rinput  
                            label={'提币地址'}   
                            content={<Picker
                                selectedValue={this.state.addressId}
                                style={{ height: u.rh(45),marginLeft:u.rw(10)}}
                                onValueChange={(itemValue, itemIndex) => {  this.changeAddress(itemValue,itemIndex)   }}>
                                <Picker.Item label="请选择" value="" />
                                {
                                    this.state.addressList.map((item,index)=>{
                                            return <Picker.Item label={item.label + ":" + item.address.substr(0,6)+'****'+item.address.substr(item.address.length-4)} value={item.id} key={index} />
                                    })
                                }
                                </Picker>}
                                >
                        </Rinput>
                        <Rinput  
                            label={'提币通道'}   
                            content={<Picker
                                selectedValue={this.state.type}
                                style={{ height: u.rh(45),marginLeft:u.rw(10)}}
                                enabled={false}
                                onValueChange={(itemValue, itemIndex) => this.setState({type: itemValue})}>
                                {
                                    this.state.types.map((item,index)=>{
                                            return <Picker.Item label={item.name} value={item.id}   key={index}/>
                                    })
                                }
                                </Picker>}
                                >
                        </Rinput>
                        {
                            this.state.type == 2 &&  <Rinput label={'交易所账号'} placeholder={ this.state.nickName} editable={true}   ></Rinput>
                        }
                        
                        <Rinput label={'提币数量'} placeholder={'余额 '+ parseFloat(this.state.withdrawBalance*0.9).toFixed(2) }  value={this.state.num}  
                                onChange={(val)=>{ this.setState({
                                                            num : val,
                                                            trueNum : parseFloat(val*0.9).toFixed(2)
                                                            }) }}  >
                        </Rinput>
                        <Rinput 
                            label={'实际到币量'} 
                            placeholder={'0.00'}  
                            value={this.state.trueNum} 
                            editable={true} >
                        </Rinput>
                        <Rinput 
                            label={'交易密码'} 
                            placeholder={'请输入交易密码'}  
                            value={this.state.payPassword} 
                            onChange={(val)=>{ this.setState({payPassword : val}) }}
                            type="password" >
                        </Rinput>
                        <Rinput 
                            label={'邮箱验证码'} 
                            placeholder={'请输入验证码'}  
                            value={this.state.code} onChange={()=>{ this.setState({code : val}) }} 
                            RightItem={<CountDownBtn ref="code" start={()=>{this.getCode()}} text={'点击获取'} ></CountDownBtn>} 
                            value={this.state.code} 
                            onChange={(val)=>{ this.setState({code : val}) }}>
                        </Rinput>
                        
                        
                    </List>
                    
                    <Button  onClick={()=>{ this.submit() }} activeStyle={{opacity:0.2,backgroundColor:'#fff'}} style={[styles.button]}>提交</Button>  
                    <View style={styles.tipLayer}>
                        <Text style={[styles.tipText]}>提币说明：</Text>  
                        <Text style={[styles.tipText]}>提币时间:</Text>   
                        <Text style={[styles.tipText]}>提现需人工审核，T+1到账。</Text>
                        <Text style={[styles.tipText]}>手续费说明：</Text>
                        <Text style={[styles.tipText]}>＜1000 FER时，不能进行提现操作，只能使用平台交易功能进行交易。</Text>    
                        <Text style={[styles.tipText]}>≥1000 FER时，每次收取10%手续费。。</Text>   
                    </View>
                    <View style={styles.tipLayer}>
                        <Text style={{color:'#4D4D4D',lineHeight:17,fontSize:12,}}>温馨提示：</Text>
                        <Text style={{color:'#4D4D4D',lineHeight:17,fontSize:12,}}>区块链转账是不可逆转的，由自身原因导致提币地址错误的，自身承担相应损失。</Text>
                        <Text style={{color:'#4D4D4D',lineHeight:17,fontSize:12,}}>转入是自动的，转币需要整个网络进行确认，达到三个确认后您的币会自动转入到您的账户中。</Text>
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
        marginBottom:u.rh(20),
    },
    tipText:{
        color:'#E60012',
        fontSize: 13,
        lineHeight : u.rh(23),
    }
})

