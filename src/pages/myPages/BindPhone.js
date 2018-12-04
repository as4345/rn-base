import React, { Component } from 'react'
import { View, Text, ImageBackground, Image,StyleSheet,TouchableOpacity,KeyboardAvoidingView ,Picker } from 'react-native'
import { Button, Toast ,InputItem,List} from 'antd-mobile-rn'
import { I18n } from '../../language/I18n'
import Rinput from '../../components/Rinput'
import CountDownBtn from '../../components/CountDownBtn'
import { Scene, Router, ActionConst, Actions } from 'react-native-router-flux'
import * as u from '../../utils'

export default class BindPhone extends Component {
    state={
        phoneArea : '86',
        phone : '',
        phonecode : '',
    }
    async refor(){
        const _this = this.state;
        if(!_this.phone){ Toast.fail('请输入手机',2); return}
        if(!_this.phonecode){ Toast.fail('请输入手机验证码',2); return}
        Toast.loading('加载中',20)
        let data = await u.post(u.config.baseUrl+'/common/v1.user/bindPhone',{
            phone : _this.phone,
            phonecode : _this.phonecode,
            phonearea : _this.phoneArea
        })
        console.log(data);
        Toast.hide()
        if(data.code != 0){
            Toast.fail(data.msg, 2)
            return
        }
        Toast.success('绑定成功',2);
        this.getUserInfo()
        
    }
    async getCode(){ 
        const _this = this.state;
        if(!_this.phone){ Toast.fail('请输入手机',2); return}
        Toast.loading('加载中',20)
        let data = await u.post(u.config.baseUrl+'/common/v1.system/getPhoneCaptcha',{
            phone : _this.phone,
        })
        console.log(data);
        Toast.hide()
        if(data.code != 0){
            Toast.fail(data.msg, 2)
            return
        }

        Toast.success(data.msg, 2);
        this.refs.code.timeOut();
    }
    getUserInfo = async () => {
        Toast.loading('加载中', 20)
        const res = await u.post(u.config.baseUrl + '/common/v1.user/getUserInfo')
        Toast.hide()
        if (res.code != 0) {
            Toast.fail(res.msg, 2)
            return 
        }
        u.store.setUserInfo(res.data)
        Actions.pop()
    }
    render() {
        const _this = this.state;
        return (
            <KeyboardAvoidingView>
                <View style={{alignItems:'center'}}>
                    <List style={[styles.FormLayer]}>
                    <Rinput  
                            label={'国家'}   
                            content={<Picker
                                        selectedValue={_this.phoneArea}
                                        style={{ height: u.rh(45),marginLeft:u.rw(10)}}
                                        onValueChange={(itemValue, itemIndex) => this.setState({phoneArea: itemValue})}>
                                        <Picker.Item label="中国（china）" value="86" />
                                    </Picker>}>
                        </Rinput> 
                        <Rinput  
                            label={'手机号'} 
                            placeholder={'请输入手机号'} 
                            value={_this.phone}
                            onChange={(val)=>{ this.setState({phone : val}) }}>
                        </Rinput>
                        <Rinput  
                            label={'验证码'}  
                            placeholder={'请输入验证码'}
                            RightItem={<CountDownBtn  ref="code" text={'点击获取'} start={()=>{ this.getCode()}} ></CountDownBtn>} 
                            value={_this.phonecode}
                            onChange={(val)=>{this.setState({phonecode:val})}}></Rinput>
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

