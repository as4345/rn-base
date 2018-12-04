import React, { Component } from 'react'
import { View, Text, ImageBackground, Image,StyleSheet,TouchableOpacity,ScrollView ,Clipboard} from 'react-native'
import { Button, Toast , Modal} from 'antd-mobile-rn'
import { I18n } from '../../language/I18n'
import { Scene, Router, ActionConst, Actions } from 'react-native-router-flux'
import QRCode from 'react-native-qrcode';
import * as u from '../../utils'
import { observer } from "mobx-react"
@observer
export default class Share extends Component {
    state={
        urlPath : ''
    }
    componentDidMount(){
       this.getUrl()
    }
    async getUrl(){
        Toast.loading('加载中',20)
        let data = await u.post(u.config.baseUrl + '/common/v1.user/getQrcodeUrl');
        Toast.hide()
        if(data.code != 0){
            Toast.fail(data.msg,2)
            return
        }
        this.setState({
            urlPath : data.data.base_url
        })
    }
    render() {
        const { email,inviteCode } = u.store.userInfo
        const _this = this.state
        return (
            <View>
                <ImageBackground
                style={styles.layer}
                source={require('../../assets/img/login_bg.jpg')}>
                <View style={styles.contentLayer}>
                    <Image style={styles.userImg} source={require('../../assets/img/indexMoney.png')}></Image>
                    <View><Text style={styles.userName}>{email}</Text></View>
                    <View style={styles.userQrcode}>
                        <QRCode
                            value={_this.urlPath+'/register?inviteCode='+inviteCode}
                            size={u.rw(200)}
                            />
                    </View>
                    {/* <Image style={styles.userQrcode} source={require('../../../assets/img/welcome_bg.png')}></Image> */}
                    <View><Text>分享二维码邀请好友登记</Text></View>
                    {/* <TouchableOpacity onPress={()=>{}} >
                        <View style={styles.qrcodeBtn}><Text style={styles.qrcodeBtnText}>保存二维码</Text></View>
                    </TouchableOpacity> */}
                    <Button 
                     onClick={()=>{ Clipboard.setString(_this.urlPath+'/register?inviteCode='+inviteCode);Toast.success('复制成功') }}  
                     size="small" 
                     activeStyle={{opacity:0.2,backgroundColor:'#fff'}} 
                     style={[styles.button]} >复制地址</Button> 
                </View>
                </ImageBackground>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    layer:{
        width: u.WIDTH,
        height: u.HEIGHT,
        justifyContent: 'center',
        alignItems:'center',
    },
    contentLayer:{
        width : u.rw(300),
        height:u.rh(400),
        alignItems:'center',
        backgroundColor:'#fff',
        position: 'relative',
        textAlign: 'center',
        borderRadius:10,
    },
    userImg:{
        width:u.rw(50),
        height:u.rw(50),
        position:'absolute',
        top:u.rh(-25),
        // borderWidth:u.rw(3),
        // borderColor:'#fff',
        left:u.rw(300/2),
        marginLeft:u.rw(-25),
    },
    userName:{
        fontSize:14,
        color:'#000',
        marginTop:u.rw(30),
    },
    userQrcode:{
     //    width:u.rw(159),
     //    height:u.rh(159),
        marginTop:u.rw(20),
        marginBottom:u.rw(20),
    },
    qrcodeBtn:{
        width:u.rw(100),
        height:  u.rh(25),
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:'#BF095D',
        borderRadius:u.rw(15),
        marginTop:u.rw(20),
    },
    qrcodeBtnText:{
        fontSize:14,
        color:'#fff',
    },
    button:{
        width:u.rw(170),
        backgroundColor:'#DCB125',
        borderRadius:u.rw(20),
        marginTop:u.rh(20),
        height : u.rw(30),
    }
 });

