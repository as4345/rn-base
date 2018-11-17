import React, { Component } from 'react'
import { View, Text, ImageBackground, Image,StyleSheet,TouchableOpacity,KeyboardAvoidingView,Picker ,ScrollView } from 'react-native'
import { Button, Toast ,InputItem,List,Switch} from 'antd-mobile-rn'
import { I18n } from '../../language/I18n'
import Rinput from '../../components/Rinput'
import CountDownBtn from '../../components/CountDownBtn'

import * as u from '../../utils'

export default class ExtractWallet extends Component {
    state={
        switch : true,
        data:[{label:'qeq',value:'1'},{label:'qeq',value:'1'}],
        value:['1'],
        pickerValue:[],
        language:'313131'
    }
    render() {
        return (
            <ScrollView>
            <KeyboardAvoidingView>
                <View style={{alignItems:'center'}}>
                    <List style={[styles.FormLayer]}>
                        <Rinput  
                            
                            label={'提币地址'}   
                            placeholder={'请输入接收钱包'} 
                            // value={this.state.a}
                            // onChange={(val)=>{
                            //     this.setState({a : val})
                            //     console.log(this.state.a)}}
                            content={<Picker
                                selectedValue={this.state.language}
                                style={{ height: u.rh(45),marginLeft:u.rw(10)}}
                                onValueChange={(itemValue, itemIndex) => this.setState({language: itemValue})}>
                                <Picker.Item label="Java" value="java" />
                                </Picker>}
                                >
                            </Rinput>
                        <Rinput label={'提币数量'} placeholder={'余额12354641'}    ></Rinput>
                        <Rinput label={'实际到币量'} placeholder={'0.000000'} editable={true} ></Rinput>
                        <Rinput label={'交易密码'} placeholder={'请输入交易密码'}  ></Rinput>
                        <Rinput label={'手机验证码'} placeholder={'请输入验证码'} RightItem={<CountDownBtn text={'点击获取'} ></CountDownBtn>} ></Rinput>
                        
                        
                    </List>
                    
                    <Button activeStyle={{opacity:0.2,backgroundColor:'#fff'}} style={[styles.button]}>提交</Button>  
                    <View style={styles.tipLayer}>
                        <Text style={[styles.tipText]}>手续费收取规则：</Text>   
                        <Text style={[styles.tipText]}>＜1000个RESS币时，不能进行提现操作，只能使用平台交易功能进行交易。</Text>
                        <Text style={[styles.tipText]}>≥1000个RESS币时，每次收取10%手续费 </Text>
                        <Text style={[styles.tipText]}>提币说明：</Text>    
                        <Text style={[styles.tipText]}>孵化期在安全领域做出重要升级，以更加确保节点的权益安全。</Text>   
                        <Text style={[styles.tipText]}>1.孵化期提币地址请选任意一交易所地址进行绑定，并作为您唯一提币地址。</Text>
                        <Text style={[styles.tipText]}>2.每周可更换一次提币地址，更换提币地址后24小时不可提币</Text>    
                        <Text style={[styles.tipText]}>3.区块链转账是不可逆转的，由自身原因导致提币地址错误的，自身承担相应损失。</Text>   
                    </View>
                    <View style={styles.tipLayer}>
                        <Text style={{color:'#4D4D4D',lineHeight:17,fontSize:12,}}>温馨提示：转入是自动的，转币需要整个网络进行确认，达到三个确认后您的币会自动转入到您的账户中</Text>
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

