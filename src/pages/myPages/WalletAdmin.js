import React, { Component } from 'react'
import { View, Text, ImageBackground, Image,StyleSheet,TouchableOpacity,ScrollView } from 'react-native'
import { Button, Toast,Switch,Modal } from 'antd-mobile-rn'
import { I18n } from '../../language/I18n'
import { Scene, Router, ActionConst, Actions } from 'react-native-router-flux'
import * as u from '../../utils'
import { observer } from "mobx-react"
@observer
export default class WalletAdmin extends Component {
    state={
        switch:false,
        list:[],
        visible : false,
        delId : '',
    }
    async getList(){
        Toast.loading('加载中',20);
        let data = await u.post(u.config.baseUrl+'/asset/v1.assets/getWalletaddressList')
        Toast.hide();
        if(data.code != 0 ){
            Toast.fail(data.msg,2)
            return
        }
        this.setState({
            list : data.data
        })
        console.log(data);

    }
    async delWallet(){
        Toast.loading('加载中',20);
        let data = await u.post(u.config.baseUrl+'/asset/v1.assets/delWalletaddress',{
            addressId : this.state.delId,
        })
        Toast.hide();
        Toast.hide();
        if(data.code != 0 ){
            Toast.fail(data.msg,2)
            return
        }
        Toast.success(data.msg, 2)
        this.setState({
            visible : false,
        })
        this.getList()
    }
    async setDefault(item,index){ ///asset/v1.assets/setDefaultWalletaddress
        Toast.loading('加载中',20);
        let data = await u.post(u.config.baseUrl+'/asset/v1.assets/setDefaultWalletaddress',{
            addressId:item.id
        })
        Toast.hide();
        if(data.code != 0 ){
            Toast.fail(data.msg,2)
            return
        }
        let lists = [...this.state.list];
        for(let i = 0 ; i< lists.length ; i++){
            if(i == index){
                lists[i].default = 1;
            }else{
                lists[i].default = 0;
            }
            this.setState({list:lists})
        }
        
    }
    componentDidMount(){
        this.getList();
    }
    render() {
        const { payPasswordState } = u.store.userInfo
        return (
            <View style={{flex:1}}>
            <ScrollView style={{flex:1}}>
                <View style={{flex:1}}>
                {
                    this.state.list.map((item,index)=>{
                        return(
                            <View style={[s.layer]} key={index}>
                                <View style={[s.contents]}>
                                    <View style={[s.title]}>
                                        <Text style={{fontSize:15,color:'#000'}}>标签 {item.label}</Text>
                                        <TouchableOpacity  onPress={()=>{  
                                            this.setState({
                                                visible : true,
                                                delId : item.id
                                            })
                                         }}>
                                            <Text style={[s.iconfont]}>&#xe611;</Text>
                                        </TouchableOpacity>
                                        
                                    </View>
                                    <View style={[s.infoLayer]}>
                                        
                                            <Text style={[s.addressText]}>{item.address}</Text>
                                        
                                            <View >
                                            <TouchableOpacity onPress={()=>{ Actions.push('SCENE_EXTRACTWALLET',{
                                                                                                    id : item.id,
                                                                                                    type : item.type
                                                                                                }) }}>
                                                <Text style={[s.addressBtn]}>提币</Text>
                                                </TouchableOpacity>
                                            </View>
                                        <View style={[s.footLayer]}> 
                                            <View>
                                                <Text>设为默认地址 </Text>
                                            </View>
                                            <View>
                                            <Switch  checked={item.default ? true : false}
                                            onChange={(val)=>{ this.setDefault(item,index)  }} />
                                            </View>
                                            
                                        </View>
                                    </View>
                                </View>
                            </View>
                        )

                    })
                }
                </View>
                </ScrollView>
                <TouchableOpacity onPress={()=>{
                    // this.setState({visible : true}) 
                    // return
                    if(payPasswordState){
                        Actions['SCENE_ADDWALLET']()
                    }else{
                        Toast.fail('请先设置交易密码!',2)
                        Actions['SCENE_SETTRANSACTIONPASSWORD']()
                    }
                    
                }}>
                    <View  style={[s.addBtn]}><Text style={[s.addBtnText]}>添加钱包</Text></View>
                </TouchableOpacity>
                <Modal
                title="点击确定删除"
                transparent
                // onClose={()=>{ this.setState({visible : false}) }}
                maskClosable
                visible={this.state.visible}
                // closable
                footer={[
                    { text: '取消', onPress: ()=>{ this.setState({visible : false}) } },
                    { text: '确定', onPress: () => { this.delWallet() } },
                  ]}
                />
            </View>
        )
    }
}
const s = StyleSheet.create({
    addBtn:{
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:'#DCB125',
        height:u.rh(40)
    },
    addBtnText:{
        fontSize:18,
        color:'#000',
    },
    iconfont:{
        fontFamily:'iconfont',
        fontSize:18,
    },
    layer:{
        backgroundColor:'#000',
        paddingBottom : u.rh(25),
        paddingTop:u.rh(25),
        paddingLeft:u.rw(12),
        paddingRight:u.rw(12),
        marginBottom:u.rh(10)
    },
    contents:{
        backgroundColor:'#fff',
    },
    title:{
        padding:u.rw(12),
        borderBottomColor:'#BFBFBF',
        borderBottomWidth:1,
        flexDirection:'row',
        justifyContent:'space-between',
    },
    infoLayer:{
        padding:u.rw(18),
        alignItems:'center',
    },
    addressText:{
        color:'#000000',
        fontSize:15,
        textAlign:'center'
    },
    addressBtn:{
        width: u.rw(250),
        height:u.rh(40),
        borderRadius:u.rw(18),
        backgroundColor:'#DCB125',
        textAlign:'center',
        lineHeight:u.rh(40),
        color:'#000000',
        fontSize:18,
        marginTop:u.rh(25),
        marginBottom:u.rh(25),
        
    },
    footLayer:{
        flexDirection:'row',
        alignItems:'center',
        alignSelf:'flex-end',
    }
})

