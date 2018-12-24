import React, { Component } from 'react'
import { View, Text, ImageBackground, Image,StyleSheet,TouchableOpacity,KeyboardAvoidingView  } from 'react-native'
import { Button, Toast ,InputItem,List} from 'antd-mobile-rn'
import { I18n } from '../../language/I18n'
import Rinput from '../../components/Rinput'
import CountDownBtn from '../../components/CountDownBtn'
import { Scene, Router, ActionConst, Actions } from 'react-native-router-flux'
import * as u from '../../utils'
import { observer } from "mobx-react"
@observer
export default class TotalAssets extends Component {
    state={
        tem_amount : 0,
        tem_num : 0,
        direct_num : 0,

    }
    componentDidMount(){
        this.getUserStatistics()
    }
    async getUserStatistics(){
        Toast.loading('加载中',20)
        let data = await u.post(u.config.baseUrl+'/common/v1.user/getUserStatistics')
        console.log(data);
        Toast.hide()
        if(data.code != 0){
            Toast.fail(data.msg, 2)
            return
        }
        this.setState({ 
            tem_amount : data.data.tem_amount,
            direct_num : data.data.direct_num,
            tem_num : data.data.tem_num
        })
    }
    render() {
        const _this = this.state;
        const { email,inviteCode } = u.store.userInfo
        return (
            <KeyboardAvoidingView>
                <View style={{alignItems:'center'}}>
                    <List style={[styles.FormLayer]}>
                        <Rinput  
                            placeholder={email} 
                            label={'我的节点'}   
                            editable={true}
                            // value={this.state.a}
                            // onChange={(val)=>{
                            //     this.setState({a : val})
                            //     console.log(this.state.a)}}
                                >
                            </Rinput>
                        <Rinput  placeholder={parseFloat(_this.tem_amount).toFixed(2)} label={'算力总资产'} editable={true} ></Rinput>
                        <Rinput  placeholder={_this.direct_num+'人'} label={'邀请人数'} editable={true} ></Rinput>
                        <Rinput  placeholder={_this.tem_num +'人'} label={'节点人数'} editable={true} ></Rinput>
                    </List>
                    <Button  onClick={Actions['SCENE_INVITERECORD']} activeStyle={{opacity:0.2,backgroundColor:'#fff'}} style={[styles.button]}>查看邀请记录</Button>  
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

